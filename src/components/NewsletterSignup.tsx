import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [sent, setSent] = useState(false);
  return <section data-newsletter-signup className="mt-12 bg-navy py-7 text-navy-foreground sm:mt-20 sm:py-10">
    <div className="container-x flex flex-col items-center gap-3 text-center sm:gap-5 lg:flex-row lg:gap-8 lg:text-left">
      <span className="rounded-2xl border border-navy-foreground/30 p-2.5 text-navy-foreground sm:p-3"><Mail className="h-6 w-6 sm:h-9 sm:w-9" /></span>
      <div className="min-w-0 lg:flex-1"><h2 className="text-lg font-bold leading-tight sm:text-xl">Receba em primeira mão imóveis exclusivos</h2><p className="mt-1 text-sm leading-snug text-navy-foreground/75">Novidades, lançamentos e oportunidades selecionadas para você.</p></div>
      {sent ? <p aria-live="polite" className="w-full rounded-xl bg-primary-foreground px-5 py-3 text-sm font-bold text-navy lg:w-auto">E-mail cadastrado com sucesso!</p> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); toast.success("E-mail cadastrado com sucesso!"); }} className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"><input required type="email" aria-label="Seu e-mail" placeholder="Insira seu e-mail" className="h-11 min-w-0 flex-1 rounded-xl border border-navy-foreground/15 bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground sm:h-12 sm:w-72 lg:w-80" /><button className="h-11 rounded-xl bg-primary-foreground px-7 text-sm font-bold text-navy transition hover:bg-primary-foreground/90 sm:h-12">Quero receber novidades</button><p className="text-[11px] leading-snug text-navy-foreground/60 sm:hidden">Ao se cadastrar, você concorda em receber novidades por e-mail.</p></form>}
    </div>
  </section>;
}
