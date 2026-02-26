import { motion } from "motion/react";
import { Instagram } from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1727640297123-985cd2f7d9f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
];

export function InstagramFeed({ images = [] }) {
  const displayImages = images.length > 0 ? images : FALLBACK_IMAGES;

  return (
    <section className="py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-4"
      >
        <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-3">
          @simares
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-navy-900">
          עקבו אחרינו
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 lg:grid-cols-6">
        {displayImages.map((img, index) => (
          <motion.a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={typeof img === "string" ? img : img.url || img.image || ""}
              alt="SI MARES באינסטגרם"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-300 flex items-center justify-center">
              <Instagram
                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                strokeWidth={1.5}
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
