import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { useState } from "react";
import { BedDouble, Bath, Car, Maximize, MapPin, Check, Sparkles, Heart, Navigation, ShieldCheck, Rotate3d, Instagram, CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { ShareButtons } from "@/components/ShareButtons";
import { useFavorites } from "@/lib/favorites";
import { brl, formatPrice, properties, propertyPath, propertySeoTitle, propertySlug, legacyPropertySlug, type Property } from "@/data/properties";
import { Gallery } from "@/components/Gallery";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ConsentFrame } from "@/components/CookieConsent";

const financingBanks = [
  { name: "Itaú", initials: "Itaú", color: "bg-[#f58220] text-white" },
  { name: "Santander", initials: "Santander", color: "bg-[#ec1c24] text-white" },
  { name: "Bradesco", initials: "Bradesco", color: "bg-[#cc092f] text-white" },
  { name: "Caixa", initials: "CAIXA", color: "bg-[#0066b3] text-white" },
  { name: "Banco do Brasil", initials: "BB", color: "bg-[#f7df00] text-[#102a4c]" },
] as const;

function SeasonalAvailability({ property }: { property: Property }) {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
  });
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingDays = new Date(year, monthIndex, 1).getDay();
  const unavailable = new Set(property.unavailableDates ?? []);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(month);
  const dayNames = ["Do", "2ª", "3ª", "4ª", "5ª", "6ª", "Sá"];

  return (
    <div id="calendario-disponibilidade" className="mt-7 scroll-mt-32 border-t pt-6">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-navy">Disponibilidade</h3>
      </div>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
        <div className="rounded-xl border p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" aria-label="Mês anterior" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-primary hover:text-primary"><ChevronLeft className="h-4 w-4" /></button>
            <p className="text-sm font-bold capitalize text-navy">{monthLabel}</p>
            <button type="button" aria-label="Próximo mês" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-primary hover:text-primary"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {dayNames.map((day) => <span key={day} className="py-2 font-semibold text-muted-foreground">{day}</span>)}
            {Array.from({ length: leadingDays }, (_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const available = !unavailable.has(dateKey);
              return <span key={dateKey} aria-label={`${day} ${monthLabel}: ${available ? "disponível" : "indisponível"}`} className={`flex aspect-square items-center justify-center rounded-md ${available ? "bg-card text-navy" : "bg-muted text-muted-foreground line-through"}`}>{day}</span>;
            })}
          </div>
        </div>
        <div className="flex gap-4 text-xs md:flex-col md:gap-3">
          <span className="flex items-center gap-2"><i className="h-4 w-4 rounded border bg-card" /> Disponível</span>
          <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-muted" /> Indisponível</span>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/imoveis/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id || propertySlug(x) === params.id || legacyPropertySlug(x) === params.id);
    if (!p) throw notFound();
    if (params.id !== propertySlug(p)) throw redirect({ href: propertyPath(p), statusCode: 301 });
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${propertySeoTitle(loaderData)} | Premium House` },
      { name: "description", content: `${propertySeoTitle(loaderData)}. Confira fotos, características e solicite informações à Premium House.` },
      { property: "og:title", content: propertySeoTitle(loaderData) },
      { property: "og:description", content: loaderData.description },
      { property: "og:type", content: "product" },
      { property: "og:image", content: loaderData.images[0] },
      { property: "og:image:alt", content: `${loaderData.title} — foto do imóvel` },
    ] : [{ title: "Imóvel indisponível | Premium House" }, { name: "robots", content: "noindex" }],
    links: loaderData ? [{ rel: "canonical", href: `https://premium-house-imoveis-2026.microsistec.chatgpt.site${propertyPath(loaderData)}` }] : [],
  }),
  notFoundComponent: () => (
    <PageShell><div className="container-x py-32 text-center"><h1 className="text-4xl">Imóvel não encontrado</h1><Link to="/imoveis" className="mt-6 inline-block font-bold text-primary">Ver outros imóveis</Link></div></PageShell>
  ),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const { has, toggle } = useFavorites();
  const [showAllNearby, setShowAllNearby] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const fav = has(p.id);
  const similar = properties.filter((x) => x.id !== p.id && x.purpose === p.purpose).slice(0, 3);
  const msg = `Olá! Tenho interesse no imóvel ${p.id} - ${p.title}.`;
  const brokerWhatsapp = `https://wa.me/${p.broker.phone}?text=${encodeURIComponent(msg)}`;
  // URL demonstrativa para validar visualmente o CTA enquanto a integração do CRM não existe.
  const instagramUrl = "https://www.instagram.com/microsistec.com.br/";
  const scrollToContactForm = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("formulario-contato")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const scrollToAvailability = () => {
    document.getElementById("calendario-disponibilidade")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const specs = [
    { icon: Maximize, v: `${p.area} m²`, l: "Área útil" },
    { icon: BedDouble, v: p.beds, l: "Quartos" },
    { icon: Sparkles, v: p.suites, l: "Suítes" },
    { icon: Bath, v: p.baths, l: "Banheiros" },
    { icon: Car, v: p.parking, l: "Vagas" },
  ];
  const description = `${p.description} Conheça pessoalmente cada detalhe deste imóvel selecionado pela Premium House.`;
  const featureGroups: [string, string[]][] = [["Diferenciais", p.amenities], ...Object.entries(p.features)];
  const featureCount = featureGroups.reduce((total, [, items]) => total + items.length, 0);
  let featureOffset = 0;
  const sec = "rounded-2xl border bg-card p-6 md:p-8";
  return (
    <PageShell whatsappAboveMobileCta>
      <div className="container-x pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground"><Link to="/" className="hover:text-primary">Início</Link> / <Link to="/imoveis" className="hover:text-primary">Imóveis</Link> / {p.type}</p>
        </div>
        <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.type}</span>
                {p.acceptsTrade && <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold text-primary">Aceita permuta</span>}
                {p.tag && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{p.tag}</span>}
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-muted-foreground">Cód. {p.id}</span>
              </div>
              <h1 className="type-property mt-4 leading-tight">{propertySeoTitle(p)}</h1>
        </div>

        <div className="mt-6">
          <Gallery images={p.images} title={p.title} video={p.video} tour={p.tour} showTabs={false} action={
            <button aria-label="Favoritar imóvel" onClick={() => toggle(p.id)} className={`flex h-12 w-12 items-center justify-center rounded-xl bg-card/95 shadow-card transition hover:scale-105 ${fav ? "text-destructive" : "text-navy"}`}>
              <Heart className={`h-6 w-6 ${fav ? "fill-current" : ""}`} />
            </button>
          } />
        </div>

        <div className="mt-6">
              <p className="mt-3 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{p.neighborhood}, {p.city}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-sm font-bold">Compartilhar:</span><ShareButtons title={propertySeoTitle(p)} path={propertyPath(p)} /></div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {specs.map((s) => (
                  <div key={s.l} className="rounded-xl border bg-card p-4 text-center">
                    <s.icon className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 font-extrabold">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              {p.purpose === "Temporada" && <button type="button" onClick={scrollToAvailability} className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><CalendarDays className="h-4 w-4" />Configurar disponibilidade de datas<ChevronDown aria-hidden="true" className="ml-1 h-4 w-4" /></button>}
        </div>

        {p.acceptsFinancing && <section aria-label="Financiamento imobiliário" className="mt-6 hidden overflow-hidden rounded-xl border border-border bg-card lg:flex lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Simulação de financiamento</p>
            <h2 className="mt-1 text-base font-bold leading-snug text-navy sm:text-lg">Este imóvel aceita financiamento</h2>
            <p className="mt-1 text-xs text-muted-foreground">Consulte condições nos bancos de sua preferência.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-border p-3 sm:shrink-0 sm:items-center sm:border-l sm:border-t-0" aria-label="Bancos disponíveis para simulação">
            {financingBanks.map((bank) => <div key={bank.name} title={bank.name} className={`flex h-[54px] min-w-[66px] shrink-0 items-center justify-center rounded-md px-2 text-center text-[10px] font-extrabold leading-tight sm:h-[68px] sm:min-w-[76px] sm:text-xs ${bank.color}`}>{bank.initials}</div>)}
          </div>
        </section>}

        {p.acceptsFinancing && <section aria-label="Financiamento imobiliário" className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4 lg:hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="h-5 w-5" /></span>
            <div className="min-w-0">
              <h2 className="text-sm font-bold leading-snug text-navy">Aceita financiamento</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Consulte opções de simulação nos bancos.</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Bancos disponíveis para simulação">
            {financingBanks.map((bank) => <div key={bank.name} title={bank.name} className={`flex h-10 min-w-[72px] shrink-0 items-center justify-center rounded-lg px-2 text-center text-[10px] font-extrabold leading-tight ${bank.color}`}>{bank.initials}</div>)}
          </div>
        </section>}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-8">

            <section className={sec}>
              <h2 className="text-3xl">Sobre o imóvel</h2>
              <p className={`mt-3 leading-relaxed text-muted-foreground ${showAllDescription ? "" : "line-clamp-5 md:line-clamp-none"}`}>{description}</p>
              {description.length > 150 && <button type="button" onClick={() => setShowAllDescription((value) => !value)} className="mt-2 text-sm font-bold text-primary hover:underline md:hidden">{showAllDescription ? "Ver menos" : "Ver mais"}</button>}
              {p.purpose !== "Temporada" ? <dl className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-3">
                <div><dt className="text-xs uppercase text-muted-foreground">{p.purpose === "Venda" ? "Valor de venda" : p.purpose === "Locação" ? "Valor do aluguel" : "Venda e locação"}</dt><dd className="font-bold">{formatPrice(p)}</dd></div>
                <div><dt className="text-xs uppercase text-muted-foreground">Condomínio</dt><dd className="font-bold">{brl(p.condo)}/mês</dd></div>
                <div><dt className="text-xs uppercase text-muted-foreground">IPTU</dt><dd className="font-bold">{brl(p.iptu)}/ano</dd></div>
              </dl> : <dl className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
                <div><dt className="text-xs uppercase text-muted-foreground">Temporada a partir de</dt><dd className="font-bold">{formatPrice(p)}</dd></div>
                <div><dt className="text-xs uppercase text-muted-foreground">Taxa de limpeza</dt><dd className="font-bold">{brl(p.cleaningFee ?? 0)}</dd></div>
              </dl>}
            </section>

            {p.purpose === "Temporada" && <section className={sec}>
              <div className="rounded-lg bg-secondary/70 px-4 py-3 text-sm font-bold text-navy">Temporada</div>
              <div className="grid gap-3 border-b py-4 text-sm sm:grid-cols-3">
                <p><span className="font-semibold">Núm. máx. pessoas:</span> {p.maxGuests ?? "Consulte"}</p>
                <p><span className="font-semibold">Aceita animais?</span> {p.petsAllowed ? "Sim" : "Não"}</p>
                <p><span className="font-semibold">Garagem:</span> {p.parking}</p>
              </div>
              <div className="divide-y">
                {(p.seasonalRates ?? []).map((rate) => (
                  <div key={rate.label} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm">
                    <span className="flex items-center gap-1 font-bold text-navy"><Check className="h-4 w-4 text-primary" />{rate.label}</span>
                    <span className="text-muted-foreground">Início: {rate.start}</span>
                    <span className="text-muted-foreground">Término: {rate.end}</span>
                    <strong className="text-navy">{rate.dailyPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })} / diária</strong>
                  </div>
                ))}
              </div>
              <SeasonalAvailability property={p} />
            </section>}

            <section className={sec}>
              <h2 className="text-3xl">Características</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {featureGroups.map(([g, items]) => {
                  const groupStart = featureOffset;
                  featureOffset += items.length;
                  return (
                    <div key={g} className={`${g === "Diferenciais" ? "sm:col-span-2" : ""} ${!showAllFeatures && groupStart >= 8 ? "hidden md:block" : ""}`}>
                      <h3 className="mb-3 text-lg">{g}</h3>
                      <ul className={`grid gap-2.5 ${g === "Diferenciais" ? "sm:grid-cols-3" : ""}`}>
                        {items.map((a, index) => <li key={a} className={`flex items-center gap-2 text-sm ${!showAllFeatures && groupStart + index >= 8 ? "hidden md:flex" : ""}`}><Check className="h-5 w-5 shrink-0 rounded-full bg-accent p-0.5 text-primary" />{a}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {featureCount > 8 && <div className="mt-5 flex justify-center md:hidden"><button type="button" onClick={() => setShowAllFeatures((value) => !value)} className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">{showAllFeatures ? "Ver menos" : "Ver mais"}</button></div>}
            </section>

            <section id="video" className={sec}>
              <h2 className="text-3xl">Vídeo do imóvel</h2>
              <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-muted">
                <ConsentFrame src={p.video} title={`Vídeo - ${p.title}`} className="h-full w-full" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            </section>

            {p.tour && <section id="tour-virtual" className={sec}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary"><Rotate3d className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Explore sem sair de casa</p>
                  <h2 className="text-2xl font-bold text-navy md:text-3xl">Tour virtual 360º</h2>
                </div>
              </div>
              <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-muted">
                <ConsentFrame src={p.tour} title={`Tour virtual 360º - ${p.title}`} className="h-full w-full" allow="xr-spatial-tracking; fullscreen" allowFullScreen />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Explore os ambientes e tenha uma visão mais completa do imóvel.</p>
            </section>}

            <section className="rounded-2xl border bg-card p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Instagram className="h-5 w-5" /></span>
                  <div>
                    <p className="text-sm font-semibold text-navy">Veja mais deste imóvel</p>
                    <p className="text-xs text-muted-foreground">Acompanhe novidades e conteúdos no Instagram.</p>
                  </div>
                </div>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <Instagram className="h-4 w-4" /> Acompanhe mais pelo Instagram
                </a>
              </div>
            </section>

            <section className={sec}>
              <h2 className="text-3xl">Localização e proximidades</h2>
              <p className="mt-2 text-sm text-muted-foreground">Localização aproximada · {p.neighborhood}, {p.city}</p>
              <div className="mt-5 aspect-[16/8] overflow-hidden rounded-xl bg-muted">
                <ConsentFrame title="Mapa do imóvel" className="h-full w-full" src={`https://www.google.com/maps?q=${p.lat},${p.lng}&z=14&output=embed`} />
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.nearby.map((n, index) => {
                  const hiddenByDefault = !showAllNearby && (index >= 9 || index >= 3);
                  return (
                  <li key={n.name} className={`flex items-center justify-start rounded-xl bg-muted px-4 py-3 text-sm ${hiddenByDefault ? index >= 9 ? "hidden" : "hidden md:flex" : ""}`}>
                    <span className="flex items-center gap-2 font-semibold"><Navigation className="h-4 w-4 text-primary" />{n.name}</span>
                  </li>
                  );
                })}
              </ul>
              {p.nearby.length > 3 && <div className="mt-4 flex justify-center md:hidden"><button type="button" onClick={() => setShowAllNearby((value) => !value)} className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">{showAllNearby ? "Ver menos" : "Ver mais"}</button></div>}
              {p.nearby.length > 9 && <div className="mt-4 hidden justify-center md:flex"><button type="button" onClick={() => setShowAllNearby((value) => !value)} className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">{showAllNearby ? "Ver menos" : "Ver mais"}</button></div>}
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-2">
            <div id="formulario-contato" className="rounded-2xl border bg-card p-6 shadow-float">
              <p className="text-sm text-muted-foreground">{p.purpose === "Temporada" ? "Temporada a partir de" : p.purpose === "Venda" ? "Valor de venda" : p.purpose === "Locação" ? "Valor do aluguel" : "Venda e locação"}</p>
              <p className="font-display text-4xl text-navy">{formatPrice(p)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.purpose === "Temporada" ? `Taxa de limpeza ${brl(p.cleaningFee ?? 0)}` : `Cond. ${brl(p.condo)} · IPTU ${brl(p.iptu)}/ano`}</p>
              <div className="my-5 border-t" />
              <div className="mb-5 rounded-xl bg-secondary/70 p-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Seu corretor especialista</p>
                  <p className="truncate font-bold text-navy">{p.broker.name}</p>
                  <p className="text-xs text-muted-foreground">{p.broker.creci}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-bold text-whatsapp"><WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp {p.broker.phoneLabel}</p>
                </div>
              </div>
              <p className="mb-1 text-lg font-bold">Gostou deste imóvel?</p>
              <p className="mb-4 text-sm text-muted-foreground">Receba mais informações agora mesmo.</p>
              <LeadForm subject={`${p.id} - ${p.title}`} cta="Solicitar informações" withMessage={false} whatsapp={msg} whatsappHref={brokerWhatsapp} />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" />Seus dados estão protegidos</p>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl">Imóveis semelhantes</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{similar.map((x) => <PropertyCard key={x.id} p={x} />)}</div>
          </section>
        )}
      </div>
      <div className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border bg-card/95 p-2 shadow-float backdrop-blur md:hidden">
        <a href="#formulario-contato" onClick={scrollToContactForm} className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground transition hover:brightness-110">Solicitar informações</a>
      </div>
    </PageShell>
  );
}
