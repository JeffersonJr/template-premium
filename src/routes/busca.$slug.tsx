import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { isRent, isSale, properties, type Property } from "@/data/properties";

type Landing = { title: string; description: string; intro: string; match: (property: Property) => boolean };
const sale = (property: Property) => isSale(property);
const rent = (property: Property) => isRent(property);
const inArea = (property: Property, term: string) => `${property.neighborhood} ${property.city}`.toLowerCase().includes(term.toLowerCase());

const landings: Record<string, Landing> = {
  "apartamento-venda-itaim-bibi": { title: "Apartamentos à venda no Itaim Bibi", description: "Encontre apartamentos à venda no Itaim Bibi com a curadoria da Premium House.", intro: "O Itaim Bibi reúne mobilidade, gastronomia e empreendimentos de alto padrão. Veja apartamentos selecionados para comprar na região.", match: (p) => p.type === "Apartamento" && sale(p) && inArea(p, "Itaim Bibi") },
  "apartamento-alugar-sao-paulo": { title: "Apartamentos para alugar em São Paulo", description: "Apartamentos para alugar em São Paulo: opções selecionadas pela Premium House.", intro: "Seleção de apartamentos para locação em bairros estratégicos de São Paulo, com diferentes perfis, tamanhos e estilos de vida.", match: (p) => p.type === "Apartamento" && rent(p) && p.city === "São Paulo" },
  "casa-venda-alphaville": { title: "Casas à venda em Alphaville", description: "Casas à venda em Alphaville com segurança, lazer e alto padrão.", intro: "Alphaville combina condomínios completos, áreas verdes e praticidade. Conheça casas selecionadas para viver com mais espaço.", match: (p) => p.type === "Casa" && sale(p) && inArea(p, "Alphaville") },
  "cobertura-venda-riviera": { title: "Coberturas à venda na Riviera", description: "Coberturas à venda na Riviera de São Lourenço com a Premium House.", intro: "Opções de cobertura na Riviera para quem busca vista, lazer e proximidade com o mar.", match: (p) => p.type === "Cobertura" && sale(p) && inArea(p, "Riviera") },
  "casa-campo-campos-jordao": { title: "Casas de campo em Campos do Jordão", description: "Casas de campo à venda em Campos do Jordão selecionadas pela Premium House.", intro: "Encontre refúgios de serra com espaço, natureza e conforto em Campos do Jordão.", match: (p) => p.type === "Casa de Campo" && sale(p) && inArea(p, "Campos do Jordão") },
  "casa-alugar-sao-paulo": { title: "Casas para alugar em São Paulo", description: "Casas para alugar em São Paulo: opções exclusivas e selecionadas.", intro: "Conheça casas para locação em São Paulo com a curadoria consultiva da Premium House.", match: (p) => p.type === "Casa" && rent(p) && p.city === "São Paulo" },
  "imoveis-itaim-bibi": { title: "Imóveis no Itaim Bibi", description: "Imóveis à venda e para alugar no Itaim Bibi.", intro: "Confira imóveis selecionados no Itaim Bibi, um dos bairros mais desejados de São Paulo.", match: (p) => inArea(p, "Itaim Bibi") },
  "imoveis-alphaville": { title: "Imóveis em Alphaville", description: "Imóveis à venda e para alugar em Alphaville.", intro: "Conheça imóveis em Alphaville para quem procura segurança, conveniência e qualidade de vida.", match: (p) => inArea(p, "Alphaville") },
  "imoveis-pinheiros": { title: "Imóveis em Pinheiros", description: "Imóveis para alugar e comprar em Pinheiros, São Paulo.", intro: "Uma seleção de imóveis em Pinheiros para viver perto de cultura, serviços e mobilidade.", match: (p) => inArea(p, "Pinheiros") },
  "imoveis-granja-viana": { title: "Imóveis na Granja Viana", description: "Casas e imóveis à venda na Granja Viana.", intro: "Veja imóveis na Granja Viana, região procurada por quem valoriza espaço e contato com áreas verdes.", match: (p) => inArea(p, "Granja Viana") },
  "imoveis-riviera": { title: "Imóveis na Riviera de São Lourenço", description: "Imóveis à venda na Riviera de São Lourenço.", intro: "Descubra imóveis na Riviera de São Lourenço, com opções próximas ao mar e infraestrutura completa.", match: (p) => inArea(p, "Riviera") },
  "imoveis-campos-do-jordao": { title: "Imóveis em Campos do Jordão", description: "Imóveis em Campos do Jordão: casas e refúgios na serra.", intro: "Seleção de imóveis em Campos do Jordão para morar, descansar ou investir na serra.", match: (p) => inArea(p, "Campos do Jordão") },
  "imoveis-sao-paulo": { title: "Imóveis em São Paulo", description: "Imóveis à venda e para alugar em São Paulo com a curadoria da Premium House.", intro: "Encontre imóveis selecionados em São Paulo para comprar ou alugar, em bairros com infraestrutura, mobilidade e qualidade de vida.", match: (p) => p.city === "São Paulo" },
  "imoveis-barueri": { title: "Imóveis em Barueri", description: "Imóveis à venda e para alugar em Barueri com a curadoria da Premium House.", intro: "Conheça imóveis em Barueri, incluindo opções em Alphaville, para viver ou investir com praticidade.", match: (p) => p.city === "Barueri" },
  "imoveis-bertioga": { title: "Imóveis em Bertioga", description: "Imóveis à venda e para alugar em Bertioga com a curadoria da Premium House.", intro: "Veja imóveis em Bertioga e na Riviera de São Lourenço para aproveitar o litoral com conforto.", match: (p) => p.city === "Bertioga" },
  "imoveis-cotia": { title: "Imóveis em Cotia", description: "Imóveis à venda e para alugar em Cotia com a curadoria da Premium House.", intro: "Explore imóveis em Cotia, incluindo casas e condomínios na Granja Viana, para quem busca espaço e áreas verdes.", match: (p) => p.city === "Cotia" },
};

