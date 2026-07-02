/**
 * UI strings, French first. The race communicates in FR/AR/EN —
 * add `ar` and `en` objects with the same shape when translations land.
 * Components read from `t` (the active locale) only, never hard-code copy.
 */

export const fr = {
  nav: {
    home: "Accueil",
    parcours: "Parcours",
    courses: "Courses",
    infos: "Infos",
    resultats: "Résultats",
    contact: "Contact",
    register: "S'inscrire",
  },
  hero: {
    edition: "6ème Édition",
    location: "Chréa · Blida · Algérie",
    date: "21 novembre 2026",
    registerCta: "S'inscrire",
    urgency: "Inscriptions ouvertes — clôture 15 nov",
    discoverRaces: "Découvrir les courses",
    countdown: {
      days: "jours",
      hours: "heures",
      minutes: "min",
      seconds: "sec",
      title: "Départ dans",
    },
  },
  stats: {
    title: "La course en chiffres",
  },
  races: {
    title: "Trois courses, une montagne",
    subtitle:
      "Du premier trail à l'ultra : choisissez votre distance dans le Parc National de Chréa.",
    distance: "Distance",
    elevation: "Dénivelé",
    start: "Départ",
    cutoff: "Barrière horaire",
    price: "Inscription",
    details: "Voir les détails",
    register: "S'inscrire",
    prizeTable: "Prix & récompenses",
    prizeCategory: "Catégorie",
    prizeFirst: "1er",
    prizeSecond: "2ème",
    prizeThird: "3ème",
  },
  included: {
    title: "Ce qui est inclus",
    subtitle: "Chaque dossard comprend le pack complet du coureur.",
    chipNotice: "Puce de chronométrage et dossard obligatoires.",
  },
  gallery: {
    title: "L'ambiance Chréa",
    subtitle: "Cédraies, crêtes et brouillard matinal — les éditions précédentes en images.",
    close: "Fermer",
    previous: "Précédent",
    next: "Suivant",
  },
  sponsors: {
    title: "Ils font la course",
  },
  organizers: {
    title: "Organisé par",
    main: "Organisateur principal",
    support: "Avec le soutien de",
  },
  footer: {
    tagline: "Trail running au cœur du Parc National de Chréa.",
    navigation: "Navigation",
    event: "L'événement",
    followUs: "Suivez-nous",
    rights: "Tous droits réservés.",
  },
  common: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    km: "km",
    dPlus: "D+",
  },
} as const;

export type Dictionary = typeof fr;

/** Active locale. Swap to `ar` / `en` once those dictionaries exist. */
export const t: Dictionary = fr;
