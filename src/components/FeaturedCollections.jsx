import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const FALLBACK_COLLECTIONS = [
  {
    id: 1,
    name: "קולקציית קיץ 2026",
    description: "עיצובים חדשים בהשראת החופים היפים ביותר בים התיכון",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 2,
    name: "מהדורה מוגבלת",
    description: "פריטים בלעדיים במהדורה מוגבלת, בהשראת שקיעות הריביירה",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export function FeaturedCollections({ onNavigate, collections = [] }) {
  const items = collections.length > 0 ? collections : FALLBACK_COLLECTIONS;

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-3">
          נבחר עבורך
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900">
          הקולקציות שלנו
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {items.map((collection, index) => (
          <motion.div
            key={collection.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className="group relative overflow-hidden cursor-pointer aspect-[4/5] lg:aspect-[3/4]"
            onClick={() => onNavigate("catalog")}
          >
            <img
              src={collection.image_path || collection.image}
              alt={collection.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent transition-opacity group-hover:from-navy-900/80" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <span className="text-[9px] font-body font-medium tracking-mega-wide uppercase text-sand-200 block mb-2">
                {index === 0 ? "עונה חדשה" : "בלעדי"}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
                {collection.name}
              </h3>
              <p className="font-body text-sm text-white/70 font-light mb-6 max-w-sm">
                {collection.description}
              </p>
              <div className="inline-flex items-center gap-2 text-white text-[10px] font-body font-medium tracking-ultra-wide uppercase group-hover:gap-3 transition-all">
                <span>לגילוי</span>
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
