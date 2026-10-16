import { motion, transform, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface Props {
  index: number;
  totalCount: number;
  scrollYProgress: MotionValue<number>;
  src: string;
}

/**
 * Captura dentro del mockup de movil del hero.
 *
 * El hueco es vertical (292x632). Con `object-fit: fill` una captura apaisada
 * se deformaba, asi que se usa `cover`: recorta lo que sobra en vez de
 * estirar. Se combina con el aviso de config.ts de que aqui solo deben ir
 * pantallas verticales.
 */
function SingleScreenshot({ scrollYProgress, index, totalCount, src }: Props) {
  const x = useTransform(scrollYProgress, (y) => {
    if (index > 0 && index % 2 === 0) {
      const i = totalCount - index;
      const transformer = transform(
        [(i - 1) / totalCount, i / totalCount],
        [0, 1]
      );
      return -transformer(y) * 100 + "%";
    }
    return 0;
  });
  const y = useTransform(scrollYProgress, (y) => {
    if (index % 2 === 1) {
      const i = totalCount - index;
      const transformer = transform(
        [(i - 1) / totalCount, i / totalCount],
        [0, 1]
      );
      return -transformer(y) * 100 + "%";
    }
    return 0;
  });
  return (
    <motion.img
      src={src}
      alt="Rally Hud app screen"
      style={{ translateX: x, translateY: y }}
      className="absolute overflow-hidden w-full h-full object-cover"
    />
  );
}

export default SingleScreenshot;