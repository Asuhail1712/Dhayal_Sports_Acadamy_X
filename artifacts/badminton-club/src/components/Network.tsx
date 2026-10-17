import { Globe2 } from "lucide-react";
import { Reveal } from "@/components/Design";

import {
  networkRegions as regions,
  educationPartners,
} from "@/lib/academy-content";

export function Network() {
  return (
    <section className="section-shell section-soft accent-green">
      <div className="site-container network-layout">
        <Reveal className="network-orbit">
          <Globe2 className="network-globe" aria-hidden="true" />
          {regions.map(([region]) => (
            <div key={region} className="network-pin">
              <span />
              {region}
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow">
            <span />A connected academy
          </div>
          <h2 className="section-title">
            One family.
            <br />
            <em>Four regions.</em>
          </h2>
          <p className="section-description">
            Partner academies where you can train, camp, and compete.
          </p>
          <div className="region-list">
            {regions.map(([region, partners]) => (
              <div className="region-row" key={region}>
                <strong>{region}</strong>
                <p>{partners}</p>
              </div>
            ))}
          </div>
          <p className="section-description !text-sm">{educationPartners}</p>
        </Reveal>
      </div>
    </section>
  );
}
