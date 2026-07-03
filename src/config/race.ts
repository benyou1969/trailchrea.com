/**
 * Trail Chrea 2026 — single source of truth.
 * Every fact displayed on the site lives here; edit this file, redeploy, done.
 */

export type Difficulty = "facile" | "modéré" | "difficile";

export interface PrizeRow {
  /** e.g. "Scratch mixte 19–99" or "Femmes 40–59" */
  category: string;
  /** DZD, top 3 */
  first: number;
  second: number;
  third: number;
}

export interface Race {
  id: "ultra" | "challenge" | "discovery";
  name: string;
  distanceKm: number;
  elevationGainM: number;
  difficulty: Difficulty;
  /** local time, 24h "HH:mm" on race day */
  startTime: string;
  /** course time limit, "HH:mm" local time, if any */
  cutoffTime?: string;
  priceDzd: number;
  gpxFile: string;
  /** brand color role used for accents on this race */
  color: string;
  /**
   * Hand-drawn elevation silhouette, viewBox 0 0 200 48 (start → finish,
   * always left-to-right). Drawn on the race card as its hero graphic.
   */
  profilePath: string;
  description: string;
  prizes: PrizeRow[];
}

const scratch = (a: number, b: number, c: number): PrizeRow => ({
  category: "Scratch mixte 19–99",
  first: a,
  second: b,
  third: c,
});

/** Age-group rows: men + women × 19–39 / 40–59 / 60+ with identical amounts */
const ageCategories = (a: number, b: number, c: number): PrizeRow[] =>
  (["Hommes", "Femmes"] as const).flatMap((sex) =>
    (["19–39", "40–59", "60+"] as const).map((age) => ({
      category: `${sex} ${age}`,
      first: a,
      second: b,
      third: c,
    })),
  );

export const races: Race[] = [
  {
    id: "ultra",
    name: "Ultra Trail",
    distanceKm: 40.39,
    elevationGainM: 1582,
    difficulty: "difficile",
    startTime: "08:00",
    cutoffTime: "12:00",
    priceDzd: 3500,
    gpxFile: "/gpx/ultra.gpx",
    color: "terracotta",
    profilePath:
      "M0 44 L18 34 L34 38 L56 16 L72 24 L94 6 L114 14 L136 4 L156 20 L178 10 L200 42",
    description:
      "L'épreuve reine : 40 km à travers les crêtes et les cédraies du Parc National de Chréa. Réservé aux coureurs aguerris.",
    prizes: [scratch(60000, 50000, 45000), ...ageCategories(40000, 20000, 15000)],
  },
  {
    id: "challenge",
    name: "Trail Challenge",
    distanceKm: 25,
    elevationGainM: 711,
    difficulty: "modéré",
    startTime: "08:15",
    priceDzd: 3500,
    gpxFile: "/gpx/challenge.gpx",
    color: "cedar",
    profilePath:
      "M0 44 L28 32 L52 36 L84 14 L112 22 L144 10 L172 26 L200 40",
    description:
      "25 km exigeants mais accessibles : le parfait équilibre entre effort et panorama sur la Mitidja.",
    prizes: [scratch(40000, 20000, 15000), ...ageCategories(25000, 20000, 10000)],
  },
  {
    id: "discovery",
    name: "Discovery Trail",
    distanceKm: 14.43,
    elevationGainM: 511,
    difficulty: "facile",
    startTime: "08:30",
    cutoffTime: "13:00",
    priceDzd: 3500,
    gpxFile: "/gpx/discovery.gpx",
    color: "moss",
    profilePath:
      "M0 44 L32 34 L64 38 L100 20 L136 26 L168 16 L200 40",
    description:
      "Découvrez le trail dans la forêt de cèdres : 14 km roulants, ouverts à toutes et à tous.",
    prizes: [scratch(25000, 20000, 15000), ...ageCategories(15000, 10000, 7500)],
  },
];

export const event = {
  name: "Trail Chrea 2026",
  alternateName: "Blida Trail — 6ème édition",
  edition: 6,
  /** race day, first start — used by the countdown and JSON-LD */
  startDate: "2026-11-21T08:00:00+01:00",
  endDate: "2026-11-21T18:00:00+01:00",
  dateDisplay: "21 novembre 2026",
  location: {
    name: "Chréa",
    wilaya: "Blida",
    country: "Algérie",
    countryCode: "DZ",
    lat: 36.42,
    lng: 2.88,
    altitudeM: 1550,
  },
  expectedParticipants: 2000,
  registration: {
    open: true,
    closesAt: "2026-11-15T23:59:59+01:00",
    closesDisplay: "15 novembre 2026",
    /** external — every S'inscrire CTA points here */
    url: "https://dzmoves.com/en/events/trail-chrea/register",
  },
  organizers: {
    main: "Gravir",
    support: "DJS Blida",
    collaboration: "DzMoves",
    collaborationUrl: "https://dzmoves.com/events/trail-chrea",
  },
  partners: ["Ifri", "DzMoves", "Gravir", "DJS Blida"],
  /** race is listed on the ITRA calendar — shown in the organizers strip */
  featuredOn: {
    name: "International Trail Running Association",
    abbreviation: "ITRA",
    url: "https://itra.run",
  },
  /** timing chip + bib mandatory */
  timingChipRequired: true,
  bibPickupNotice:
    "Les informations sur le retrait des dossards et t-shirts seront publiées une semaine avant la course.",
  included: [
    { id: "assurance", label: "Assurance" },
    { id: "photographie", label: "Photographie" },
    { id: "tshirt", label: "T-shirt" },
    { id: "eau", label: "Points d'eau" },
    { id: "medaille", label: "Médaille finisher" },
    { id: "certificat", label: "Certificat finisher" },
  ],
  contact: {
    /** real address from the GRAVIR sponsorship dossier */
    email: "gravirblida@gmail.com",
    phone: "0542 28 80 35",
    instagram: "https://www.instagram.com/trail.chrea/",
    facebook: "https://www.facebook.com/TrailChrea/",
    organizerInstagram: "https://www.instagram.com/gravir.blida/",
  },
  /** absolute base URL for metadata / sitemap / JSON-LD */
  siteUrl: "https://trailchrea.com",
} as const;

