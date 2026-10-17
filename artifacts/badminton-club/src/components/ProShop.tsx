import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/Design";
import { Button } from "@/components/ui/button";
import { proShop, whatsappUrl } from "@/lib/academy-content";

export function ProShop({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section-shell section-soft accent-green">
      <div className="site-container">
        <GlassCard className="proshop-card">
          <div>
            <div className="eyebrow">
              <span />
              DAYAL ProShop
            </div>
            <h2 className="section-title">
              Gear up with <em>Dayal ProShop.</em>
            </h2>
            <p className="section-description">
              {detailed ? proShop.full : proShop.short}
            </p>
            <Button asChild variant="green" className="mt-7 gap-4 rounded-full">
              <a
                href={whatsappUrl(
                  "Hello Dayal Sports Academy, I would like to visit the DAYAL ProShop. Please share showroom locations and opening hours.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the ProShop <ArrowUpRight size={17} />
              </a>
            </Button>
          </div>
          <div className="proshop-mark" aria-hidden="true">
            <ShoppingBag />
            <strong>10-50%</strong>
            <span>Products, flooring & fitness equipment</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
