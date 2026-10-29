import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, CalendarDays, Check, MapPin, Ruler, ShieldCheck, Wallet, BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { PageShell } from "@/components/Layout";
import { ConsentFrame } from "@/components/CookieConsent";
import { Gallery } from "@/components/Gallery";
import { DevelopmentPlans } from "@/components/DevelopmentPlans";
import { sampleDevelopmentTowers } from "@/data/development-plans";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p6 from "@/assets/p6.jpg";

const developments = {
  "skyline-residences": {
    name: "Skyline Residences", seoTitle: "Skyline Residences, com 2 a 4 quartos, 98 a 210 m² - Itaim Bibi - São Paulo/SP", seoSlug: "skyline-residences", legacySeoSlug: "skyline-residences-2-a-4-quartos-98-a-210-m2-itaim-bibi-sao-paulo-sp", status: "Lançamento", place: "Itaim Bibi, São Paulo", from: "R$ 1,9 mi", area: "98 a 210 m²", units: "2 a 4 suítes", delivery: "Dezembro de 2028", image: banner1, gallery: [banner1, p1, banner2, p2], ri: "Consulte a equipe", address: "Endereço completo sob consulta", bedrooms: "2 a 4", suites: "2 a 4", bathrooms: "2 a 5", parking: "2 a 3", entry: "Consulte as condições", monthly: "Consulte as condições", annual: "Consulte as condições", keys: "Consulte as condições", income: "Consulte a equipe",
    headline: "Uma nova perspectiva de viver o Itaim.",
    description: "Arquitetura contemporânea, interiores cheios de luz e um endereço que coloca São Paulo aos seus pés. O Skyline Residences foi desenhado para quem valoriza tempo, privacidade e uma experiência residencial sem excessos.",
  },
  "jardins-de-alphaville": {
    name: "Jardins de Alphaville", seoTitle: "Jardins de Alphaville, com 4 a 5 quartos, 280 a 420 m² - Alphaville - Barueri/SP", seoSlug: "jardins-de-alphaville", legacySeoSlug: "jardins-de-alphaville-4-a-5-quartos-280-a-420-m2-alphaville-barueri-sp", status: "Em obras", place: "Alphaville, Barueri", from: "R$ 3,2 mi", area: "280 a 420 m²", units: "Casas 4 suítes", delivery: "Junho de 2027", image: p2, gallery: [p2, p6, banner1, p3], ri: "Consulte a equipe", address: "Endereço completo sob consulta", bedrooms: "4 a 5", suites: "4", bathrooms: "5 a 6", parking: "4 a 5", entry: "Consulte as condições", monthly: "Consulte as condições", annual: "Consulte as condições", keys: "Consulte as condições", income: "Consulte a equipe",
    headline: "O espaço de uma casa, a tranquilidade de um jardim.",
    description: "Um condomínio exclusivo para viver em ritmo próprio. Casas generosas, verde ao redor e uma estrutura pensada para reunir a família com conforto todos os dias.",
  },
  "mar-azul-riviera": {
    name: "Mar Azul Riviera", seoTitle: "Mar Azul Riviera, com 3 a 5 quartos, 160 a 410 m² - Riviera de São Lourenço - Bertioga/SP", seoSlug: "mar-azul-riviera", legacySeoSlug: "mar-azul-riviera-3-a-5-quartos-160-a-410-m2-riviera-de-sao-lourenco-bertioga-sp", status: "Pronto para morar", place: "Riviera, Bertioga", from: "R$ 2,8 mi", area: "160 a 410 m²", units: "3 a 5 suítes", delivery: "Pronto para morar", image: p3, gallery: [p3, banner2, p6, p1], ri: "Consulte a equipe", address: "Endereço completo sob consulta", bedrooms: "3 a 5", suites: "3 a 5", bathrooms: "3 a 6", parking: "2 a 4", entry: "Consulte as condições", monthly: "Consulte as condições", annual: "Consulte as condições", keys: "Consulte as condições", income: "Consulte a equipe",
    headline: "Seu refúgio entre o azul do mar e o verde da Riviera.",
    description: "Apartamentos amplos, varanda para receber e a praia como extensão da sua casa. Tudo pronto para você aproveitar desde o primeiro dia.",
  },
  "vista-paulista": {
    name: "Vista Paulista", seoTitle: "Vista Paulista, com studios a 3 quartos, 45 a 120 m² - Bela Vista - São Paulo/SP", seoSlug: "vista-paulista", legacySeoSlug: "vista-paulista-studios-a-3-quartos-45-a-120-m2-bela-vista-sao-paulo-sp", status: "Lançamento", place: "Bela Vista, São Paulo", from: "R$ 620 mil", area: "45 a 120 m²", units: "Studios a 3 dorms", delivery: "Março de 2029", image: p1, gallery: [p1, banner1, p2, banner2], ri: "Consulte a equipe", address: "Endereço completo sob consulta", bedrooms: "Studio a 3", suites: "0 a 3", bathrooms: "1 a 3", parking: "0 a 2", entry: "Consulte as condições", monthly: "Consulte as condições", annual: "Consulte as condições", keys: "Consulte as condições", income: "Consulte a equipe",
    headline: "O essencial de São Paulo, em uma vista singular.",
    description: "Design inteligente, mobilidade e uma área de lazer completa para uma vida urbana mais leve e conectada ao que importa.",
  },
  "refugio-da-serra": {
    name: "Refúgio da Serra", seoTitle: "Refúgio da Serra, com 3 quartos, 220 a 340 m² - Campos do Jordão/SP", seoSlug: "refugio-da-serra", legacySeoSlug: "refugio-da-serra-3-quartos-220-a-340-m2-campos-do-jordao-sp", status: "Em obras", place: "Campos do Jordão", from: "R$ 1,7 mi", area: "220 a 340 m²", units: "Chalés 3 suítes", delivery: "Setembro de 2027", image: p6, gallery: [p6, p3, banner2, p2], ri: "Consulte a equipe", address: "Endereço completo sob consulta", bedrooms: "3", suites: "3", bathrooms: "3 a 4", parking: "2 a 3", entry: "Consulte as condições", monthly: "Consulte as condições", annual: "Consulte as condições", keys: "Consulte as condições", income: "Consulte a equipe",
    headline: "O seu tempo encontra a natureza.",
    description: "Chalés contemporâneos em uma paisagem que convida a desacelerar. Uma escolha para finais de semana, temporadas e memórias que ficam.",
  },
} as const;

