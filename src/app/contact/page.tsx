import type { Metadata } from "next";
import { THURROCK, telHref } from "@/config/thurrock";

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
          href={telHref(THURROCK.repairs.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {THURROCK.repairs.phone}
        </a>
        . {THURROCK.repairs.hours}.
      </p>
      <p className="mt-2 max-w-prose">
        Email{" "}
        <a
          href={`mailto:${THURROCK.repairs.email}`}
          className="font-semibold text-link underline underline-offset-2"
        >
          {THURROCK.repairs.email}
        </a>
      </p>

      <h2 className="mt-8 text-2xl font-bold">Housing policy</h2>
      <p className="mt-2 max-w-prose">
        Call{" "}
        <a
          href={telHref(THURROCK.housingPolicy.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {THURROCK.housingPolicy.phone}
        </a>
      </p>

      <h2 className="mt-8 text-2xl font-bold">In an emergency</h2>
      <p className="mt-2 max-w-prose">
        If life is in danger, call{" "}
        <a
          href={telHref(THURROCK.emergency.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {THURROCK.emergency.phone}
        </a>
        . If you smell gas, call {THURROCK.gasLeak.provider} on{" "}
        <a
          href={telHref(THURROCK.gasLeak.phone)}
          className="font-bold text-link underline underline-offset-2"
        >
          {THURROCK.gasLeak.phone}
        </a>
        .
      </p>
    </div>
  );
}
