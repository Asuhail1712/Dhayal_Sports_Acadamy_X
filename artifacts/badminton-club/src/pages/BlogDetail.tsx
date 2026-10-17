import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionIntro, SiteLink } from "@/components/Design";
import { JournalCards } from "@/components/BlogSection";
import { blogPosts, getBlogBySlug } from "@/lib/content";

export default function BlogDetail({ slug }: { slug: string }) {
  const post = getBlogBySlug(slug);
  if (!post)
    return (
      <PageShell>
        <section className="section-shell">
          <div className="site-container">
            <h1 className="section-title">Article not found.</h1>
            <SiteLink href="/blogs" className="text-link">
              <ArrowLeft size={16} />
              Back to the journal
            </SiteLink>
          </div>
        </section>
      </PageShell>
    );
  return (
    <PageShell>
      <article className="section-shell">
        <div className="site-container">
          <SiteLink href="/blogs" className="detail-breadcrumb">
            <ArrowLeft size={14} />
            The academy journal
          </SiteLink>
          <Reveal className="article-heading">
            <span className="pill">{post.category}</span>
            <h1 className="section-title mt-6">{post.title}</h1>
            <p className="section-description">{post.excerpt}</p>
            <div className="journal-card-meta !mt-6">
              <span>{post.publishedAt}</span>
              <span>/</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
          <Reveal className="detail-program-photo">
            <img
              src={post.image}
              alt={post.category + " and player development"}
              fetchPriority="high"
            />
          </Reveal>
          <Reveal className="article-body">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </article>
      <section className="section-shell border-t border-border bg-white">
        <div className="site-container">
          <SectionIntro
            label="Keep exploring"
            title={
              <>
                More from <em>the academy.</em>
              </>
            }
          />
          <JournalCards
            posts={blogPosts
              .filter((item) => item.slug !== post.slug)
              .slice(0, 3)}
          />
        </div>
      </section>
    </PageShell>
  );
}