export const Route = createFileRoute("/busca/$slug")({
  loader: ({ params }) => { if (!landings[params.slug]) throw notFound(); return { slug: params.slug }; },
  head: ({ loaderData }) => {
    const landing = loaderData ? landings[loaderData.slug] : undefined;
    return landing ? { meta: [{ title: `${landing.title} | Premium House` }, { name: "description", content: landing.description }, { property: "og:title", content: landing.title }, { property: "og:description", content: landing.description }], links: [{ rel: "canonical", href: `https://premium-house-imoveis-2026.microsistec.chatgpt.site/busca/${loaderData!.slug}` }] } : { meta: [{ title: "Busca não encontrada | Premium House" }, { name: "robots", content: "noindex" }] };
  },
  component: SearchLanding,
});

function SearchLanding() {
  const { slug } = Route.useLoaderData();
  const landing = landings[slug]!;
  const list = properties.filter(landing.match);
  return <PageShell><section className="bg-navy py-16 text-navy-foreground"><div className="container-x max-w-4xl"><p className="text-sm font-bold uppercase tracking-widest text-navy-foreground">Imóveis selecionados</p><h1 className="mt-3 text-4xl md:text-6xl">{landing.title}</h1><p className="mt-5 max-w-3xl text-lg text-navy-foreground/75">{landing.intro}</p></div></section><section className="container-x py-14"><p className="text-sm text-muted-foreground">{list.length} imóveis encontrados</p>{list.length ? <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map((property, index) => <PropertyCard key={property.id} p={property} priority={index === 0} />)}</div> : <div className="mt-7 rounded-2xl border bg-card p-10 text-center"><p className="text-muted-foreground">Estamos atualizando a seleção desta busca.</p><Link to="/imoveis" className="mt-4 inline-block font-bold text-primary hover:underline">Ver todos os imóveis</Link></div>}</section></PageShell>;
}
