import AnimatedText from "../../../../components/animatedText";
import { Icon } from "../../../../components/icons";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * Bloque "Free forever" — ROADMAP.md E2.6
 *
 * Antes era una tabla de precios con un unico plan "Free Plan": una tarjeta
 * huerfana de 1/3 de ancho perdida en un mar de blanco, con un `animate-ping`
 * infinito en cada bullet y un monedero 3D de la plantilla.
 *
 * El precio real es 0 en las dos stores (verificado contra la API de iTunes y
 * la ficha de Google Play), asi que una tabla de comparativa no dice nada que
 * el titulo no diga ya. Ahora son las tres garantias que hacen que "gratis"
 * signifique algo, que es el argumento de venta real.
 *
 * De paso desaparece el bug de E9.0: `planImages` y `planBGs` estaban
 * hardcodeados fuera de la config, asi que anadir un cuarto plan rompia.
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