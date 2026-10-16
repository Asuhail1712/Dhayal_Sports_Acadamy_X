import { motion } from "framer-motion";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-[#fafafa] py-12">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">Trust strip</p>
          <h2 className="text-2xl font-black text-foreground md:text-3xl">Mentors who have coached the best</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Our founder has trained players including Saina Nehwal, P.V. Sindhu, Kidambi Srikanth, H.S. Prannoy, and Gayatri Gopichand, and coached the Indian, Chinese, and Hong Kong national teams.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="border-l-2 border-secondary pl-6">
          <p className="text-sm leading-relaxed text-muted-foreground md:mt-8 md:text-base">
            Our overseas mentor, world champion Xiong Gubao, has trained world-class players including Taufik Hidayat, Lee Chong Wei, Lin Dan, and Carolina Marin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
