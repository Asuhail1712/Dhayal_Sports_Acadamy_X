import { PageShell } from "@/components/PageShell";
import { JournalCards } from "@/components/BlogSection";
import { SectionIntro } from "@/components/Design";
import { blogPosts } from "@/lib/content";

export default function Blogs() {
  return (
    <PageShell>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            heading="h1"
            label="The academy journal"
            title={
              <>
                Fresh perspectives.
                <br />
                <em>A stronger game.</em>
              </>
            }
            description="Explore how the academy approaches school partnerships, athlete care, mentorship, competition readiness, and long-term player growth."
          />
          <JournalCards posts={blogPosts} />
        </div>
      </section>
    </PageShell>
  );
}
