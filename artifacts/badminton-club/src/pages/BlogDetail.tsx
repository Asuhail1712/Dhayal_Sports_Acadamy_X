import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getBlogBySlug } from "@/lib/content";

export default function BlogDetail({ slug }: { slug: string }) {
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <PageShell className="pb-20">
        <section className="relative z-10 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/10 bg-card/60 p-10 text-center backdrop-blur-md"
          >
            <h1 className="text-3xl font-black text-white">Article not found</h1>
            <p className="mt-4 text-white/60">
              The blog entry you opened is not available.
            </p>
          </motion.div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell className="pb-20">
      <section className="relative z-10 overflow-hidden">
        <article className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-card/70 backdrop-blur-md"
        >
          <div className="relative h-[320px] overflow-hidden md:h-[440px]">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
          </div>

          <div className="mx-auto max-w-4xl px-6 pb-10 pt-8 md:px-10 md:pt-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/45">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary/80" />
                {post.publishedAt}
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-6 text-base leading-8 text-white/72"
            >
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </motion.div>
        </article>
      </section>
    </PageShell>
  );
}
