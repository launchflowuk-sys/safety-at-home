/**
 * Small line icons for the warning-signs grid. Content files reference them
 * by key (`warningSigns[].icon`). Unknown keys fall back to a warning triangle,
 * so a typo in content never breaks a page. All icons are decorative.
 */
const PATHS: Record<string, React.ReactNode> = {
  door: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </>
  ),
  alarm: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
    </>
  ),
  socket: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 10v3M15 10v3M12 14v3" />
    </>
  ),
  blocked: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5l13 13" />
    </>
  ),
  light: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.3-1 2.1h-5c0-.8-.3-1.6-1-2.1A6 6 0 0 1 12 3z" />
    </>
  ),
  smoke: (
    <>
      <path d="M4 17h12a3 3 0 0 0 0-6 4 4 0 0 0-7.7-1A3.5 3.5 0 0 0 4 17z" />
      <path d="M18 21H8" />
    </>
  ),
  flame: (
    <path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5.5 1 1.5 1.5 2 1.5-.5-2.5 0-5 1-7z" />
  ),
  person: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M6 21v-5a6 6 0 0 1 12 0v5" />
    </>
  ),
  seal: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <rect x="7" y="7" width="10" height="10" rx="1" strokeDasharray="2 2" />
    </>
  ),
  crack: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M12 3l-2 6 3 3-2 5 2 4" />
    </>
  ),
  hinge: (
    <>
      <rect x="9" y="3" width="6" height="18" rx="1" />
      <path d="M9 8h6M9 16h6" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="7" width="16" height="10" rx="1" />
      <path d="M19 10h2v4h-2M6 10v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mould: (
    <>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="15" cy="7" r="1.8" />
      <circle cx="16" cy="14" r="2.8" />
      <circle cx="9" cy="16" r="1.6" />
    </>
  ),
  drop: (
    <path d="M12 3c3 4.5 6 8 6 11.5a6 6 0 0 1-12 0C6 11 9 7.5 12 3z" />
  ),
  window: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M12 3v18M4 12h16" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 13h15a3 3 0 1 1-3 3" />
      <path d="M3 18h8" />
    </>
  ),
  thermometer: (
    <>
      <path d="M10 4a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0V4z" />
      <path d="M12 9v6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5v.5" />
    </>
  ),
};

export function WarningIcon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-alert"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name] ?? PATHS.warning}
    </svg>
  );
}
