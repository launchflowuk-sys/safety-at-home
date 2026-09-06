/**
 * Explanatory diagrams. Unlike `TopicArt` (decorative) these carry meaning,
 * so each one is announced as an image with a title and a description, and
 * the page pairs it with a caption.
 *
 * Rules for adding one:
 * - It must show a mechanism a reader would otherwise have to imagine. If it
 *   only decorates, it belongs in `TopicArt`.
 * - Colour must come from the design tokens, and must never be the only way
 *   a difference is shown — pair red/green with a cross or a tick.
 * - Keep labels in the drawing short. The explanation goes in the caption and
 *   the surrounding text, which resize and translate properly.
 */

export type DiagramId =
  | "stay-put"
  | "fire-door-check"
  | "alarm-placement"
  | "condensation"
  | "co-alarm-placement"
  | "ebike-charging";

/* ---------------------------------------------------------------- shared */

function Tick({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" className="fill-positive" />
      <path
        d="M-4.5 0 l3 3.2 l6-6.5"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" className="fill-alert" />
      <path
        d="M-4 -4 l8 8 M4 -4 l-8 8"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Flame({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0 -14 c6 7 9 11 9 16 a9 9 0 0 1 -18 0 c0 -3 1.5 -5.5 3 -7.5 c1 2.5 2.5 3.5 3.5 3.5 c-1.5 -5 0 -8.5 2.5 -12z"
        className="fill-alert"
      />
      <path
        d="M1 -2 c2.5 3 4 5 4 7 a4 4 0 0 1 -8 0 c0 -2 1.5 -4 4 -7z"
        className="fill-focus"
      />
    </g>
  );
}

/* ------------------------------------------------------------- diagrams */

/** Cross-section of a block: what "stay put" actually relies on. */
function StayPut() {
  return (
    <svg viewBox="0 0 460 320" className="w-full" role="presentation">
      {/* ground */}
      <rect x="20" y="286" width="420" height="5" rx="2" className="fill-ink-soft" />

      {/* building shell */}
      <rect x="60" y="24" width="330" height="262" rx="4" className="fill-brand-wash stroke-brand" strokeWidth="3" />

      {/* stair core */}
      <rect x="60" y="24" width="58" height="262" className="fill-surface stroke-brand" strokeWidth="2" />
      <path
        d="M66 274 h14 v-18 h14 v-18 h14 v-18 M66 214 h14 v-18 h14 v-18 h14 v-18 M66 154 h14 v-18 h14 v-18 h14 v-18 M66 94 h14 v-18 h14 v-18 h14 v-18"
        fill="none"
        className="stroke-brand"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text x="89" y="300" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="700">
        Stairs
      </text>

      {/* lift shaft */}
      <rect x="118" y="24" width="42" height="262" className="fill-surface stroke-brand" strokeWidth="2" />
      <rect x="127" y="120" width="24" height="34" rx="2" className="fill-line" />
      <Cross x={139} y={200} />
      <text x="139" y="300" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="700">
        Lift
      </text>

      {/* floor slabs */}
      {[89, 154, 219].map((y) => (
        <line key={y} x1="160" y1={y} x2="390" y2={y} className="stroke-brand" strokeWidth="3" />
      ))}
      <line x1="275" y1="24" x2="275" y2="286" className="stroke-brand" strokeWidth="3" />

      {/* the flat that is on fire */}
      <rect x="160" y="89" width="115" height="65" className="fill-alert-wash" />
      <Flame x={200} y={132} scale={1.15} />
      <text x="222" y="120" className="fill-alert-deep" fontSize="11.5" fontWeight="700">
        Fire here:
      </text>
      <text x="222" y="134" className="fill-alert-deep" fontSize="11.5" fontWeight="700">
        always leave
      </text>

      {/* neighbouring flats stay put */}
      {[
        { x: 275, y: 89 },
        { x: 160, y: 24 },
        { x: 275, y: 24 },
        { x: 160, y: 154 },
        { x: 275, y: 154 },
        { x: 160, y: 219 },
        { x: 275, y: 219 },
      ].map((flat) => (
        <g key={`${flat.x}-${flat.y}`}>
          <Tick x={flat.x + 22} y={flat.y + 32} />
          <text x={flat.x + 38} y={flat.y + 37} className="fill-ink" fontSize="11.5">
            Stay put
          </text>
        </g>
      ))}

      {/* escape route from the fire flat */}
      <path
        d="M176 150 h-40 v0 M136 150 q-20 0 -20 20 v100"
        fill="none"
        className="stroke-alert"
        strokeWidth="3"
        strokeDasharray="7 5"
        strokeLinecap="round"
      />
      <path d="M116 274 l-5 -9 h10 z" className="fill-alert" transform="rotate(180 116 270)" />

      {/* compartment note */}
      <text x="400" y="150" className="fill-ink-soft" fontSize="11" fontWeight="700">
        Walls,
      </text>
      <text x="400" y="164" className="fill-ink-soft" fontSize="11" fontWeight="700">
        floors and
      </text>
      <text x="400" y="178" className="fill-ink-soft" fontSize="11" fontWeight="700">
        doors hold
      </text>
      <text x="400" y="192" className="fill-ink-soft" fontSize="11" fontWeight="700">
        fire back
      </text>
    </svg>
  );
}

/** A flat entrance fire door, with the five things worth checking. */
function FireDoorCheck() {
  return (
    <svg viewBox="0 0 430 308" className="w-full" role="presentation">
      {/* wall */}
      <rect x="20" y="16" width="250" height="268" className="fill-brand-wash" />
      {/* frame */}
      <rect x="70" y="30" width="150" height="254" rx="2" className="fill-surface stroke-brand" strokeWidth="4" />
      {/* door leaf */}
      <rect x="80" y="40" width="130" height="244" rx="2" className="fill-line stroke-brand" strokeWidth="2" />
      {/* vision panel */}
      <rect x="100" y="62" width="90" height="52" rx="2" className="fill-surface stroke-brand" strokeWidth="2" />
      {/* handle */}
      <circle cx="96" cy="170" r="5" className="fill-brand" />
      {/* hinges */}
      {[70, 160, 250].map((y) => (
        <rect key={y} x="205" y={y} width="9" height="22" rx="1.5" className="fill-brand" />
      ))}
      {/* self closer */}
      <rect x="120" y="42" width="52" height="12" rx="3" className="fill-brand" />
      <path d="M172 48 l26 -10" className="stroke-brand" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* intumescent seal along the edge */}
      <path d="M80 44 v236" className="stroke-positive" strokeWidth="4" strokeDasharray="6 4" fill="none" />

      {/* numbered callouts */}
      {[
        { n: 1, x: 250, y: 48, label: "Self-closer shuts it" },
        { n: 2, x: 250, y: 96, label: "Seals not painted over" },
        { n: 3, x: 250, y: 144, label: "Gap under a pound coin" },
        { n: 4, x: 250, y: 192, label: "Hinges tight, 3 of them" },
        { n: 5, x: 250, y: 240, label: "No cracks or holes" },
      ].map((c) => (
        <g key={c.n}>
          <circle cx={c.x} cy={c.y} r="11" className="fill-brand" />
          <text x={c.x} y={c.y + 4.5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
            {c.n}
          </text>
          <text x={c.x + 20} y={c.y + 4.5} className="fill-ink" fontSize="12">
            {c.label}
          </text>
        </g>
      ))}

      {/* gap indicator at the threshold */}
      <path d="M80 288 h130" className="stroke-alert" strokeWidth="3" fill="none" />
      <text x="145" y="299" textAnchor="middle" className="fill-alert-deep" fontSize="10.5" fontWeight="700">
        check this gap
      </text>
    </svg>
  );
}

/** Where alarms belong in a home. */
function AlarmPlacement() {
  const rooms = [
    { x: 30, y: 40, w: 130, h: 95, name: "Living room", alarm: "smoke" },
    { x: 160, y: 40, w: 110, h: 95, name: "Kitchen", alarm: "heat" },
    { x: 270, y: 40, w: 120, h: 95, name: "Bedroom", alarm: null },
    { x: 30, y: 135, w: 360, h: 45, name: "Hallway", alarm: "smoke" },
    { x: 30, y: 180, w: 175, h: 80, name: "Bedroom", alarm: null },
    { x: 205, y: 180, w: 90, h: 80, name: "Bathroom", alarm: null },
    { x: 295, y: 180, w: 95, h: 80, name: "Store", alarm: null },
  ];
  return (
    <svg viewBox="0 0 420 290" className="w-full" role="presentation">
      {rooms.map((r) => (
        <g key={`${r.x}-${r.y}-${r.name}`}>
          <rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            className="fill-surface stroke-brand"
            strokeWidth="2.5"
          />
          <text x={r.x + 8} y={r.y + 17} className="fill-ink-soft" fontSize="11.5">
            {r.name}
          </text>
          {r.alarm && (
            <g transform={`translate(${r.x + r.w / 2} ${r.y + r.h / 2 + 6})`}>
              <circle
                r="15"
                className={r.alarm === "smoke" ? "fill-brand" : "fill-focus"}
                stroke="currentColor"
              />
              <circle r="4" className={r.alarm === "smoke" ? "fill-surface" : "fill-ink"} />
              <text
                y="30"
                textAnchor="middle"
                className="fill-ink"
                fontSize="11"
                fontWeight="700"
              >
                {r.alarm === "smoke" ? "Smoke alarm" : "Heat alarm"}
              </text>
            </g>
          )}
        </g>
      ))}
      {/* front door */}
      <path d="M30 158 v-18" className="stroke-alert" strokeWidth="5" fill="none" />
      <text x="16" y="176" className="fill-alert-deep" fontSize="10.5" fontWeight="700">
        Way out
      </text>
    </svg>
  );
}

/** Why condensation forms, and the two things that stop it. */
function Condensation() {
  return (
    <svg viewBox="0 0 460 280" className="w-full" role="presentation">
      {/* room */}
      <rect x="30" y="24" width="400" height="220" rx="4" className="fill-brand-wash stroke-brand" strokeWidth="3" />
      {/* cold outside wall on the right */}
      <rect x="392" y="24" width="38" height="220" className="fill-brand" opacity="0.25" />
      <text x="411" y="140" textAnchor="middle" className="fill-ink" fontSize="11" fontWeight="700" transform="rotate(90 411 140)">
        Cold wall
      </text>

      {/* steam source: pan */}
      <rect x="60" y="196" width="58" height="26" rx="3" className="fill-brand" />
      <rect x="56" y="190" width="66" height="8" rx="3" className="fill-brand-deep" />
      <text x="89" y="236" textAnchor="middle" className="fill-ink" fontSize="11.5" fontWeight="700">
        Cooking
      </text>
      {/* steam source: shower */}
      <rect x="160" y="196" width="46" height="26" rx="3" className="fill-brand" />
      <text x="183" y="236" textAnchor="middle" className="fill-ink" fontSize="11.5" fontWeight="700">
        Washing
      </text>

      {/* moist air rising and travelling right */}
      <path
        d="M89 186 q0 -40 30 -55 q40 -20 90 -14 q70 8 130 30 q30 11 40 30"
        fill="none"
        className="stroke-brand"
        strokeWidth="3"
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <path d="M383 178 l3 11 l-11 -3z" className="fill-brand" />
      <text x="196" y="96" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="700">
        Warm, damp air
      </text>

      {/* droplets on the cold wall */}
      {[
        [386, 118],
        [386, 146],
        [386, 174],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y} c4 5 6 8 6 11 a6 6 0 0 1 -12 0 c0 -3 2 -6 6 -11z`}
          className="fill-brand-deep"
        />
      ))}

      {/* mould at the bottom of the cold wall */}
      <circle cx="380" cy="228" r="7" className="fill-ink-soft" />
      <circle cx="392" cy="234" r="5" className="fill-ink-soft" />
      <circle cx="370" cy="236" r="4" className="fill-ink-soft" />
      <text x="376" y="258" textAnchor="middle" className="fill-ink" fontSize="11.5" fontWeight="700">
        Mould
      </text>

      {/* the fix: open window + extractor */}
      <rect x="240" y="34" width="70" height="46" rx="2" className="fill-surface stroke-brand" strokeWidth="2.5" />
      <path d="M275 34 v46 M240 57 h70" className="stroke-brand" strokeWidth="2" />
      <path d="M318 44 q22 6 22 18" fill="none" className="stroke-positive" strokeWidth="3" strokeLinecap="round" />
      <path d="M340 62 l-6 -3 l1 8z" className="fill-positive" />
      <Tick x={330} y={34} />
      <text x="252" y="100" className="fill-positive" fontSize="11.5" fontWeight="700">
        Let the damp air out
      </text>
    </svg>
  );
}

/** Where a carbon monoxide alarm goes in relation to the appliance. */
function CoAlarmPlacement() {
  return (
    <svg viewBox="0 0 420 270" className="w-full" role="presentation">
      <rect x="26" y="24" width="368" height="200" rx="4" className="fill-brand-wash stroke-brand" strokeWidth="3" />
      <rect x="26" y="216" width="368" height="8" className="fill-ink-soft" />

      {/* boiler */}
      <rect x="70" y="96" width="66" height="86" rx="4" className="fill-brand" />
      <rect x="82" y="110" width="42" height="26" rx="2" className="fill-brand-wash" />
      <text x="103" y="200" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="700">
        Boiler
      </text>

      {/* correct alarm position: 1-3m away, at head height */}
      <g transform="translate(250 92)">
        <circle r="17" className="fill-surface stroke-brand" strokeWidth="3" />
        <circle r="5" className="fill-positive" />
        <Tick x={16} y={-16} />
      </g>
      <text x="250" y="132" textAnchor="middle" className="fill-ink" fontSize="11.5" fontWeight="700">
        1 to 3 metres away
      </text>
      <text x="250" y="146" textAnchor="middle" className="fill-ink" fontSize="11.5" fontWeight="700">
        at head height
      </text>

      {/* distance marker */}
      <path d="M140 92 h88" className="stroke-brand" strokeWidth="2" strokeDasharray="5 4" fill="none" />
      <path d="M232 92 l-8 -4 v8z" className="fill-brand" />
      <path d="M140 92 l8 -4 v8z" className="fill-brand" />

      {/* wrong: directly above the boiler */}
      <g transform="translate(103 54)">
        <circle r="14" className="fill-surface stroke-line" strokeWidth="3" />
        <Cross x={14} y={-13} />
      </g>
      <text x="103" y="40" textAnchor="middle" className="fill-alert-deep" fontSize="11" fontWeight="700">
        Not right above it
      </text>

      {/* wrong: in a cupboard */}
      <rect x="318" y="150" width="62" height="66" rx="2" className="fill-line stroke-brand" strokeWidth="2" />
      <g transform="translate(349 182)">
        <circle r="12" className="fill-surface stroke-line" strokeWidth="2.5" />
        <Cross x={13} y={-12} />
      </g>
      <text x="349" y="240" textAnchor="middle" className="fill-alert-deep" fontSize="11" fontWeight="700">
        Not in a cupboard
      </text>
    </svg>
  );
}

/** Safe and unsafe places to charge a battery. */
function EbikeCharging() {
  return (
    <svg viewBox="0 0 460 250" className="w-full" role="presentation">
      {/* unsafe panel */}
      <rect x="16" y="20" width="200" height="200" rx="6" className="fill-alert-wash stroke-alert" strokeWidth="3" />
      <text x="116" y="44" textAnchor="middle" className="fill-alert-deep" fontSize="13" fontWeight="700">
        Never here
      </text>
      {/* corridor */}
      <rect x="40" y="60" width="152" height="130" rx="3" className="fill-surface stroke-alert" strokeWidth="2" />
      <path d="M40 190 h152" className="stroke-alert" strokeWidth="3" />
      {/* door at the end */}
      <rect x="150" y="70" width="34" height="60" rx="2" className="fill-line stroke-alert" strokeWidth="2" />
      <text x="167" y="146" textAnchor="middle" className="fill-alert-deep" fontSize="10.5" fontWeight="700">
        Way out
      </text>
      {/* bike blocking */}
      <circle cx="72" cy="160" r="14" className="fill-surface stroke-ink" strokeWidth="3" />
      <circle cx="118" cy="160" r="14" className="fill-surface stroke-ink" strokeWidth="3" />
      <path d="M72 160 L90 126 h20 l8 34 M90 126 l-6 34" fill="none" className="stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      <rect x="92" y="140" width="20" height="11" rx="2" className="fill-alert" />
      <Cross x={116} y={100} />

      {/* safe panel */}
      <rect x="244" y="20" width="200" height="200" rx="6" className="fill-surface stroke-positive" strokeWidth="3" />
      <text x="344" y="44" textAnchor="middle" className="fill-positive" fontSize="13" fontWeight="700">
        Better here
      </text>
      {/* room */}
      <rect x="268" y="60" width="152" height="130" rx="3" className="fill-brand-wash stroke-brand" strokeWidth="2" />
      {/* alarm on the ceiling */}
      <circle cx="344" cy="78" r="9" className="fill-brand" />
      <circle cx="344" cy="78" r="3" className="fill-surface" />
      <text x="360" y="82" className="fill-ink" fontSize="10.5" fontWeight="700">
        alarm
      </text>
      {/* bike away from the door */}
      <circle cx="304" cy="160" r="14" className="fill-surface stroke-ink" strokeWidth="3" />
      <circle cx="350" cy="160" r="14" className="fill-surface stroke-ink" strokeWidth="3" />
      <path d="M304 160 L322 126 h20 l8 34 M322 126 l-6 34" fill="none" className="stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      <rect x="324" y="140" width="20" height="11" rx="2" className="fill-positive" />
      <Tick x={396} y={112} />
      <text x="344" y="206" textAnchor="middle" className="fill-ink" fontSize="10.5" fontWeight="700">
        Clear of your way out
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------- registry */

const DIAGRAMS: Record<DiagramId, () => React.ReactElement> = {
  "stay-put": StayPut,
  "fire-door-check": FireDoorCheck,
  "alarm-placement": AlarmPlacement,
  condensation: Condensation,
  "co-alarm-placement": CoAlarmPlacement,
  "ebike-charging": EbikeCharging,
};

export function getDiagram(id: DiagramId) {
  return DIAGRAMS[id];
}
