import { Facebook, Linkedin, Twitter, Link2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function ShareButtons({ title, path, landing }: { title: string; path: string; landing?: string }) {
  const origin = () => (typeof window !== "undefined" ? window.location.origin : "");
  const url = () => origin() + path;
  const open = (u: string) => window.open(u, "_blank", "noopener,width=600,height=500");
  const copy = async (u: string, msg: string) => { await navigator.clipboard.writeText(u); toast.success(msg); };
  const items = [
    { label: "WhatsApp", icon: WhatsAppIcon, cls: "bg-whatsapp text-primary-foreground", on: () => open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`) },
    { label: "Facebook", icon: Facebook, cls: "bg-navy text-navy-foreground", on: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`) },
    { label: "X", icon: Twitter, cls: "bg-foreground text-background", on: () => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title)}`) },
    { label: "LinkedIn", icon: Linkedin, cls: "bg-navy text-navy-foreground", on: () => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`) },
    { label: "Copiar link", icon: Link2, cls: "border bg-card text-navy", on: () => copy(url(), "Link copiado!") },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((i) => <button key={i.label} aria-label={`Compartilhar no ${i.label}`} title={i.label} onClick={i.on} className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 ${i.cls}`}><i.icon className="h-4 w-4" /></button>)}
      {landing && (
        <span className="flex items-center gap-1">
          <button onClick={() => copy(origin() + landing, "Link da landing page copiado!")} className="flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-110"><Rocket className="h-4 w-4" />Copiar landing page</button>
          <a href={landing} target="_blank" rel="noreferrer" className="px-2 text-xs font-bold text-primary underline">abrir</a>
        </span>
      )}
    </div>
  );
}
