import { Reveal, SectionIntro, SiteLink, TextLink } from "@/components/Design";
import { blogPosts, type BlogPost } from "@/lib/content";

export function JournalCards({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="journal-grid">
      {posts.map((post, i) => (
        <Reveal
          key={post.slug}
          className="journal-card"
          delay={Math.min(i * 0.07, 0.2)}
        >
          <SiteLink
            href={"/blogs/" + post.slug}
            className="journal-card-image"
            aria-label={"Read " + post.title}
          >
            <img
              src={post.image}
              alt={post.category + " at the academy"}
              loading="lazy"
            />
            <span className="pill">{post.category}</span>
          </SiteLink>
          <div className="journal-card-meta">
            <span>{post.publishedAt}</span>
            <span>/</span>
            <span>{post.readTime}</span>
          </div>
          <h3>
            <SiteLink href={"/blogs/" + post.slug}>{post.title}</SiteLink>
          </h3>
          <p>{post.excerpt}</p>
          <TextLink href={"/blogs/" + post.slug}>Read the story</TextLink>
        </Reveal>
      ))}
    </div>
  );
}

export function BlogSection() {
  return (
    <section id="blogs" className="section-shell bg-white">
      <div className="site-container">
        <SectionIntro
          label="The academy journal"
          title={
            <>
              Ideas for
              <br />
              <em>a better game.</em>
            </>
          }
          description="Stories, insights, and the science behind player development."
          action={<TextLink href="/blogs">View all stories</TextLink>}
        />
        <JournalCards posts={blogPosts.slice(0, 3)} />
      </div>
    </section>
  );
}
