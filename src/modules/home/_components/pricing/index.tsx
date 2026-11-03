import AnimatedText from "../../../../components/animatedText";
import {Icon} from "../../../../components/icons";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * Pricing block: Free vs Pro (v1.4, Rally HUD Pro).
 *
 * Until v1.3 the app was free with no plans, so this block was three "free"
 * guarantees (`promises`, still supported). With the Pro subscription it shows
 * two cards from `pricing.plans`. Prices and trial must match the stores
 * (rally_hud docs/PRO_CONFIG_TIENDAS.md).
 */
function Pricing() {
  const {
    home: { pricing },
    googlePlayLink,
    appStoreLink,
    ui,
  } = useContext(ConfigContext)!;
  if (!pricing) return null;

  return (
    <section
      id={pricing.id}
      className="section-y max-w-screen-lg mx-auto px-4"
    >
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={pricing.title} />
        </h2>
        {pricing.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {pricing.subtitle}
          </motion.p>
        )}
      </div>

      {pricing.plans && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className={`surface-card bg-base-200 p-6 md:p-8 flex flex-col relative ${
                plan.highlight ? "!border-2 !border-primary" : ""
              }`}
            >
              {plan.badge && (
                <span className="badge badge-primary absolute top-4 right-4 font-semibold">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-condensed font-bold text-2xl m-0 mb-2">
                {plan.name}
              </h3>
              <p className="m-0 mb-6">
                <span className="font-condensed font-bold text-4xl">
                  {plan.price}
                </span>
                {plan.priceNote && (
                  <span className="opacity-70 ml-2">{plan.priceNote}</span>
                )}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-start gap-3 leading-snug ${
                      feature.included ? "" : "opacity-50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-bold ${
                        feature.included ? "text-primary" : ""
                      }`}
                    >
                      {feature.included ? "✓" : "—"}
                    </span>
                    <span>
                      {feature.included ? "" : <span className="sr-only">{ui.notIncluded} </span>}
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}

      {pricing.footnote && (
        <p className="text-sm opacity-60 text-center max-w-2xl mx-auto mt-6 mb-0">
          {pricing.footnote}
        </p>
      )}

      {pricing.promises && (
      <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {pricing.promises?.map((promise, index) => (
          <motion.li
            key={promise.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08 }}
            className="surface-card bg-base-200 p-6 flex flex-col items-center text-center"
          >
            <Icon name={promise.icon} className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-condensed font-bold text-xl m-0 mb-1">
              {promise.title}
            </h3>
            <p className="m-0 opacity-70 leading-relaxed">{promise.subtitle}</p>
          </motion.li>
        ))}
      </ul>
      )}

      {pricing.actionText && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {googlePlayLink && (
              <a href={googlePlayLink} target="_blank" rel="noopener">
                <img
                  className="h-14"
                  alt={ui.googlePlayBadge}
                  src="/stores/google-play.svg"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            )}
            {appStoreLink && (
              <a href={appStoreLink} target="_blank" rel="noopener">
                <img
                  className="h-14"
                  alt={ui.appStoreBadge}
                  src="/stores/app-store.svg"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default Pricing;