/**
 * French — reference dictionary. `Dictionary` is derived from this object;
 * every other locale must keep exactly the same shape.
 * Components read from the active dictionary only, never hard-code copy.
 */

export const fr = {
  meta: {
    description:
      "Blida Trail — 6ème édition : trail running à Chréa, Blida (Algérie) le 21 novembre 2026. Ultra Trail 40 km, Trail Challenge 25 km, Discovery Trail 14 km. Inscriptions ouvertes.",
    ogDescription:
      "Trail running au Parc National de Chréa le 21 novembre 2026. Trois courses, 2 000 coureurs, inscriptions ouvertes jusqu'au 15 novembre 2026.",
  },
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
    itraPoints: "Points ITRA",
    details: "Voir les détails",
    register: "S'inscrire",
    prizeTable: "Prix & récompenses",
    prizeCategory: "Catégorie",
    prizeFirst: "1er",
    prizeSecond: "2ème",
    prizeThird: "3ème",
    difficulty: {
      facile: "Facile",
      "modéré": "Modéré",
      difficile: "Difficile",
    },
    descriptions: {
      ultra:
        "L'épreuve reine : 40 km à travers les crêtes et les cédraies du Parc National de Chréa. Réservé aux coureurs aguerris.",
      challenge:
        "25 km exigeants mais accessibles : le parfait équilibre entre effort et panorama sur la Mitidja.",
      discovery:
        "Découvrez le trail dans la forêt de cèdres : 14 km roulants, ouverts à toutes et à tous.",
    },
  },
  included: {
    title: "Ce qui est inclus",
    subtitle: "Chaque dossard comprend le pack complet du coureur.",
    chipNotice: "Puce de chronométrage et dossard obligatoires.",
    items: {
      assurance: "Assurance",
      photographie: "Photographie",
      tshirt: "T-shirt",
      eau: "Points d'eau",
      medaille: "Médaille finisher",
      certificat: "Certificat finisher",
    },
  },
  history: {
    title: "Cinq éditions, une ascension",
    subtitle:
      "De 500 coureurs partis de Blida en 2021 à plus de 1 100 venus de 40 wilayas et 9 pays : chaque édition grimpe plus haut. La suite s'écrit le 21 novembre 2026.",
    runners: "participants",
    record: "Record de participation",
    horsSerie: "Hors-série",
    wilayas: "wilayas",
    countries: "pays",
    medalAlt: "Médaille",
    upcomingRoute: "Parc National de Chréa",
    expected: "coureurs attendus",
    editionLabels: [
      "1ʳᵉ édition",
      "2ᵉ édition",
      "3ᵉ édition",
      "4ᵉ édition",
      "5ᵉ édition",
      "6ᵉ édition",
    ],
  },
  welcome: {
    title: "L'Algérie vous attend",
    body:
      "Ici, le trail est bien plus qu'une course : c'est une fête populaire. Clubs, familles et bénévoles venus des quatre coins du pays font vivre chaque édition, et les coureurs de 9 pays repartent avec le même souvenir — l'hospitalité algérienne. De la baie d'Alger aux cèdres de Chréa, venez écrire votre chapitre avec nous.",
    imageAlt: "Maqam Echahid, le Mémorial du Martyr, Alger",
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
    collaboration: "En collaboration avec",
    featuredOn: "Référencé sur",
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
    mainNav: "Navigation principale",
    homeLink: "Trail Chrea — accueil",
    language: "Langue",
    km: "km",
    dPlus: "D+",
  },
  /**
   * Pages légales. La version française fait foi ; faire relire par
   * l'organisateur (et un juriste) avant publication.
   */
  legal: {
    updated: "Dernière mise à jour : 1er juillet 2026",
    authoritative:
      "En cas de divergence entre les versions linguistiques, la version française fait foi.",
    contact: "Une question sur cette page ? Écrivez-nous :",
    terms: {
      title: "Conditions générales",
      metaDescription:
        "Conditions générales de participation au Trail Chrea 2026 : inscription, dossards, sécurité, remboursement et droit à l'image.",
      intro:
        "Les présentes conditions s'appliquent à toute personne participant au Trail Chrea 2026. Lisez-les attentivement avant de vous inscrire : l'inscription vaut acceptation.",
      sections: [
        {
          title: "Objet et acceptation",
          body: [
            "Le Trail Chrea 2026 (Blida Trail — 6ème édition) est organisé par Gravir, avec le soutien de la DJS de Blida et en collaboration avec DzMoves, le 21 novembre 2026 au Parc National de Chréa (Blida, Algérie).",
            "L'inscription à l'une des trois courses (Ultra Trail 40 km, Trail Challenge 25 km, Discovery Trail 14 km) vaut acceptation pleine et entière des présentes conditions générales.",
          ],
        },
        {
          title: "Inscription et paiement",
          body: [
            "L'inscription s'effectue en ligne via la plateforme DzMoves jusqu'au 15 novembre 2026, dans la limite des dossards disponibles.",
            "Les frais d'inscription dépendent de la course : 3 500 DZD pour le Discovery Trail et le Trail Challenge, et 4 000 DZD pour l'Ultra Trail. Le dossard est personnel et non transférable : il ne peut être ni cédé, ni revendu, ni échangé.",
          ],
        },
        {
          title: "Conditions de participation",
          body: [
            "Chaque participant déclare être en bonne condition physique et conscient des exigences d'une course en montagne (dénivelé, altitude, météo changeante).",
            "L'organisateur peut exiger un certificat médical de non contre-indication à la pratique de la course à pied en compétition datant de moins d'un an. Les mineurs ne peuvent participer qu'avec une autorisation parentale écrite, lorsque la catégorie le permet.",
          ],
        },
        {
          title: "Dossard et chronométrage",
          body: [
            "Le port du dossard et de la puce de chronométrage est obligatoire pour figurer au classement. Le dossard doit rester visible pendant toute la course.",
            "Il est possible de courir sans dossard officiel, mais sans accès au pack coureur : assurance, ravitaillements, classement, médaille et certificat finisher.",
          ],
        },
        {
          title: "Sécurité et règles de course",
          body: [
            "Les participants doivent suivre le parcours balisé, respecter les barrières horaires propres à chaque course et se conformer aux consignes des commissaires, bénévoles et équipes de secours.",
            "Tout abandon doit être signalé au poste de contrôle le plus proche. Le non-respect de ces règles peut entraîner la disqualification.",
            "La course se déroule dans le Parc National de Chréa : il est strictement interdit de jeter des déchets ou de quitter les sentiers balisés.",
          ],
        },
        {
          title: "Modification et annulation de l'événement",
          body: [
            "En cas de force majeure, de conditions météorologiques dangereuses ou de décision des autorités, l'organisateur peut modifier les parcours et les horaires, reporter ou annuler l'événement, sans que sa responsabilité puisse être engagée.",
          ],
        },
        {
          title: "Remboursement",
          body: [
            "Pour toute demande de remboursement, contactez l'organisateur à l'adresse gravirblida@gmail.com. Les demandes sont examinées au cas par cas.",
          ],
        },
        {
          title: "Assurance et responsabilité",
          body: [
            "Une assurance couvrant la participation à la course est incluse dans chaque dossard officiel.",
            "L'organisateur décline toute responsabilité en cas de perte, de vol ou de détérioration des effets personnels. Chaque participant demeure responsable de son matériel et de sa conduite sur le parcours.",
          ],
        },
        {
          title: "Droit à l'image",
          body: [
            "En participant, chaque coureur autorise l'organisateur à capter et à utiliser les photographies et vidéos prises pendant l'événement, sur tout support lié à la promotion du Trail Chrea (site web, réseaux sociaux, presse).",
            "Vous pouvez vous y opposer à tout moment en écrivant à gravirblida@gmail.com.",
          ],
        },
        {
          title: "Droit applicable",
          body: [
            "Les présentes conditions sont régies par le droit algérien. Tout litige relatif à leur interprétation ou à leur exécution sera soumis aux juridictions compétentes de la wilaya de Blida.",
          ],
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      metaDescription:
        "Politique de confidentialité du Trail Chrea 2026 : données collectées, finalités, publication des résultats, photos et vos droits.",
      intro:
        "Cette politique explique quelles données personnelles sont collectées dans le cadre du Trail Chrea 2026, pourquoi nous les utilisons et quels sont vos droits.",
      sections: [
        {
          title: "Responsable du traitement",
          body: [
            "Le responsable du traitement des données est Gravir, organisateur principal du Trail Chrea 2026. Contact : gravirblida@gmail.com.",
          ],
        },
        {
          title: "Données collectées",
          body: [
            "Lors de l'inscription via la plateforme DzMoves : identité (nom, prénom, date de naissance, sexe), coordonnées (e-mail, téléphone) et contact d'urgence.",
            "Pendant l'événement : temps de course et résultats, ainsi que photographies et vidéos captées sur le parcours et les zones de départ et d'arrivée.",
          ],
        },
        {
          title: "Finalités",
          body: [
            "Ces données servent à gérer les inscriptions et les paiements, attribuer les dossards, assurer le chronométrage et la publication des résultats, garantir la sécurité et l'assistance médicale des coureurs, et communiquer les informations liées à l'événement.",
          ],
        },
        {
          title: "Partage des données",
          body: [
            "Les données sont partagées uniquement avec les prestataires nécessaires à l'organisation : la plateforme d'inscription DzMoves, le prestataire de chronométrage et, en cas de sinistre, l'assureur.",
            "Les résultats (nom, numéro de dossard, temps, catégorie, classement) sont publiés publiquement, conformément à l'usage des compétitions sportives.",
          ],
        },
        {
          title: "Photographies et vidéos",
          body: [
            "Les images captées pendant l'événement peuvent être utilisées pour la communication du Trail Chrea (site web, réseaux sociaux, presse). Vous pouvez vous opposer à l'utilisation de votre image en écrivant à gravirblida@gmail.com.",
          ],
        },
        {
          title: "Durée de conservation",
          body: [
            "Les données d'inscription sont conservées le temps nécessaire à l'organisation de l'événement et aux obligations qui en découlent. Les résultats sont conservés à titre d'archive sportive des éditions du Trail Chrea.",
          ],
        },
        {
          title: "Vos droits",
          body: [
            "Conformément à la loi algérienne n° 18-07 du 10 juin 2018 relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données.",
            "Pour exercer ces droits, écrivez à gravirblida@gmail.com en précisant votre demande.",
          ],
        },
        {
          title: "Cookies et stockage local",
          body: [
            "Ce site n'utilise ni cookies de suivi ni outil d'analyse d'audience. Seule votre préférence de langue est enregistrée localement dans votre navigateur (localStorage) ; elle n'est jamais transmise à un serveur.",
          ],
        },
      ],
    },
  },
};

export type Dictionary = typeof fr;
