/**
 * Flat, decorative illustrations for each safety topic. Pure inline SVG using
 * the design tokens (fill-brand, fill-alert, fill-focus …) so they stay on
 * palette and cost no image bytes. Keyed by the first segment of a slug; an
 * unknown topic gets the shield.
 *
 * All illustrations are aria-hidden — the page title carries the meaning.
 */

type Art = React.ReactNode;

const ART: Record<string, Art> = {
  "fire-safety": (
    <>
      <path d="M20 66 L60 34 L100 66 V104 H20 Z" className="fill-brand-wash" />
      <path d="M12 68 L60 28 L108 68" className="stroke-brand" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="76" width="20" height="28" rx="2" className="fill-brand" />
      <circle cx="60" cy="56" r="9" className="fill-surface stroke-brand" strokeWidth="3" />
      <circle cx="60" cy="56" r="3" className="fill-positive" />
      <path d="M96 20 c8 8 12 14 12 21 a12 12 0 0 1 -24 0 c0 -4 2 -7 4 -9 c1 3 3 4 5 4 c-2 -6 0 -11 3 -16z" className="fill-alert" />
      <path d="M99 33 c3 3 5 6 5 9 a5 5 0 0 1 -10 0 c0 -3 2 -5 5 -9z" className="fill-focus" />
    </>
  ),
  "gas-safety": (
    <>
      <rect x="18" y="70" width="84" height="30" rx="4" className="fill-brand-wash" />
      <rect x="26" y="78" width="68" height="6" rx="3" className="fill-brand" />
      <circle cx="40" cy="92" r="4" className="fill-brand" />
      <circle cx="60" cy="92" r="4" className="fill-brand" />
      <circle cx="80" cy="92" r="4" className="fill-brand" />
      <path d="M60 22 c12 12 18 20 18 30 a18 18 0 0 1 -36 0 c0 -6 3 -10 6 -14 c1 4 4 6 7 6 c-3 -8 0 -15 5 -22z" className="fill-brand" />
      <path d="M60 42 c5 5 8 9 8 13 a8 8 0 0 1 -16 0 c0 -4 3 -8 8 -13z" className="fill-brand-wash" />
    </>
  ),
  "electrical-safety": (
    <>
      <rect x="28" y="30" width="64" height="64" rx="8" className="fill-brand-wash" />
      <rect x="46" y="48" width="8" height="18" rx="2" className="fill-brand" />
      <rect x="66" y="48" width="8" height="18" rx="2" className="fill-brand" />
      <rect x="55" y="70" width="10" height="12" rx="2" className="fill-brand" />
      <path d="M100 16 l-12 20 h10 l-6 18 l18 -26 h-10 l6 -12z" className="fill-focus stroke-ink" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  "carbon-monoxide": (
    <>
      <circle cx="60" cy="60" r="34" className="fill-brand-wash" />
      <circle cx="60" cy="60" r="24" className="fill-surface stroke-brand" strokeWidth="4" />
      <circle cx="60" cy="60" r="5" className="fill-alert" />
      <path d="M18 40 q-8 20 0 40 M102 40 q8 20 0 40 M26 48 q-5 12 0 24 M94 48 q5 12 0 24" className="stroke-alert" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  "damp-and-mould": (
    <>
      <rect x="26" y="20" width="68" height="80" rx="4" className="fill-brand-wash" />
      <rect x="34" y="28" width="52" height="64" rx="2" className="fill-surface" />
      <path d="M60 28 v64 M34 60 h52" className="stroke-brand" strokeWidth="4" />
      <path d="M44 40 c3 4 5 7 5 9 a5 5 0 0 1 -10 0 c0 -2 2 -5 5 -9z M74 70 c3 4 5 7 5 9 a5 5 0 0 1 -10 0 c0 -2 2 -5 5 -9z" className="fill-brand" />
      <circle cx="30" cy="96" r="6" className="fill-ink-soft" />
      <circle cx="40" cy="102" r="4" className="fill-ink-soft" />
      <circle cx="90" cy="98" r="5" className="fill-ink-soft" />
    </>
  ),
  "water-safety": (
    <>
      <path d="M22 50 h44 a10 10 0 0 1 10 10 v10 h-14 v-10 H22 z" className="fill-brand" />
      <rect x="40" y="30" width="10" height="20" rx="2" className="fill-brand" />
      <rect x="32" y="24" width="26" height="8" rx="4" className="fill-brand" />
      <path d="M69 78 c5 7 9 12 9 17 a9 9 0 0 1 -18 0 c0 -5 4 -10 9 -17z" className="fill-brand" />
      <path d="M14 108 q23 -8 46 0 t46 0" className="stroke-brand" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  asbestos: (
    <>
      <rect x="18" y="24" width="84" height="34" rx="4" className="fill-brand-wash" />
      <path d="M24 34 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 M24 46 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" className="stroke-ink-soft" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 64 l30 40 H30 z" className="fill-focus stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 78 v12 M60 96 v2" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  "building-safety": (
    <>
      <rect x="34" y="14" width="52" height="92" rx="3" className="fill-brand" />
      <rect x="42" y="24" width="10" height="10" className="fill-brand-wash" />
      <rect x="68" y="24" width="10" height="10" className="fill-brand-wash" />
      <rect x="42" y="44" width="10" height="10" className="fill-brand-wash" />
      <rect x="68" y="44" width="10" height="10" className="fill-brand-wash" />
      <rect x="42" y="64" width="10" height="10" className="fill-brand-wash" />
      <rect x="68" y="64" width="10" height="10" className="fill-focus" />
      <rect x="54" y="86" width="12" height="20" rx="1" className="fill-brand-wash" />
      <rect x="10" y="106" width="100" height="4" rx="2" className="fill-ink-soft" />
    </>
  ),
  "balconies-windows-and-roofs": (
    <>
      <rect x="20" y="30" width="80" height="50" rx="3" className="fill-brand-wash" />
      <rect x="16" y="78" width="88" height="8" rx="3" className="fill-brand" />
      <path d="M28 78 v-26 M40 78 v-26 M52 78 v-26 M64 78 v-26 M76 78 v-26 M88 78 v-26" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
      <rect x="16" y="48" width="88" height="6" rx="3" className="fill-brand" />
      <path d="M12 30 L60 8 L108 30" className="stroke-brand" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "e-bikes-and-e-scooters": (
    <>
      <circle cx="34" cy="84" r="16" className="fill-surface stroke-brand" strokeWidth="5" />
      <circle cx="90" cy="84" r="16" className="fill-surface stroke-brand" strokeWidth="5" />
      <path d="M34 84 L54 50 H78 L90 84 M54 50 L62 84 M46 50 h14" className="stroke-brand" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="58" y="60" width="22" height="12" rx="3" className="fill-focus stroke-ink" strokeWidth="2" />
      <path d="M100 16 l-8 14 h7 l-4 12 l12 -18 h-7 l4 -8z" className="fill-alert" />
    </>
  ),
  "communal-areas": (
    <>
      <path d="M14 104 h20 v-18 h20 v-18 h20 v-18 h20 v-18 h14" className="stroke-brand" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 104 h20 v-18 h20 v-18 h20 v-18 h20 v-18 h14 v90 z" className="fill-brand-wash" />
      <rect x="24" y="44" width="4" height="60" rx="2" className="fill-brand" />
      <rect x="18" y="44" width="16" height="4" rx="2" className="fill-brand" />
      <circle cx="96" cy="26" r="6" className="fill-positive" />
    </>
  ),
  "security-at-home": (
    <>
      <rect x="34" y="16" width="52" height="90" rx="4" className="fill-brand" />
      <rect x="42" y="24" width="36" height="74" rx="2" className="fill-brand-wash" />
      <circle cx="70" cy="62" r="6" className="fill-brand" />
      <rect x="22" y="56" width="20" height="24" rx="4" className="fill-focus stroke-ink" strokeWidth="2" />
      <path d="M26 56 v-6 a6 6 0 0 1 12 0 v6" className="stroke-ink" strokeWidth="3" fill="none" />
      <circle cx="32" cy="66" r="3" className="fill-ink" />
    </>
  ),
  "extra-support": (
    <>
      <circle cx="42" cy="38" r="12" className="fill-brand" />
      <path d="M22 84 v-14 a20 20 0 0 1 40 0 v14 z" className="fill-brand" />
      <circle cx="80" cy="44" r="10" className="fill-brand-wash stroke-brand" strokeWidth="3" />
      <path d="M64 84 v-12 a16 16 0 0 1 32 0 v12 z" className="fill-brand-wash stroke-brand" strokeWidth="3" />
      <path d="M54 92 q6 -10 14 -4 q4 -6 10 2" className="stroke-alert" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  "your-safety-checks": (
    <>
      <rect x="28" y="20" width="64" height="84" rx="6" className="fill-brand-wash" />
      <rect x="46" y="12" width="28" height="14" rx="4" className="fill-brand" />
      <path d="M40 48 l6 6 l12 -12 M40 70 l6 6 l12 -12 M40 92 l6 6 l12 -12" className="stroke-positive" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 48 h18 M66 70 h18 M66 92 h18" className="stroke-brand" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  default: (
    <>
      <path d="M60 12 L100 26 V58 c0 24 -18 40 -40 48 C38 98 20 82 20 58 V26 z" className="fill-brand" />
      <path d="M60 24 L90 34 V58 c0 18 -14 30 -30 36 C44 88 30 76 30 58 V34 z" className="fill-brand-wash" />
      <path d="M46 60 l10 10 l20 -22" className="stroke-positive" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function TopicArt({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const key = slug.split("/")[0];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={className}
      focusable="false"
    >
      {ART[key] ?? ART.default}
    </svg>
  );
}
