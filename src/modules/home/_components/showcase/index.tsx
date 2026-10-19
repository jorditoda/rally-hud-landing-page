import AnimatedText from "../../../../components/animatedText";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * Annotated screenshots block — ROADMAP.md E2.8
 *
 * The biggest untapped conversion lever left in an app landing: showing the
 * real product instead of a generic mockup. Screenshots are rendered from the
 * design boards with `scripts/render-boards.py`.
 *
 * Mixes formats on purpose: the landscape HUD (844x390) is what the driver
 * sees and the portrait app (390x844) is what they see when preparing the
 * start. The `md:grid-cols-2` grid normalizes them; inside each card the
 * image uses `object-contain` to avoid cropping the HUD.
 */
function Showcase() {
  const {
    home: { showcase },
  } = useContext(ConfigContext)!;
  if (!showcase) return null;

  return (
    <section id={showcase.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={showcase.title} />
        </h2>
        {showcase.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {showcase.subtitle}
          </motion.p>
        )}
      </div>

      <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {showcase.items.map((item, index) => (
          <motion.li
            key={item.image + index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (index % 2) * 0.08 }}
            className="surface-card bg-base-200 card overflow-hidden p-0 m-0"
          >
            <figure className="m-0">
              <div className="aspect-[16/10] bg-base-300/40 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.caption} — Rally Hud`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-condensed font-bold text-lg m-0 mb-1">
                  {item.caption}
                </h3>
                <p className="m-0 opacity-70 text-sm leading-relaxed">
                  {item.note}
                </p>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default Showcase;