import { PageShell } from "@/components/PageShell";
import { Partners } from "@/components/Partners";
import { Network } from "@/components/Network";
import { ProShop } from "@/components/ProShop";
export default function PartnersPage() {
  return (
    <PageShell>
      <Partners detailed />
      <Network />
      <ProShop detailed />
    </PageShell>
  );
}
