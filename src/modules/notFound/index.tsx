import Footer from "@components/footer";
import type {TemplateConfig} from "utils/configType";
import {ConfigContext} from "utils/configContext";

/**
 * 404 page — ROADMAP.md E2.14
 *
 * It is a module like the others because the Footer consumes `ConfigContext`,
 * and in Astro that can only be satisfied from within the React island: a
 * `<ConfigContext.Provider>` written directly in the `.astro` does not render,
 * because Astro only mounts component islands, not providers.
 *
 * `noindex` and `seo` are set by the `Layout` of `pages/404.astro`.
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
            {config.ui.notFound.title}
          </h1>
          <p className="opacity-70 max-w-md mb-8">
            {config.ui.notFound.text}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`${config.basePath}/`} className="btn btn-primary px-6">
              {config.ui.notFound.home}
            </a>
            <a href={`${config.basePath}/#features`} className="btn btn-outline px-6">
              {config.ui.notFound.features}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;