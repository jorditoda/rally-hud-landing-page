import type {MotionValue} from "framer-motion";
import {motion, transform, useTransform} from "framer-motion";

interface Props {
  index: number;
  totalCount: number;
  scrollYProgress: MotionValue<number>;
  src: string;
}

/**
 * Screenshot inside the hero mobile mockup.
 *
 * The slot is vertical (292x632). With `object-fit: fill` a landscape
 * screenshot deformed, so `cover` is used: it crops the excess instead of
 * stretching. Combined with the config.ts note that only vertical screens
 * should go here.
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