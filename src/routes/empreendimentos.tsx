import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Building2, CalendarDays, Ruler } from "lucide-react";
import banner1 from "@/assets/banner1.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p6 from "@/assets/p6.jpg";
import { PageShell } from "@/components/Layout";
import { LeadForm } from "@/components/LeadForm";

const phases = ["Lançamento", "Em obras", "Pronto para morar"] as const;
type Phase = (typeof phases)[number];
type Search = { fase?: Phase };

const isPhase = (value: unknown): value is Phase => typeof value === "string" && phases.includes(value as Phase);

export const Route = createFileRoute("/empreendimentos")({
  validateSearch: (search: Record<string, unknown>): Search => ({ fase: isPhase(search.fase) ? search.fase : undefined }),
  head: () => ({
    meta: [
      { title: "Empreendimentos e lançamentos | Premium House" },
      { name: "description", content: "Conheça lançamentos, imóveis em obras e prontos para morar selecionados pela Premium House." },
      { property: "og:title", content: "Empreendimentos | Premium House" },
      { property: "og:description", content: "Lançamentos, imóveis em obras e prontos para morar." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/empreendimentos" }],
  }),
  component: Outlet,
});

const devs = [
  { slug: "skyline-residences", name: "Skyline Residences", status: "Lançamento", place: "Itaim Bibi, São Paulo", img: banner1, area: "98 a 210 m²", units: "2 a 4 suítes", delivery: "Dez/2028", from: "R$ 1,9 mi" },
  { slug: "jardins-de-alphaville", name: "Jardins de Alphaville", status: "Em obras", place: "Alphaville, Barueri", img: p2, area: "280 a 420 m²", units: "Casas 4 suítes", delivery: "Jun/2027", from: "R$ 3,2 mi" },
  { slug: "mar-azul-riviera", name: "Mar Azul Riviera", status: "Pronto para morar", place: "Riviera, Bertioga", img: p3, area: "160 a 410 m²", units: "3 a 5 suítes", delivery: "Pronto", from: "R$ 2,8 mi" },
  { slug: "vista-paulista", name: "Vista Paulista", status: "Lançamento", place: "Bela Vista, São Paulo", img: p1, area: "45 a 120 m²", units: "Studios a 3 dorms", delivery: "Mar/2029", from: "R$ 620 mil" },
  { slug: "refugio-da-serra", name: "Refúgio da Serra", status: "Em obras", place: "Campos do Jordão", img: p6, area: "220 a 340 m²", units: "Chalés 3 suítes", delivery: "Set/2027", from: "R$ 1,7 mi" },
];

function Devs() {
  const { fase } = Route.useSearch();
  const [st, setSt] = useState<"Todos" | Phase>(fase ?? "Todos");
  useEffect(() => setSt(fase ?? "Todos"), [fase]);
  const list = st === "Todos" ? devs : devs.filter((d) => d.status === st);
  return (
    <PageShell>
      <section className="relative">
        <img src={banner1} alt="Empreendimento Premium House" width={1600} height={640} className="h-[380px] w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x absolute inset-0 flex flex-col justify-center text-navy-foreground">
          <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/80">Empreendimentos</p>
          <h1 className="mt-3 max-w-2xl text-5xl md:text-6xl">Lançamentos e imóveis na planta</h1>
        </div>
      </section>
      <div className="container-x mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {(["Todos", ...phases] as const).map((c) => <button key={c} onClick={() => setSt(c)} className={`rounded-full border px-5 py-2 text-sm font-bold ${st === c ? "border-navy bg-navy text-navy-foreground" : "bg-card"}`}>{c}</button>)}
          </div>
          <div className="mt-8 grid gap-7 md:grid-cols-2">
            {list.map((d) => (
              <article key={d.name} className="group overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={d.img} alt={d.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{d.status}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl">{d.name}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{d.place}</p>
                  <ul className="mt-4 grid grid-cols-3 gap-2 border-y py-3 text-xs">
                    <li className="flex flex-col items-center gap-1 text-center"><Ruler className="h-5 w-5 text-primary" />{d.area}</li>
                    <li className="flex flex-col items-center gap-1 text-center"><Building2 className="h-5 w-5 text-primary" />{d.units}</li>
                    <li className="flex flex-col items-center gap-1 text-center"><CalendarDays className="h-5 w-5 text-primary" />{d.delivery}</li>
                  </ul>
                  <div className="mt-4 flex items-center justify-between"><span className="text-sm text-muted-foreground">A partir de <strong className="text-lg text-navy">{d.from}</strong></span><Link to="/empreendimentos/$slug" params={{ slug: d.slug }} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-navy-foreground">Mais informações</Link></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside id="interesse" className="h-fit rounded-2xl border bg-card p-6 shadow-float lg:sticky lg:top-32">
          <h2 className="text-2xl">Receba a tabela de preços</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">Condições exclusivas de lançamento.</p>
          <LeadForm cta="Solicitar informações" withMessage={false} whatsapp="Olá! Tenho interesse nos empreendimentos da Premium House." />
        </aside>
      </div>
    </PageShell>
  );
}