export const Route = createFileRoute("/empreendimentos/$slug")({
  loader: ({ params }) => {
    const match = Object.entries(developments).find(([alias, item]) => alias === params.slug || item.seoSlug === params.slug || item.legacySeoSlug === params.slug);
    const development = match?.[1];
    if (!development) throw notFound();
    if (params.slug !== development.seoSlug) throw redirect({ to: "/empreendimentos/$slug", params: { slug: development.seoSlug }, replace: true, statusCode: 301 });
    return development;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.seoTitle} | Premium House` },
      { name: "description", content: `${loaderData.name}: ${loaderData.description}` },
      { property: "og:title", content: loaderData.seoTitle },
      { property: "og:description", content: loaderData.headline },
      { property: "og:image", content: loaderData.image },
      { property: "og:image:alt", content: loaderData.name },
    ] : [{ title: "Empreendimento não encontrado | Premium House" }, { name: "robots", content: "noindex, nofollow" }],
    links: loaderData ? [{ rel: "canonical", href: `https://premium-house-imoveis-2026.microsistec.chatgpt.site/empreendimentos/${loaderData.seoSlug}` }] : [],
  }),
  notFoundComponent: () => <PageShell><div className="container-x py-32 text-center"><h1 className="text-4xl">Empreendimento não encontrado</h1><Link to="/empreendimentos" className="mt-6 inline-block font-bold text-primary">Ver empreendimentos</Link></div></PageShell>,
  component: DevelopmentPage,
});

