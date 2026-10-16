import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import InstagramLogo from "./svgs/instagram";
import FacebookLogo from "./svgs/facebook";
import TwitterLogo from "./svgs/twitter";
import { motion } from "framer-motion";

/**
 * Footer.
 *
 * Antes: `text-primary` en los enlaces y el copyright. Con la paleta anterior
 * (primary azul saturado) ya era mucho; con el cian del sistema es peor, porque
 * el cian esta reservado a lo que se toca ("El cian es lo que se toca",
 * Sistema-Base). Aqui ahora el texto va en base-content y el cian solo aparece
 * al pasar por encima o al enfocar.
 */
function Footer() {
  const {
    footer: { links, legalLinks, socials },
  } = useContext(ConfigContext)!;

  return (
    <footer className="relative border-t border-base-300 bg-base-100 px-4 pt-12 pb-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-screen-lg mx-auto"
      >
        <nav aria-label="Footer">
          <ul className="flex flex-col items-start gap-3 list-none p-0 m-0">
            {links.map(({ title, href }, index) => (
              <motion.li
                key={href}
                className="m-0"
                variants={{
                  hidden: { opacity: 0, x: "-40px" },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: index * 0.06 }}
              >
                <a
                  className="text-xl font-condensed font-bold block uppercase whitespace-nowrap no-underline hover:text-primary focus-visible:text-primary transition-colors md:text-3xl"
                  href={href}
                >
                  {title}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center justify-between gap-6 mt-10 w-full md:flex-row">
          <div className="flex items-center gap-3 w-full md:justify-center">
            {socials?.facebook && (
              <motion.a
                variants={{
                  hidden: { opacity: 0, x: "-40px" },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.2 }}
                className="w-8 h-8 hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noopener"
                href={socials.facebook}
              >
                <FacebookLogo />
                <span className="sr-only">Facebook</span>
              </motion.a>
            )}
            {socials?.instagram && (
              <motion.a
                variants={{
                  hidden: { opacity: 0, x: "-40px" },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.28 }}
                className="w-8 h-8 hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noopener"
                href={socials.instagram}
              >
                <InstagramLogo />
                <span className="sr-only">Instagram</span>
              </motion.a>
            )}
            {socials?.twitter && (
              <motion.a
                variants={{
                  hidden: { opacity: 0, x: "-40px" },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.36 }}
                className="w-8 h-8 hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noopener"
                href={socials.twitter}
              >
                <TwitterLogo />
                <span className="sr-only">Twitter</span>
              </motion.a>
            )}
          </div>

          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 md:mt-0 list-none p-0 m-0">
            {legalLinks.termsAndConditions && (
              <li className="m-0" key="terms">
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.94 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ delay: 0.2 }}
                  className="font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-colors lg:whitespace-nowrap"
                  href="/terms-and-conditions"
                >
                  Terms &amp; conditions
                </motion.a>
              </li>
            )}
            {legalLinks.privacyPolicy && (
              <li className="m-0" key="privacy">
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.94 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ delay: 0.28 }}
                  className="font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-colors lg:whitespace-nowrap"
                  href="/privacy-policy"
                >
                  Privacy policy
                </motion.a>
              </li>
            )}
            {legalLinks.cookiesPolicy && (
              <li className="m-0" key="cookies">
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.94 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ delay: 0.36 }}
                  className="font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-colors lg:whitespace-nowrap"
                  href="/cookies-policy"
                >
                  Cookies policy
                </motion.a>
              </li>
            )}
          </ul>

          <motion.p
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ delay: 0.44 }}
            className="mt-0 md:ml-4 md:whitespace-nowrap opacity-70"
          >
            All rights reserved © {new Date().getFullYear()}
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;