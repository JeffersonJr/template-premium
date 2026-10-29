import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Premium House | Dicas e mercado imobiliário" },
      { name: "description", content: "Guias, tendências e dicas para comprar, vender e alugar imóveis com segurança." },
      { property: "og:title", content: "Blog Premium House" },
      { property: "og:description", content: "Guias, tendências e dicas do mercado imobiliário." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/blog" }],
  }),
  component: BlogList,
});

function BlogList() {
  const cats = ["Todos", ...new Set(posts.map((p) => p.category))];
  const popularSearches = ["financiamento imobiliário", "imóvel na planta", "apartamentos à venda", "casas para alugar", "valorização imobiliária", "documentos para alugar"];
  const [cat, setCat] = useState("Todos");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const list = posts.filter((post) => {
    const matchesCategory = cat === "Todos" || post.category === cat;
    const searchableText = [post.title, post.excerpt, post.category, ...post.tags, ...post.body].join(" ").toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  return (
    <PageShell>
      <section className="bg-navy py-16 text-navy-foreground">
        <div className="container-x"><p className="text-sm font-bold uppercase tracking-widest text-navy-foreground">Blog</p><h1 className="mt-2 text-5xl">Dicas e mercado imobiliário</h1></div>
      </section>
      <div className="container-x mt-10">
        <div className="relative mb-6 max-w-2xl">
          <label htmlFor="blog-search" className="sr-only">Buscar artigos do blog</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input id="blog-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} placeholder="Buscar por assunto, imóvel ou mercado..." className="h-12 w-full rounded-xl border bg-card pl-12 pr-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => <button key={c} onClick={() => { setCat(c); setShowAll(false); }} className={`rounded-full border px-5 py-2 text-sm font-bold ${cat === c ? "border-navy bg-navy text-navy-foreground" : "bg-card"}`}>{c}</button>)}
        </div>
        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="order-2 min-w-0 lg:order-1">
            <p className="text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "artigo encontrado" : "artigos encontrados"}</p>
            {list.length > 0 ? <><div className="mt-4 grid gap-7 sm:grid-cols-2">{list.slice(0, showAll ? list.length : 6).map((p) => <PostCard key={p.slug} post={p} />)}</div>{list.length > 6 && <div className="mt-8 flex justify-center"><button type="button" onClick={() => setShowAll((value) => !value)} className="min-h-12 rounded-full border border-primary px-7 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{showAll ? "Ver menos" : "Ver mais artigos"}</button></div>}</> : <div className="mt-4 rounded-2xl border bg-card px-6 py-12 text-center"><p className="font-bold text-navy">Nenhum artigo encontrado</p><p className="mt-2 text-sm text-muted-foreground">Tente outro termo ou selecione uma categoria diferente.</p></div>}
          </main>
          <aside className="order-1 rounded-2xl border bg-card p-5 lg:sticky lg:top-28 lg:order-2">
            <p className="text-sm font-bold text-navy">Buscas populares</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Explore temas que interessam a quem procura um imóvel.</p>
            <div className="mt-4 divide-y">{popularSearches.map((term) => <button key={term} type="button" onClick={() => { setQuery(term); setCat("Todos"); setShowAll(false); }} className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">{term}<Search aria-hidden="true" className="h-4 w-4 shrink-0" /></button>)}</div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
