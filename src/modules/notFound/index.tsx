import Footer from "@components/footer";
import type {TemplateConfig} from "utils/configType";
import {ConfigContext} from "utils/configContext";
import {useEffect, useState} from "react";
import LinkLanding, {parseSharedLink, type SharedLink} from "@modules/linkLanding";

/**
 * 404 page — ROADMAP.md E2.14
 *
 * It is a module like the others because the Footer consumes `ConfigContext`,
 * and in Astro that can only be satisfied from within the React island: a
 * `<ConfigContext.Provider>` written directly in the `.astro` does not render,
 * because Astro only mounts component islands, not providers.
 *
 * It also serves the links the app shares (/s/{code}, /r/{segmentId}): GitHub
 * Pages has no rewrites, so every unknown path lands here. An inline script in
 * pages/404.astro marks those paths with `html.shared-link` so the "not found"
 * text never flashes before React takes over.
 *
 * Language: Spanish under /es/, otherwise the browser language decides (the
 * app shares /s/CODE with no language prefix).
 */
interface Props {
  config: TemplateConfig;
  configEs: TemplateConfig;
}

function NotFound({ config: en, configEs }: Props) {
  const [config, setConfig] = useState(en);
  const [link, setLink] = useState<SharedLink | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const es =
      /^\/es(\/|$)/.test(path) ||
      (!/^\/(s|r)\//.test(path) ? false : navigator.language?.toLowerCase().startsWith("es"));
    const cfg = es ? configEs : en;
    setConfig(cfg);
    document.documentElement.lang = cfg.lang;
    const shared = parseSharedLink(path);
    setLink(shared);
    if (shared) {
      document.title =
        shared.kind === "invite" ? cfg.ui.links.pageTitleInvite : cfg.ui.links.pageTitleRanking;
    }
    document.documentElement.classList.remove("shared-link");
  }, [en, configEs]);

  return (
    <ConfigContext.Provider value={config}>
      <main className="min-h-[70vh] flex items-center">
        {link ? (
          <LinkLanding link={link} />
        ) : (
          <section className="not-found section-y max-w-screen-lg mx-auto px-4 w-full">
            <p className="font-condensed font-bold text-primary leading-none tabular-nums mb-2">
              404
            </p>
            <h1 className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl">
              {config.ui.notFound.title}
            </h1>
            <p className="opacity-70 max-w-md mb-8">{config.ui.notFound.text}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`${config.basePath}/`} className="btn btn-primary px-6">
                {config.ui.notFound.home}
              </a>
              <a href={`${config.basePath}/#features`} className="btn btn-outline px-6">
                {config.ui.notFound.features}
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;
