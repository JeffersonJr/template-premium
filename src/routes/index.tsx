import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { KeyRound, Building2, Home, Trees, Waves, Star, Search, CalendarCheck, FileSignature, ChevronLeft, ChevronRight, ChevronDown, Quote, Warehouse, BedSingle, Briefcase, LandPlot, MapPin, ArrowRight, ArrowLeftRight, Banknote } from "lucide-react";
import hero from "@/assets/hero.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p6 from "@/assets/p6.jpg";
import { PageShell } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { brl, isRent, properties, type Property } from "@/data/properties";
import { posts } from "@/data/posts";
import { PostCard } from "@/components/PostCard";
import { SeoNavigation } from "@/components/SeoNavigation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium House | Imóveis de alto padrão à venda e para alugar" },
      { name: "description", content: "Casas, apartamentos, coberturas e casas de campo de alto padrão para comprar ou alugar em São Paulo, Alphaville, litoral e serra." },
      { name: "keywords", content: "imobiliária, imóveis de alto padrão, apartamentos à venda, casas em condomínio, coberturas, aluguel São Paulo, Alphaville, Itaim Bibi" },
      { property: "og:title", content: "Premium House | Imóveis de alto padrão" },
      { property: "og:description", content: "Casas, apartamentos e coberturas selecionadas para comprar ou alugar." },
      { property: "og:image", content: hero },
      { property: "og:image:alt", content: "Casa de alto padrão com piscina" },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateAgent", name: "Premium House", telephone: "+55 11 99999-9999", address: { "@type": "PostalAddress", streetAddress: "Av. Paulista, 1000", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" } }),
    }],
  }),
  component: Index,
});

const cats = [
  { label: "Apartamentos", tipo: "Apartamento", icon: Building2 },
  { label: "Casas", tipo: "Casa", icon: Home },
  { label: "Coberturas", tipo: "Cobertura", icon: Waves },
  { label: "Casas de Campo", tipo: "Casa de Campo", icon: Trees },
  { label: "Sobrados", tipo: "Casa", icon: Warehouse },
  { label: "Studios", tipo: "Apartamento", icon: BedSingle },
  { label: "Salas Comerciais", tipo: "Sala Comercial", icon: Briefcase },
  { label: "Terrenos", tipo: "Terreno", icon: LandPlot },
  { label: "Aceitam permuta", filtro: "permuta", icon: ArrowLeftRight },
  { label: "Aceitam financiamento", filtro: "financiamento", icon: Banknote },
];

const banners = [
  { img: banner1, alt: "Banner Skyline Residences" },
  { img: banner2, alt: "Banner de condições especiais" },
];

const hoods = [
  { name: "Itaim Bibi", city: "São Paulo", img: p1 },
  { name: "Riviera", city: "Bertioga", img: p3 },
  { name: "Alphaville", city: "Barueri", img: hero },
  { name: "Campos do Jordão", city: "Serra", img: p6 },
];

