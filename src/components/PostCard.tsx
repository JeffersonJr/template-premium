import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block overflow-hidden rounded-[1.25rem] border border-border/80 bg-card shadow-none transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
      <div className="aspect-[16/10] overflow-hidden"><img src={post.img} alt={post.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs"><span className="font-bold uppercase tracking-widest text-primary">{post.category}</span><span className="text-muted-foreground">{post.date} · {post.read}</span></div>
        <h3 className="mt-2 text-xl">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <span className="mt-3 inline-block text-sm font-bold text-navy">Ler artigo →</span>
      </div>
    </Link>
  );
}
