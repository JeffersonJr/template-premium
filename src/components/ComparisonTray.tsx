import { Link } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";

export function ComparisonTray({ items, onRemove }: { items: Property[]; onRemove: (id: string) => void }) {
  if (!items.length) return null;
  return <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-5xl rounded-2xl border bg-card/95 p-4 shadow-float backdrop-blur md:inset-x-6"><div className="flex flex-wrap items-center gap-3"><div className="flex items-center gap-2 font-bold text-navy"><Scale className="h-5 w-5 text-primary" />Comparar ({items.length}/3)</div>{items.map((p) => <div key={p.id} className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm"><Link to="/imoveis/$id" params={{ id: p.id }} className="max-w-40 truncate font-semibold hover:underline">{p.title}</Link><button aria-label={`Remover ${p.title} da comparação`} onClick={() => onRemove(p.id)}><X className="h-4 w-4" /></button></div>)}<div className="ml-auto hidden items-center gap-3 text-xs text-muted-foreground sm:flex">{items.map((p) => <span key={p.id}>{p.area}m² · {p.beds} qts · <strong className="text-navy">{formatPrice(p)}</strong></span>)}</div></div></div>;
}
