import { useState } from "react";
import { ArrowRight } from "lucide-react";

const seoGroups = [
  {
    tab: "Tipos de imóvel",
    description: "Selecione o tipo e a finalidade que mais combinam com a sua busca.",
    links: [
      ["Apartamentos à venda no Itaim Bibi", "apartamento-venda-itaim-bibi"],
      ["Apartamentos para alugar em São Paulo", "apartamento-alugar-sao-paulo"],
      ["Casas à venda em Alphaville", "casa-venda-alphaville"],
      ["Coberturas à venda na Riviera", "cobertura-venda-riviera"],
      ["Casas de campo em Campos do Jordão", "casa-campo-campos-jordao"],
      ["Casas para alugar em São Paulo", "casa-alugar-sao-paulo"],
    ],
  },
  {
    tab: "Bairros",
    description: "Conheça imóveis em regiões selecionadas e muito procuradas.",
    links: [
      ["Imóveis no Itaim Bibi", "imoveis-itaim-bibi"],
      ["Imóveis em Alphaville", "imoveis-alphaville"],
      ["Imóveis em Pinheiros", "imoveis-pinheiros"],
      ["Imóveis em Granja Viana", "imoveis-granja-viana"],
      ["Imóveis na Riviera de São Lourenço", "imoveis-riviera"],
      ["Imóveis em Campos do Jordão", "imoveis-campos-do-jordao"],
    ],
  },
  {
    tab: "Cidades",
    description: "Veja imóveis nas cidades onde a Premium House atua.",
    links: [
      ["Imóveis em São Paulo", "imoveis-sao-paulo"],
      ["Imóveis em Barueri", "imoveis-barueri"],
      ["Imóveis em Bertioga", "imoveis-bertioga"],
      ["Imóveis em Cotia", "imoveis-cotia"],
      ["Imóveis em Campos do Jordão", "imoveis-campos-do-jordao"],
    ],
  },
] as const;

export function SeoNavigation() {
  const [active, setActive] = useState(0);
  const group = seoGroups[active]!;

  return (
    <section className="container-x mt-8 sm:mt-10">
      <div className="rounded-3xl bg-secondary/70 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Navegue por perfil</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Encontre imóveis do seu jeito</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{group.description}</p>
          </div>
          <div className="flex w-fit rounded-xl bg-card p-1 shadow-card" role="tablist" aria-label="Navegação por perfil">
            {seoGroups.map((item, index) => (
              <button
                key={item.tab}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition sm:px-4 ${active === index ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-navy"}`}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
          {group.links.map(([label, slug]) => (
            <a key={slug} href={`/busca/${slug}`} className="group flex items-center justify-between gap-3 rounded-full border bg-card px-4 py-3 text-sm font-semibold text-navy transition hover:border-primary hover:text-primary">
              <span>{label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-navy transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
