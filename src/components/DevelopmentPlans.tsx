import { useRef, useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Ruler,
} from "lucide-react";
import type {
  DevelopmentTower,
  DevelopmentPlan,
} from "@/data/development-plans";

const money = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

function FloorPlanIllustration({ plan }: { plan: DevelopmentPlan }) {
  return (
    <div
      className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-[#f3f5f7] p-5 sm:min-h-[340px]"
      aria-label={`Ilustração esquemática da ${plan.name}`}
    >
      <svg
        viewBox="0 0 360 250"
        role="img"
        aria-label={`Planta esquemática com ${plan.bedrooms} dormitórios`}
        className="h-full max-h-[320px] w-full max-w-[460px] drop-shadow-sm"
      >
        <rect
          x="18"
          y="18"
          width="324"
          height="214"
          rx="5"
          fill="#fff"
          stroke="#24364d"
          strokeWidth="4"
        />
        <path
          d="M18 118h112V18M130 118h105V18M235 18v84h107M130 118v114m0-74h105v74m0-114v40m105-40v128"
          fill="none"
          stroke="#24364d"
          strokeWidth="4"
        />
        <path
          d="M28 128h92v94H28zm112 10h85v84h-85zm105-110h87v64h-87zm0 76h87v118h-87z"
          fill="#edf1f4"
        />
        <text x="74" y="76" textAnchor="middle" fontSize="13" fill="#43536a">
          SALA / JANTAR
        </text>
        <text x="182" y="62" textAnchor="middle" fontSize="13" fill="#43536a">
          SUÍTE
        </text>
        <text x="288" y="60" textAnchor="middle" fontSize="13" fill="#43536a">
          QUARTO
        </text>
        <text x="74" y="176" textAnchor="middle" fontSize="13" fill="#43536a">
          VARANDA
        </text>
        <text x="182" y="180" textAnchor="middle" fontSize="13" fill="#43536a">
          COZINHA
        </text>
        <text x="288" y="170" textAnchor="middle" fontSize="13" fill="#43536a">
          QUARTO
        </text>
        <path
          d="M117 18v24m-24 76h24m118-22h24m-24 154v-24m-105-46h24m81-96h24m63 64h24"
          stroke="#c29a58"
          strokeWidth="3"
        />
      </svg>
      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-muted-foreground shadow-sm">
        Planta ilustrativa
      </span>
    </div>
  );
}

export function DevelopmentPlans({
  towers,
  developmentName,
  onRequestInfo,
}: {
  towers: DevelopmentTower[];
  developmentName: string;
  onRequestInfo?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [towerId, setTowerId] = useState(towers[0]?.id ?? "");
  const plansTrack = useRef<HTMLDivElement>(null);
  const selectedTower =
    towers.find((tower) => tower.id === towerId) ?? towers[0];
  const [planId, setPlanId] = useState(selectedTower?.plans[0]?.id ?? "");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mediaMode, setMediaMode] = useState<"photos" | "plan">("photos");
  const selectedPlan =
    selectedTower?.plans.find((plan) => plan.id === planId) ??
    selectedTower?.plans[0];
  if (!selectedTower || !selectedPlan) return null;

  const chooseTower = (id: string) => {
    const tower = towers.find((item) => item.id === id);
    setTowerId(id);
    setPlanId(tower?.plans[0]?.id ?? "");
    setPhotoIndex(0);
    setMediaMode("photos");
    plansTrack.current?.scrollTo({ left: 0, behavior: "smooth" });
  };
  const choosePlan = (id: string) => {
    setPlanId(id);
    setPhotoIndex(0);
    setMediaMode("photos");
  };

  return (
    <section
      className="scroll-mt-28 py-8 md:py-10"
      aria-labelledby="development-plans-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Torres e plantas
          </p>
          <h2
            id="development-plans-title"
            className="mt-2 text-2xl font-bold text-navy md:text-3xl"
          >
            Unidades disponíveis
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Explore as torres e compare as plantas de {developmentName}.
          </p>
        </div>
        {onRequestInfo && (
          <a
            href="#interesse"
            onClick={onRequestInfo}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold text-primary transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Consultar disponibilidade <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border bg-card p-4 sm:grid-cols-3 sm:p-5">
        {[
          { label: "Torre", value: selectedTower.name },
          { label: "Status", value: selectedTower.status },
          {
            label: "Pavimentos",
            value: `${selectedTower.floors} andares · ${selectedTower.unitsCount} plantas`,
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-navy">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {towers.length > 1 && (
        <div
          className="mt-5 grid grid-cols-3 gap-2 lg:flex lg:flex-wrap"
          role="tablist"
          aria-label="Torres do empreendimento"
        >
          {towers.map((tower) => (
            <button
              key={tower.id}
              id={`tower-tab-${tower.id}`}
              type="button"
              role="tab"
              aria-selected={tower.id === selectedTower.id}
              aria-controls="tower-plans-panel"
              onClick={() => chooseTower(tower.id)}
              className={`min-h-11 min-w-0 rounded-full border px-2 py-2 text-[11px] font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm lg:min-h-0 lg:shrink-0 lg:px-4 lg:py-2.5 ${tower.id === selectedTower.id ? "border-navy bg-navy text-white" : "bg-card text-navy hover:border-primary"}`}
            >
              {tower.name}
            </button>
          ))}
        </div>
      )}

      <div
        id="tower-plans-panel"
        role="tabpanel"
        aria-labelledby={`tower-tab-${selectedTower.id}`}
        className="mt-4"
      >
        <div className="mb-2 flex items-center justify-between gap-3 lg:hidden">
          <p className="text-[11px] font-semibold text-muted-foreground">
            Plantas · {selectedTower.plans.length} opções
          </p>
          {selectedTower.plans.length > 2 && (
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Plantas anteriores"
                onClick={() =>
                  plansTrack.current?.scrollBy({
                    left: -Math.max(
                      (plansTrack.current?.clientWidth ?? 0) * 0.85,
                      240,
                    ),
                    behavior: "smooth",
                  })
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-navy transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Próximas plantas"
                onClick={() =>
                  plansTrack.current?.scrollBy({
                    left: Math.max(
                      (plansTrack.current?.clientWidth ?? 0) * 0.85,
                      240,
                    ),
                    behavior: "smooth",
                  })
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-navy transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div
          ref={plansTrack}
          className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          aria-label="Plantas cadastradas"
        >
          {selectedTower.plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              aria-pressed={plan.id === selectedPlan.id}
              onClick={() => choosePlan(plan.id)}
              className={`w-[calc((100%-0.5rem)/2)] min-w-[calc((100%-0.5rem)/2)] snap-start rounded-xl border bg-card p-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-full sm:min-w-0 sm:p-3 ${plan.id === selectedPlan.id ? "border-primary ring-1 ring-primary/40" : "hover:border-primary/50"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-primary">
                    Código {plan.code} · {plan.type}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-navy">
                    {plan.name}
                  </h3>
                </div>
                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${plan.id === selectedPlan.id ? "border-primary bg-primary text-white" : "text-transparent"}`}
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Ruler className="h-3 w-3" />
                  {plan.area.toLocaleString("pt-BR")} m²
                </span>
                <span className="inline-flex items-center gap-1">
                  <BedDouble className="h-3 w-3" />
                  {plan.bedrooms} quartos
                </span>
                <span className="inline-flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  {plan.bathrooms} banheiros
                </span>
                <span className="inline-flex items-center gap-1">
                  <Car className="h-3 w-3" />
                  {plan.parking} vagas
                </span>
              </div>
            </button>
          ))}
        </div>

        <article className="mt-4 overflow-hidden rounded-2xl border bg-card">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="p-3 sm:p-4">
              <div
                className="mb-3 inline-flex rounded-full bg-secondary p-1"
                role="tablist"
                aria-label="Conteúdo da planta"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaMode === "photos"}
                  onClick={() => setMediaMode("photos")}
                  className={`min-h-9 rounded-full px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mediaMode === "photos" ? "bg-card text-navy shadow-sm" : "text-muted-foreground hover:text-navy"}`}
                >
                  Fotos
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaMode === "plan"}
                  onClick={() => setMediaMode("plan")}
                  className={`min-h-9 rounded-full px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mediaMode === "plan" ? "bg-card text-navy shadow-sm" : "text-muted-foreground hover:text-navy"}`}
                >
                  Planta
                </button>
              </div>
              {mediaMode === "photos" ? (
                <div
                  className="space-y-2.5"
                  role="tabpanel"
                  aria-label={`Fotos de ${selectedPlan.name}`}
                >
                  <div className="relative">
                    <img
                      src={
                        selectedPlan.images[photoIndex] ??
                        selectedPlan.images[0]
                      }
                      alt={`${selectedPlan.name} — foto ${photoIndex + 1}`}
                      className="aspect-[16/10] w-full rounded-xl object-cover"
                    />
                    {selectedPlan.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Foto anterior"
                          onClick={() =>
                            setPhotoIndex(
                              (index) =>
                                (index - 1 + selectedPlan.images.length) %
                                selectedPlan.images.length,
                            )
                          }
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-navy/75 text-white shadow-md backdrop-blur-sm transition hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Próxima foto"
                          onClick={() =>
                            setPhotoIndex(
                              (index) =>
                                (index + 1) % selectedPlan.images.length,
                            )
                          }
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-navy/75 text-white shadow-md backdrop-blur-sm transition hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <span
                          aria-live="polite"
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/85 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm lg:hidden"
                        >
                          Foto {photoIndex + 1} de {selectedPlan.images.length}{" "}
                          · ilustrativa
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className="grid grid-cols-3 gap-2"
                    aria-label="Fotos da planta selecionada"
                  >
                    {selectedPlan.images.map((image, index) => (
                      <button
                        key={`${selectedPlan.id}-photo-${index}`}
                        type="button"
                        aria-label={`Ver foto ${index + 1} de ${selectedPlan.name}`}
                        aria-pressed={photoIndex === index}
                        onClick={() => setPhotoIndex(index)}
                        className={`overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${photoIndex === index ? "border-primary" : "border-transparent opacity-75 hover:opacity-100"}`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="aspect-[16/10] w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  role="tabpanel"
                  aria-label={`Planta de ${selectedPlan.name}`}
                >
                  <FloorPlanIllustration plan={selectedPlan} />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start border-t p-5 sm:p-6 lg:border-l lg:border-t-0">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {selectedTower.name} · {selectedPlan.floor}
                </p>
                <h3 className="mt-1 text-xl font-bold text-navy">
                  {selectedPlan.name} — {selectedPlan.suites} suítes
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Área privativa de {selectedPlan.area.toLocaleString("pt-BR")}{" "}
                  m²
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {selectedPlan.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 rounded-xl bg-secondary/60 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Faixa de valores
                </p>
                <p className="mt-1 font-display text-xl text-navy">
                  {money(selectedPlan.minPrice)}
                </p>
                <p className="text-xs text-muted-foreground">
                  até {money(selectedPlan.maxPrice)}
                </p>
                <div className="my-3 border-t border-border" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Entrada a partir de
                </p>
                <p className="mt-1 text-sm font-bold text-navy">
                  {money(selectedPlan.entry)}
                </p>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Parcelas mensais e anuais sob consulta.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t px-5 py-3 text-[10px] leading-relaxed text-muted-foreground sm:px-6">
            Valores, imagens e condições ilustrativos, sujeitos à tabela vigente
            e confirmação da incorporadora.
          </div>
        </article>
      </div>
    </section>
  );
}
