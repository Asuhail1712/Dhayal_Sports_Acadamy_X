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
      'Structured school tie-ups, training hubs, and youth development initiatives designed to grow badminton through institutional partnerships.',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600&q=85',
    accent: 'from-primary/50 via-primary/12 to-transparent',
  },
  {
    eyebrow: 'Brand Partners',
    title: 'Equipment, performance, and activation partners',
    description:
      'A premium brand showcase for equipment, retail, and performance names that support the academy ecosystem on and off court.',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=85',
    accent: 'from-secondary/45 via-secondary/10 to-transparent',
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
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-card"
    >
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/12" />
      </div>

      <div className="relative flex min-h-[360px] flex-col justify-end p-6 md:min-h-[420px] md:p-8">
        <div className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-primary/30 bg-background/55 px-4 py-2 backdrop-blur-md">
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
      <div className="flex w-full flex-col items-center gap-5 rounded-[1.8rem] border border-white/8 bg-white/[0.02] px-6 py-8 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-white/[0.04]">
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
        <div className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-white/45">
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
            Presenting real performance and retail brands with a cleaner moving
            logo wall, while keeping the school and institutional story in the
            editorial feature cards above.
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
          className="mt-8 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 backdrop-blur-xl md:mt-10 md:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-white/30">
                Partner Brands
              </div>
              <h3 className="mt-1 text-xl font-black text-white md:text-2xl">
                Trusted brands in training and performance
              </h3>
            </div>
            <div className="max-w-md text-sm leading-relaxed text-white/42 md:text-right">
              Showcasing the equipment, retail, and performance brands that
              align with the academy environment and support player development.
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
