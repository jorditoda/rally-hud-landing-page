import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import clsx from "clsx";
import {useContext, useEffect, useState} from "react";
import {ConfigContext} from "../../utils/configContext";
import ThemeSwitcher from "./themeSwitcher";

/**
 * Navbar — ROADMAP.md E2.5
 *
 * Before, the container animated from `width: 100%` to `80%` on scroll. That
 * compressed the content until items OVERLAPPED: the logo slid on top of the
 * theme switch and the nav covered the hero title. Reproducible at 800px.
 *
 * Now the width is fixed and the only thing that changes on scroll is the
 * shadow and background, which is what matters: it separates the bar from the
 * content without touching it.
 *
 * The full nav breakpoint moves from `md` (768px) to `lg` (1024px): at 800px
 * the entire nav was visible and didn't fit.
 *
 * Also removed `opacity-0` + `animate`: without JS the navbar stayed invisible.
 */
function Navbar() {
  const {
    name,
    showThemeSwitch,
    topNavbar,
    googlePlayLink,
    appStoreLink,
    ui,
    lang,
    basePath,
  } = useContext(ConfigContext)!;

  // Same page in the other language. Rendered with the home page and
  // corrected after hydration with the real path (static build, no request).
  const otherHome = lang === "es" ? "/" : "/es/";
  const [langHref, setLangHref] = useState(otherHome);
  useEffect(() => {
    const path = window.location.pathname;
    setLangHref(
      lang === "es" ? path.replace(/^\/es(\/|$)/, "/") : `/es${path === "/" ? "/" : path}`
    );
  }, [lang]);
  const langLink = (
    <a
      href={langHref}
      hrefLang={lang === "es" ? "en" : "es"}
      lang={lang === "es" ? "en" : "es"}
      aria-label={ui.switchLanguageLabel}
      className="btn btn-ghost btn-sm px-2 font-semibold"
    >
      {ui.switchLanguage}
    </a>
  );

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    // The mobile menu closes when Esc is pressed and when returning to desktop.
  useEffect(() => {
    if (!isMobileNavVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileNavVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileNavVisible]);

  return (
    <nav className="max-w-screen-lg mx-auto sticky top-0 z-50 px-4">
      <div
        className={clsx(
          "navbar relative rounded-2xl px-4 transition-shadow duration-200",
          isScrolled
            ? "bg-base-200/90 backdrop-blur shadow-lg border border-base-300"
            : "bg-base-200/60 backdrop-blur-sm border border-transparent"
        )}
      >
        <div className="navbar-start">
          <a href={`${basePath}/`} className="flex items-center gap-2">
            {/*
              App icon (v1.4), same artwork as the store icon. It carries its
              own dark background, so a plain <img> works in both themes.
              Source: rally_hud/design/app_icon/master_1024.svg.
            */}
            <img
              src="/logo.svg"
              alt={`${name} logo`}
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-condensed font-bold text-lg md:text-xl">
              {name}
            </span>
          </a>
        </div>

        <div className="navbar-end lg:hidden">
          {langLink}
          {showThemeSwitch && <ThemeSwitcher />}
          <button
            type="button"
            onClick={() => setIsMobileNavVisible((v) => !v)}
            aria-expanded={isMobileNavVisible}
            aria-controls="mobile-menu"
            aria-label={isMobileNavVisible ? ui.closeMenu : ui.openMenu}
            className="btn btn-ghost btn-sm px-2"
          >
            <MenuToggle isOpen={isMobileNavVisible} />
          </button>
        </div>

        <div className="navbar-end hidden font-semibold lg:flex">
          <ul className="flex gap-5 px-1 items-center list-none m-0">
            {langLink}
          {showThemeSwitch && <ThemeSwitcher />}
            {topNavbar.links.map(({ title, href }) => (
              <li key={href} className="m-0">
                <a
                  className="text-sm whitespace-nowrap link link-hover"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          {topNavbar.cta && (
            <a
              href="/app"
              className="ml-4 btn btn-primary btn-outline py-4 font-condensed"
            >
              {topNavbar.cta}
            </a>
          )}
        </div>
      </div>

      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute bg-base-200 left-4 right-4 top-full mt-2 shadow-lg rounded-2xl border border-base-300 px-4 py-3 flex flex-col gap-2 lg:hidden"
        isVisible={isMobileNavVisible}
      >
        <div id="mobile-menu">
        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {topNavbar.links.map(({ title, href }) => (
            <li key={href} className="m-0 w-full">
              <a
                className="btn btn-ghost w-full justify-start"
                href={href}
                onClick={() => setIsMobileNavVisible(false)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <ul className="menu menu-horizontal justify-center py-0 px-1 list-none">
          {googlePlayLink && (
            <li className="mb-2">
              <a href={googlePlayLink} target="_blank" rel="noopener">
                <img
                  className="h-12"
                  src="/stores/google-play.svg"
                  alt={ui.googlePlayBadge}
                />
              </a>
            </li>
          )}
          {appStoreLink && (
            <li className="mb-2">
              <a href={appStoreLink} target="_blank" rel="noopener">
                <img
                  className="h-12"
                  src="/stores/app-store.svg"
                  alt={ui.appStoreBadge}
                />
              </a>
            </li>
          )}
        </ul>
        </div>
      </AnimatedList>
    </nav>
  );
}

export default Navbar;