import AnimatedText from "../../../../components/animatedText";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * "How it works" — ROADMAP.md E2.4
 *
 * Before it used iOS stock photos (a woman knitting, another looking at a
 * plant). Now it uses real product screenshots, rendered from the design
 * boards with `scripts/render-boards.py`.
 *
 * Layout: alternates image/text as before, but the vertical rhythm is
 * controlled with `gap-*` instead of the `gap-52` that left 13rem blocks of
 * empty space, and there are no more decorative arrows: the 01/02/03 numbering
 * in condensed type guides the reading on its own.
 *
 * The screenshots mix formats (844x390 landscape and 390x844 portrait), so
 * `aspect-[16/10]` with `object-contain` normalizes them without cropping.
 */
function HowItWorks() {
  const {
    home: { howItWorks },
  } = useContext(ConfigContext)!;

  if (!howItWorks) return null;

  return (
    <section id={howItWorks.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={howItWorks.title} />
        </h2>
        {howItWorks.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {howItWorks.subtitle}
          </motion.p>
        )}
      </div>

      <ol className="list-none p-0 m-0 flex flex-col gap-12 md:gap-16">
        {howItWorks.steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12"
          >
            <motion.div
              variants={{
                hidden: { x: index % 2 === 0 ? "-40px" : "40px", opacity: 0 },
                visible: { x: "0px", opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 120, mass: 0.6 }}
              className="flex-1 order-2 md:order-1 text-center md:text-left"
            >
              <div className="font-condensed font-bold text-6xl text-primary leading-none tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 mb-2 text-2xl font-condensed font-bold">
                {step.title}
              </h3>
              <p className="opacity-70 max-w-md mx-auto md:mx-0 leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>

            <motion.figure
              variants={{
                hidden: { x: index % 2 === 0 ? "40px" : "-40px", opacity: 0 },
                visible: { x: "0px", opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 120, mass: 0.6 }}
              className="flex-1 order-1 md:order-2 m-0"
            >
              <div className="surface-card bg-base-200 aspect-[16/10] overflow-hidden flex items-center justify-center">
                <img
                  src={step.image}
                  alt={`${step.title} — Rally Hud`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.figure>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;