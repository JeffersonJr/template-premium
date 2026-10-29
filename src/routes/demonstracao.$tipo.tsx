import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bath,
  BedDouble,
  Car,
  Check,
  MapPin,
  Menu,
  Maximize,
  Navigation,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  brl,
  properties,
  formatPrice,
  PHONE,
  PHONE_LABEL,
  propertySeoTitle,
  rentPrice,
} from "@/data/properties";
import logo from "@/assets/logo-optimized.png";
import banner1 from "@/assets/banner1.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import { ConsentFrame } from "@/components/CookieConsent";
import { DevelopmentPlans } from "@/components/DevelopmentPlans";
import { sampleDevelopmentTowers } from "@/data/development-plans";

const demoTypes = [
  "imovel-com-valor",
  "imovel-sem-valor",
  "empreendimento-com-valor",
  "empreendimento-sem-valor",
] as const;
type DemoType = (typeof demoTypes)[number];
const sampleProperty = properties[1]!;
const development = {
  name: "Skyline Residences",
  title:
    "Skyline Residences, com 2 a 4 quartos, 98 a 210 m² - Itaim Bibi - São Paulo/SP",
  place: "Itaim Bibi · São Paulo/SP",
  price: "R$ 1,9 mi",
  status: "Lançamento",
  delivery: "Dezembro de 2028",
  description:
    "Arquitetura contemporânea, interiores cheios de luz e um endereço que coloca São Paulo aos seus pés. Um projeto pensado para quem valoriza tempo, privacidade e uma experiência residencial sem excessos.",
  images: [banner1, p1, p2, sampleProperty.images[0]!],
  video: sampleProperty.video,
};

