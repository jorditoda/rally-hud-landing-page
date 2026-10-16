import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import AnimatedText from "../../../../components/animatedText";
import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * Testimonios — ROADMAP.md E2.7
 *
 * Antes: tarjetas `bg-primary` azul saturado con estrellas en
 * `bg-primary-content` (negro sobre azul, contraste roto), altura fija
 * `!h-[22rem]` que dejaba huecos con los textos cortos, texto en español en un
 * sitio en inglés y sin avatar ni rol, que es justo lo que da credibilidad.
 *
 * Decisión del usuario: son **beta testers**, y se etiquetan como tales. No se
 * presentan como reseñas de clientes porque en las stores no hay ninguna.
 *
 * El autoplay lleva un control de pausa porque el movimiento automático de más
 * de 5 s incumple WCAG 2.2.2. Se pausa con la API real de Swiper
 * (`autoplay.pause()` / `.resume()`), no tocando el CSS: modificar la
 * transición del wrapper no detiene el temporizador.
 */
function Testimonials() {
  const {
    home: { testimonials },
  } = useContext(ConfigContext)!;
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!testimonials) return null;

  const toggle = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (swiper.autoplay?.running) {
      swiper.autoplay.pause();
      setIsPlaying(false);
    } else {
      swiper.autoplay?.resume();
      setIsPlaying(true);
    }
  };

  return (
    <section id={testimonials.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={testimonials.title} />
        </h2>
        {testimonials.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {testimonials.subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(s) => (swiperRef.current = s)}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          spaceBetween={24}
          grabCursor
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous testimonial",
            nextSlideMessage: "Next testimonial",
            paginationBulletMessage: "Go to testimonial {{index}}",
            slideLabelMessage: "{{index}} of {{slidesLength}}",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          slidesPerView={1}
          className="pb-2"
        >
          {testimonials.cards.map(({ name, role, comment }) => (
            <SwiperSlide key={name} className="h-auto">
              <figure className="surface-card bg-base-200 m-0 p-6 h-full flex flex-col">
                <div
                  className="flex mb-3 gap-0.5"
                  role="img"
                  aria-label="5 out of 5"
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className="h-4 w-4 mask mask-star-2 bg-accent"
                      />
                    ))}
                </div>
                <blockquote className="m-0 mb-4 opacity-80 leading-relaxed flex-1">
                  {comment}
                </blockquote>
                <figcaption className="mt-auto">
                  <span className="block font-semibold">{name}</span>
                  {role && (
                    <span className="block text-sm opacity-60">{role}</span>
                  )}
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={!isPlaying}
          className="btn btn-ghost btn-sm mt-4"
        >
          {isPlaying ? "Pause" : "Play"}
          <span className="sr-only"> the testimonials carousel</span>
        </button>
      </motion.div>
    </section>
  );
}

export default Testimonials;