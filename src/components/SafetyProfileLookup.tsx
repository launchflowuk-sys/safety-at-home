"use client";

import { useId, useState } from "react";
import {
  findAddresses,
  getSafetyProfile,
  type AddressOption,
  type SafetyProfile,
} from "@/app/actions/safety-profile";
import { ORG, telHref } from "@/config/organisation";

/**
 * Postcode → address → safety profile. Two server round trips, no storage.
 * If the database is not configured the tool says so and points to the
 * phone line, so the page is never broken.
 */

const CHECK_LABELS: Record<string, string> = {
  GAS_SERVICE: "Gas safety check",
  ELECTRICAL_INSPECTION: "Electrical wiring inspection",
  FLAT_FIRE_DOOR: "Flat entrance fire door check",
  SMOKE_ALARM: "Smoke alarms",
  CO_ALARM: "Carbon monoxide alarm",
};

type Stage =
  | { kind: "start" }
  | { kind: "unavailable" }
  | { kind: "none" }
  | { kind: "choose"; addresses: AddressOption[] }
  | { kind: "profile"; profile: SafetyProfile };

export function SafetyProfileLookup() {
  const [postcode, setPostcode] = useState("");
  const [addressId, setAddressId] = useState("");
  const [stage, setStage] = useState<Stage>({ kind: "start" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingId = useId();
  const postcodeId = useId();
  const addressSelectId = useId();

  async function lookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!postcode.trim()) {
      setError("Enter your postcode");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const result = await findAddresses(postcode);
      if (!result.available) setStage({ kind: "unavailable" });
      else if (result.addresses.length === 0) setStage({ kind: "none" });
      else {
        setStage({ kind: "choose", addresses: result.addresses });
        setAddressId(result.addresses[0].id);
      }
    } catch {
      setStage({ kind: "unavailable" });
    } finally {
      setBusy(false);
    }
  }

  async function show(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const profile = await getSafetyProfile(addressId);
      setStage(profile ? { kind: "profile", profile } : { kind: "unavailable" });
    } catch {
      setStage({ kind: "unavailable" });
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setStage({ kind: "start" });
    setAddressId("");
    setError(null);
  }

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-card border-l-8 border-brand bg-brand-wash p-6"
    >
      <h2 id={headingId} className="text-2xl font-bold">
        Safety information for your home
      </h2>
      <p className="mt-2 max-w-prose">
        Enter your postcode to see the plan for your block, when we last
        carried out safety checks, and where asbestos is recorded so you do not
        disturb it. We show months, not exact dates, and no personal details.
      </p>

      {(stage.kind === "start" || stage.kind === "none" || stage.kind === "unavailable") && (
        <form onSubmit={lookup} noValidate className="mt-5">
          <label htmlFor={postcodeId} className="block font-bold">
            Postcode
          </label>
          {error && (
            <p className="mt-1 font-semibold text-alert-deep" role="alert">
              {error}
            </p>
          )}
          <div className="mt-1 flex flex-wrap gap-3">
            <input
              id={postcodeId}
              type="text"
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              autoComplete="postal-code"
              aria-invalid={error ? true : undefined}
              className={`w-40 rounded-card border-2 bg-surface px-3 py-2 text-lg uppercase ${error ? "border-alert" : "border-ink-soft"}`}
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-card bg-brand px-5 py-2 font-bold text-white hover:bg-brand-deep disabled:opacity-60"
            >
              {busy ? "Looking up…" : "Find my address"}
            </button>
          </div>
        </form>
      )}

      <div aria-live="polite" className="mt-5">
        {stage.kind === "unavailable" && (
          <p className="max-w-prose">
            Address lookup is not available right now. Call us on{" "}
            <a
              href={telHref(ORG.repairs.phone)}
              className="font-bold text-link underline underline-offset-2"
            >
              {ORG.repairs.phone}
            </a>{" "}
            and we will tell you about your home.
          </p>
        )}

        {stage.kind === "none" && (
          <p className="max-w-prose">
            We do not have safety records online for that postcode yet. Check
            the postcode and try again, or call us on{" "}
            <a
              href={telHref(ORG.repairs.phone)}
              className="font-bold text-link underline underline-offset-2"
            >
              {ORG.repairs.phone}
            </a>
            .
          </p>
        )}

        {stage.kind === "choose" && (
          <form onSubmit={show} noValidate>
            <label htmlFor={addressSelectId} className="block font-bold">
              Choose your address
            </label>
            <div className="mt-1 flex flex-wrap gap-3">
              <select
                id={addressSelectId}
                value={addressId}
                onChange={(event) => setAddressId(event.target.value)}
                className="max-w-full rounded-card border-2 border-ink-soft bg-surface px-3 py-2 text-lg"
              >
                {stage.addresses.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.line1}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={busy}
                className="rounded-card bg-brand px-5 py-2 font-bold text-white hover:bg-brand-deep disabled:opacity-60"
              >
                {busy ? "Loading…" : "Show safety information"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="font-semibold text-link underline underline-offset-2"
              >
                Change postcode
              </button>
            </div>
          </form>
        )}

        {stage.kind === "profile" && (
          <ProfileView profile={stage.profile} onReset={reset} />
        )}
      </div>
    </section>
  );
}

