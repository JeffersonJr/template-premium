import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutGrid, List as ListIcon, Search, SlidersHorizontal, X } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { FormSelect } from "@/components/ui/form-select";
import { PropertyRow } from "@/components/PropertyRow";
import { isRent, isSale, isSeasonal, properties } from "@/data/properties";
import { formatThousands, parseIntegerInput } from "@/lib/input-masks";

type S = string | undefined;
type N = number | undefined;
type Search = { finalidade?: S; oportunidade?: boolean; tipo?: S; q?: S; cidade?: S; bairro?: S; quartos?: N; suites?: N; vagas?: N; banheiros?: N; precoMin?: N; precoMax?: N; areaMin?: N; areaMax?: N; mobiliado?: "Sim" | "Não" | undefined; aceitaPet?: "Sim" | "Não" | undefined; aceitaPermuta?: "Sim" | "Não" | undefined; aceitaFinanciamento?: "Sim" | "Não" | undefined; caracteristicas?: string[] | undefined; ordem?: S; view?: S };

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const num = (v: unknown) => (v !== undefined && v !== "" && !isNaN(Number(v)) ? Number(v) : undefined);

export const Route = createFileRoute("/imoveis/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const caracteristicas = Array.isArray(s["caracteristicas"]) ? s["caracteristicas"].filter((item): item is string => typeof item === "string") : [];
    return {
      finalidade: str(s["finalidade"]), oportunidade: s["oportunidade"] === true || s["oportunidade"] === "true" ? true : undefined, tipo: str(s["tipo"]), q: str(s["q"]), cidade: str(s["cidade"]), bairro: str(s["bairro"]),
      quartos: num(s["quartos"]), suites: num(s["suites"]), vagas: num(s["vagas"]), banheiros: num(s["banheiros"]),
      precoMin: num(s["precoMin"]), precoMax: num(s["precoMax"]), areaMin: num(s["areaMin"]), areaMax: num(s["areaMax"]),
      mobiliado: s["mobiliado"] === "Sim" || s["mobiliado"] === "Não" ? s["mobiliado"] : undefined,
      aceitaPet: s["aceitaPet"] === "Sim" || s["aceitaPet"] === "Não" ? s["aceitaPet"] : undefined,
      aceitaPermuta: s["aceitaPermuta"] === "Sim" || s["aceitaPermuta"] === "Não" ? s["aceitaPermuta"] : undefined,
      aceitaFinanciamento: s["aceitaFinanciamento"] === "Sim" || s["aceitaFinanciamento"] === "Não" ? s["aceitaFinanciamento"] : undefined,
      ...(caracteristicas.length ? { caracteristicas } : {}),
      ordem: str(s["ordem"]), view: str(s["view"]),
    };
  },
  head: ({ search }) => ({
    meta: [
      { title: "Imóveis à venda e para alugar | Premium House" },
      { name: "description", content: "Busque casas, apartamentos e coberturas por tipo, bairro, preço, área e número de quartos." },
      { property: "og:title", content: "Imóveis | Premium House" },
      { property: "og:description", content: "Busque imóveis à venda e para alugar com a Premium House." },
      ...(Object.values(search ?? {}).some((value) => value !== undefined && value !== "") ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/imoveis" }],
  }),
  component: List,
});

const cities = [...new Set(properties.map((p) => p.city))];
const hoods = [...new Set(properties.map((p) => p.neighborhood))];
const propertyFeatures = [...new Set(properties.flatMap((p) => [...Object.values(p.features).flat(), ...p.amenities]))].sort((a, b) => a.localeCompare(b, "pt-BR"));

