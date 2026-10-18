import {
  GlassCard,
  SectionIntro,
  SiteLink,
  TextLink,
} from "@/components/Design";
import { blogPosts, type BlogPost } from "@/lib/content";
import { CardVisual } from "@/components/CardArtwork";

export function JournalCards({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="journal-grid">
      {posts.map((post, i) => (
        <GlassCard
          key={post.slug}
          className="journal-card"
          index={i}
          artwork={post.category === "Athlete Care" ? "heart" : "education"}
          artworkLayout="custom"
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
          <div className="journal-card-body">
            <CardVisual
              motif={post.category === "Athlete Care" ? "heart" : "education"}
              header={
                <div className="journal-card-meta">
                  <span>{post.publishedAt}</span>
                  <span>/</span>
                  <span>{post.readTime}</span>
                </div>
              }
              title={
                <h3>
                  <SiteLink href={"/blogs/" + post.slug}>{post.title}</SiteLink>
                </h3>
              }
            />
            <p>{post.excerpt}</p>
            <TextLink href={"/blogs/" + post.slug}>Read the story</TextLink>
          </div>
        </GlassCard>
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
