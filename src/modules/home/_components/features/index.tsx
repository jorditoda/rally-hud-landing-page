import AnimatedText from "../../../../components/animatedText";
import {Icon} from "../../../../components/icons";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

function Features() {
  const {
    home: { features },
  } = useContext(ConfigContext)!;
  if (!features) return null;

  return (
    <section id={features.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={features.title} />
        </h2>
        {features.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {features.subtitle}
          </motion.p>
        )}
      </div>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 list-none p-0 m-0"
      >
        {features.cards.map((feat, index) => (
          <motion.li
            key={feat.title}
            variants={{
              hidden: { y: 24, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ delay: (index % 2) * 0.08 }}
            className="surface-card bg-base-200 card p-6 flex gap-4 items-start"
          >
              {/* 24px icon with 2px stroke, per the design system. */}
            <Icon
              name={feat.icon}
              className="w-6 h-6 shrink-0 text-primary mt-0.5"
            />
            <div className="min-w-0">
              <h3 className="card-title text-xl font-condensed font-bold m-0 p-0">
                {feat.title}
              </h3>
              <p className="opacity-70 my-2 leading-relaxed">{feat.subtitle}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default Features;