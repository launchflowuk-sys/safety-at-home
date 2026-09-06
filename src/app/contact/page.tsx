import type { Metadata } from "next";
import { ORG, telHref } from "@/config/organisation";

export const metadata: Metadata = {
  title: "Contact us",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Contact us</h1>

      <h2 className="mt-8 text-2xl font-bold">Repairs</h2>
      <p className="mt-2 max-w-prose">
        Call{" "}
        <a
          href={telHref(ORG.repairs.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {ORG.repairs.phone}
        </a>
        . {ORG.repairs.hours}.
      </p>
      <p className="mt-2 max-w-prose">
        Email{" "}
        <a
          href={`mailto:${ORG.repairs.email}`}
          className="font-semibold text-link underline underline-offset-2"
        >
          {ORG.repairs.email}
        </a>
      </p>

      <h2 className="mt-8 text-2xl font-bold">Housing policy</h2>
      <p className="mt-2 max-w-prose">
        Call{" "}
        <a
          href={telHref(ORG.housingPolicy.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {ORG.housingPolicy.phone}
        </a>
      </p>

      <h2 className="mt-8 text-2xl font-bold">In an emergency</h2>
      <p className="mt-2 max-w-prose">
        If life is in danger, call{" "}
        <a
          href={telHref(ORG.emergency.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {ORG.emergency.phone}
        </a>
        . If you smell gas, call {ORG.gasLeak.provider} on{" "}
        <a
          href={telHref(ORG.gasLeak.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {ORG.gasLeak.phone}
        </a>
        .
      </p>
    </div>
  );
}