export const faq = [
  {
    question: "Puis-je courir sans dossard ?",
    answer: "Oui, mais sans le pack complet de la course.",
  },
  {
    question: "Qui organise la course ?",
    answer: "Gravir, avec la DJS de Blida.",
  },
  {
    question: "Quand puis-je retirer mon dossard ?",
    answer:
      "Les informations sur le retrait des dossards seront publiées une semaine avant la course.",
  },
  {
    question: "Puis-je me faire rembourser ?",
    answer: "Contactez l'organisateur pour toute demande de remboursement.",
  },
];

/** One past edition of the trail — data from the GRAVIR sponsorship dossier. */
export interface PastEdition {
  edition: number;
  year: number;
  /** numeric, locale-neutral (dd.mm.yyyy) */
  dateDisplay: string;
  /** distance chips as displayed, e.g. "2×12 km" for the binôme race */
  distances: string[];
  participants: number;
  /** start → finish, proper nouns kept as-is across locales */
  route: string;
  /** medal photo in /public/images (640px WebP) */
  medalImage?: string;
  /** participation record edition */
  record?: boolean;
  /** national/international reach, when known */
  wilayas?: number;
  countries?: number;
}

export const pastEditions: PastEdition[] = [
  {
    edition: 1,
    year: 2021,
    dateDisplay: "25.12.2021",
    distances: ["10 km"],
    participants: 500,
    route: "APC Blida → APC Chréa",
    medalImage: "/images/medal-1er.webp",
  },
  {
    edition: 2,
    year: 2022,
    dateDisplay: "24.12.2022",
    distances: ["10 km"],
    participants: 450,
    route: "Place du 1er Novembre → Beni Sbiha → Place du 1er Novembre",
    medalImage: "/images/medal-2eme.webp",
  },
  {
    edition: 3,
    year: 2023,
    dateDisplay: "17.11.2023",
    distances: ["15 km"],
    participants: 200,
    route: "Ski Club Chréa → Bourebbou → Placette APC Chréa",
    medalImage: "/images/medal-3eme.webp",
  },
  {
    edition: 4,
    year: 2024,
    dateDisplay: "23.11.2024",
    distances: ["24 km", "5 km"],
    participants: 500,
    route: "Placette APC Chréa → Placette APC Chréa",
    medalImage: "/images/medal-4eme.webp",
  },
  {
    edition: 5,
    year: 2025,
    dateDisplay: "22.11.2025",
    distances: ["24 km", "2×12 km", "5 km"],
    participants: 1112,
    route: "Placette APC Chréa → Placette APC Chréa",
    medalImage: "/images/medal-5eme.webp",
    record: true,
    wilayas: 40,
    countries: 9,
  },
];

/**
 * Hors-série GRAVIR event between the 5th and 6th editions — proof the team
 * delivers beyond Chréa. Shown on the history timeline with its own accent.
 */
export const horsSerie = {
  name: "Trail Chiffa",
  year: 2026,
  dateDisplay: "05.2026",
  distances: ["24 km"],
  participants: 1000,
  route: "Bouarfa → Gorges de la Chiffa → Bouarfa",
  medalImage: "/images/chiffa-medal-1er.webp",
  wilayas: 42,
  countries: 5,
} as const;

export const stats = [
  { value: event.expectedParticipants, label: "coureurs attendus", suffix: "" },
  { value: 40.39, label: "km — Ultra Trail", suffix: "", decimals: 2 },
  { value: 1582, label: "m de dénivelé positif", suffix: "" },
  { value: event.edition, label: "ème édition", suffix: "" },
];

export const difficultyMeta: Record<
  Difficulty,
  { label: string; className: string }
> = {
  facile: { label: "Facile", className: "bg-moss/15 text-moss-deep" },
  modéré: { label: "Modéré", className: "bg-amber-500/15 text-amber-800" },
  difficile: { label: "Difficile", className: "bg-terracotta/15 text-terracotta-deep" },
};

export function formatDzd(amount: number): string {
  return `${new Intl.NumberFormat("fr-DZ").format(amount)} DZD`;
}