function List() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/imoveis/" });
  const [showFilters, setShowFilters] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [draft, setDraft] = useState<Search>(s);
  const [applied, setApplied] = useState<Search>(s);
  const filterPanelRef = useRef<HTMLElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const closeFilterButtonRef = useRef<HTMLButtonElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const listingRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const searchKey = JSON.stringify(s);
  useEffect(() => { setDraft(s); setApplied(s); }, [s]);
  useEffect(() => { setVisibleCount(6); }, [searchKey]);
  useEffect(() => {
    if (!showFilters || window.matchMedia("(min-width: 1024px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeFilterButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFilters(false);
        filterTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = filterPanelRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showFilters]);
  const applySearch = (next: Search) => {
    setApplied(next);
    void navigate({ search: () => next, replace: true });
  };
  const set = (patch: Partial<Search>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) applySearch(next);
  };
  const clearFilters = () => { setDraft({}); applySearch({}); };
  const showAndScrollToFilters = () => setShowFilters(true);
  const submitFilters = () => {
    applySearch(draft);
    setShowFilters(false);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  const toggleFeature = (feature: string) => set({ caracteristicas: draft.caracteristicas?.includes(feature) ? draft.caracteristicas.filter((item) => item !== feature) : [...(draft.caracteristicas ?? []), feature] });
  const q = applied.q?.toLowerCase();
  let list = properties.filter((p) =>
    (!applied.oportunidade || p.opportunity === true) &&
    (!applied.finalidade || (applied.finalidade === "Novos" ? p.tag === "Novo" || p.tag === "Lançamento" : applied.finalidade === "Permuta" ? p.acceptsTrade === true : applied.finalidade === "Temporada" ? isSeasonal(p) : applied.finalidade === "Venda" ? isSale(p) : isRent(p))) && (!applied.tipo || p.type === applied.tipo) &&
    (!applied.cidade || p.city === applied.cidade) && (!applied.bairro || p.neighborhood === applied.bairro) &&
    (!applied.quartos || p.beds >= applied.quartos) && (!applied.suites || p.suites >= applied.suites) &&
    (!applied.vagas || p.parking >= applied.vagas) && (!applied.banheiros || p.baths >= applied.banheiros) &&
    (!applied.precoMin || p.price >= applied.precoMin) && (!applied.precoMax || p.price <= applied.precoMax) &&
    (!applied.areaMin || p.area >= applied.areaMin) && (!applied.areaMax || p.area <= applied.areaMax) &&
    (!applied.mobiliado || p.amenities.some((amenity) => amenity.toLocaleLowerCase("pt-BR").includes("mobiliado")) === (applied.mobiliado === "Sim")) &&
    (!applied.aceitaPet || (applied.aceitaPet === "Sim" ? p.petsAllowed === true || p.amenities.some((amenity) => /pet friendly|aceita pet/i.test(amenity)) : p.petsAllowed === false)) &&
    (!applied.aceitaPermuta || p.acceptsTrade === (applied.aceitaPermuta === "Sim")) &&
    (!applied.aceitaFinanciamento || (p.acceptsFinancing === true) === (applied.aceitaFinanciamento === "Sim")) &&
    (applied.caracteristicas ?? []).every((feature) => Object.values(p.features).flat().includes(feature) || p.amenities.includes(feature)) &&
    (!q || [p.title, p.neighborhood, p.city, p.id].some((x) => x.toLowerCase().includes(q))),
  );
  if (applied.ordem === "menor") list = [...list].sort((a, b) => a.price - b.price);
  if (applied.ordem === "maior") list = [...list].sort((a, b) => b.price - a.price);
  if (applied.ordem === "area") list = [...list].sort((a, b) => b.area - a.area);
  const visibleList = list.slice(0, visibleCount);
  const view = applied.view === "lista" ? "lista" : "card";
  const advancedFilterCount = [draft.mobiliado, draft.aceitaPet, draft.aceitaPermuta, draft.aceitaFinanciamento, draft.suites, draft.banheiros, draft.vagas, ...(draft.caracteristicas ?? [])].filter(Boolean).length;
  const activeFilters: [keyof Search, string | undefined][] = [
    ["oportunidade", applied.oportunidade ? "Oportunidades" : undefined], ["finalidade", applied.finalidade === "Novos" ? "Novos" : applied.finalidade === "Venda" ? "Comprar" : applied.finalidade === "Locação" ? "Alugar" : applied.finalidade === "Temporada" ? "Temporada" : applied.finalidade === "Permuta" ? "Permuta" : undefined], ["tipo", applied.tipo], ["cidade", applied.cidade], ["bairro", applied.bairro], ["quartos", applied.quartos ? `${applied.quartos}+ quartos` : undefined], ["suites", applied.suites ? `${applied.suites}+ suítes` : undefined], ["banheiros", applied.banheiros ? `${applied.banheiros}+ banheiros` : undefined], ["vagas", applied.vagas ? `${applied.vagas}+ vagas` : undefined], ["precoMax", applied.precoMax ? `Até R$ ${Math.round(applied.precoMax / 1000)} mil` : undefined], ["areaMin", applied.areaMin ? `A partir de ${applied.areaMin} m²` : undefined], ["areaMax", applied.areaMax ? `Até ${applied.areaMax} m²` : undefined], ["mobiliado", applied.mobiliado ? `Mobiliado: ${applied.mobiliado.toLowerCase()}` : undefined], ["aceitaPet", applied.aceitaPet ? `Aceita pet: ${applied.aceitaPet.toLowerCase()}` : undefined], ["aceitaPermuta", applied.aceitaPermuta ? `Aceita permuta: ${applied.aceitaPermuta.toLowerCase()}` : undefined], ["aceitaFinanciamento", applied.aceitaFinanciamento ? `Aceita financiamento: ${applied.aceitaFinanciamento.toLowerCase()}` : undefined], ...((applied.caracteristicas ?? []).map((feature) => ["caracteristicas", feature] as [keyof Search, string])),
  ];
  const removeActiveFilter = (key: keyof Search, value: string) => {
    const next: Search = key === "caracteristicas"
      ? { ...applied, caracteristicas: (applied.caracteristicas ?? []).filter((feature) => feature !== value) }
      : { ...applied, [key]: undefined };
    setDraft(next);
    applySearch(next);
  };
  const field = "h-12 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
  const label = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground";

  const Counter = ({ k, title }: { k: "quartos" | "suites" | "vagas" | "banheiros"; title: string }) => (
    <div>
      <span className={label}>{title}</span>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} type="button" aria-pressed={draft[k] === n} onClick={() => set({ [k]: draft[k] === n ? undefined : n })} className={`h-11 flex-1 rounded-lg border text-sm font-bold transition ${draft[k] === n ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}>{n}+</button>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell>
      <section className="bg-navy py-14 text-navy-foreground">
        <div className="container-x">
          <h1 className="text-4xl md:text-5xl">{applied.oportunidade ? "Oportunidades imobiliárias" : applied.finalidade === "Novos" ? "Imóveis novos" : applied.finalidade === "Temporada" ? "Imóveis para temporada" : applied.finalidade === "Locação" ? "Imóveis para alugar" : applied.finalidade === "Permuta" ? "Imóveis que aceitam permuta" : applied.finalidade === "Venda" ? "Imóveis à venda" : "Encontre seu imóvel"}</h1>
          <p className="mt-2 text-navy-foreground/70">{list.length} imóveis encontrados</p>
        </div>
      </section>
      <div ref={listingRef} className="container-x mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
        <button ref={filterTriggerRef} type="button" aria-expanded={showFilters} aria-controls="imoveis-search-filters" onClick={showAndScrollToFilters} className="sticky top-[calc(var(--site-header-height)_+_0.75rem)] z-30 flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-card py-3 font-bold shadow-float lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Mais Filtros{advancedFilterCount > 0 && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{advancedFilterCount}</span>} <ChevronDown className="h-4 w-4" /></button>
        {showFilters && <button type="button" aria-label="Fechar filtros" onClick={() => setShowFilters(false)} className="fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-[69] bg-navy/45 backdrop-blur-[2px] lg:hidden" />}
        <div className="contents lg:block lg:h-fit lg:self-start lg:sticky lg:top-[calc(var(--site-header-height)_+_0.75rem)] lg:z-10">
        <aside id="imoveis-search-filters" ref={filterPanelRef} role={showFilters ? "dialog" : undefined} aria-modal={showFilters ? true : undefined} aria-label={showFilters ? "Filtros de imóveis" : undefined} className={`${showFilters ? "flex" : "hidden"} fixed inset-x-3 bottom-3 top-[calc(var(--site-header-height)_+_0.75rem)] z-[70] flex-col overflow-hidden rounded-2xl border bg-card p-0 shadow-float lg:static lg:inset-auto lg:z-auto lg:block lg:h-fit lg:max-h-[calc(100svh_-_var(--site-header-height)_-_1.5rem)] lg:space-y-5 lg:overflow-y-auto lg:rounded-2xl lg:p-5 lg:pr-3`}>
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5 lg:px-0 lg:pt-0"><h2 className="text-xl">Filtrar imóveis</h2><button ref={closeFilterButtonRef} type="button" onClick={() => setShowFilters(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted lg:hidden">Fechar</button></div>
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 lg:contents">
          <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-muted p-2">
            {[["Todos", ""], ["Novos", "Novos"], ["Comprar", "Venda"], ["Alugar", "Locação"], ["Temporada", "Temporada"], ["Permuta", "Permuta"]].map(([label, value]) => {
              const selected = value ? draft.finalidade === value : !draft.finalidade;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    set({ finalidade: value || undefined });
                  }}
                  className={`min-h-11 rounded-xl px-2 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-background/80 hover:text-foreground"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div><span className={label}>Código ou palavra-chave</span><input value={draft.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Ex.: PH1024" className={field} /></div>
          <div><span className={label}>Tipo de imóvel</span>
            <FormSelect value={draft.tipo ?? ""} onChange={(e) => set({ tipo: e.target.value || undefined })} className={field}>
              <option value="">Todos os tipos</option><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Casa de Campo</option>
            </FormSelect></div>
          <div><span className={label}>Cidade</span>
            <FormSelect value={draft.cidade ?? ""} onChange={(e) => set({ cidade: e.target.value || undefined })} className={field}>
              <option value="">Todas</option>{cities.map((c) => <option key={c}>{c}</option>)}
            </FormSelect></div>
          <div><span className={label}>Bairro</span>
            <FormSelect value={draft.bairro ?? ""} onChange={(e) => set({ bairro: e.target.value || undefined })} className={field}>
              <option value="">Todos</option>{hoods.map((c) => <option key={c}>{c}</option>)}
            </FormSelect></div>
          <div><span className={label}>{draft.finalidade === "Temporada" ? "Valor da diária (R$)" : "Valor (R$)"}</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" inputMode="numeric" value={formatThousands(draft.precoMin)} onChange={(e) => set({ precoMin: parseIntegerInput(e.target.value) })} placeholder={draft.finalidade === "Temporada" ? "Diária mínima" : "Mínimo"} className={field} />
              <input type="text" inputMode="numeric" value={formatThousands(draft.precoMax)} onChange={(e) => set({ precoMax: parseIntegerInput(e.target.value) })} placeholder={draft.finalidade === "Temporada" ? "Diária máxima" : "Máximo"} className={field} />
            </div></div>
          <div><span className={label}>Área (m²)</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" inputMode="numeric" value={formatThousands(draft.areaMin)} onChange={(e) => set({ areaMin: parseIntegerInput(e.target.value) })} placeholder="Mínima" className={field} />
              <input type="text" inputMode="numeric" value={formatThousands(draft.areaMax)} onChange={(e) => set({ areaMax: parseIntegerInput(e.target.value) })} placeholder="Máxima" className={field} />
            </div></div>
          <Counter k="quartos" title="Quartos" />
          <button type="button" aria-expanded={moreFilters} onClick={() => setMoreFilters((open) => !open)} className="flex min-h-12 w-full items-center justify-between border-t border-border pt-4 text-left text-sm font-bold text-foreground hover:text-primary"><span className="inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Mais filtros{advancedFilterCount > 0 && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{advancedFilterCount}</span>}</span><ChevronDown className={`h-4 w-4 transition-transform ${moreFilters ? "rotate-180" : ""}`} /></button>
          {moreFilters && <div className="space-y-6 border-t border-border pt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Características e condições</p>
            <fieldset><legend className={`${label} mb-2`}>Mobiliado?</legend><div className="grid grid-cols-3 gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={(draft.mobiliado ?? "Indiferente") === value} onClick={() => set({ mobiliado: value === "Indiferente" || draft.mobiliado === value ? undefined : value })} className={`min-h-10 rounded-lg border px-2 text-sm ${(draft.mobiliado ?? "Indiferente") === value ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <Counter k="suites" title="Suítes" />
            <Counter k="banheiros" title="Banheiros" />
            <Counter k="vagas" title="Vagas" />
            <fieldset><legend className={`${label} mb-2`}>Aceita pet?</legend><div className="grid grid-cols-3 gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={(draft.aceitaPet ?? "Indiferente") === value} onClick={() => set({ aceitaPet: value === "Indiferente" || draft.aceitaPet === value ? undefined : value })} className={`min-h-10 rounded-lg border px-2 text-sm ${(draft.aceitaPet ?? "Indiferente") === value ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <fieldset><legend className={`${label} mb-2`}>Aceita permuta?</legend><div className="grid grid-cols-3 gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={(draft.aceitaPermuta ?? "Indiferente") === value} onClick={() => set({ aceitaPermuta: value === "Indiferente" || draft.aceitaPermuta === value ? undefined : value })} className={`min-h-10 rounded-lg border px-2 text-sm ${(draft.aceitaPermuta ?? "Indiferente") === value ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <fieldset><legend className={`${label} mb-2`}>Aceita financiamento?</legend><div className="grid grid-cols-3 gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={(draft.aceitaFinanciamento ?? "Indiferente") === value} onClick={() => set({ aceitaFinanciamento: value === "Indiferente" || draft.aceitaFinanciamento === value ? undefined : value })} className={`min-h-10 rounded-lg border px-2 text-sm ${(draft.aceitaFinanciamento ?? "Indiferente") === value ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <fieldset><legend className={`${label} mb-3`}>Características</legend><div className="grid grid-cols-2 gap-x-4 gap-y-3">{propertyFeatures.slice(0, showAllFeatures ? undefined : 4).map((feature) => <label key={feature} className="flex min-h-8 items-start gap-2 text-sm leading-5 text-foreground"><input type="checkbox" checked={draft.caracteristicas?.includes(feature) ?? false} onChange={() => toggleFeature(feature)} className="mt-0.5 h-4 w-4 shrink-0 accent-primary" />{feature}</label>)}</div>{propertyFeatures.length > 4 && <button type="button" aria-expanded={showAllFeatures} onClick={() => setShowAllFeatures((open) => !open)} className="mt-3 min-h-10 text-sm font-semibold text-primary">{showAllFeatures ? "Menos características" : "Mais características"} <span aria-hidden="true">{showAllFeatures ? "⌃" : "⌄"}</span></button>}</fieldset>
          </div>}
          </div>
          <div className="shrink-0 space-y-2 border-t border-border bg-card px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:mt-0 lg:px-0 lg:pb-0"><button type="button" onClick={submitFilters} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"><Search className="h-4 w-4" /> Buscar imóveis</button><button type="button" onClick={clearFilters} className="inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border py-2 text-sm font-medium text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /> Limpar filtros</button></div>
        </aside>
        </div>
        <div ref={resultsRef} className="scroll-mt-32">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">{list.length}</strong> resultados</p>
            <div className="flex items-center gap-2">
              <FormSelect value={applied.ordem ?? ""} onChange={(e) => applySearch({ ...applied, ordem: e.target.value || undefined })} className="h-10 rounded-xl border bg-card px-3 text-sm">
                <option value="">Mais relevantes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="area">Maior área</option>
              </FormSelect>
              <div className="flex rounded-xl border bg-card p-1">
                <button type="button" aria-label="Ver em cards" onClick={() => applySearch({ ...applied, view: undefined })} className={`rounded-lg p-1.5 ${view === "card" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
                <button type="button" aria-label="Ver em lista" onClick={() => applySearch({ ...applied, view: "lista" })} className={`rounded-lg p-1.5 ${view === "lista" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><ListIcon className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
          {activeFilters.some(([, label]) => label) && <div className="mb-5 flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Filtros:</span>{activeFilters.map(([key, label]) => label && <button key={`${key}-${label}`} onClick={() => removeActiveFilter(key, label)} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-navy hover:bg-accent">{label} ×</button>)}<button onClick={clearFilters} className="text-xs font-bold text-primary hover:underline">Limpar tudo</button></div>}
          {!list.length ? (
            <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">Nenhum imóvel encontrado com esses filtros.</div>
          ) : (
          <>
            {view === "lista" ? <div className="space-y-5">{visibleList.map((p, index) => <PropertyRow key={p.id} p={p} priority={index === 0} />)}</div> : <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{visibleList.map((p, index) => <PropertyCard key={p.id} p={p} showCode priority={index === 0} />)}</div>}
            {list.length > visibleCount && <div className="mt-9 flex flex-col items-center gap-3"><p className="text-sm text-muted-foreground">Mostrando {visibleList.length} de {list.length} imóveis</p><button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full border-2 border-navy px-7 py-3 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">Ver mais imóveis</button></div>}
          </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
