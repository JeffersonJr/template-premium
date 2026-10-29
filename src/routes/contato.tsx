import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { LeadForm } from "@/components/LeadForm";
import { ADDRESS, HOURS, PHONE_LABEL } from "@/data/properties";
import { ConsentFrame } from "@/components/CookieConsent";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Premium House" },
      { name: "description", content: "Fale com a Premium House por telefone, WhatsApp ou e-mail, ou visite nosso escritório." },
      { property: "og:title", content: "Contato | Premium House" },
      { property: "og:description", content: "Fale com um corretor da Premium House." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/contato" }],
  }),
  component: () => (
    <PageShell>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl">Fale com a gente</h1>
          <p className="mt-4 text-muted-foreground">Estamos prontos para ajudar você a encontrar o imóvel ideal.</p>
          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-4"><span className="rounded-xl bg-accent p-3 text-primary"><Phone className="h-5 w-5" /></span>{PHONE_LABEL}</li>
            <li className="flex items-center gap-4"><span className="rounded-xl bg-accent p-3 text-primary"><Mail className="h-5 w-5" /></span>contato@premiumhouse.com.br</li>
            <li className="flex items-center gap-4"><span className="rounded-xl bg-accent p-3 text-primary"><MapPin className="h-5 w-5" /></span>{ADDRESS}</li>
            <li className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-primary"><Clock className="h-5 w-5" /></span>
              <div>{HOURS.map(([d, t]) => <div key={d}><strong>{d}:</strong> {t}</div>)}</div></li>
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-8 shadow-float"><LeadForm cta="Enviar mensagem" /></div>
      </div>
      <div className="container-x">
        <div className="aspect-[16/7] overflow-hidden rounded-3xl border shadow-card">
          <ConsentFrame title="Mapa Premium House" className="h-full w-full" src="https://www.google.com/maps?q=Av.+Paulista,+1000,+S%C3%A3o+Paulo&z=16&output=embed" />
        </div>
      </div>
    </PageShell>
  ),
});
