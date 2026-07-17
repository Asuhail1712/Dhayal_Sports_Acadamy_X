import { motion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/content";
import { startRouteTransition } from "@/hooks/use-scroll-restoration";

export function BlogSection() {
  const [, setLocation] = useLocation();
  const featuredPosts = blogPosts.slice(0, 3);

  const normalizeHomeHistoryEntry = () => {
    if (window.location.pathname !== "/" || !window.location.hash) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  };

  const openFromHome = (slug: string) => {
    normalizeHomeHistoryEntry();
    const href = `/blogs/${slug}`;
    startRouteTransition(href);
    setLocation(href);
  };

  return (
    <section id="blogs" className="relative z-10 overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]">
        <img
          src={`${import.meta.env.BASE_URL}images/court-texture.png`}
          alt="Texture"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="max-w-2xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary/85">
              Academy Journal
            </div>
            <h2 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
              Stories, insight, and <span className="text-gradient">player development</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A closer look at the academy model, school partnerships, athlete care,
              mentorship, and the systems behind better badminton development.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
            >
              <div className="relative h-60 overflow-hidden">
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

                <h3 className="text-2xl font-black leading-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <Button
                  variant="default"
                className="group/btn mt-6 h-11 rounded-xl"
                  onPointerDown={() => startRouteTransition(`/blogs/${post.slug}`)}
                  onClick={() => openFromHome(post.slug)}
                >
                  Read Article
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform md:group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {blogPosts.length > featuredPosts.length && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-foreground hover:bg-white"
              onPointerDown={() => startRouteTransition("/blogs")}
              onClick={() => {
                normalizeHomeHistoryEntry();
                startRouteTransition("/blogs");
                setLocation("/blogs");
              }}
            >
              View More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
