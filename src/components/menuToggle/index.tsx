import {motion, type SVGMotionProps} from "framer-motion";

interface Props {
  isOpen: boolean;
}

/**
 * Hamburger menu icon.
 *
 * Before, this component rendered its own `<button>`. When `aria-expanded` was
 * added to the navbar, it ended up wrapped in ANOTHER `<button>`, which is
 * invalid HTML (`<button>` inside `<button>`). React threw during hydration
 * and the entire island switched to client-rendering, breaking any `useEffect`.
 *
 * Now it only draws the icon. The consumer provides the real `<button>`, which
 * is where `aria-expanded`, `aria-controls` and `aria-label` should live.
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