import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { FormSelect } from "@/components/ui/form-select";
import { applyBrazilianPhoneMask } from "@/lib/input-masks";

export const Route = createFileRoute("/trabalhe-conosco")({
  head: () => ({
    meta: [
      { title: "Trabalhe conosco | Premium House" },
      { name: "description", content: "Cadastre seu interesse em trabalhar com a Premium House." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/trabalhe-conosco" }],
  }),
  component: WorkWithUs,
});

function WorkWithUs() {
  const [hasCreci, setHasCreci] = useState("");
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring";
  const label = "mb-1.5 block text-sm font-semibold";

  if (sent) return <PageShell><section className="container-x py-24"><div className="mx-auto max-w-2xl rounded-3xl border bg-card p-10 text-center shadow-float"><CheckCircle2 className="mx-auto h-12 w-12 text-primary" /><h1 className="mt-5 text-4xl">Cadastro enviado!</h1><p className="mt-3 text-muted-foreground">Obrigado pelo interesse. Nosso time entrará em contato caso seu perfil esteja alinhado a uma oportunidade.</p></div></section></PageShell>;

  return <PageShell>
    <section className="bg-navy py-16 text-white md:py-20"><div className="container-x max-w-4xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-white">Faça parte do nosso time</p><h1 className="mt-3 text-4xl text-white md:text-6xl">Trabalhe conosco</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-white">Quer transformar o mercado imobiliário conosco? Conte um pouco sobre você.</p></div></section>
    <section className="container-x grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
      <div><span className="inline-flex rounded-2xl bg-accent p-4 text-primary"><UsersRound className="h-8 w-8" /></span><h2 className="mt-5 text-4xl">Seu próximo passo pode começar aqui.</h2><p className="mt-4 text-muted-foreground">Buscamos pessoas com vontade de aprender, cuidar de cada cliente e construir resultados em conjunto.</p></div>
      <form onSubmit={(event) => { event.preventDefault(); setSent(true); toast.success("Cadastro enviado com sucesso!"); }} className="rounded-3xl border bg-card p-6 shadow-float sm:p-8">
        <h2 className="text-3xl">Envie seu cadastro</h2><p className="mt-1 text-sm text-muted-foreground">Preencha os dados abaixo para conhecermos o seu perfil.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className={label}>Nome</span><input required className={field} placeholder="Seu nome completo" /></label>
          <label><span className={label}>Telefone</span><input required type="tel" inputMode="tel" maxLength={15} onChange={applyBrazilianPhoneMask} autoComplete="tel" className={field} placeholder="(11) 99999-9999" /></label>
          <label><span className={label}>E-mail</span><input required type="email" className={field} placeholder="voce@email.com" /></label>
          <label><span className={label}>Você é corretor?</span><FormSelect required className={field}><option value="">Selecione</option><option>Sim</option><option>Não</option></FormSelect></label>
          <label><span className={label}>Escolaridade</span><FormSelect required className={field}><option value="">Selecione</option><option>Ensino médio</option><option>Técnico</option><option>Superior incompleto</option><option>Superior completo</option><option>Pós-graduação</option></FormSelect></label>
          <label><span className={label}>Tem veículo próprio?</span><FormSelect required className={field}><option value="">Selecione</option><option>Sim</option><option>Não</option></FormSelect></label>
          <label><span className={label}>Tem CRECI?</span><FormSelect required value={hasCreci} onChange={(event) => setHasCreci(event.target.value)} className={field}><option value="">Selecione</option><option>Sim</option><option>Não</option></FormSelect></label>
          {hasCreci === "Não" && <label className="sm:col-span-2"><span className={label}>Tem interesse em fazer o técnico em transações imobiliárias para estar habilitado como corretor credenciado pelo CRECI?</span><FormSelect required className={field}><option value="">Selecione</option><option>Sim</option><option>Não</option></FormSelect></label>}
          <label className="sm:col-span-2"><span className={label}>Tem conhecimento em informática?</span><FormSelect required className={field}><option value="">Selecione</option><option>Básico</option><option>Intermediário</option><option>Avançado</option></FormSelect></label>
          <label className="sm:col-span-2"><span className={label}>Informações adicionais</span><textarea rows={4} className={`${field} h-auto py-3`} placeholder="Conte sobre sua experiência, disponibilidade e outros pontos relevantes." /></label>
        </div>
        <button className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110"><Send className="h-4 w-4" /> Enviar cadastro</button>
      </form>
    </section>
  </PageShell>;
}
