import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import { LeadForm } from "@/components/LeadForm";
import { ShareButtons } from "@/components/ShareButtons";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Blog Premium House` },
          { name: "description", content: loaderData.excerpt },
          { name: "author", content: loaderData.author },
          { name: "keywords", content: loaderData.tags.join(", ") },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:image", content: loaderData.img },
          { property: "og:image:alt", content: loaderData.title },
        ]
      : [{ title: "Artigo indisponível | Premium House" }, { name: "robots", content: "noindex" }],
    links: loaderData ? [{ rel: "canonical", href: `https://premium-house-imoveis-2026.microsistec.chatgpt.site/blog/${loaderData.slug}` }] : [],
  }),
  notFoundComponent: () => <PageShell><div className="container-x py-32 text-center"><h1 className="text-4xl">Artigo não encontrado</h1><Link to="/blog" className="mt-6 inline-block font-bold text-primary">Ver todos os artigos</Link></div></PageShell>,
  component: Article,
});

function Article() {
  const post = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <PageShell>
      <div className="container-x pt-10">
        <p className="text-sm text-muted-foreground"><Link to="/blog" className="hover:text-primary">Blog</Link> / {post.category}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <article>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{post.category}</span>
            <h1 className="mt-3 text-4xl md:text-5xl">{post.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">Por <span className="font-semibold text-navy">{post.author}</span> · {post.date} · {post.read} de leitura</p>
            <img src={post.img} alt={post.title} width={1024} height={768} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
            <div aria-label="Tags do artigo" className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-navy">{tag}</span>)}</div>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/85">
              <p className="text-xl font-semibold text-navy">{post.excerpt}</p>
              {post.body.map((b, i) => <p key={i}>{b}</p>)}
            </div>
            <div className="mt-10 rounded-2xl bg-brand-gradient p-8 text-navy-foreground">
              <h2 className="text-3xl">Procurando o imóvel ideal?</h2>
              <p className="mt-2 text-navy-foreground/80">Veja nossa seleção de imóveis à venda e para alugar.</p>
              <Link to="/imoveis" className="mt-5 inline-block rounded-full bg-card px-6 py-3 font-bold text-navy">Ver imóveis</Link>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t pt-6"><span className="font-bold">Compartilhe:</span><ShareButtons title={post.title} path={`/blog/${post.slug}`} /></div>
          </article>
          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-float lg:sticky lg:top-32">
            <h2 className="text-2xl">Fale com um especialista</h2>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Tire suas dúvidas com nossos corretores.</p>
            <LeadForm cta="Quero falar com um corretor" withMessage={false} whatsapp={`Olá! Li o artigo "${post.title}" e gostaria de ajuda.`} />
          </aside>
        </div>
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl">Leia também</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{others.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      </div>
    </PageShell>
  );
}
