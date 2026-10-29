import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Hash, MapPin, Search } from "lucide-react";
import { properties } from "@/data/properties";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Mode = "Novos" | "Venda" | "Locação" | "Temporada" | "Permuta" | "Código";
const constructionPhases = ["Lançamento", "Em obras", "Pronto para morar", "Novos"] as const;
const purposes: { value: Mode; label: string }[] = [
  { value: "Novos", label: "Novos" },
  { value: "Venda", label: "Comprar" },
  { value: "Locação", label: "Alugar" },
  { value: "Temporada", label: "Temporada" },
  { value: "Permuta", label: "Permuta" },
  { value: "Código", label: "Código" },
];
const propertyTypes = ["Apartamento", "Casa", "Cobertura", "Casa de Campo", "Studio", "Chalé"];

export function SearchBar() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("Venda");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<(typeof constructionPhases)[number]>("Novos");
  const [bedrooms, setBedrooms] = useState("");

  const go = () => {
    if (mode === "Código") {
      const c = code.trim().toUpperCase();
      const hit = properties.find((p) => p.id === c || p.id === `PH${c}`);
      if (hit) return navigate({ to: "/imoveis/$id", params: { id: hit.id } });
      return navigate({ to: "/imoveis", search: { q: c || undefined } });
    }
    if (mode === "Novos") {
      return navigate({
        to: "/empreendimentos",
        search: {
          ...(phase === "Novos" ? {} : { fase: phase as "Lançamento" | "Em obras" | "Pronto para morar" }),
          ...(type ? { tipo: type } : {}),
          ...(q.trim() ? { q: q.trim() } : {}),
        },
      });
    }
    return navigate({ to: "/imoveis", search: { finalidade: mode, tipo: type || undefined, q: q.trim() || undefined, quartos: bedrooms ? Number(bedrooms) : undefined } });
  };

  const field = "h-12 w-full rounded-xl border bg-background px-4 text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[12px]";
  const selectField = `${field} border-input bg-background shadow-none`;
  const submitClass = "flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[11px] font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-[12px]";

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-3 shadow-float sm:p-4 md:p-5">
      <div className="flex flex-wrap gap-1.5 pb-3 sm:gap-2" role="group" aria-label="Finalidade do imóvel">
        {purposes.map((purpose) => {
          const selected = mode === purpose.value;
          return (
            <button key={purpose.value} type="button" aria-pressed={selected} onClick={() => setMode(purpose.value)} className={`inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-2.5 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-9 sm:gap-1.5 sm:px-3.5 sm:text-xs ${selected ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}>
              {purpose.value === "Código" && <Hash className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />}
              {purpose.label}
            </button>
          );
        })}
      </div>

      {mode === "Código" ? (
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <input aria-label="Código do imóvel" value={code} onChange={(event) => setCode(event.target.value)} onKeyDown={(event) => event.key === "Enter" && go()} placeholder="Preencha o código do imóvel." className={field} />
          <button type="button" onClick={go} className={submitClass}><Search className="h-4 w-4" /> Buscar</button>
        </div>
      ) : mode === "Novos" ? (
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
          <label className="relative block">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            <input aria-label="Condomínio, bairro ou cidade" value={q} onChange={(event) => setQ(event.target.value)} onKeyDown={(event) => event.key === "Enter" && go()} placeholder="Digite condomínio, bairro, cidade" className={`${field} pl-11`} />
          </label>
          <Select value={type || "todos"} onValueChange={(value) => setType(value === "todos" ? "" : value)}>
            <SelectTrigger aria-label="Tipo do imóvel" className={selectField}><SelectValue placeholder="Todos os tipos" /></SelectTrigger>
            <SelectContent><SelectItem value="todos">Todos os tipos</SelectItem>{propertyTypes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={phase} onValueChange={(value) => setPhase(value as (typeof constructionPhases)[number])}>
            <SelectTrigger aria-label="Fase do empreendimento" className={selectField}><SelectValue /></SelectTrigger>
            <SelectContent>{constructionPhases.map((item) => <SelectItem key={item} value={item}>{item === "Novos" ? "Todas as fases" : item}</SelectItem>)}</SelectContent>
          </Select>
          <button type="button" onClick={go} className={submitClass}><Search className="h-4 w-4" /> Buscar</button>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
          <label className="relative block">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            <input aria-label="Condomínio, bairro ou cidade" value={q} onChange={(event) => setQ(event.target.value)} onKeyDown={(event) => event.key === "Enter" && go()} placeholder="Digite condomínio, bairro, cidade" className={`${field} pl-11`} />
          </label>
          <Select value={type || "todos"} onValueChange={(value) => setType(value === "todos" ? "" : value)}>
            <SelectTrigger aria-label="Tipo do imóvel" className={selectField}><SelectValue placeholder="Todos" /></SelectTrigger>
            <SelectContent><SelectItem value="todos">Todos</SelectItem>{propertyTypes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={bedrooms || "qualquer"} onValueChange={(value) => setBedrooms(value === "qualquer" ? "" : value)}>
            <SelectTrigger aria-label="Quantidade de quartos" className={selectField}><SelectValue placeholder="Quartos: qualquer" /></SelectTrigger>
            <SelectContent><SelectItem value="qualquer">Quartos: qualquer</SelectItem>{[1, 2, 3, 4, 5].map((count) => <SelectItem key={count} value={String(count)}>Quartos: {count}+</SelectItem>)}</SelectContent>
          </Select>
          <button type="button" onClick={go} className={submitClass}><Search className="h-4 w-4" /> Buscar</button>
        </div>
      )}
    </div>
  );
}
