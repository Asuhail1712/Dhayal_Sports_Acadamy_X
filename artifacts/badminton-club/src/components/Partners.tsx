import React from 'react';
import { motion } from 'framer-motion';

const logoBrands = [
  { name: 'Yonex', domain: 'yonex.com' },
  { name: 'Victor', domain: 'victorsport.com' },
  { name: 'Li-Ning', domain: 'lining.com' },
  { name: 'Ashaway', domain: 'ashawayusa.com' },
  { name: 'Babolat', domain: 'babolat.com' },
  { name: 'Wilson', domain: 'wilson.com' },
  { name: 'Head', domain: 'head.com' },
  { name: 'Adidas', domain: 'adidas.com' },
];

const highlights = [
  {
    eyebrow: 'School Partners',
    title: 'Institutional collaborations for school badminton growth',
    description:
      'Showcase partner schools, training hubs, and youth development collaborations in a more executive visual format.',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600&q=85',
    accent: 'from-primary/50 via-primary/12 to-transparent',
  },
  {
    eyebrow: 'Brand Partners',
    title: 'Equipment, performance, and activation partners',
    description:
      'Present sports brands, nutrition partners, and event collaborators with a layout that feels closer to a sponsorship deck.',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=85',
    accent: 'from-secondary/45 via-secondary/10 to-transparent',
  },
];

function PartnerLogo({
  item,
  priority = false,
}: {
  item: (typeof logoBrands)[number];
  priority?: boolean;
}) {
  const [logoSrc, setLogoSrc] = React.useState(
    `https://logo.clearbit.com/${item.domain}?size=256`
  );
  const [showWordmark, setShowWordmark] = React.useState(false);

  const handleLogoError = () => {
    if (logoSrc.includes('clearbit')) {
      setLogoSrc(
        `https://www.google.com/s2/favicons?sz=256&domain=${item.domain}`
      );
      return;
    }

    setShowWordmark(true);
  };

  return (
    <div className="group flex min-w-[220px] items-center justify-center rounded-[1.5rem] border border-white/8 bg-white/[0.02] px-8 py-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.045]">
      {showWordmark ? (
        <div className="text-center">
          <div className="text-[1.7rem] font-black tracking-[-0.06em] text-white/92 transition-transform duration-300 group-hover:scale-[1.03]">
            {item.name}
          </div>
        </div>
      ) : (
        <img
          src={logoSrc}
          alt={item.name}
          className="h-14 w-auto max-w-[160px] object-contain brightness-125 contrast-125 saturate-0 invert transition-all duration-300 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100 group-hover:invert-0"
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={handleLogoError}
        />
      )}
    </div>
  );
}

function LogoRail({ reverse = false }: { reverse?: boolean }) {
  const railItems = [...logoBrands, ...logoBrands];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div
        className={`flex w-max gap-5 ${
          reverse ? 'animate-[marquee-reverse_34s_linear_infinite]' : 'animate-[marquee_34s_linear_infinite]'
        }`}
      >
        {railItems.map((item, index) => (
          <PartnerLogo
            key={`${item.name}-${index}`}
            item={item}
            priority={index < logoBrands.length}
          />
        ))}
      </div>
    </div>
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
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary">
            {item.eyebrow}
          </span>
        </div>
        <h3 className="max-w-md text-2xl font-black leading-[1.02] tracking-[-0.04em] text-white md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/68 md:text-base">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Partners() {
  return (
    <section
      id="partners"
      className="relative z-10 overflow-hidden border-t border-white/5 py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-20 h-44 w-44 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-10 right-[10%] h-56 w-56 rounded-full bg-secondary/10 blur-[120px]" />
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
          <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
            Built for <span className="text-gradient">schools and brands</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            A cleaner partner section to present institutional collaborations,
            sponsor brands, and ecosystem support in a more premium way.
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
                Brand Carousel
              </div>
              <h3 className="mt-1 text-xl font-black text-white md:text-2xl">
                Recognized performance brands
              </h3>
            </div>
            <div className="max-w-sm text-sm leading-relaxed text-white/42 md:text-right">
              A moving logo showcase feels cleaner, more premium, and far less
              like a boxed listing.
            </div>
          </div>

          <div className="space-y-5">
            <LogoRail />
            <LogoRail reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
