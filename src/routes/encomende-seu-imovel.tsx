import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Home, Search, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { FormSelect } from "@/components/ui/form-select";
import { applyBrazilianPhoneMask } from "@/lib/input-masks";

export const Route = createFileRoute("/encomende-seu-imovel")({
  head: () => ({
    meta: [
      { title: "Encomende seu imóvel | Premium House" },
      { name: "description", content: "Conte o imóvel que procura e receba uma seleção personalizada da Premium House." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/encomende-seu-imovel" }],
  }),
  component: OrderProperty,
});

function OrderProperty() {
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring";
  if (sent) return <PageShell><section className="container-x py-24"><div className="mx-auto max-w-2xl rounded-3xl border bg-card p-10 text-center shadow-float"><CheckCircle2 className="mx-auto h-12 w-12 text-primary" /><h1 className="mt-5 text-4xl">Pedido recebido!</h1><p className="mt-3 text-muted-foreground">Um especialista vai analisar seu perfil e entrar em contato com opções compatíveis.</p></div></section></PageShell>;

  return (
    <PageShell>
      <section className="bg-navy py-16 text-navy-foreground md:py-20">
        <div className="container-x max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground">Busca personalizada</p>
          <h1 className="mt-3 text-4xl md:text-6xl">Encomende seu imóvel</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-navy-foreground/75">Conte o que procura. Nossa equipe seleciona imóveis que combinam com seu momento — inclusive oportunidades ainda não anunciadas.</p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Como funciona</p>
          <h2 className="mt-3 text-4xl">Você descreve. Nós encontramos.</h2>
          <div className="mt-8 space-y-6">
            {[
              [Home, "Defina suas prioridades", "Tipo de imóvel, região, faixa de investimento e o que é indispensável para você."],
              [Search, "Receba uma curadoria", "Um corretor especialista analisa o seu pedido e seleciona as melhores opções."],
              [Sparkles, "Conheça oportunidades exclusivas", "Acesse imóveis que ainda não foram divulgados publicamente."],
            ].map(([Icon, title, text]) => <div key={title as string} className="flex gap-4"><span className="h-fit rounded-xl bg-accent p-3 text-primary"><Icon className="h-6 w-6" /></span><div><h3 className="text-xl">{title as string}</h3><p className="mt-1 text-sm text-muted-foreground">{text as string}</p></div></div>)}
          </div>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); toast.success("Pedido enviado com sucesso!"); }} className="rounded-3xl border bg-card p-6 shadow-float sm:p-8">
          <h2 className="text-3xl">Conte o que você procura</h2>
          <p className="mt-1 text-sm text-muted-foreground">Preencha seus dados e o imóvel desejado.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold">Nome</span><input required className={field} placeholder="Como podemos chamar você?" /></label>
            <label><span className="mb-1.5 block text-sm font-semibold">Telefone</span><input required type="tel" inputMode="tel" maxLength={15} onChange={applyBrazilianPhoneMask} autoComplete="tel" className={field} placeholder="(11) 99999-9999" /></label>
            <label><span className="mb-1.5 block text-sm font-semibold">E-mail</span><input required type="email" className={field} placeholder="voce@email.com" /></label>
            <label><span className="mb-1.5 block text-sm font-semibold">Tipo do imóvel</span><input required className={field} placeholder="Ex.: Casa" /></label>
            <label><span className="mb-1.5 block text-sm font-semibold">Cidade</span><input required className={field} placeholder="Ex.: São Paulo" /></label>
            <label className="sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold">Finalidade</span><FormSelect required className={field}><option value="">Selecione</option><option>Comprar</option><option>Alugar</option><option>Temporada</option></FormSelect></label>
            <label className="sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold">Descrição do imóvel</span><textarea required rows={4} className={`${field} h-auto py-3`} placeholder="Descreva o imóvel que você procura." /></label>
          </div>
          <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110"><Send className="h-4 w-4" /> Enviar</button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">Ao enviar, você concorda com nossa política de privacidade.</p>
        </form>
      </section>
    </PageShell>
  );
}