function Index() {
  const featured = properties.filter((p) => p.featured);
  const rentals = properties.filter(isRent);
  return (
    <PageShell afterNewsletter={<SeoNavigation />}>
      <HomeHero />

      <CategoryCarousel />

      <OpportunityCarousel />

      <SectionHead kicker="Destaques à venda" title="Seu próximo investimento começa aqui" link={{ label: "Ver todos à venda", search: { finalidade: "Venda" } }} />
      <HomePropertyCarousel items={featured.slice(0, 3)} label="venda" />

      <BannerCarousel />

      <SectionHead kicker="Destaques para alugar" title="Espaços que combinam com você" link={{ label: "Ver todos para alugar", search: { finalidade: "Locação" } }} />
      <HomePropertyCarousel items={rentals.slice(0, 3)} label="locação" />

      <DevelopmentShowcase />

      <ExploreBanners />

      <section className="container-x mt-24">
        <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-primary">Como funciona</p><h2 className="mt-2 text-4xl md:text-5xl">Do primeiro clique às chaves</h2></div>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            { i: Search, t: "Busque", d: "Filtre entre centenas de imóveis selecionados." },
            { i: CalendarCheck, t: "Agende a visita", d: "Escolha o melhor horário com um corretor." },
            { i: FileSignature, t: "Negocie com segurança", d: "Proposta, análise e contrato sem burocracia." },
            { i: KeyRound, t: "Receba as chaves", d: "Acompanhamos você até a mudança." },
          ].map((s, i) => (
            <div key={s.t} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-navy-foreground shadow-float"><s.i className="h-7 w-7" /></div>
              <span className="absolute left-1/2 top-0 ml-6 rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="mt-5 text-xl">{s.t}</h3><p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 bg-navy py-20 text-navy-foreground">
        <div className="container-x">
          <h2 className="text-center text-4xl md:text-5xl">O que dizem nossos clientes</h2>
          <TestimonialsCarousel />
        </div>
      </section>

      <SectionHead kicker="Blog" title="Dicas e mercado imobiliário" link={{ label: "Ver todos os artigos", to: "/blog" }} />
      <div className="container-x mt-10 grid gap-7 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
      </div>

      <section className="container-x mt-24">
        <div className="grid overflow-hidden rounded-3xl bg-brand-gradient md:grid-cols-2">
          <div className="p-10 text-navy-foreground md:p-14">
            <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/70">Proprietário?</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Anuncie com quem entende.</h2>
            <p className="mt-4 text-navy-foreground/80">Avaliação, fotos e divulgação.</p>
            <Link to="/anunciar" className="mt-8 inline-block rounded-full bg-card px-7 py-3 font-bold text-navy transition hover:scale-105">Cadastre seu imóvel</Link>
          </div>
          <div className="bg-card/95 p-8 md:p-12">
            <h3 className="text-2xl">Fale com um especialista</h3>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Retornamos em até 30 minutos em horário comercial.</p>
            <LeadForm cta="Solicitar contato" />
          </div>
        </div>
      </section>

    </PageShell>
  );
}

function HomePropertyCarousel({ items, label }: { items: Property[]; label: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    setActive(nextIndex);
    const track = trackRef.current;
    if (track) {
      track.scrollTo({
        left: nextIndex * (track.clientWidth * 0.82 + 16),
        behavior: "smooth",
      });
    }
  };
  const previous = () => goTo(active - 1);
  const next = () => goTo(active + 1);
  const arrowClass = "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-navy shadow-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40";

  if (!items.length) return null;

  return (
    <>
      <div className="container-x mt-8 sm:hidden">
        <div className="mb-3 flex items-center justify-end gap-2">
          <span className="mr-1 text-xs font-semibold text-muted-foreground" aria-live="polite">
            {active + 1} / {items.length}
          </span>
          <button type="button" aria-label={`Imóvel anterior para ${label}`} onClick={previous} disabled={active === 0} className={arrowClass}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label={`Próximo imóvel para ${label}`} onClick={next} disabled={active === items.length - 1} className={arrowClass}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth py-1"
          style={{ scrollbarWidth: "none" }}
          onScroll={(event) => {
            const track = event.currentTarget;
            const step = track.clientWidth * 0.82 + 16;
            setActive(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
          }}
        >
            {items.map((p) => (
              <div key={p.id} className="w-[82%] shrink-0 snap-start">
                <PropertyCard p={p} />
              </div>
            ))}
        </div>
        <div className="mt-4 flex justify-center gap-1.5" aria-label="Selecionar imóvel">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Mostrar imóvel ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${active === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/50"}`}
            />
          ))}
        </div>
      </div>
      <div className="container-x mt-10 hidden gap-7 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>
    </>
  );
}

