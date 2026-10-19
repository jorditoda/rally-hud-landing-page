import {Icon} from "../../../../components/icons";
import AnimatedText from "../../../../components/animatedText";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * Technical proof block — ROADMAP.md E2.9
 *
 * The original intention was "social proof", but the stores have **0
 * ratings** and no installation data, so any user number would be invented.
 * The honest version is verifiable product facts.
 *
 * That's why the hero no longer shows the five stock avatars: with 0
 * registered users, five faces next to "Join early adopters" still imply
 * people using the app.
 *
 * The four blocks use the semantic color that corresponds to them
 * (Sistema-Base: "color only when it means something"): `info` for what is
 * status, `success` for what is confirmed capability.
 */
function Proof() {
  const {
    home: { proof },
  } = useContext(ConfigContext)!;
  if (!proof) return null;

    // Each block with its color, according to its role.
  const tone = [
    "text-info",
    "text-primary",
    "text-success",
    "text-warning",
  ] as const;

  return (
    <section id={proof.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={proof.title} />
        </h2>
        {proof.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {proof.subtitle}
          </motion.p>
        )}
      </div>

      <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {proof.items.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06 }}
            className="flex flex-col items-start gap-2 border-t-2 pt-4"
              // daisyUI v4 emits tokens in OKLCH (`--in: 74% .15 297`), not in
              // HSL channels: using hsl() here would make the rules invalid
              // and the rule would end up in the default text color.
            style={{ borderColor: `oklch(var(--${["in", "p", "su", "wa"][index]}))` }}
          >
            <Icon name={item.icon} className={`w-6 h-6 ${tone[index]}`} />
            <h3 className="font-condensed font-bold text-lg m-0">{item.title}</h3>
            <p className="m-0 opacity-70 text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default Proof;