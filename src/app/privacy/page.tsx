import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Privacy</h1>
      <p className="mt-4 max-w-prose">
        This site does not use cookies and does not collect personal
        information. It does not track you.
      </p>
      <p className="mt-4 max-w-prose">
        A full privacy notice will be published here before this site goes
        live.
      </p>
    </div>
  );
}
