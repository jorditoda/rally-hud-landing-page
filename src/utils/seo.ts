/**
 * Datos estructurados JSON-LD — ROADMAP.md E2.0
 *
 * Datos verificados contra las fichas reales, NO estimados:
 *   · version y minOS   -> API de iTunes (lookup?id=6739874068)
 *   · precio            -> `price: 0` en App Store y Google Play
 *   · genero            -> "Sports" / "Navigation"
 *
 * ⚠️ `aggregateRating` NO se incluye a proposito: ambas stores devuelven
 * `userRatingCount: 0`. Marcar un rating inventado es una violacion de las
 * directrices de Google y puede penalizar la pagina. Cuando existan reseñas
 * reales, hay que añadir aqui el valor exacto.
 */

import type { TemplateConfig } from "./configType";

export const APP = {
  name: "Rally Hud",
  version: "1.2.0",
  /** De la ficha de la App Store. */
  iosMin: "15.6",
  /** De la ficha de Google Play. */
  androidMin: "8",
  price: "0",
  category: "SportsApplication",
  iosCategory: "Utilities",
} as const;

interface JsonLdOptions {
  config: TemplateConfig;
  /** URL canonica de la pagina, ya absoluta. */
  url: string;
  /** FAQ de la home; solo se incluye en esa pagina. */
  faq?: TemplateConfig["home"]["faq"];
  /** Marca si la pagina es una politica legal, para el BreadcrumbList. */
  breadcrumb?: { name: string }[];
}

export function buildJsonLd({ config, url, faq, breadcrumb }: JsonLdOptions) {
  const image = new URL(config.ogImage, url).href;
  const base = url.replace(/\/[^/]*$/, "/").replace(/\/+$/, "/");

  const graph: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      "@id": `${base}#app`,
      name: APP.name,
      applicationCategory: APP.category,
      operatingSystem: `Android ${APP.androidMin}+, iOS ${APP.iosMin}+`,
      description: config.seo.description,
      url: base,
      image,
      softwareVersion: APP.version,
      downloadUrl: config.googlePlayLink,
      installUrl: config.appStoreLink,
      offers: {
        "@type": "Offer",
        price: APP.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      featureList: config.home.features?.cards.map((c) => c.title),
      screenshot: config.home.showcase?.items.map((i) => ({
        "@type": "ImageObject",
        contentUrl: new URL(i.image, base).href,
        caption: i.caption,
      })),
      author: {
        "@type": "Organization",
        name: config.name,
        url: base,
      },
    },
  ];

  if (faq?.qa?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.qa.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (breadcrumb?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        ...breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: b.name,
          item: url,
        })),
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}