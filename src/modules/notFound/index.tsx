import Footer from "@components/footer";
import type { TemplateConfig } from "utils/configType";
import { ConfigContext } from "utils/configContext";

/**
 * Página 404 — ROADMAP.md E2.14
 *
 * Es un módulo como los demás porque el Footer consume `ConfigContext`, y en
 * Astro eso solo se puede Satisfacer desde dentro de la isla React: un
 * `<ConfigContext.Provider>` escrito directamente en el `.astro` no se
 * renderiza, porque Astro solo monta islas de componentes, no de providers.
 *
 * El `noindex` y el `seo` los pone el `Layout` de `pages/404.astro`.
 */
interface Props {
  config: TemplateConfig;
}

function NotFound({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main className="min-h-[70vh] flex items-center">
        <section className="section-y max-w-screen-lg mx-auto px-4 w-full">
          <p className="font-condensed font-bold text-primary leading-none tabular-nums mb-2">
            404
          </p>
          <h1 className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl">
            This road is not on the map
          </h1>
          <p className="opacity-70 max-w-md mb-8">
            The page you are looking for does not exist. It may have moved, or
            the link may be wrong.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/" className="btn btn-primary px-6">
              Back to home
            </a>
            <a href="/#features" className="btn btn-outline px-6">
              See the features
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;