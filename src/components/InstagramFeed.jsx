import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { instagramImages } from "../data/products";

export function InstagramFeed() {
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
          Follow Our Journey
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 lg:grid-cols-6">
        {instagramImages.map((img, index) => (
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
              src={img}
              alt="SI MARES on Instagram"
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
