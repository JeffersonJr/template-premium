import { useRef, useState } from "react";
import { toast } from "sonner";
import { whatsappLink } from "@/data/properties";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { applyBrazilianPhoneMask } from "@/lib/input-masks";

export function LeadForm({
  subject,
  cta = "Quero ser contatado",
  withMessage = true,
  whatsapp,
  whatsappHref,
  compact = false,
}: {
  subject?: string;
  cta?: string;
  withMessage?: boolean;
  whatsapp?: string;
  whatsappHref?: string;
  compact?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const field = `${compact ? "h-11 rounded-lg" : "h-12 rounded-xl"} w-full border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring`;
  const openWhatsApp = () => {
    const form = formRef.current;
    if (!form?.reportValidity()) return;
    const data = new FormData(form);
    const baseMessage = whatsapp ?? "Olá! Gostaria de mais informações.";
    const message = `${baseMessage}\n\nNome: ${data.get("name")}\nTelefone: ${data.get("phone")}\nE-mail: ${data.get("email")}`;
    const url = whatsappHref
      ? new URL(whatsappHref)
      : new URL(whatsappLink(baseMessage));
    url.searchParams.set("text", message);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };
  if (sent)
    return (
      <div className="rounded-xl bg-accent p-6 text-center font-semibold text-accent-foreground">
        Recebemos seu contato! Um corretor falará com você em breve.
      </div>
    );
  return (
    <form
      ref={formRef}
      className={compact ? "space-y-2.5" : "space-y-3"}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        toast.success("Mensagem enviada!");
      }}
    >
      <label className="sr-only" htmlFor="lead-name">Nome completo</label>
      <input id="lead-name" required name="name" autoComplete="name" aria-label="Nome completo" placeholder="Seu nome" className={field} />
      <label className="sr-only" htmlFor="lead-email">E-mail</label>
      <input
        id="lead-email"
        required
        name="email"
        type="email"
        autoComplete="email"
        aria-label="E-mail"
        placeholder="Seu e-mail"
        className={field}
      />
      <label className="sr-only" htmlFor="lead-phone">Telefone ou WhatsApp</label>
      <input
        id="lead-phone"
        required
        name="phone"
        type="tel"
        inputMode="tel"
        maxLength={15}
        onChange={applyBrazilianPhoneMask}
        autoComplete="tel"
        aria-label="Telefone ou WhatsApp"
        placeholder="Telefone / WhatsApp"
        className={field}
      />
      {withMessage && (
        <>
          <label className="sr-only" htmlFor="lead-message">Mensagem</label>
          <textarea id="lead-message" name="message" rows={3} defaultValue={subject ? `Tenho interesse no imóvel ${subject}.` : ""} aria-label="Mensagem" placeholder="Mensagem" className={`${field} h-auto py-3`} />
        </>
      )}
      <button type="submit"
        className={`${compact ? "h-11 rounded-lg" : "h-12 rounded-xl"} w-full bg-primary font-bold text-primary-foreground transition hover:brightness-110`}
      >
        {cta}
      </button>
      {whatsapp && (
        <button
          type="button"
          onClick={openWhatsApp}
          className={`flex ${compact ? "h-11 rounded-lg" : "h-12 rounded-xl"} w-full items-center justify-center gap-2 bg-whatsapp font-bold text-primary-foreground transition hover:brightness-110`}
        >
          <WhatsAppIcon className="h-5 w-5" /> Chamar no WhatsApp
        </button>
      )}
      <p className="text-center text-[11px] text-muted-foreground">
        Ao enviar, você concorda com nossa política de privacidade.
      </p>
    </form>
  );
}
