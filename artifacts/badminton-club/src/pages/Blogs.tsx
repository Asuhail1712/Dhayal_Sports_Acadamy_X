import { motion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/content";
import { startRouteTransition } from "@/hooks/use-scroll-restoration";

export default function Blogs() {
  const [, setLocation] = useLocation();

  const openFromListing = (slug: string) => {
    const href = `/blogs/${slug}`;
    startRouteTransition(href);
    setLocation(href);
  };

  return (
    <PageShell className="pb-20">
      <section className="relative z-10 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-6xl text-center"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary/85">
              Blog
            </div>
            <h1 className="mt-3 text-4xl font-black leading-tight text-foreground md:whitespace-nowrap md:text-6xl">
              Insights from the <span className="text-gradient">academy floor</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore how the academy approaches school partnerships, athlete care,
              mentorship, competition readiness, and long-term player growth.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <span>{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-primary/70" />
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary/80" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black leading-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <Button
                    variant="default"
                    className="mt-6 h-11 rounded-xl"
                    onPointerDown={() => startRouteTransition(`/blogs/${post.slug}`)}
                    onClick={() => openFromListing(post.slug)}
                  >
                    Read Article
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
