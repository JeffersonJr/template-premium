import { Phone, Mail } from "lucide-react";
import type { Broker } from "@/data/properties";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function BrokerCard({ b, msg }: { b: Broker; msg: string }) {
  const initials = b.name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  const row = "flex items-center gap-3 rounded-xl bg-muted px-3 py-2.5 text-sm font-semibold transition hover:bg-accent";
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center gap-4">
        {b.photo ? <img src={b.photo} alt={`Foto de ${b.name}`} loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover" /> : <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-xl text-navy-foreground">{initials}</span>}
        <div className="min-w-0"><p className="truncate font-bold">{b.name}</p><p className="text-xs text-muted-foreground">Corretor · {b.creci}</p></div>
      </div>
      <div className="mt-4 space-y-2">
        <a href={`tel:+${b.phone}`} className={row}><Phone className="h-4 w-4 shrink-0 text-primary" />{b.phoneLabel}</a>
        <a href={`https://wa.me/${b.phone}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className={row}><WhatsAppIcon className="h-4 w-4 shrink-0 text-whatsapp" />WhatsApp</a>
        <a href={`mailto:${b.email}`} className={`${row} min-w-0`}><Mail className="h-4 w-4 shrink-0 text-primary" /><span className="truncate">{b.email}</span></a>
      </div>
    </div>
  );
}
