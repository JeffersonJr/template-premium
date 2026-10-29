import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, Lightbulb, Users } from "lucide-react";
import p2 from "@/assets/p2.jpg";
import banner2 from "@/assets/banner2.jpg";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Premium House | Missão, visão e valores" },
      { name: "description", content: "Conheça a história, missão, visão e valores da Premium House, imobiliária de alto padrão." },
      { property: "og:title", content: "Sobre a Premium House" },
      { property: "og:description", content: "Atendimento consultivo e imóveis selecionados há mais de 25 anos." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/sobre" }],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="relative">
        <img src={banner2} alt="Família recebendo as chaves" width={1600} height={640} className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x absolute inset-0 flex flex-col justify-center text-navy-foreground">
          <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/80">Quem somos</p>
          <h1 className="mt-3 max-w-2xl text-5xl md:text-6xl">Mais de 25 anos realizando sonhos.</h1>
        </div>
      </section>

      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl">Nossa história</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">A Premium House nasceu em 2001 para oferecer uma experiência imobiliária diferente: curadoria cuidadosa, transparência e um atendimento próximo, do primeiro contato à entrega das chaves.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Hoje somos mais de 60 corretores especializados, com atuação nas principais regiões de São Paulo, litoral e serra, usando dados de mercado para garantir as melhores negociações.</p>
        </div>
        <img src={p2} alt="Imóvel Premium House" width={1024} height={768} loading="lazy" className="rounded-3xl shadow-float" />
      </div>

      <section className="container-x py-20">
        <h2 className="text-center text-4xl">O que nos guia</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ShieldCheck, t: "Ética", d: "Transparência total em todas as etapas." },
            { i: Heart, t: "Cuidado", d: "Cada cliente é único e tratado como tal." },
            { i: Lightbulb, t: "Inovação", d: "Tecnologia a favor de decisões melhores." },
            { i: Users, t: "Parceria", d: "Relacionamentos que duram muito além da venda." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6 text-center">
              <v.i className="mx-auto h-8 w-8 text-primary" /><h3 className="mt-3 text-xl">{v.t}</h3><p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/contato" className="inline-block rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground hover:brightness-110">Fale com nossa equipe</Link>
        </div>
      </section>
    </PageShell>
  );
}
