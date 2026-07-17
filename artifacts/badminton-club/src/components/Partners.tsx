import { motion } from 'framer-motion';

const partnerLogos = [
  {
    name: 'Li-Ning',
    src: '/images/Li-Ning-Logo-Vector.svg-.png',
    tint: 'bg-[#c80d0d]',
  },
  {
    name: 'Decathlon',
    src: '/images/decathlon-logo.png',
    tint: 'bg-[#1d5fb5]',
  },
  {
    name: 'Nike',
    src: '/images/Nike-Logo-History-1-1-1155x770.png',
    tint: 'bg-white',
  },
  {
    name: 'Yonex',
    src: '/images/images.png',
    tint: 'bg-[#0c5aad]',
  },
  {
    name: 'Adidas',
    src: '/images/web-192037111.webp',
    tint: 'bg-white',
  },
  {
    name: 'Anta',
    src: '/images/c491f6650684385e2dcb53124f9e6f5c.jpg',
    tint: 'bg-white',
  },
  {
    name: 'Spall',
    src: '/images/EkiwkueI_400x400.jpg',
    tint: 'bg-[#0d5360]',
  },
];

const highlights = [
  {
    eyebrow: 'School Partners',
    title: 'Institutional collaborations for school badminton growth',
    description:
      'Low-impact, non-contact school badminton programs that develop motor skills, balance, coordination, alertness, focus, and progression from Little Champion to tournament teams.',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600&q=85',
    accent: 'from-primary/60 via-primary/16 to-transparent',
  },
  {
    eyebrow: 'Academy Partners',
    title: 'Corporate, club, academy, and education partners',
    description:
      'Partnership opportunities for corporate wellness, sports clubs, academy networks, education groups, overseas centres, camps, and Dayal ProShop activations.',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=85',
    accent: 'from-secondary/55 via-secondary/12 to-transparent',
  },
];

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
      className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.06),rgba(8,12,16,0.12)_26%,rgba(8,12,16,0.3)_54%,rgba(8,12,16,0.78)_100%)]" />
      </div>

      <div className="relative flex min-h-[360px] flex-col justify-end p-6 md:min-h-[420px] md:p-8">
        <div className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/92 px-4 py-2 backdrop-blur-md">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary">
            {item.eyebrow}
          </span>
        </div>
        <h3 className="max-w-md text-2xl font-black leading-[1.08] tracking-[-0.04em] text-white md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/72 md:text-base">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

function LogoPuck({
  logo,
  priority = false,
}: {
  logo: (typeof partnerLogos)[number];
  priority?: boolean;
}) {
  return (
    <div className="group flex min-w-[220px] items-center justify-center px-6 py-6 md:min-w-[260px] md:px-8">
      <div className="flex w-full flex-col items-center gap-5 rounded-[1.8rem] border border-border bg-white px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]">
        <div
          className={`flex h-20 w-full items-center justify-center rounded-[1.35rem] ${logo.tint} px-8 md:h-24`}
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-12 w-auto max-w-full object-contain md:max-h-14"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
        <div className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {logo.name}
        </div>
      </div>
    </div>
  );
}

function LogoRail({ reverse = false }: { reverse?: boolean }) {
  const items = [...partnerLogos, ...partnerLogos];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-stretch ${
          reverse
            ? 'animate-[marquee-reverse_34s_linear_infinite]'
            : 'animate-[marquee_34s_linear_infinite]'
        }`}
      >
        {items.map((logo, index) => (
          <LogoPuck
            key={`${logo.name}-${index}`}
            logo={logo}
            priority={index < partnerLogos.length}
          />
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section
      id="partners"
      className="relative z-10 overflow-hidden border-t border-border bg-[#fafafa] py-24"
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
          <h2 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
            Built for <span className="text-gradient">schools and brands</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            We collaborate with schools, sports clubs, academies, corporate
            groups, education partners, overseas centres, camps, tourism
            partners, and performance brands to build a complete badminton
            ecosystem.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {highlights.map((item, index) => (
            <HighlightCard key={item.eyebrow} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-8 rounded-[2.2rem] border border-border bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:mt-10 md:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                Partner Brands
              </div>
              <h3 className="mt-1 text-xl font-black text-foreground md:text-2xl">
                Trusted brands in training and performance
              </h3>
            </div>
            <div className="max-w-md text-sm leading-[1.75] text-muted-foreground md:text-right">
              Featuring equipment, retail, and performance brands that support
              training, activation, and academy development.
            </div>
          </div>

          <div className="space-y-2">
            <LogoRail />
            <LogoRail reverse />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
