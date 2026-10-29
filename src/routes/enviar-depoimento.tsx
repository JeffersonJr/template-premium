import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageSquareQuote, Send } from "lucide-react";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/enviar-depoimento")({
  head: () => ({
    meta: [
      { title: "Enviar depoimento | Premium House" },
      { name: "description", content: "Compartilhe sua experiência com a Premium House." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/enviar-depoimento" }],
  }),
  component: SendTestimonial,
});

function SendTestimonial() {
  const navigate = useNavigate();
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  const label = "mb-1.5 block text-sm font-semibold text-navy";

  return (
    <PageShell>
      <section className="bg-navy py-14 text-navy-foreground md:py-16">
        <div className="container-x max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Sua experiência importa</p>
          <h1 className="mt-3 text-3xl md:text-4xl">Envie seu depoimento</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy-foreground/75 sm:text-base">Conte como foi sua experiência com a Premium House. Sua avaliação ajuda outras pessoas a escolher com confiança.</p>
        </div>
      </section>
      <section className="container-x py-10 md:py-14">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({ to: "/depoimento-enviado" });
          }}
          className="mx-auto max-w-2xl rounded-3xl border bg-card p-5 shadow-float sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3 border-b pb-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><MessageSquareQuote className="h-5 w-5" /></span>
            <div><h2 className="text-xl">Compartilhe sua avaliação</h2><p className="mt-0.5 text-sm text-muted-foreground">Todos os campos são obrigatórios.</p></div>
          </div>
          <div className="space-y-4">
            <label className="block"><span className={label}>Nome completo</span><input required name="name" autoComplete="name" className={field} placeholder="Seu nome completo" /></label>
            <label className="block"><span className={label}>Ocupação</span><input required name="occupation" autoComplete="organization-title" className={field} placeholder="Ex.: Empresária, engenheiro(a), aposentado(a)" /></label>
            <label className="block"><span className={label}>E-mail</span><input required name="email" type="email" autoComplete="email" className={field} placeholder="voce@email.com" /></label>
            <label className="block"><span className={label}>Escreva seu depoimento</span><textarea required name="testimonial" rows={6} maxLength={1500} className="w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Conte como foi sua experiência com a nossa equipe..." /></label>
          </div>
          <button type="submit" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><Send className="h-4 w-4" /> Enviar depoimento</button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Nesta versão demonstrativa, as respostas não são armazenadas nem encaminhadas.</p>
        </form>
      </section>
    </PageShell>
  );
}
