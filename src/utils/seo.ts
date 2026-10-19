/**
 * JSON-LD structured data — ROADMAP.md E2.0
 *
 * Data verified against the real store listings, NOT estimated:
 *   · version and minOS -> iTunes API (lookup?id=6739874068)
 *   · price             -> `price: 0` on App Store and Google Play
 *   · genre             -> "Sports" / "Navigation"
 *
 * ⚠️ `aggregateRating` is NOT included on purpose: both stores return
 * `userRatingCount: 0`. Marking an invented rating is a violation of Google's
 * guidelines and can penalize the page. When real reviews exist, the exact
 * value must be added here.
 */

import type {TemplateConfig} from "./configType";

export const APP = {
  name: "Rally Hud",
  version: "1.2.0",
    /** From the App Store listing. */
  iosMin: "15.6",
    /** From the Google Play listing. */
  androidMin: "8",
  price: "0",
  category: "SportsApplication",
  iosCategory: "Utilities",
} as const;

interface JsonLdOptions {
  config: TemplateConfig;
    /** Canonical URL of the page, already absolute. */
  url: string;
    /** FAQ from the home page; only included on that page. */
  faq?: TemplateConfig["home"]["faq"];
    /** Marks if the page is a legal policy, for the BreadcrumbList. */
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