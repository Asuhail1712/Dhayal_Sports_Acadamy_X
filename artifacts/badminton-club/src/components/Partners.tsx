import React from 'react';
import { motion } from 'framer-motion';

const brandLogos = [
  {
    name: 'Yonex',
    domain: 'yonex.com',
  },
  {
    name: 'Li-Ning',
    domain: 'lining.com',
  },
  {
    name: 'Victor',
    domain: 'victorsport.com',
  },
  {
    name: 'Ashaway',
    domain: 'ashawayusa.com',
  },
];

const institutionalPartners = [
  'AJ Stadium',
  'Youth Sports Hub',
  'Campus League',
  'Nutrition Lab',
];

const highlights = [
  {
    eyebrow: 'School Partners',
    title: 'Institutional collaborations for school badminton growth',
    description:
      'Showcase partner schools, training hubs, and youth development collaborations in a more executive visual format.',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200&q=85',
    accent: 'from-primary/50 via-primary/12 to-transparent',
  },
  {
    eyebrow: 'Brand Partners',
    title: 'Equipment, performance, and activation partners',
    description:
      'Present sports brands, nutrition partners, and event collaborators with a layout that feels closer to a sponsorship deck.',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=85',
    accent: 'from-secondary/45 via-secondary/10 to-transparent',
  },
];

function BrandLogoTile({
  item,
  index,
}: {
  item: (typeof brandLogos)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex min-h-[88px] items-center justify-center px-6 py-5 text-center transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={`https://logo.clearbit.com/${item.domain}`}
          alt={item.name}
          className="h-10 w-auto max-w-[140px] object-contain brightness-110 contrast-125 saturate-0 invert transition-all duration-300 group-hover:scale-[1.04] group-hover:saturate-100 group-hover:invert-0"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="text-[0.72rem] uppercase tracking-[0.28em] text-white/34 transition-colors duration-300 group-hover:text-primary/70">
          {item.name}
        </div>
      </div>
    </motion.div>
  );
}

function InstitutionChip({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/72 backdrop-blur-xl transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.05] hover:text-white"
    >
      {name}
    </motion.div>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof highlights)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-card"
    >
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
      </div>

      <div className="relative flex min-h-[360px] flex-col justify-end p-6 md:min-h-[420px] md:p-8">
        <div className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-primary/30 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary">
            {item.eyebrow}
          </span>
        </div>
        <h3 className="max-w-md text-2xl md:text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-white/68">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Partners() {
  return (
    <section id="partners" className="relative z-10 overflow-hidden border-t border-white/5 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-20 h-44 w-44 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-[10%] bottom-10 h-56 w-56 rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary/85">
            Our Partners
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-black leading-tight text-white">
            Built for <span className="text-gradient">schools and brands</span>
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-white/60">
            A cleaner partner section to present institutional collaborations, sponsor brands, and ecosystem support in a more premium way.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {highlights.map((item, index) => (
            <HighlightCard key={item.eyebrow} item={item} index={index} />
          ))}
        </div>

        <div className="mt-8 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5 backdrop-blur-xl md:mt-10 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-white/30">
                Partner Wall
              </div>
              <h3 className="mt-1 text-xl md:text-2xl font-black text-white">
                Selected schools and brands
              </h3>
            </div>
            <div className="max-w-sm text-sm leading-relaxed text-white/42 md:text-right">
              Real brand marks below, with a lighter institutional strip and no boxed listing feel.
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.015] px-4 py-4 md:px-6 md:py-5">
            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 xl:grid-cols-4">
              {brandLogos.map((logo, index) => (
                <BrandLogoTile key={logo.name} item={logo} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/8 pt-6">
            {institutionalPartners.map((partner, index) => (
              <InstitutionChip key={partner} name={partner} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
