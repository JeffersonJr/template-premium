import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus favoritos | Premium House" },
      { name: "description", content: "Imóveis que você salvou como favoritos na Premium House." },
      { property: "og:title", content: "Meus favoritos | Premium House" },
      { property: "og:description", content: "Seus imóveis salvos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Favs,
});

function Favs() {
  const { ids } = useFavorites();
  const list = properties.filter((p) => ids.includes(p.id));
  return (
    <PageShell>
      <section className="bg-navy py-14 text-navy-foreground">
        <div className="container-x"><h1 className="text-5xl">Meus favoritos</h1><p className="mt-2 text-navy-foreground/70">{list.length} imóveis salvos</p></div>
      </section>
      <div className="container-x mt-10">
        {list.length ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="rounded-3xl border bg-card p-14 text-center">
            <Heart className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-3xl">Nenhum favorito ainda</h2>
            <p className="mt-2 text-muted-foreground">Toque no coração dos imóveis para salvá-los aqui.</p>
            <Link to="/imoveis" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground">Explorar imóveis</Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}
