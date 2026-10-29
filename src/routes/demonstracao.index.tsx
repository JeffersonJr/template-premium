import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, House, Tag } from "lucide-react";
import logo from "@/assets/logo-optimized.png";

export const Route = createFileRoute("/demonstracao/")({
  head: () => ({ meta: [{ title: "Demonstração de layouts | Premium House" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: DemonstrationIndex,
});

const examples = [
  { slug: "imovel-com-valor", title: "Ficha de imóvel", state: "Com valor", description: "Preço visível no resumo e junto ao formulário.", icon: House },
  { slug: "imovel-sem-valor", title: "Ficha de imóvel", state: "Sem valor", description: "Preço sob consulta, com formulário de contato preservado.", icon: House },
  { slug: "empreendimento-com-valor", title: "Ficha de empreendimento", state: "Com valor", description: "Empreendimento com preço inicial e unidades demonstrativas.", icon: Building2 },
  { slug: "empreendimento-sem-valor", title: "Ficha de empreendimento", state: "Sem valor", description: "Sem preço publicado; consulte disponibilidade com a equipe.", icon: Building2 },
];

function DemonstrationIndex() {
  return <main className="min-h-screen bg-background text-foreground"><header className="border-b bg-card"><div className="container-x flex h-[72px] items-center justify-between"><img src={logo} alt="Premium House" className="h-9 w-auto" /><span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy">Área de demonstração</span></div></header><section className="bg-navy py-16 text-white md:py-24"><div className="container-x"><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Modelos de apresentação</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">Landing pages de imóveis</h1><p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">Compare os modelos visuais de imóvel e empreendimento, com preço publicado ou sob consulta. As páginas são exemplos independentes e não representam disponibilidade comercial vigente.</p></div></section><div className="container-x py-10 md:py-14"><div className="mb-6"><h2 className="text-xl font-bold text-navy">Escolha um modelo</h2><p className="mt-1 text-sm text-muted-foreground">Quatro variações para demonstrar diferentes formatos de captação.</p></div><div className="grid gap-5 sm:grid-cols-2">{examples.map((example) => <Link key={example.slug} to="/demonstracao/$tipo" params={{ tipo: example.slug }} className="group rounded-2xl border bg-card p-6 transition hover:border-primary hover:shadow-card"><div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary"><example.icon className="h-5 w-5" /></div><span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-navy"><Tag className="h-3 w-3" />{example.state}</span></div><h2 className="mt-5 text-xl font-bold text-navy">{example.title}</h2><p className="mt-2 text-sm text-muted-foreground">{example.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Ver landing page <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div><footer className="mt-12 border-t bg-navy py-6 text-center text-xs text-white/65">Premium House · Demonstração visual, sem vínculo com anúncios ativos</footer></main>;
}
