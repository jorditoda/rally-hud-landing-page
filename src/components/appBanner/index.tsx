import {useContext} from "react";
import {ConfigContext} from "../../utils/configContext";
import IphoneFrame from "../../components/iphoneFrame";
import {motion} from "framer-motion";

/**
 * Download banner.
 *
 * Before it was a solid `bg-primary text-primary-content` block with a "Spill"
 * SVG on top, a cyan→violet gradient that the design system does not allow:
 * "a single accent for what gets touched and color only when it means something"
 * (Sistema-Base). A decorative stain of that size means nothing.
 *
 * Now it is a system surface (s1 with ln border, radius 16) and cyan is
 * reserved for what is actionable, as the system mandates.
 */
function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } = useContext(ConfigContext)!;

  if (!appBanner) return null;
  return (
    <section
      id={appBanner.id}
      className="relative max-w-screen-lg mx-auto px-4 -mb-6 z-10 md:-mb-10 lg:-mb-14"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.25 }}
        className="surface-card bg-base-200 p-6 md:p-10 flex flex-col items-center gap-8 md:flex-row"
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left w-full">
          <motion.h2
            initial={{ opacity: 0, y: "-100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl"
          >
            {appBanner.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="whitespace-pre-wrap text-left m-0 max-w-md opacity-70 md:text-lg"
          >
            {appBanner.subtitle}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="list-none flex gap-4 my-6 p-0"
          >
            {googlePlayLink && (
              <li className="m-0 p-0">
                <a href={googlePlayLink} target="_blank" rel="noopener">
                  <img
                    className="h-14"
                    alt="Get it on Google Play"
                    src="/stores/google-play.svg"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            )}
            {appStoreLink && (
              <li className="m-0 p-0">
                <a href={appStoreLink} target="_blank" rel="noopener">
                  <img
                    className="h-14"
                    alt="Download on the App Store"
                    src="/stores/app-store.svg"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            )}
          </motion.ul>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex-1 flex justify-center w-full"
        >
          {appBanner.screenshots.map((src, index) => (
            <motion.div
              key={src}
              variants={{
                hidden: { scale: 0.94, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                mass: 0.5,
                delay: 0.3 + index * 0.08,
              }}
              className={
                index === 0
                  ? "relative z-20 h-[24rem]"
                  : "absolute origin-bottom hidden h-[24rem] xl:block " +
                    (index === 1
                      ? "left-0 -rotate-[30deg] z-10"
                      : "right-0 rotate-[30deg]")
              }
            >
              <IphoneFrame src={src} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AppBanner;