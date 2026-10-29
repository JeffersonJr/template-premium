import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Car, Maximize, MapPin } from "lucide-react";
import { type Property, propertySlug } from "@/data/properties";
import { PriceBlock } from "@/components/PriceBlock";
import { CardActions, PhotoSlider } from "@/components/PropertyCard";

export function PropertyRow({ p, priority = false }: { p: Property; priority?: boolean }) {
  return (
    <Link to="/imoveis/$id" params={{ id: propertySlug(p) }} className="group grid overflow-hidden rounded-2xl border bg-card shadow-card transition hover:shadow-float sm:grid-cols-[320px_1fr]">
      <div className="relative">
        <PhotoSlider p={p} priority={priority} className="aspect-[4/3] h-full" />
        <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
        <CardActions p={p} className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-col p-6">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary"><MapPin className="h-4 w-4" />{p.neighborhood}, {p.city} · Cód. {p.id}</p>
        <h3 className="mt-2 text-2xl">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm font-semibold text-foreground/80">
          <span className="flex items-center gap-2"><Maximize className="h-6 w-6 text-primary" />{p.area} m²</span>
          <span className="flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" />{p.beds} quartos</span>
          <span className="flex items-center gap-2"><Bath className="h-6 w-6 text-primary" />{p.baths} banheiros</span>
          <span className="flex items-center gap-2"><Car className="h-6 w-6 text-primary" />{p.parking} vagas</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <PriceBlock p={p} />
          <span className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">Ver detalhes</span>
        </div>
      </div>
    </Link>
  );
}