function youtubeEmbedUrl(value?: string) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let id = "";
    if (host === "youtu.be")
      id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    else if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
    ) {
      id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ??
        "";
    }
    return /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0`
      : undefined;
  } catch {
    return undefined;
  }
}

export const Route = createFileRoute("/demonstracao/$tipo")({
  loader: ({ params }) => {
    if (!demoTypes.includes(params.tipo as DemoType)) throw notFound();
    return params.tipo as DemoType;
  },
  head: ({ loaderData }) => {
    const isDevelopment = loaderData?.startsWith("empreendimento");
    const hasPrice = loaderData?.endsWith("com-valor");
    const seoTitle = isDevelopment
      ? development.title
      : hasPrice
        ? propertySeoTitle(sampleProperty)
        : `${sampleProperty.type} com ${sampleProperty.beds} dormitórios à venda e para alugar, ${sampleProperty.area} m² — ${sampleProperty.neighborhood} — ${sampleProperty.city}/SP`;
    return {
      meta: [
        { title: `${seoTitle} | Premium House` },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen p-10 text-center">
      <h1 className="text-3xl">Modelo não encontrado</h1>
      <Link
        to="/demonstracao"
        className="mt-5 inline-block font-bold text-primary"
      >
        Voltar às demonstrações
      </Link>
    </main>
  ),
  component: DemoDetail,
});

function DemoDetail() {
  const tipo = Route.useLoaderData();
  const isDevelopment = tipo.startsWith("empreendimento");
  const hasPrice = tipo.endsWith("com-valor");
  const property = sampleProperty;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllNearby, setShowAllNearby] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const subject = isDevelopment ? development.name : property.title;
  const title = isDevelopment
    ? development.title
    : hasPrice
      ? propertySeoTitle(property)
      : `${property.type} com ${property.beds} dormitórios à venda e para alugar, ${property.area} m² — ${property.neighborhood} — ${property.city}/SP`;
  const contactMessage = `Olá! Tenho interesse no ${subject}.`;
  const scrollToForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const form = document.getElementById("formulario-demo");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    form.focus({ preventScroll: true });
  };
  const images = isDevelopment ? development.images : property.images;
  const videoUrl = youtubeEmbedUrl(
    isDevelopment ? development.video : property.video,
  );
  const description = `${property.description} Conheça pessoalmente cada detalhe deste imóvel selecionado pela Premium House.`;
  const featureGroups: [string, string[]][] = [
    ["Diferenciais", property.amenities],
    ...Object.entries(property.features),
  ];
  const featureCount = featureGroups.reduce(
    (total, [, items]) => total + items.length,
    0,
  );
  const specs = [
    {
      icon: Maximize,
      value: isDevelopment ? "98 a 210 m²" : `${property.area} m²`,
      label: "Área útil",
    },
    {
      icon: BedDouble,
      value: isDevelopment ? "2 a 4" : property.beds,
      label: "Quartos",
    },
    {
      icon: Sparkles,
      value: isDevelopment ? "2 a 4" : property.suites,
      label: "Suítes",
    },
    {
      icon: Bath,
      value: isDevelopment ? "2 a 5" : property.baths,
      label: "Banheiros",
    },
    {
      icon: Car,
      value: isDevelopment ? "2 a 3" : property.parking,
      label: "Vagas",
    },
  ];
  const pageSections = isDevelopment
    ? [
        { id: "sobre", label: "Sobre" },
        { id: "ficha-tecnica", label: "Ficha técnica" },
        { id: "unidades", label: "Unidades" },
        { id: "video", label: "Vídeo" },
      ]
    : [
        { id: "sobre", label: "Sobre" },
        { id: "ficha-tecnica", label: "Ficha técnica" },
        { id: "caracteristicas", label: "Características" },
        { id: "localizacao", label: "Localização" },
        { id: "video", label: "Vídeo" },
      ];

  return (
    <div className="min-h-screen bg-background pb-20 text-sm text-foreground lg:pb-0 md:text-[15px]">
      <header className="sticky top-0 z-40 border-b border-primary-foreground/15 bg-primary text-primary-foreground shadow-sm">
        <div className="bg-navy text-center text-[11px] font-medium text-navy-foreground lg:hidden">
          <div className="container-x flex h-8 items-center justify-center">
            CRECI 00000-J <span className="mx-2 opacity-60">·</span> Atendimento de seg. a sáb.
          </div>
        </div>
        <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-[72px]">
          <img
            src={logo}
            alt="Premium House"
            className="h-11 w-auto shrink-0 rounded bg-white p-1.5 sm:h-12 md:h-14"
          />
          <nav
            aria-label="Etapas da página"
            className="hidden items-center gap-1 xl:flex"
          >
            {pageSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full px-3 py-2 text-xs font-semibold text-primary-foreground/85 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`tel:+${PHONE}`}
              aria-label={`Ligar para a imobiliária: ${PHONE_LABEL}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition hover:bg-primary-foreground/10 md:h-auto md:w-auto md:gap-2 md:px-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden text-sm font-semibold md:inline">
                {PHONE_LABEL}
              </span>
            </a>
            <a
              href="#formulario-demo"
              onClick={scrollToForm}
              className="hidden rounded-full bg-whatsapp px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 sm:inline-flex sm:px-5 sm:text-sm"
            >
              Fale com um especialista
            </a>
            <button
              type="button"
              aria-label={
                menuOpen ? "Fechar menu da página" : "Abrir menu da página"
              }
              aria-expanded={menuOpen}
              aria-controls="demo-page-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary-foreground/10 xl:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div
            id="demo-page-menu"
            className="absolute inset-x-0 top-full border-t border-primary-foreground/15 bg-primary px-4 py-4 shadow-xl xl:hidden"
          >
            <nav
              aria-label="Etapas da página"
              className="container-x grid gap-1 sm:grid-cols-2"
            >
              {pageSections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/15 text-xs">
                    {index + 1}
                  </span>
                  {section.label}
                  <ArrowRight className="ml-auto h-4 w-4 opacity-70" />
                </a>
              ))}
              <a
                href={`tel:+${PHONE}`}
                className="mt-2 flex min-h-11 items-center gap-3 rounded-lg border-t border-primary-foreground/15 px-3 pt-3 text-sm font-semibold sm:col-span-2"
              >
                <Phone className="h-4 w-4" /> {PHONE_LABEL}
                <span className="ml-auto text-xs text-primary-foreground/70">
                  Ligar para a imobiliária
                </span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <section
        id="topo"
        className="relative flex min-h-[660px] items-end overflow-hidden bg-primary text-primary-foreground md:min-h-[700px]"
      >
        <div className="container-x grid w-full gap-8 pb-10 pt-28 md:pb-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wide">
              <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-primary-foreground">
                {isDevelopment ? development.status : property.purpose}
              </span>
              <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-primary-foreground">
                {isDevelopment ? "Empreendimento" : property.type}
              </span>
              {!isDevelopment && property.tag && (
                <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-primary-foreground">
                  {property.tag}
                </span>
              )}
              {!isDevelopment && (
                <span className="rounded-full border border-primary-foreground/35 px-3 py-1.5 text-primary-foreground/85">
                  Cód. {property.id}
                </span>
              )}
            </div>
            <p className="mt-3 text-xs font-semibold text-primary-foreground/75">
              {isDevelopment
                ? development.place
                : `${property.neighborhood}, ${property.city}`}
            </p>
            <h1 className="mt-3 max-w-3xl text-[28px] font-bold leading-tight tracking-tight text-primary-foreground">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85 md:text-[15px]">
              {isDevelopment ? development.description : property.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {specs.map((spec) => (
                <span
                  key={spec.label}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  <spec.icon className="h-4 w-4" />
                  {spec.value} {spec.label.toLowerCase()}
                </span>
              ))}
            </div>
            <a
              href="#sobre"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary-foreground/90 transition hover:text-primary-foreground"
            >
              Conheça os detalhes <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <aside
            id="formulario-demo"
            tabIndex={-1}
            className="scroll-mt-24 rounded-3xl bg-white p-5 text-foreground shadow-2xl outline-none md:p-6"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-muted-foreground">
              Atendimento Premium House
            </p>
            <h2 className="mt-1.5 text-[11px] font-bold tracking-tight text-navy">
              Fale com nossa equipe
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Deixe seus dados para receber todos os detalhes.
            </p>
            <div className="mt-4">
              <LeadForm
                compact
                subject={subject}
                cta="Solicitar informações"
                withMessage={false}
                whatsapp={contactMessage}
              />
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Seus dados
              estão protegidos
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-label="Galeria de fotos"
        className="container-x relative z-10 -mt-5 md:-mt-8"
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {images.slice(0, 3).map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={
                index === 2
                  ? "Ver todas as fotos"
                  : `Abrir foto ${index + 1} na galeria`
              }
              onClick={() => setGalleryOpen(true)}
              className={`group relative overflow-hidden rounded-xl text-left shadow-card md:rounded-2xl ${index === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/3]" : "aspect-square md:aspect-[4/3]"}`}
            >
              <img
                src={image}
                alt={`${subject} · foto ${index + 1}`}
                className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${index === 2 ? "blur-[2px] brightness-50" : ""}`}
              />
              {index === 2 && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full border border-white/80 bg-navy/80 px-4 py-2 text-xs font-bold text-white shadow-lg md:px-5 md:py-2.5 md:text-sm">
                    Ver mais fotos
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="left-0 top-0 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 grid-rows-[auto_minmax(0,1fr)] gap-3 rounded-none p-4 sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[90vh] sm:w-[min(92vw,1100px)] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:p-6">
          <DialogHeader className="pr-10 text-left">
            <DialogTitle className="text-xl font-bold text-navy">
              Fotos de {subject}
            </DialogTitle>
            <DialogDescription>
              {images.length} imagens · deslize para explorar a galeria
            </DialogDescription>
          </DialogHeader>
          <div className="grid min-h-0 grid-cols-1 gap-3 overflow-y-auto overscroll-contain sm:grid-cols-2">
            {images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${subject} · foto ${index + 1}`}
                className="aspect-[4/3] w-full rounded-xl bg-muted object-cover"
                loading={index > 2 ? "lazy" : undefined}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <main className="container-x py-9 md:py-12">
        <section
          id="ficha-tecnica"
          className="scroll-mt-24 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3"
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border bg-card p-3 text-center sm:p-4"
            >
              <spec.icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-extrabold text-navy">
                {spec.value}
              </p>
              <p className="text-xs text-muted-foreground">{spec.label}</p>
            </div>
          ))}
        </section>

        {isDevelopment ? (
          <section
            id="sobre"
            className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Sobre o empreendimento
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-navy md:text-2xl">
                Um projeto contemporâneo no Itaim Bibi
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                {development.description}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["Dormitórios", "2 a 4"],
                  ["Suítes", "2 a 4"],
                  ["Banheiros", "2 a 5"],
                  ["Vagas", "2 a 3"],
                  ["Previsão de entrega", development.delivery],
                  ["Localização", development.place],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b py-3"
                  >
                    <span className="text-sm text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-right text-sm font-semibold text-navy">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Condições
                </p>
                <p className="mt-1 text-xl font-bold text-navy">
                  {hasPrice
                    ? `A partir de ${development.price}`
                    : "Preço sob consulta"}
                </p>
              </div>
            </div>
            <div className="h-fit rounded-2xl bg-secondary/50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Diferenciais
              </p>
              <div className="mt-4 space-y-3">
                {[
                  "Projeto contemporâneo",
                  "Plantas bem distribuídas",
                  "Localização privilegiada",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-navy"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            <section
              id="sobre"
              className="mt-10 rounded-2xl border bg-card p-5 md:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Sobre o imóvel
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-navy md:text-2xl">
                Conforto, lazer e integração no Itaim Bibi
              </h2>
              <p
                className={`mt-3 leading-relaxed text-muted-foreground ${showAllDescription ? "" : "line-clamp-5 md:line-clamp-none"}`}
              >
                {description}
              </p>
              {description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setShowAllDescription((value) => !value)}
                  aria-expanded={showAllDescription}
                  className="mt-2 text-sm font-bold text-primary hover:underline md:hidden"
                >
                  {showAllDescription ? "Ver menos" : "Ver mais"}
                </button>
              )}
              <dl className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [
                    property.purpose === "Venda"
                      ? "Valor de venda"
                      : "Valor de venda",
                    hasPrice ? formatPrice(property) : "Consulte valores",
                  ],
                  ...(rentPrice(property)
                    ? [
                        [
                          "Aluguel",
                          hasPrice
                            ? `${brl(rentPrice(property)!)} /mês`
                            : "Consulte valores",
                        ],
                      ]
                    : []),
                  [
                    "Condomínio",
                    hasPrice
                      ? `${brl(property.condo)}/mês`
                      : "Consulte condições",
                  ],
                  [
                    "IPTU",
                    hasPrice
                      ? `${brl(property.iptu)}/ano`
                      : "Consulte condições",
                  ],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 font-bold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              id="caracteristicas"
              className="mt-8 scroll-mt-24 rounded-2xl border bg-card p-5 md:p-7"
            >
              <h2 className="text-xl font-bold text-navy md:text-2xl">
                Características
              </h2>
              <div className="mt-6 grid gap-7 sm:grid-cols-2">
                {(() => {
                  let offset = 0;
                  return featureGroups.map(([group, items]) => {
                    const groupStart = offset;
                    offset += items.length;
                    return (
                      <div
                        key={group}
                        className={`${group === "Diferenciais" ? "sm:col-span-2" : ""} ${!showAllFeatures && groupStart >= 8 ? "hidden md:block" : ""}`}
                      >
                        <h3 className="mb-3 text-base font-semibold text-navy">
                          {group}
                        </h3>
                        <ul
                          className={`grid gap-2.5 ${group === "Diferenciais" ? "sm:grid-cols-3" : ""}`}
                        >
                          {items.map((item, index) => (
                            <li
                              key={item}
                              className={`flex items-center gap-2 text-sm text-muted-foreground ${!showAllFeatures && groupStart + index >= 8 ? "hidden md:flex" : ""}`}
                            >
                              <Check className="h-5 w-5 shrink-0 rounded-full bg-secondary p-0.5 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  });
                })()}
              </div>
              {featureCount > 8 && (
                <div className="mt-5 flex justify-center md:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAllFeatures((value) => !value)}
                    aria-expanded={showAllFeatures}
                    className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                  >
                    {showAllFeatures ? "Ver menos" : "Ver mais características"}
                  </button>
                </div>
              )}
            </section>

            <section
              id="localizacao"
              className="mt-8 scroll-mt-24 rounded-2xl border bg-card p-5 md:p-7"
            >
              <h2 className="text-xl font-bold text-navy md:text-2xl">
                Localização e proximidades
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {property.neighborhood}, {property.city}
              </p>
              <div className="mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-muted md:aspect-[16/6]">
                <ConsentFrame
                  title={`Mapa da região de ${property.neighborhood}`}
                  className="h-full w-full"
                  src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=14&output=embed`}
                />
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {property.nearby.map((nearby, index) => (
                  <li
                    key={nearby.name}
                    className={`flex items-center gap-2 rounded-xl bg-secondary/70 px-4 py-3 text-sm font-semibold text-navy ${!showAllNearby && index >= 3 ? "hidden md:flex" : ""}`}
                  >
                    <Navigation className="h-4 w-4 shrink-0 text-primary" />
                    {nearby.name}
                  </li>
                ))}
              </ul>
              {property.nearby.length > 3 && (
                <div className="mt-4 flex justify-center md:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAllNearby((value) => !value)}
                    aria-expanded={showAllNearby}
                    className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                  >
                    {showAllNearby ? "Ver menos" : "Ver mais proximidades"}
                  </button>
                </div>
              )}
              {property.nearby.length > 9 && (
                <div className="mt-4 hidden justify-center md:flex">
                  <button
                    type="button"
                    onClick={() => setShowAllNearby((value) => !value)}
                    aria-expanded={showAllNearby}
                    className="rounded-full border border-navy px-5 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                  >
                    {showAllNearby ? "Ver menos" : "Ver mais proximidades"}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        <section
          id="video"
          aria-labelledby="video-heading"
          className="mt-10 scroll-mt-24 border-t pt-8 md:mt-12 md:pt-10"
        >
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Conheça em vídeo
            </p>
            <h2
              id="video-heading"
              className="mt-2 text-xl font-bold tracking-tight text-navy md:text-2xl"
            >
              Veja cada detalhe com mais calma
            </h2>
          </div>
          <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl bg-navy shadow-card">
            {videoUrl ? (
              <ConsentFrame
                src={videoUrl}
                title={`Vídeo de ${subject}`}
                className="h-full w-full"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/10">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                <p className="mt-4 font-semibold">O vídeo será exibido aqui</p>
                <p className="mt-1 max-w-md text-sm text-white/70">
                  Adicione um link do YouTube no cadastro para apresentar o
                  imóvel ou empreendimento em vídeo.
                </p>
              </div>
            )}
          </div>
        </section>

        {isDevelopment && (
          <div id="unidades" className="mt-12 scroll-mt-24 border-t pt-6 md:mt-14 md:pt-8">
            <DevelopmentPlans
              towers={sampleDevelopmentTowers}
              developmentName={development.name}
              onRequestInfo={scrollToForm}
            />
          </div>
        )}

        <section className="mt-12 grid gap-6 border-t pt-8 md:mt-14 md:grid-cols-2 md:items-center md:pt-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Vamos conversar?
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-navy md:text-2xl">
              {isDevelopment
                ? "Descubra se este projeto combina com você"
                : "Agende uma conversa sobre este imóvel"}
            </h2>
          </div>
          <a
            href="#formulario-demo"
            onClick={scrollToForm}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            Solicitar informações <ArrowRight className="h-4 w-4" />
          </a>
        </section>

      </main>

      <footer className="border-t bg-navy py-6 text-white">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <img
            src={logo}
            alt="Premium House"
            className="h-8 w-auto rounded bg-white p-1"
          />
          <p className="text-xs text-white/70">
            Exemplo visual · Valores e disponibilidade ilustrativos
          </p>
          <Link
            to="/demonstracao"
            className="text-xs font-semibold text-white/85 hover:text-white"
          >
            Ver outros modelos
          </Link>
        </div>
      </footer>
      <div className="fixed inset-x-3 bottom-3 z-30 rounded-2xl border bg-white/95 p-2 shadow-float backdrop-blur lg:hidden">
        <a
          href="#formulario-demo"
          onClick={scrollToForm}
          className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground"
        >
          Solicitar informações
        </a>
      </div>
    </div>
  );
}
