import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { type Property, propertySlug } from "@/data/properties";

export function PropertyMap({ properties, activeId, onHover }: { properties: Property[]; activeId?: string; onHover?: (id?: string) => void }) {
  const visible = properties.slice(0, 12);
  return (
    <section aria-label="Mapa dos imóveis encontrados" className="relative h-[430px] overflow-hidden rounded-2xl border bg-[#dbe8dc] shadow-card">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#ffffff88_1px,transparent_1px),linear-gradient(90deg,#ffffff88_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute left-[20%] top-0 h-full w-24 -rotate-12 bg-white/35" /><div className="absolute left-[64%] top-0 h-full w-14 rotate-[24deg] bg-white/35" />
      <div className="absolute left-5 top-5 rounded-xl bg-card/95 px-3 py-2 text-xs font-bold text-navy shadow-card"><MapPin className="mr-1 inline h-4 w-4 text-primary" />{properties.length} imóveis nesta área</div>
      {visible.map((p, i) => {
        const left = 12 + ((i * 23) % 74); const top = 20 + ((i * 31) % 58);
        return <Link key={p.id} to="/imoveis/$id" params={{ id: propertySlug(p) }} onMouseEnter={() => onHover?.(p.id)} onMouseLeave={() => onHover?.()} style={{ left: `${left}%`, top: `${top}%` }} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-extrabold shadow-card transition hover:scale-110 ${activeId === p.id ? "bg-navy text-navy-foreground ring-4 ring-primary/25" : "bg-card text-navy"}`}>{p.price >= 1000000 ? `R$ ${(p.price / 1000000).toFixed(1)} mi` : `R$ ${(p.price / 1000).toFixed(0)} mil`}</Link>;
      })}
    </section>
  );
}
