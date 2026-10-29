import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, CheckCircle2, ChevronLeft, Images, Send, Upload, UserRound } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { FormSelect } from "@/components/ui/form-select";
import { applyBrazilianPhoneMask, applyThousandsMask } from "@/lib/input-masks";

export const Route = createFileRoute("/anunciar")({
  head: () => ({ meta: [{ title: "Cadastre seu imóvel | Premium House" }, { name: "description", content: "Faça o pré-cadastro do seu imóvel para venda, locação ou temporada." }], links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/anunciar" }] }),
  component: PropertyRegistration,
});

const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring";
const label = "mb-1.5 block text-sm font-semibold";

function PropertyRegistration() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("Venda");
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const priceLabel = purpose === "Venda" ? "Valor de venda aproximado" : purpose === "Locação" ? "Valor de locação aproximado" : "Valor de temporada aproximado";

  if (completed) return <PageShell><section className="container-x py-24"><div className="mx-auto max-w-2xl rounded-3xl border bg-card p-10 text-center shadow-float"><CheckCircle2 className="mx-auto h-12 w-12 text-primary" /><h1 className="mt-5 text-4xl">Pré-cadastro enviado!</h1><p className="mt-3 text-muted-foreground">Recebemos as informações do seu imóvel. Um consultor entrará em contato em breve.</p></div></section></PageShell>;

  return <PageShell>
    <section className="bg-navy py-14 text-navy-foreground md:py-18"><div className="container-x max-w-4xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-navy-foreground">Para proprietários</p><h1 className="mt-3 text-4xl md:text-6xl">Cadastre seu imóvel</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-navy-foreground/75">Faça um pré-cadastro em poucos minutos. Nossa equipe irá revisar os dados e entrar em contato.</p></div></section>
    <section className="container-x max-w-4xl py-12 md:py-16">
      <ol className="grid grid-cols-3 gap-2" aria-label="Etapas do cadastro">
        {[[UserRound, "Proprietário"], [Building2, "Características"], [Images, "Fotos"]].map(([Icon, title], index) => { const number = index + 1; return <li key={title as string} className={`flex items-center gap-2 rounded-xl p-3 text-xs font-bold sm:text-sm ${step >= number ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground"}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">{number}</span><Icon className="hidden h-4 w-4 sm:block" /><span className="truncate">{title as string}</span></li>; })}
      </ol>
      <div className="mt-8 rounded-3xl border bg-card p-6 shadow-float sm:p-8">
        {step === 1 && <form onSubmit={(event) => { event.preventDefault(); setStep(2); }}>
          <h2 className="text-3xl">Dados do proprietário</h2><p className="mt-1 text-sm text-muted-foreground">Precisamos destes dados para entrar em contato.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className={label}>Nome</span><input required className={field} placeholder="Seu nome completo" /></label><label><span className={label}>Telefone</span><input required type="tel" inputMode="tel" maxLength={15} onChange={applyBrazilianPhoneMask} autoComplete="tel" className={field} placeholder="(11) 99999-9999" /></label><label><span className={label}>E-mail</span><input required type="email" className={field} placeholder="voce@email.com" /></label></div>
          <button className="mt-7 flex h-12 w-full items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110">Próximo</button>
        </form>}
        {step === 2 && <form onSubmit={(event) => { event.preventDefault(); setStep(3); }}>
          <h2 className="text-3xl">Características do imóvel</h2><p className="mt-1 text-sm text-muted-foreground">Quanto mais detalhes, melhor será nossa avaliação inicial.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label><span className={label}>Tipo de imóvel</span><input required className={field} placeholder="Ex.: Casa" /></label><label><span className={label}>Subtipo</span><input className={field} placeholder="Ex.: Sobrado" /></label>
            <label className="sm:col-span-2"><span className={label}>Finalidade</span><FormSelect value={purpose} onChange={(event) => setPurpose(event.target.value)} className={field}><option value="Venda">Para venda</option><option value="Locação">Para locação</option><option value="Temporada">Para temporada</option></FormSelect></label>
            <label className="sm:col-span-2"><span className={label}>{priceLabel}</span><input required type="text" inputMode="numeric" onChange={applyThousandsMask} className={field} placeholder="R$" /></label>
            <label><span className={label}>Nome do condomínio/edifício</span><input className={field} placeholder="Se houver" /></label><label><span className={label}>Valor do condomínio</span><input type="text" inputMode="numeric" onChange={applyThousandsMask} className={field} placeholder="Se houver" /></label>
            <label><span className={label}>Valor do IPTU</span><input type="text" inputMode="numeric" onChange={applyThousandsMask} className={field} placeholder="Valor aproximado" /></label><label className="flex items-end gap-3 pb-3"><input type="checkbox" className="h-4 w-4 accent-primary" /> <span className="text-sm font-semibold">Aceita financiamento</span></label>
            <label className="sm:col-span-2"><span className={label}>Endereço completo</span><input required className={field} placeholder="Rua, número, bairro, cidade e CEP" /></label>
            <label><span className={label}>Área total/terreno (m²)</span><input type="text" inputMode="numeric" onChange={applyThousandsMask} className={field} placeholder="Ex.: 300" /></label><label><span className={label}>Área útil/construída (m²)</span><input type="text" inputMode="numeric" onChange={applyThousandsMask} className={field} placeholder="Ex.: 180" /></label>
            <label><span className={label}>Dormitórios</span><input type="number" min="0" className={field} /></label><label><span className={label}>Suítes</span><input type="number" min="0" className={field} /></label><label><span className={label}>Vagas</span><input type="number" min="0" className={field} /></label>
            <div className="flex items-end gap-5 pb-3"><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" className="h-4 w-4 accent-primary" /> Mobiliado</label><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" className="h-4 w-4 accent-primary" /> Aceita pet?</label></div>
            <label className="sm:col-span-2"><span className={label}>Outras informações</span><textarea rows={4} className={`${field} h-auto py-3`} placeholder="Descreva diferenciais, estado de conservação e outros detalhes." /></label>
          </div>
          <div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(1)} className="flex h-12 items-center justify-center gap-1 rounded-xl border px-5 font-bold text-navy"><ChevronLeft className="h-4 w-4" /> Voltar</button><button className="h-12 flex-1 rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110">Próximo</button></div>
        </form>}
        {step === 3 && <form onSubmit={(event) => { event.preventDefault(); setCompleted(true); toast.success("Pré-cadastro enviado com sucesso!"); }}>
          <h2 className="text-3xl">Fotos do imóvel</h2><p className="mt-1 text-sm text-muted-foreground">Anexe imagens que mostrem os principais ambientes e diferenciais.</p>
          <label className="mt-7 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-secondary/40 p-6 text-center transition hover:border-primary hover:bg-accent"><Upload className="h-8 w-8 text-primary" /><span className="mt-3 font-bold text-navy">Anexar imagens</span><span className="mt-1 text-sm text-muted-foreground">JPG, PNG ou WEBP. Você pode selecionar várias fotos.</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => setPhotoNames(Array.from(event.target.files ?? []).map((file) => file.name))} /></label>
          {photoNames.length > 0 && <div className="mt-4 rounded-xl bg-accent p-4 text-sm"><strong>{photoNames.length} {photoNames.length === 1 ? "imagem selecionada" : "imagens selecionadas"}</strong><ul className="mt-2 list-inside list-disc text-muted-foreground">{photoNames.map((name) => <li key={name} className="truncate">{name}</li>)}</ul></div>}
          <div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(2)} className="flex h-12 items-center justify-center gap-1 rounded-xl border px-5 font-bold text-navy"><ChevronLeft className="h-4 w-4" /> Voltar</button><button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110"><Send className="h-4 w-4" /> Enviar cadastro</button></div>
        </form>}
      </div>
    </section>
  </PageShell>;
}
