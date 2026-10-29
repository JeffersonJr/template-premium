import { writeFile } from "node:fs/promises";
import { posts } from "../src/data/posts";
import { properties, propertyPath } from "../src/data/properties";

const origin = "https://premium-house-imoveis-2026.microsistec.chatgpt.site";
const publicPaths = [
  "/",
  "/imoveis",
  "/empreendimentos",
  "/blog",
  "/contato",
  "/sobre",
  "/corretores",
  "/anunciar",
  "/trabalhe-conosco",
  "/encomende-seu-imovel",
  "/politica-de-privacidade",
  "/enviar-depoimento",
  ...[
    "apartamento-venda-itaim-bibi",
    "apartamento-alugar-sao-paulo",
    "casa-venda-alphaville",
    "cobertura-venda-riviera",
    "casa-campo-campos-jordao",
    "casa-alugar-sao-paulo",
    "imoveis-itaim-bibi",
    "imoveis-alphaville",
    "imoveis-pinheiros",
    "imoveis-granja-viana",
    "imoveis-riviera",
    "imoveis-campos-do-jordao",
    "imoveis-sao-paulo",
    "imoveis-barueri",
    "imoveis-bertioga",
    "imoveis-cotia",
  ].map((slug) => `/busca/${slug}`),
  ...[
    "skyline-residences",
    "jardins-de-alphaville",
    "mar-azul-riviera",
    "vista-paulista",
    "refugio-da-serra",
  ].map((slug) => `/empreendimentos/${slug}`),
  ...properties.map(propertyPath),
  ...posts.map((post) => `/blog/${post.slug}`),
];

const xmlEscape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const urls = [...new Set(publicPaths)].sort();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((pathname) => `  <url><loc>${xmlEscape(`${origin}${pathname}`)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("../public/sitemap.xml", import.meta.url), sitemap, "utf8");