function ProfileView({
  profile,
  onReset,
}: {
  profile: SafetyProfile;
  onReset: () => void;
}) {
  const { building } = profile;
  return (
    <div className="space-y-6">
      <p className="text-lg font-bold">
        {profile.address.line1}, {profile.address.postcode}
      </p>

      {building && (
        <div className="rounded-card border border-line bg-surface p-4">
          <h3 className="font-bold">Your building: {building.name}</h3>
          <dl className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-ink-soft">Plan if there is a fire</dt>
              <dd className="font-semibold">
                {building.evacuationPlan === "STAY_PUT"
                  ? "Stay put, unless the fire is in your home or smoke gets in"
                  : "Evacuate when the alarm sounds"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Higher-risk building</dt>
              <dd className="font-semibold">
                {building.higherRisk
                  ? `Yes, it is ${ORG.buildingSafety.higherRiskBuilding}`
                  : "No"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Last fire risk assessment</dt>
              <dd className="font-semibold">
                {building.lastFireRiskAssessment ?? "Not recorded"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Last shared-area fire door check</dt>
              <dd className="font-semibold">
                {building.lastCommunalFireDoorCheck ?? "Not recorded"}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full text-left">
          <caption className="p-4 text-left font-bold">
            Safety checks in your home
          </caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="px-4 py-2">Check</th>
              <th scope="col" className="px-4 py-2">Last done</th>
              <th scope="col" className="px-4 py-2">Next due</th>
            </tr>
          </thead>
          <tbody>
            {profile.checks.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-3 text-ink-soft">
                  No checks recorded yet.
                </td>
              </tr>
            )}
            {profile.checks.map((check) => (
              <tr key={check.type} className="border-b border-line">
                <td className="px-4 py-3">{CHECK_LABELS[check.type] ?? check.type}</td>
                <td className="px-4 py-3">{check.lastDone ?? "Not recorded"}</td>
                <td className="px-4 py-3">{check.nextDue ?? "Not recorded"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-card border border-line bg-surface p-4">
        <h3 className="font-bold">Asbestos in your home</h3>
        {profile.asbestos.length === 0 ? (
          <p className="mt-2 max-w-prose">
            We have no asbestos recorded for this home. If your home was built
            before 2000, still ask us before you drill, sand or scrape.
          </p>
        ) : (
          <>
            <p className="mt-2 max-w-prose">
              Our records show these items. They are safe if left alone.{" "}
              <strong>Do not drill, sand, scrape or remove them.</strong>
            </p>
            <ul className="mt-3 divide-y divide-line">
              {profile.asbestos.map((item, index) => (
                <li key={index} className="py-2">
                  <p className="font-semibold">{item.location}</p>
                  <p className="text-sm text-ink-soft">
                    {item.material}. Condition: {item.condition}.
                    {item.lastInspected ? ` Last inspected ${item.lastInspected}.` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="font-semibold text-link underline underline-offset-2"
      >
        Look up a different address
      </button>
    </div>
  );
}
