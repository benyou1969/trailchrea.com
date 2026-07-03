import { event, races } from "@/config/race";
import { getDictionary, hasLocale, type Locale } from "@/data/i18n";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { RaceCards } from "@/components/home/race-cards";
import { Included } from "@/components/home/included";
import { History } from "@/components/home/history";
import { Gallery } from "@/components/home/gallery";
import { Organizers } from "@/components/home/organizers";

/** schema.org SportsEvent — real date, place and 3 500 DZD offers. */
function buildJsonLd(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.name,
    alternateName: event.alternateName,
    description,
    sport: "Trail running",
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    maximumAttendeeCapacity: event.expectedParticipants,
    inLanguage: lang,
    url: `${event.siteUrl}/${lang}`,
    sameAs: [event.contact.instagram, event.contact.facebook],
    location: {
      "@type": "Place",
      name: `${event.location.name}, Parc National de Chréa`,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.name,
        addressRegion: event.location.wilaya,
        addressCountry: event.location.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: event.location.lat,
        longitude: event.location.lng,
      },
    },
    organizer: [
      {
        "@type": "Organization",
        name: event.organizers.main,
        sameAs: [event.contact.organizerInstagram],
      },
      { "@type": "Organization", name: event.organizers.support },
    ],
    offers: races.map((race) => ({
      "@type": "Offer",
      name: `${race.name} — ${race.distanceKm} km`,
      price: race.priceDzd,
      priceCurrency: "DZD",
      url: event.registration.url,
      availability: "https://schema.org/InStock",
      validThrough: event.registration.closesAt,
    })),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "fr";
  const t = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(locale, t.meta.description)),
        }}
      />
      <Hero />
      <Stats />
      <RaceCards />
      <Included />
      <Gallery />
      <History />
      {/* <Sponsors /> — hidden until the 2026 partner list is confirmed */}
      <Organizers />
    </>
  );
}
