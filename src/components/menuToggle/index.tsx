import { motion, type SVGMotionProps } from "framer-motion";

interface Props {
  isOpen: boolean;
}

/**
 * Icono del menú hamburguesa.
 *
 * Antes este componente renderizaba su propio `<button>`. Al añadirle
 * `aria-expanded` al navbar, quedó envuelto en OTRO `<button>`, lo que es HTML
 * inválido (`<button>` dentro de `<button>`). React lanzaba en hidratación y la
 * isla entera pasaba a client-rendering, rompiendo cualquier `useEffect`.
 *
 * Ahora solo pinta el icono. Quien lo usa aporta el `<button>` real, que es
 * donde deben vivir `aria-expanded`, `aria-controls` y `aria-label`.
 */
const Path = (props: SVGMotionProps<SVGElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ isOpen }: Props) => (
  <motion.svg
    initial={false}
    animate={isOpen ? "open" : "closed"}
    className="text-base-content"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    aria-hidden="true"
    focusable="false"
  >
    <Path
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open: { d: "M 3 16.5 L 17 2.5" },
      }}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.2 }}
    />
    <Path
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        open: { d: "M 3 2.5 L 17 16.346" },
      }}
    />
  </motion.svg>
);

export default MenuToggle;