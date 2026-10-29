import { useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const slots = ["Hoje · 14:00", "Amanhã · 10:00", "Amanhã · 15:30", "Sábado · 10:00"];

export function VisitScheduler({ propertyTitle }: { propertyTitle: string }) {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(slots[0]);
  if (!open) return <button onClick={() => setOpen(true)} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-navy font-bold text-navy transition hover:bg-navy hover:text-navy-foreground"><CalendarDays className="h-4 w-4" /> Agendar visita</button>;
  return <div className="mt-3 rounded-xl border bg-secondary/60 p-4"><div className="flex items-center gap-2 text-sm font-bold text-navy"><CalendarDays className="h-4 w-4 text-primary" />Escolha um horário</div><div className="mt-3 grid grid-cols-2 gap-2">{slots.map((item) => <button key={item} onClick={() => setSlot(item)} className={`rounded-lg border px-2 py-2 text-xs font-bold ${slot === item ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>{item}</button>)}</div><button onClick={() => { toast.success(`Visita para ${propertyTitle} solicitada: ${slot}`); setOpen(false); }} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-navy text-sm font-bold text-navy-foreground"><CheckCircle2 className="h-4 w-4" /> Confirmar horário</button></div>;
}
