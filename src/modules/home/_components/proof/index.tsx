import { Icon } from "../../../../components/icons";
import AnimatedText from "../../../../components/animatedText";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * Bloque de prueba tecnica — ROADMAP.md E2.9
 *
 * La intencion original era "prueba social", pero en las stores hay **0
 * ratings** y ningun dato de instalaciones, asi que cualquier cifra de usuarios
 * seria inventada. La version honesta son hechos verificables del producto.
 *
 * Por eso el hero ya no muestra los cinco avatares de stock: con 0 usuarios
 * registrados, cinco caras al lado de "Join early adopters" siguen insinuando
 * gente que usa la app.
 *
 * Los cuatro bloques usan el color semantico que les corresponde (Sistema-Base:
 * "color únicamente cuando significa algo"): `info` para lo que es estado,
 * `success` para lo que es capacidad confirmada.
 */
function Proof() {
  const {
    home: { proof },
  } = useContext(ConfigContext)!;
  if (!proof) return null;

  // Cada bloque con su color, segun el papel que cumple.
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
            // daisyUI v4 emite los tokens en OKLCH (`--in: 74% .15 297`), no en
            // canales HSL: usar hsl() aqui los haria invalidos y la regla
            // saldria en el color de texto por defecto.
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