import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, UsersRound } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PageShell } from "@/components/Layout";
import { brokers } from "@/data/properties";

const PAGE_SIZE = 9;

export const Route = createFileRoute("/corretores")({
  head: () => ({
    meta: [
      { title: "Nossa Equipe | Premium House" },
      { name: "description", content: "Conheça os corretores da Premium House e fale diretamente com nossa equipe pelo WhatsApp." },
      { property: "og:title", content: "Nossa Equipe | Premium House" },
      { property: "og:description", content: "Conheça os corretores da Premium House." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/corretores" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleBrokers = brokers.slice(0, visibleCount);
  const hasMore = visibleCount < brokers.length;

  return (
    <PageShell>
      <section className="bg-accent py-14 sm:py-16">
        <div className="container-x">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Premium House</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Nossa Equipe</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Conheça nossos corretores e fale diretamente com quem pode ajudar você a encontrar o imóvel ideal.</p>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16" aria-labelledby="team-heading">
        <h2 id="team-heading" className="sr-only">Corretores da Premium House</h2>
        {visibleBrokers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleBrokers.map((broker) => {
                const initials = broker.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
                const message = `Olá, ${broker.name}! Encontrei seu perfil no site da Premium House e gostaria de conversar.`;
                return (
                  <article key={`${broker.name}-${broker.creci}`} className="overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float sm:p-7">
                    {broker.photo ? (
                      <img src={broker.photo} alt={`Foto de ${broker.name}`} loading="lazy" className="h-24 w-24 rounded-full border-4 border-accent object-cover" />
                    ) : (
                      <div aria-hidden="true" className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent bg-brand-gradient font-display text-2xl text-navy-foreground">{initials}</div>
                    )}
                    <h3 className="mt-5 text-xl font-bold text-navy">{broker.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{broker.creci}</p>
                    <a
                      href={`https://wa.me/${broker.phone}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Chamar ${broker.name} no WhatsApp`}
                      className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
                    >
                      <WhatsAppIcon className="h-5 w-5" /> Chamar no WhatsApp <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <p className="mb-4 text-sm text-muted-foreground">Mostrando {visibleBrokers.length} de {brokers.length} corretores</p>
                <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <UsersRound aria-hidden="true" className="h-4 w-4" /> Ver mais corretores
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border bg-card px-6 py-14 text-center">
            <UsersRound aria-hidden="true" className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 font-semibold">Nossa equipe estará disponível em breve.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
