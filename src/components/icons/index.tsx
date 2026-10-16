/**
 * Iconografía de Rally HUD — SVG en línea.
 *
 * Reglas del sistema de diseño (Sistema-Base.dc.html, "Medidas"):
 *   "Iconos · Trazo de 2 px, de 22 a 26 px, sin emoji"
 *
 * Por qué SVG y no PNG: heredan `currentColor`, así que cambian con el tema
 * sin tener dos versiones, y pesan ~200 bytes en vez de ~40 KB.
 *
 * Todos los iconos usan viewBox 24x24 y stroke 2 salvo indicación contraria.
 */

interface IconProps {
  className?: string;
  /** Para que el lector de pantalla no lea un icono decorativo. */
  title?: string;
}

const base = (p: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  role: p.title ? ("img" as const) : ("presentation" as const),
  "aria-hidden": p.title ? undefined : (true as const),
  "aria-label": p.title,
  className: p.className,
});

/** Velocímetro. */
export const SpeedometerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 17a9 9 0 1 1 17 0" />
    <path d="M12 17l4.2-4.2" />
    <circle cx="12" cy="17" r="1.4" />
    <path d="M5.6 10.4h.01M9 6.6h.01M15 6.6h.01M18.4 10.4h.01" />
  </svg>
);

/** Vector de fuerzas G: el círculo con cruz y punto del panel HUD. */
export const GForceIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" strokeDasharray="2 3" />
    <path d="M12 3v18M3 12h18" />
    <circle cx="14.4" cy="9.6" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

/** Segmento de ruta: bandera de salida y meta unidas por un trazado. */
export const SegmentIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 21V4" />
    <path d="M5 5h11l-2.2 3.2L16 11.5H5" />
    <path d="M3 21h4" />
  </svg>
);

/** Cronómetro: el tiempo que se registra por segmento. */
export const TimerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 13.5l3.2-3.2" />
    <path d="M9.5 2.5h5" />
    <path d="M12 2.5v3.5" />
  </svg>
);

/** Ranking: podio. */
export const TrophyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 5.5H4.5V7a3 3 0 0 0 3 3" />
    <path d="M17 5.5h2.5V7a3 3 0 0 1-3 3" />
    <path d="M10 14h4l.6 3.5H9.4L10 14Z" />
    <path d="M7.5 21h9" />
    <path d="M12 17.5V21" />
  </svg>
);

/** Vehículo: el garaje. */
export const CarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 15.5h16" />
    <path d="M5.5 15.5 7 9.8A2 2 0 0 1 8.9 8.5h6.2A2 2 0 0 1 17 9.8l1.5 5.7" />
    <path d="M4 15.5v2.2A1.3 1.3 0 0 0 5.3 19h13.4a1.3 1.3 0 0 0 1.3-1.3v-2.2" />
    <circle cx="7.5" cy="17" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="17" r="0.8" fill="currentColor" stroke="none" />
    <path d="M9.5 12.2h5" />
  </svg>
);

/** Sin cobertura GPS: el estado que la app tiene que comunicar bien. */
export const NoSignalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20.5v.01" />
    <path d="M8.4 15.6a5.2 5.2 0 0 1 0-3.4" />
    <path d="M15.6 12.2a5.2 5.2 0 0 0-1.2-2.7" />
    <path d="M5.6 18.2a9.4 9.4 0 0 1 0-7.2" />
    <path d="M18.4 10.9a9.4 9.4 0 0 1 .9 3.6" />
    <path d="M4 3.5 20 20.5" />
  </svg>
);

/** Rumbo / brújula. */
export const CompassIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.6 8.4 13.8 13.8 8.4 15.6 10.2 10.2Z" />
  </svg>
);

/** Altitud. */
export const AltitudeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 21 20H3l9-16.5Z" />
    <path d="M12 10.5 16.5 20h-9L12 10.5Z" />
  </svg>
);

/** Instrumentos: el panel secundario de la HUD. */
export const InstrumentsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 15.5a6.5 6.5 0 1 1 13 0" />
    <path d="M12 15.5 15 11" />
    <path d="M8.5 19h7" />
  </svg>
);

/** Notas de ruta. */
export const NotesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 4.5h13v15l-2.5-1.6-2.5 1.6-2.5-1.6-2.5 1.6-2.5-1.6V4.5Z" />
    <path d="M9 9h6M9 12.5h4" />
  </svg>
);

/** Móvil: la app fuera del coche. */
export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </svg>
);

/** Mapa con ruta: la pantalla de crear trazando. */
export const MapTraceIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 4.5 3.5 6.8v13.2L9 17.7l6 2.3 5.5-2.3V4.5L15 6.8 9 4.5Z" />
    <path d="M9 4.5v13.2M15 6.8v13.2" />
  </svg>
);

export const icons = {
  speedometer: SpeedometerIcon,
  gforce: GForceIcon,
  segment: SegmentIcon,
  timer: TimerIcon,
  trophy: TrophyIcon,
  car: CarIcon,
  noSignal: NoSignalIcon,
  compass: CompassIcon,
  altitude: AltitudeIcon,
  instruments: InstrumentsIcon,
  notes: NotesIcon,
  phone: PhoneIcon,
  map: MapTraceIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: IconProps & { name: IconName }) {
  const Cmp = icons[name];
  return <Cmp {...rest} />;
}