const testimonials = [
  ["Mariana e Rafael", "Compraram em Alphaville", "Atendimento impecável. Encontramos nossa casa em duas semanas e toda a documentação foi tranquila."],
  ["Carlos Menezes", "Alugou no Itaim Bibi", "Processo rápido e transparente. O corretor entendeu exatamente o que eu precisava."],
  ["Fernanda Lima", "Vendeu na Granja Viana", "Venderam meu imóvel pelo valor justo e em tempo recorde. Recomendo de olhos fechados."],
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const max = Math.max(0, testimonials.length - perView);
  const active = Math.min(current, max);
  const arrow = "flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/30 text-navy-foreground transition hover:bg-navy-foreground hover:text-navy disabled:cursor-not-allowed disabled:opacity-35";

  return <div className="mt-12">
    <div className="overflow-hidden">
      <div className="flex transition-transform duration-500 ease-out" style={{ width: `${(testimonials.length * 100) / perView}%`, transform: `translateX(-${(active * 100) / testimonials.length}%)` }}>
        {testimonials.map(([name, status, text]) => (
          <div key={name} className="shrink-0 px-2 sm:px-3" style={{ width: `${100 / testimonials.length}%` }}>
            <figure className="h-full min-h-64 rounded-2xl bg-navy-foreground/5 p-7 sm:p-8">
              <Quote className="h-8 w-8 text-navy-foreground" />
              <div className="mt-3 flex gap-0.5 text-navy-foreground" aria-label="5 de 5 estrelas">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 text-navy-foreground/85">“{text}”</blockquote>
              <figcaption className="mt-5"><div className="font-bold">{name}</div><div className="text-sm text-navy-foreground/60">{status}</div></figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
    {max > 0 && <div className="mt-6 flex justify-center gap-3">
      <button type="button" aria-label="Depoimento anterior" disabled={active === 0} onClick={() => setCurrent(Math.max(0, active - 1))} className={arrow}><ChevronLeft className="h-5 w-5" /></button>
      <button type="button" aria-label="Próximo depoimento" disabled={active >= max} onClick={() => setCurrent(Math.min(max, active + 1))} className={arrow}><ChevronRight className="h-5 w-5" /></button>
    </div>}
  </div>;
}

function HomeHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-6.25rem)] items-center overflow-hidden md:min-h-[calc(100vh-7.25rem)]">
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={heroMobile} width={768} height={435} />
        <img src={hero} alt="Casa de alto padrão com piscina" width={1920} height={1088} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
      </picture>
      <div className="absolute inset-0 bg-black/70" />
      <div className="container-x relative py-16 sm:py-20">
        <h1 className="type-hero max-w-3xl leading-[1.05] text-navy-foreground">O imóvel dos seus sonhos começa aqui.</h1>
        <div className="mt-8 w-full max-w-6xl sm:mt-10">
          <SearchBar />
          <div className="mt-3 flex justify-center">
            <button type="button" onClick={() => document.getElementById("home-opportunities")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
              Ver imóveis <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, link }: { kicker: string; title: string; link?: { label: string; search?: Record<string, string>; to?: "/blog" } }) {
  return (
    <div className="container-x mt-20 flex flex-wrap items-start justify-between gap-5 sm:mt-24 sm:items-end">
      <div><p className="text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">{kicker}</p><h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">{title}</h2></div>
      {link && <Link to={link.to ?? "/imoveis"} search={link.search ?? {}} className="w-full rounded-full border-2 border-navy px-6 py-2.5 text-center text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground sm:w-auto">{link.label}</Link>}
    </div>
  );
}

