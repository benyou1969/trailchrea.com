import { event } from "@/config/race";
import type { Dictionary } from "@/data/i18n";

type LegalDoc = Dictionary["legal"]["terms"];

/**
 * Server component — long-form legal text (terms, privacy).
 * Dark header band keeps the fixed navbar readable before scroll.
 */
export function LegalArticle({
  doc,
  legal,
}: {
  doc: LegalDoc;
  legal: Dictionary["legal"];
}) {
  return (
    <article>
      <header className="bg-cedar-deep pb-14 pt-28 text-sand">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="display text-4xl sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-cedar-mist">{legal.updated}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-lg leading-relaxed">{doc.intro}</p>
        <p className="mt-3 text-sm italic text-stone">{legal.authoritative}</p>

        {doc.sections.map((section, i) => (
          <section key={section.title} className="mt-10">
            <h2 className="display text-2xl text-cedar">
              {i + 1}. {section.title}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-stone">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-14 border-t border-night/10 pt-6 text-sm text-stone">
          {legal.contact}{" "}
          <a
            href={`mailto:${event.contact.email}`}
            className="font-semibold text-terracotta-deep transition-colors hover:text-terracotta"
          >
            {event.contact.email}
          </a>
        </p>
      </div>
    </article>
  );
}
