import { motion } from "framer-motion";

const regions = [
  ["Hong Kong", "Dayal Leisure and Cultural Association, Sky Warriors, Indian Royals, Sarjan's"],
  ["China", "Kim Chan Rong Sports Academy, Nanchang · Xiong Gubao Badminton Academy, Guangzhou"],
  ["Malaysia", "Michael Badminton Academy, Kuala Lumpur"],
  ["India", "Chennai, Sivakasi, Cumbum, and Kerala partner academies and sports villages"],
] as const;

export function Network() {
  return (
    <section className="relative z-10 bg-[#fafafa] py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Global network</p>
          <h2 className="mt-3 text-3xl font-black text-foreground md:text-5xl">One academy family across four regions.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">Partner academies where you can train, camp, and compete.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {regions.map(([region, partners], index) => (
            <motion.article key={region} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="glass-panel rounded-2xl p-6">
              <h3 className="text-2xl font-black text-primary">{region}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{partners}</p>
            </motion.article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">Partner academies work with reputed ICSE, CBSE, and State board schools and universities within 3 to 5 km, with online tuition support.</p>
      </div>
    </section>
  );
}
