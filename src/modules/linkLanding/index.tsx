import {useContext, useState} from "react";
import {ConfigContext} from "../../utils/configContext";

/**
 * Landing for the links the app shares (ROADMAP P7.7 and "Compartir mi
 * posición"):
 *   · /s/{code}       → invite to a private segment
 *   · /r/{segmentId}  → shared ranking position
 *   · /seg/{segmentId} → shared public segment
 *
 * GitHub Pages has no rewrites, so these paths are served by 404.html, which
 * detects them and renders this component instead of the "not found" page.
 * With the app installed, the OS opens the app before reaching this page
 * (universal links / app links, see public/.well-known).
 */

/** Same alphabet and length as functions/src/lib/segmentSharing.ts. */
const CODE_RE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/;

export type SharedLink =
  | { kind: "invite"; code: string }
  | { kind: "ranking"; segmentId: string }
  | { kind: "segment"; segmentId: string };

/** Paths the app shares; keep in sync with pages/404.astro and notFound. */
export const SHARED_LINK_RE = /^\/(?:es\/)?(s|r|seg)\/([^/?#]+)\/?$/;

/** Reads /s/{code}, /r/{id} or /seg/{id} (optionally under /es/). Null otherwise. */
export function parseSharedLink(pathname: string): SharedLink | null {
  const m = pathname.match(SHARED_LINK_RE);
  if (!m) return null;
  let value: string;
  try {
    value = decodeURIComponent(m[2]).trim();
  } catch {
    return null;
  }
  if (!value) return null;
  if (m[1] === "s") return { kind: "invite", code: value.toUpperCase() };
  if (m[1] === "seg") return { kind: "segment", segmentId: value };
  return { kind: "ranking", segmentId: value };
}

function StoreBadges() {
  const { googlePlayLink, appStoreLink, ui } = useContext(ConfigContext)!;
  return (
    <div className="flex flex-wrap gap-4">
      {appStoreLink && (
        <a href={appStoreLink} target="_blank" rel="noopener">
          <img className="h-12" src="/stores/app-store.svg" alt={ui.appStoreBadge} />
        </a>
      )}
      {googlePlayLink && (
        <a href={googlePlayLink} target="_blank" rel="noopener">
          <img className="h-12" src="/stores/google-play.svg" alt={ui.googlePlayBadge} />
        </a>
      )}
    </div>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="list-decimal m-0 mb-8 pl-5 flex flex-col gap-2 opacity-80 leading-relaxed">
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  );
}

function LinkLanding({ link }: { link: SharedLink }) {
  const { ui } = useContext(ConfigContext)!;
  const t = ui.links;
  const [copied, setCopied] = useState(false);

  if (link.kind === "ranking" || link.kind === "segment") {
    const segment = link.kind === "segment";
    return (
      <section className="section-y max-w-screen-sm mx-auto px-4 w-full">
        <img src="/logo.svg" alt="" aria-hidden="true" className="h-14 w-14 mb-6" />
        <h1 className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl">
          {segment ? t.segmentTitle : t.rankingTitle}
        </h1>
        <p className="opacity-70 mb-6">{segment ? t.segmentIntro : t.rankingIntro}</p>
        <Steps steps={segment ? t.segmentSteps : t.rankingSteps} />
        <StoreBadges />
      </section>
    );
  }

  const code = link.code;
  const valid = CODE_RE.test(code);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the code is visible and selectable anyway.
    }
  }

  return (
    <section className="section-y max-w-screen-sm mx-auto px-4 w-full">
      <img src="/logo.svg" alt="" aria-hidden="true" className="h-14 w-14 mb-6" />
      <h1 className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl">
        {t.inviteTitle}
      </h1>
      <p className="opacity-70 mb-6">{t.inviteIntro}</p>

      {valid ? (
        <div className="surface-card bg-base-200 p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="m-0 text-sm opacity-60">{t.codeLabel}</p>
            <p className="m-0 font-condensed font-bold text-4xl tracking-[0.2em] tabular-nums select-all">
              {code}
            </p>
          </div>
          <button type="button" onClick={copy} className="btn btn-primary px-6">
            <span aria-live="polite">{copied ? t.copied : t.copy}</span>
          </button>
        </div>
      ) : (
        <p className="surface-card bg-base-200 p-6 mb-8">{t.inviteInvalid}</p>
      )}

      <Steps steps={t.inviteSteps} />
      <StoreBadges />
    </section>
  );
}

export default LinkLanding;
