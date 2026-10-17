import { Reveal } from "@/components/Design";

export function TrustStrip() {
  return (
    <section className="trust-section">
      <div className="site-container">
        <Reveal>
          <h2 className="trust-heading">Mentors who have coached the best</h2>
          <div className="trust-columns">
            <p>
              Our founder has trained players including Saina Nehwal, P.V.
              Sindhu, Kidambi Srikanth, H.S. Prannoy and Gayatri Gopichand, and
              coached the Indian, Chinese and Hong Kong national teams.
            </p>
            <p>
              Our overseas mentor, world champion Xiong Gubao, has trained
              world-class players including Taufik Hidayat, Lee Chong Wei, Lin
              Dan and Carolina Marin.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