function DevelopmentPage() {
  const d = Route.useLoaderData();
  const [showAllCharacteristics, setShowAllCharacteristics] = useState(false);
  const whatsapp = `Olá! Tenho interesse no ${d.name}.`;
  const details = [
    { icon: Ruler, label: "Plantas", value: d.area },
    { icon: BedDouble, label: "Configurações", value: d.units },
    { icon: CalendarDays, label: "Previsão", value: d.delivery },
  ];
  const characteristicGroups = [{title:"Lazer e bem-estar",items:["Academia","Piscina","Salão de festas","Espaço gourmet"]},{title:"Segurança e serviços",items:["Portaria","Controle de acesso","Monitoramento","Elevadores"]},{title:"Conforto",items:["Varanda","Infraestrutura para ar-condicionado","Vagas de garagem","Plantas funcionais"]},{title:"Localização",items:["Comércio e serviços próximos","Acessos viários","Transporte público","Áreas verdes na região"]}];
  const scrollToInterest = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = window.matchMedia("(min-width: 1024px)").matches ? "formulario-desktop" : "interesse";
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  };

  return (
    <PageShell whatsappAboveMobileCta>
      <section id="fotos" className="container-x scroll-mt-36 pt-4 sm:pt-5" aria-label={`Fotos de ${d.name}`}>
        <Gallery images={d.gallery} title={d.name} video="" tour="" showTabs={false} />
      </section>
      <section className="container-x py-5 md:py-6">
        <div className="max-w-5xl"><div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground md:text-sm"><span className="rounded-full bg-secondary px-3 py-1 text-navy">{d.status}</span><span aria-hidden="true">·</span><span>{d.place}</span></div><h1 className="type-property mt-2 text-navy">{d.seoTitle}</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{d.headline}</p></div>
      </section>

      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="min-w-0">
      <section id="descricao" className="scroll-mt-36 py-5 md:py-7"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Sobre o empreendimento</p><p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base">{d.description}</p></section>

      <section className="grid gap-4 py-5 sm:grid-cols-3 md:py-7">
        {details.map((item) => <div key={item.label} className="flex items-center gap-4 rounded-2xl border bg-card p-5"><item.icon className="h-7 w-7 text-primary" /><div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p><p className="mt-1 font-bold text-navy">{item.value}</p></div></div>)}
      </section>

      <section id="ficha-tecnica" className="py-6 md:py-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Informações do projeto</p><h2 className="mt-2 text-3xl md:text-4xl">Ficha técnica</h2></div><p className="text-sm text-muted-foreground">Dados sujeitos à disponibilidade e confirmação.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Área privativa",value:d.area},{label:"Dormitórios",value:d.bedrooms},{label:"Suítes",value:d.suites},{label:"Banheiros",value:d.bathrooms},{label:"Vagas",value:d.parking},{label:"Plantas",value:d.units},{label:"Entrega prevista",value:d.delivery},{label:"Registro de incorporação",value:d.ri}].map((item)=><div key={item.label} className="rounded-xl border bg-card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p><p className="mt-2 font-semibold text-navy">{item.value}</p></div>)}</div></section>

      <section id="condicoes" className="scroll-mt-36 py-6 md:py-8"><div className="flex items-center gap-3"><Wallet className="h-6 w-6 text-primary"/><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Planeje sua compra</p><h2 className="mt-1 text-3xl md:text-4xl">Condições comerciais</h2></div></div><div className="mt-5 overflow-hidden rounded-2xl border bg-card"><div className="grid sm:grid-cols-2">{[{label:"Preço inicial",value:d.from},{label:"Entrada",value:d.entry},{label:"Parcelas mensais",value:d.monthly},{label:"Parcelas anuais",value:d.annual},{label:"Saldo nas chaves",value:d.keys},{label:"Renda sugerida",value:d.income}].map((item,index)=><div key={item.label} className={`flex items-center justify-between gap-4 border-b p-4 sm:px-5 ${index%2===0?"sm:border-r":""}`}><span className="text-sm text-muted-foreground">{item.label}</span><strong className="text-right text-sm text-navy">{item.value}</strong></div>)}</div><p className="px-5 py-3 text-xs text-muted-foreground">Valores e condições podem mudar conforme a unidade e a tabela vigente. Consulte a equipe Premium House.</p></div></section>

      </div>
      <aside className="sticky top-28 hidden h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 lg:block"><div id="formulario-desktop" tabIndex={-1} className="scroll-mt-28 rounded-2xl border bg-card p-6 shadow-float outline-none"><p className="text-sm text-muted-foreground">A partir de</p><p className="font-display text-3xl text-navy">{d.from}</p><p className="mt-1 text-xs text-muted-foreground">{d.status} · {d.delivery}</p><div className="my-5 border-t"/><p className="mb-1 text-[11px] font-bold">Quero mais informações</p><p className="mb-4 text-sm text-muted-foreground">Receba plantas, disponibilidade e condições.</p><LeadForm subject={d.name} cta="Solicitar informações" withMessage={false} whatsapp={whatsapp}/><p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary"/>Seus dados estão protegidos</p></div></aside>
      </div>

      <div id="unidades-disponiveis" className="container-x scroll-mt-36">
        <DevelopmentPlans towers={sampleDevelopmentTowers} developmentName={d.name} onRequestInfo={scrollToInterest} />
      </div>

      <div className="container-x">
      <section id="caracteristicas" className="scroll-mt-36 py-6 md:py-8"><div className="flex items-center gap-3"><BadgeCheck className="h-6 w-6 text-primary"/><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Estrutura e conveniência</p><h2 className="mt-1 text-3xl md:text-4xl">Características do empreendimento</h2></div></div><p className="mt-3 max-w-2xl text-muted-foreground">Consulte a equipe para confirmar quais itens estão disponíveis no condomínio e em cada planta.</p><div id="lista-caracteristicas" className="mt-5 grid gap-4 sm:grid-cols-2">{characteristicGroups.map((group, groupIndex)=>{const offset=characteristicGroups.slice(0,groupIndex).reduce((count,item)=>count+item.items.length,0);const visibleCount=group.items.filter((_,itemIndex)=>showAllCharacteristics||offset+itemIndex<8).length;return <div key={group.title} className={`${visibleCount===0?"hidden md:block":""} rounded-2xl border bg-card p-5`}><h3 className="font-bold text-navy">{group.title}</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{group.items.map((item,itemIndex)=><li key={item} className={`${!showAllCharacteristics&&offset+itemIndex>=8?"hidden md:flex":"flex"} items-center gap-2 text-sm text-muted-foreground`}><Check className="h-4 w-4 shrink-0 text-primary"/>{item}</li>)}</ul></div>})}</div>{characteristicGroups.reduce((count,item)=>count+item.items.length,0)>8&&<button type="button" aria-expanded={showAllCharacteristics} aria-controls="lista-caracteristicas" onClick={()=>setShowAllCharacteristics((visible)=>!visible)} className="mt-5 inline-flex min-h-11 items-center rounded-lg px-3 font-bold text-primary transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden">{showAllCharacteristics?"Ver menos":"Ver mais"}</button>}</section>

      <section id="localizacao" className="grid gap-8 py-12 md:grid-cols-[1fr_1fr] md:py-16"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Localização</p><h2 className="mt-3 text-3xl md:text-4xl">Tudo perto. Do seu jeito.</h2><p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">Em {d.place}, o empreendimento se conecta às facilidades que tornam a rotina mais simples e os finais de semana ainda melhores.</p><p className="mt-4 flex items-start gap-3 font-semibold text-navy"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{d.address}</p><div className="mt-6 space-y-3">{["Gastronomia, mercados e serviços selecionados", "Mobilidade para os principais acessos", "Parques, lazer e conveniências por perto"].map((point) => <p key={point} className="flex items-center gap-3 font-semibold text-navy"><MapPin className="h-5 w-5 text-primary" />{point}</p>)}</div></div><div className="overflow-hidden rounded-[2rem] bg-muted"><ConsentFrame title={`Mapa aproximado de ${d.name}`} className="h-[340px] w-full grayscale" src={`https://www.google.com/maps?q=${encodeURIComponent(d.place)}&z=14&output=embed`} /></div></section>

      <section id="interesse" tabIndex={-1} className="scroll-mt-28 bg-secondary/45 py-10 outline-none lg:hidden"><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Fale com um especialista</p><h2 className="mt-3 text-[11px] font-bold">Quero mais informações</h2><p className="mt-3 text-sm text-muted-foreground">Receba plantas, disponibilidade, valores e condições do {d.name}.</p><div className="mt-5 rounded-2xl border bg-card p-5 shadow-float"><LeadForm subject={d.name} cta="Solicitar informações" withMessage={false} whatsapp={whatsapp} /></div></section>
      </div>
      <div className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border bg-card/95 p-2 shadow-float backdrop-blur lg:hidden"><a href="#interesse" onClick={scrollToInterest} className="flex min-h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Quero mais informações</a></div>
    </PageShell>
  );
}