const featuredDevelopments = [
  { name: "Skyline Residences", neighborhood: "Itaim Bibi", area: "98 a 210 m²", status: "Lançamento", image: banner1, slug: "skyline-residences-2-a-4-quartos-98-a-210-m2-itaim-bibi-sao-paulo-sp" },
  { name: "Jardins de Alphaville", neighborhood: "Alphaville", area: "280 a 420 m²", status: "Em obras", image: p2, slug: "jardins-de-alphaville-4-a-5-quartos-280-a-420-m2-alphaville-barueri-sp" },
  { name: "Mar Azul Riviera", neighborhood: "Riviera de São Lourenço", area: "160 a 410 m²", status: "Pronto para morar", image: p3, slug: "mar-azul-riviera-3-a-5-quartos-160-a-410-m2-riviera-de-sao-lourenco-bertioga-sp" },
];

function DevelopmentShowcase() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(featuredDevelopments.length - 1, index));
    const track = trackRef.current;
    const card = track?.children[nextIndex] as HTMLElement | undefined;
    if (!track || !card) return;
    setActive(nextIndex);
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="mt-20 bg-muted/55 py-14 sm:mt-24 sm:py-16" aria-labelledby="home-developments-title">
      <div className="container-x">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm"><span className="h-px w-8 bg-primary" /> Lançamentos</p>
            <h2 id="home-developments-title" className="mt-2 max-w-3xl text-3xl sm:text-4xl md:text-5xl">Novos endereços para chamar de seu</h2>
          </div>
          <Link to="/empreendimentos" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-navy/20 bg-card px-5 text-sm font-bold text-navy transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mb-3 flex items-center justify-end gap-2 lg:hidden">
          <span className="mr-1 text-xs font-semibold text-muted-foreground" aria-live="polite">{active + 1} / {featuredDevelopments.length}</span>
          <button type="button" aria-label="Empreendimento anterior" onClick={() => goTo(active - 1)} disabled={active === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-navy shadow-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" aria-label="Próximo empreendimento" onClick={() => goTo(active + 1)} disabled={active === featuredDevelopments.length - 1} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-navy shadow-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div ref={trackRef} onScroll={(event) => {
          const track = event.currentTarget;
          const center = track.getBoundingClientRect().left + track.clientWidth / 2;
          let nearest = 0;
          let distance = Number.POSITIVE_INFINITY;
          Array.from(track.children).forEach((child, index) => {
            const rect = child.getBoundingClientRect();
            const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
            if (nextDistance < distance) { distance = nextDistance; nearest = index; }
          });
          setActive(nearest);
        }} className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0" aria-label="Empreendimentos em destaque">
          {featuredDevelopments.map((development) => (
            <Link key={development.slug} to="/empreendimentos/$slug" params={{ slug: development.slug }} className="group relative block h-[390px] w-[84vw] max-w-[410px] shrink-0 snap-start overflow-hidden rounded-2xl bg-navy text-navy-foreground shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-[440px] sm:w-[70vw] lg:h-[470px] lg:w-auto lg:max-w-none">
              <img src={development.image} alt={`${development.name}, empreendimento em ${development.neighborhood}`} width={900} height={1100} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 transition group-hover:from-black/85" />
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:text-xs">{development.status}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{development.name}</h3>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm font-medium text-white/90">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{development.neighborhood}</span>
                  <span>{development.area}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-1 text-center text-xs text-muted-foreground lg:hidden">Use as setas ou deslize para conhecer os empreendimentos</p>
      </div>
    </section>
  );
}

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = [
    ...banners.map((banner) => ({ kind: "image" as const, ...banner })),
    ...properties.filter((property) => property.bannerFeatured).map((property) => ({ kind: "property" as const, property })),
  ];
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const move = (direction: number) => setCurrent((index) => (index + direction + slides.length) % slides.length);
  const pause = () => setPaused(true);
  const resume = () => setPaused(false);
  const activeIsProperty = slides[current]?.kind === "property";

  return (
    <section className="container-x relative mt-20 sm:mt-24" aria-label="Banners em destaque">
      <div className={`relative ${activeIsProperty ? "h-[450px] sm:h-[395px]" : "h-[210px] sm:h-[300px] md:h-[395px]"}`}>
        <div className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-primary sm:rounded-3xl" onPointerEnter={pause} onPointerLeave={resume} onFocusCapture={pause} onBlurCapture={resume}>
          {slides.map((slide, index) => {
            const active = index === current;
            if (slide.kind === "image") {
              return <img key={slide.alt} src={slide.img} alt={slide.alt} width={1600} height={640} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`} />;
            }
            return <PropertyBannerSlide key={slide.property.id} property={slide.property} active={active} />;
          })}
        </div>
        {slides.length > 1 && <>
          <button aria-label="Banner anterior" onClick={() => move(-1)} className={`absolute ${activeIsProperty ? "top-[110px] md:top-1/2" : "top-1/2"} -left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-navy shadow-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground md:-left-11 md:h-9 md:w-9`}><ChevronLeft className="h-4 w-4" /></button>
          <button aria-label="Próximo banner" onClick={() => move(1)} className={`absolute ${activeIsProperty ? "top-[110px] md:top-1/2" : "top-1/2"} -right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-navy shadow-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground md:-right-11 md:h-9 md:w-9`}><ChevronRight className="h-4 w-4" /></button>
        </>}
      </div>
    </section>
  );
}

function PropertyBannerSlide({ property, active }: { property: Property; active: boolean }) {
  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="grid h-full grid-cols-1 bg-card md:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[220px] overflow-hidden md:min-h-0">
          <img src={property.images[0]} alt={property.title} width={1600} height={640} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-card px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-navy sm:left-6 sm:top-6 sm:text-xs">Conheça este imóvel</span>
        </div>
        <div className="flex min-h-0 flex-col justify-center px-5 py-4 text-foreground sm:px-8 sm:py-6 md:px-9 lg:px-11">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary sm:text-xs">Imóvel selecionado</p>
          <p className="mt-1.5 text-xs font-semibold text-muted-foreground sm:mt-2 sm:text-sm">{property.neighborhood}, {property.city}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-tight sm:mt-3 sm:text-2xl lg:text-3xl">{property.title}</h3>
          <p className="mt-3 text-lg font-extrabold text-navy sm:mt-4 sm:text-xl">{property.bannerStartsAt ? "A partir de " : ""}{brl(property.price)}</p>
          <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">{property.area} m² <span className="px-1">·</span> {property.beds} quartos <span className="px-1">·</span> {property.parking} vagas</p>
          <Link to="/imoveis/$id" params={{ id: property.id }} className="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-navy-foreground transition hover:brightness-110 sm:mt-5">Ver imóvel</Link>
        </div>
      </div>
    </div>
  );
}

function OpportunityCarousel() {
  const opportunities = properties.filter((property) => property.opportunity);
  const [selectedId, setSelectedId] = useState<string | null>(opportunities[0]?.id ?? null);
  const [paused, setPaused] = useState(false);
  const selectable = opportunities.slice(0, 3);
  useEffect(() => {
    if (paused || selectable.length < 2) return;
    const timer = window.setInterval(() => {
      setSelectedId((activeId) => {
        const activeIndex = selectable.findIndex((property) => property.id === activeId);
        return selectable[(activeIndex + 1 + selectable.length) % selectable.length]?.id ?? null;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [selectable, paused]);
  if (!opportunities.length) return null;
  const primary = selectable.find((property) => property.id === selectedId) ?? selectable[0]!;

  return (
    <section id="home-opportunities" className="container-x mt-20 scroll-mt-8 sm:mt-24" aria-label="Vitrine de oportunidades">
      <div className="flex flex-wrap items-start justify-between gap-4 sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">Oportunidades</p><h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">Imóveis que merecem sua atenção</h2></div>
        <Link to="/imoveis" search={{ oportunidade: true }} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-navy transition hover:border-primary hover:text-primary">Ver todas as oportunidades <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-7 grid gap-3 sm:mt-10 md:grid-cols-[minmax(0,1.85fr)_minmax(300px,0.95fr)]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
        <OpportunityFeatured key={primary.id} property={primary} />
        <aside className="hidden gap-2 md:grid md:grid-rows-3">
          {selectable.map((property) => <OpportunityListItem key={property.id} property={property} active={property.id === primary.id} onSelect={() => setSelectedId(property.id)} />)}
        </aside>
      </div>
      {selectable.length > 0 && <OpportunityMobileRail properties={selectable} selectedId={primary.id} onSelect={(property) => setSelectedId(property.id)} />}
    </section>
  );
}

function OpportunityFeatured({ property }: { property: Property }) {
  return (
    <Link to="/imoveis/$id" params={{ id: property.id }} className="group relative block min-h-[370px] overflow-hidden rounded-2xl bg-navy text-navy-foreground shadow-card sm:min-h-[400px] md:min-h-[440px]">
      <img src={property.images[0]} alt={property.title} width={1024} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
      <div className="relative flex min-h-[370px] flex-col justify-end p-5 sm:min-h-[400px] sm:p-6 md:min-h-[440px] md:p-8">
        <span className="mb-auto w-fit rounded-full bg-card px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">Oportunidade</span>
        <p className="text-xs font-bold text-navy-foreground/80">{property.city} – {property.neighborhood}</p>
        <div className="mt-3 flex items-end justify-between gap-4"><h3 className="line-clamp-2 max-w-2xl text-xl leading-tight sm:text-2xl md:text-4xl">{property.title}</h3><p className="hidden shrink-0 text-right text-lg font-bold sm:block">{brl(property.price)}</p></div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2"><p className="text-base font-bold sm:hidden">{brl(property.price)}</p>{property.specialCondition && <p className="max-w-full text-sm font-semibold text-navy-foreground/85">{property.specialCondition}</p>}<span className="ml-auto shrink-0 text-sm font-bold underline underline-offset-4">Ver imóvel</span></div>
      </div>
    </Link>
  );
}

function OpportunityListItem({ property, active, onSelect }: { property: Property; active: boolean; onSelect: () => void }) {
  return (
    <button type="button" aria-pressed={active} onClick={onSelect} className={`group w-full rounded-2xl border bg-card p-4 text-left transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${active ? "border-primary ring-1 ring-primary" : "border-border"}`}>
      <p className="text-xs font-semibold text-muted-foreground">{property.city} – {property.neighborhood}</p>
      <h3 className="mt-1 line-clamp-2 text-base leading-tight text-foreground">{property.title}</h3>
      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted-foreground"><span>{property.area} m²</span><span>• {property.beds} quartos</span><span>• {property.suites} suítes</span><span>• {property.baths} banheiros</span><span>• {property.parking} vagas</span></div>
      <p className="mt-2 text-sm font-bold text-foreground">{brl(property.price)}</p>
    </button>
  );
}

function OpportunityMobileRail({ properties, selectedId, onSelect }: { properties: Property[]; selectedId: string | null; onSelect: (property: Property) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const scrollTo = (index: number) => {
    const item = track.current?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };
  if (!properties.length) return null;
  return <div className="mt-4 md:hidden">
    <div className="mb-2 flex items-center justify-between px-1"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mais oportunidades</p><p className="text-[11px] text-muted-foreground">Deslize para ver mais</p></div>
    <div ref={track} onScroll={(event) => {
      const element = event.currentTarget;
      const first = element.firstElementChild as HTMLElement | null;
      const step = first ? first.offsetWidth + 12 : element.clientWidth;
      setActive(Math.min(properties.length - 1, Math.round(element.scrollLeft / step)));
    }} className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {properties.map((property, index) => <div key={property.id} className="w-[86%] shrink-0 snap-start">
        <OpportunityListItem property={property} active={property.id === selectedId} onSelect={() => onSelect(property)} />
      </div>)}
    </div>
    {properties.length > 1 && <div className="mt-1 flex justify-center gap-1.5" aria-label="Navegação das oportunidades">
      {properties.map((property, index) => <button key={property.id} type="button" aria-label={`Ver oportunidade ${index + 2}`} aria-current={active === index ? "true" : undefined} onClick={() => scrollTo(index)} className={`h-1.5 rounded-full transition-all ${active === index ? "w-5 bg-primary" : "w-1.5 bg-border"}`} />)}
    </div>}
  </div>;
}

function ExploreBanners() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const max = Math.max(0, hoods.length - perView);
  const current = Math.min(index, max);
  const move = (direction: -1 | 1) => setIndex((value) => Math.max(0, Math.min(max, value + direction)));
  const arrow = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-card text-navy shadow-sm transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-35";

  return <section className="container-x mt-20 sm:mt-24" aria-label="Explore mais">
    <div className="flex items-end justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">Explore mais</p><h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">Descubra o que preparamos para você</h2></div>
      <div className="mb-1 flex shrink-0 gap-1.5">
        <button type="button" aria-label="Mini banners anteriores" disabled={current === 0} onClick={() => move(-1)} className={arrow}><ChevronLeft className="h-4 w-4" /></button>
        <button type="button" aria-label="Próximos mini banners" disabled={current >= max} onClick={() => move(1)} className={arrow}><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
    <div className="mt-7 overflow-hidden sm:mt-10">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${(current * 100) / perView}%)` }}>
        {hoods.map((h) => (
          <div key={h.name} className="shrink-0 px-1.5 sm:px-2.5" style={{ width: `${100 / perView}%` }}>
            <Link to="/imoveis" search={{ q: h.name.split(" ")[0] }} className="group relative block h-72 overflow-hidden rounded-2xl sm:h-80">
              <img src={h.img} alt={h.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-hero-overlay" />
              <div className="absolute bottom-0 p-5 text-navy-foreground sm:p-6">
                <p className="text-xs uppercase tracking-widest text-navy-foreground/70">{h.city}</p>
                <h3 className="text-2xl">{h.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 flex items-center justify-center gap-2" aria-label="Indicadores dos mini banners">
      {hoods.map((hood, itemIndex) => (
        <span
          key={hood.name}
          aria-hidden="true"
          className={`h-1.5 rounded-full transition-all duration-300 ${itemIndex === current ? "w-5 bg-primary" : "w-1.5 bg-primary/25"}`}
        />
      ))}
    </div>
  </section>;
}

function CategoryCarousel() {
  const [i, setI] = useState(0);
  const [per, setPer] = useState(4);
  useEffect(() => {
    const f = () => setPer(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 1);
    f(); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f);
  }, []);
  const max = cats.length - per;
  const idx = Math.min(i, max);
  const arrow = "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-navy shadow-card transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40";
  return (
    <section className="container-x relative z-10 -mt-8 sm:-mt-10">
      <div className="relative px-1 sm:px-2">
        <button aria-label="Anterior" disabled={idx === 0} onClick={() => setI(Math.max(0, idx - 1))} className={`${arrow} left-0 sm:-left-3`}><ChevronLeft className="h-5 w-5" /></button>
        <div className="overflow-hidden py-2">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${(idx * 100) / per}%)` }}>
            {cats.map((c) => (
              <div key={c.label} className="shrink-0 px-2" style={{ width: `${100 / per}%` }}>
                <Link to="/imoveis" search={c.filtro === "permuta" ? { aceitaPermuta: "Sim" } : c.filtro === "financiamento" ? { aceitaFinanciamento: "Sim" } : { tipo: c.tipo }} className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:border-primary">
                  <span className="shrink-0 rounded-xl bg-accent p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-6 w-6" /></span>
                  <span className="min-w-0 truncate font-bold">{c.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button aria-label="Próximo" disabled={idx >= max} onClick={() => setI(Math.min(max, idx + 1))} className={`${arrow} right-0 sm:-right-3`}><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  );
}
