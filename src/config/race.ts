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
  /**
   * ITRA points (0–6) from the race category, km-effort = km + D+/100:
   * Ultra 56.2 → S → 2 · Challenge 32.1 → XS → 1 · Discovery 19.5 → XXS → 0.
   * The race accent color is the official ITRA badge color for its points.
   */
  itraPoints: number;
  /**
   * Elevation silhouette, viewBox 0 0 200 48 (start → finish, always
   * left-to-right). Drawn on the race card as its hero graphic. Generated
   * from the course GPX (data/gpx/, not published) with
   * scripts/gpx-profile.py when a track exists, hand-drawn otherwise.
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
    priceDzd: 4500,
    itraPoints: 2,
    profilePath:
      "M0.0 6.0 L4.3 6.9 L8.5 9.1 L12.8 13.5 L17.0 19.0 L21.3 25.2 L25.5 31.2 L29.8 37.2 L34.0 40.2 L38.3 40.5 L42.6 38.2 L46.8 37.8 L51.1 38.6 L55.3 40.0 L59.6 41.6 L63.8 42.1 L68.1 42.5 L72.3 41.1 L76.6 39.9 L80.9 39.7 L85.1 40.5 L89.4 41.4 L93.6 40.6 L97.9 40.1 L102.1 41.0 L106.4 43.1 L110.6 44.0 L114.9 42.1 L119.1 38.9 L123.4 35.3 L127.7 32.9 L131.9 31.1 L136.2 30.6 L140.4 30.8 L144.7 33.0 L148.9 36.5 L153.2 38.8 L157.4 38.5 L161.7 35.5 L166.0 32.7 L170.2 30.0 L174.5 27.9 L178.7 25.6 L183.0 22.6 L187.2 17.6 L191.5 11.9 L195.7 7.8 L200.0 6.6",
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
    priceDzd: 4000,
    itraPoints: 1,
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
    itraPoints: 0,
    profilePath:
      "M0.0 44.0 L4.3 43.7 L8.5 43.1 L12.8 42.2 L17.0 41.2 L21.3 40.3 L25.5 39.4 L29.8 38.6 L34.0 37.7 L38.3 36.8 L42.6 35.9 L46.8 35.0 L51.1 34.0 L55.3 32.9 L59.6 31.7 L63.8 30.7 L68.1 29.7 L72.3 28.7 L76.6 27.7 L80.9 26.7 L85.1 25.6 L89.4 23.5 L93.6 20.1 L97.9 16.0 L102.1 12.6 L106.4 10.0 L110.6 8.0 L114.9 6.7 L119.1 6.4 L123.4 6.0 L127.7 6.3 L131.9 7.1 L136.2 8.7 L140.4 10.0 L144.7 11.1 L148.9 12.3 L153.2 14.0 L157.4 16.3 L161.7 18.8 L166.0 21.0 L170.2 22.7 L174.5 24.5 L178.7 26.6 L183.0 29.3 L187.2 32.5 L191.5 36.0 L195.7 39.3 L200.0 41.4",
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
    url: "https://dzmoves.com/events/trail-chrea",
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

/**
 * Official itra.run point-badge palette, sampled from
 * itra.run/images/itra_numbers/icons/{zero…six}.svg — index = points.
 */
export const itraPointColors = [
  "#797B77", // 0 · XXS
  "#8CCE3C", // 1 · XS
  "#D1C40A", // 2 · S
  "#5BC9EE", // 3 · M
  "#B16DA7", // 4 · L
  "#DA702D", // 5 · XL
  "#B53229", // 6 · XXL
] as const;

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
