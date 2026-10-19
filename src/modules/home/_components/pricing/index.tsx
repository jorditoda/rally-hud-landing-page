import AnimatedText from "../../../../components/animatedText";
import {Icon} from "../../../../components/icons";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * "Free forever" block — ROADMAP.md E2.6
 *
 * Before it was a price table with a single "Free Plan": an orphan card 1/3
 * wide lost in a sea of white, with an infinite `animate-ping` on each bullet
 * and a 3D wallet from the template.
 *
 * The real price is 0 on both stores (verified against the iTunes API and the
 * Google Play listing), so a comparison table says nothing the title doesn't
 * already say. Now it is the three guarantees that make "free" mean something,
 * which is the real sales pitch.
 *
 * This also fixes the E9.0 bug: `planImages` and `planBGs` were hardcoded
 * outside the config, so adding a fourth plan broke.
 */
function Pricing() {
  const {
    home: { pricing },
    googlePlayLink,
    appStoreLink,
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
                  alt="Get it on Google Play"
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
                  alt="Download on the App Store"
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