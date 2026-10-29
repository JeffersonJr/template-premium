import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Heart } from "lucide-react";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/depoimento-enviado")({
  head: () => ({
    meta: [
      { title: "Obrigado pelo depoimento | Premium House" },
      { name: "description", content: "A Premium House agradece por compartilhar sua experiência." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell>
      <section className="container-x flex min-h-[52vh] items-center justify-center py-16">
        <div className="w-full max-w-2xl rounded-3xl border bg-card p-7 text-center shadow-float sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary"><CheckCircle2 className="h-9 w-9" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">Premium House</p>
          <h1 className="mt-2 text-3xl text-navy sm:text-4xl">Agradecemos pela sua avaliação!</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Obrigado por compartilhar sua experiência conosco. Sua opinião é muito importante para a Premium House e para quem está buscando um novo imóvel.</p>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-navy"><Heart className="h-4 w-4 fill-primary text-primary" /> Com carinho, equipe Premium House</p>
          <Link to="/" className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-navy-foreground transition hover:brightness-110">Voltar para o início</Link>
        </div>
      </section>
    </PageShell>
  ),
});
