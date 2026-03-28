import { CalendarDays, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/content";

export default function Blogs() {
  const [, setLocation] = useLocation();

  const openFromListing = (slug: string) => {
    setLocation(`/blogs/${slug}`);
  };

  return (
    <PageShell className="pt-32 pb-20">
      <section className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary/85">
            Blog
          </div>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-6xl md:whitespace-nowrap">
            Insights from the <span className="text-gradient">academy floor</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            Explore how the academy approaches school partnerships, athlete care,
            mentorship, competition readiness, and long-term player growth.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-card/70 backdrop-blur-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-transparent" />
              </div>

              <div className="p-7">
                <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/45">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-primary/70" />
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary/80" />
                    {post.publishedAt}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-tight text-white">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {post.excerpt}
                </p>

                <Button
                  variant="default"
                  className="mt-6 h-11 rounded-xl bg-primary/90 text-primary-foreground border border-primary/60 shadow-[0_0_20px_rgba(0,240,255,0.22)] transition-all md:hover:bg-primary md:hover:border-primary"
                  onClick={() => openFromListing(post.slug)}
                >
                  Read Article
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
