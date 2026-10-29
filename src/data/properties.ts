import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";

const POOL = [hero, p1, p2, p3, p4, p5, p6, banner1, banner2];

export type Property = {
  id: string;
  title: string;
  type: "Apartamento" | "Casa" | "Cobertura" | "Casa de Campo";
  purpose: "Venda" | "Locação" | "Venda e Locação" | "Temporada";
  rentPrice?: number;
  neighborhood: string;
  city: string;
  price: number;
  area: number;
  beds: number;
  suites: number;
  baths: number;
  parking: number;
  images: string[];
  featured?: boolean;
  bannerFeatured?: boolean;
  bannerStartsAt?: boolean;
  opportunity?: boolean;
  previousPrice?: number;
  specialCondition?: string;
  tag?: string;
  developmentSlug?: string;
  description: string;
  amenities: string[];
  nearby: { name: string; dist: string }[];
  features: Record<string, string[]>;
  video: string;
  instagram?: string;
  cleaningFee?: number;
  maxGuests?: number;
  petsAllowed?: boolean;
  acceptsTrade?: boolean;
  acceptsFinancing?: boolean;
  seasonalRates?: { label: string; start: string; end: string; dailyPrice: number }[];
  unavailableDates?: string[];
  condo: number;
  iptu: number;
  lat: number;
  lng: number;
  tour: string;
  broker: Broker;
};

export type Broker = { name: string; creci: string; phone: string; phoneLabel: string; email: string; photo?: string };
export const brokers: Broker[] = [
  { name: "Ana Carolina Souza", creci: "CRECI 123456-F", phone: "5511977771111", phoneLabel: "(11) 97777-1111", email: "ana.souza@premiumhouse.com.br" },
  { name: "Ricardo Almeida", creci: "CRECI 234567-F", phone: "5511977772222", phoneLabel: "(11) 97777-2222", email: "ricardo.almeida@premiumhouse.com.br" },
  { name: "Juliana Prado", creci: "CRECI 345678-F", phone: "5511977773333", phoneLabel: "(11) 97777-3333", email: "juliana.prado@premiumhouse.com.br" },
];

export const PHONE = "5511999999999";
export const PHONE_LABEL = "(11) 99999-9999";

const base: Omit<Property, Extra>[] = [
  { id: "PH1024", title: "Casa contemporânea com piscina", type: "Casa", purpose: "Venda", neighborhood: "Alphaville", city: "Barueri", price: 4850000, area: 520, beds: 4, suites: 4, baths: 6, parking: 4, images: [hero, p4, p5, p1], featured: true, tag: "Exclusivo", acceptsFinancing: true, description: "Projeto assinado com integração total entre áreas sociais e jardim tropical. Piscina aquecida, espaço gourmet e acabamentos de alto padrão.", amenities: ["Piscina aquecida", "Espaço gourmet", "Automação", "Energia solar", "Segurança 24h"] },
  { id: "PH1031", title: "Apartamento alto padrão com vista", type: "Apartamento", purpose: "Venda e Locação", rentPrice: 12000, neighborhood: "Itaim Bibi", city: "São Paulo", price: 2390000, area: 168, beds: 3, suites: 2, baths: 3, parking: 2, images: [p1, p5, p4], featured: true, bannerFeatured: true, bannerStartsAt: true, tag: "Lançamento", developmentSlug: "skyline-residences", description: "Andar alto com vista panorâmica, living amplo com caixilhos piso-teto e condomínio completo de lazer.", amenities: ["Academia", "Piscina", "Varanda gourmet", "Portaria 24h"] },
  { id: "PH1045", title: "Sobrado moderno em condomínio", type: "Casa", purpose: "Venda e Locação", rentPrice: 8500, neighborhood: "Granja Viana", city: "Cotia", price: 1590000, area: 290, beds: 3, suites: 3, baths: 4, parking: 3, images: [p2, p4, p5], featured: true, opportunity: true, previousPrice: 1790000, specialCondition: "Condições especiais para fechar negócio", acceptsTrade: true, description: "Sobrado novo em condomínio fechado, jardim privativo e muita luz natural.", amenities: ["Condomínio fechado", "Jardim", "Churrasqueira", "Playground"] },
  { id: "PH1052", title: "Cobertura duplex frente mar", type: "Cobertura", purpose: "Venda", neighborhood: "Riviera de São Lourenço", city: "Bertioga", price: 6900000, area: 410, beds: 5, suites: 5, baths: 7, parking: 4, images: [p3, p1, p5], featured: true, opportunity: true, previousPrice: 7350000, specialCondition: "Condição exclusiva por tempo limitado", tag: "Frente mar", description: "Cobertura com piscina de borda infinita e pôr do sol sobre o oceano. Uma experiência única.", amenities: ["Borda infinita", "Frente mar", "Sauna", "Elevador privativo"] },
  { id: "PH1060", title: "Apartamento decorado para locação", type: "Apartamento", purpose: "Locação", neighborhood: "Vila Nova Conceição", city: "São Paulo", price: 14500, area: 132, beds: 2, suites: 2, baths: 3, parking: 2, images: [p5, p4, p1], featured: true, description: "Mobiliado e decorado, pronto para morar ao lado do Parque Ibirapuera.", amenities: ["Mobiliado", "Pet friendly", "Academia", "Coworking"] },
  { id: "PH1077", title: "Casa de campo com vista para serra", type: "Casa de Campo", purpose: "Venda", neighborhood: "Serra da Mantiqueira", city: "Campos do Jordão", price: 2150000, area: 340, beds: 4, suites: 2, baths: 4, parking: 4, images: [p6, p4, p5], featured: true, bannerFeatured: true, opportunity: true, previousPrice: 2390000, specialCondition: "Valor especial para proposta imediata", tag: "Oportunidade", description: "Refúgio com deck de madeira, lareira e vista deslumbrante para as montanhas.", amenities: ["Lareira", "Deck", "Pomar", "Área verde 5.000 m²"] },
  { id: "PH1083", title: "Loft com cozinha gourmet", type: "Apartamento", purpose: "Locação", neighborhood: "Pinheiros", city: "São Paulo", price: 8900, area: 85, beds: 1, suites: 1, baths: 2, parking: 1, images: [p4, p1], description: "Loft com pé-direito duplo e cozinha integrada, perto do metrô.", amenities: ["Pé-direito duplo", "Rooftop", "Bicicletário"] },
  { id: "PH1090", title: "Casa térrea com jardim", type: "Casa", purpose: "Locação", neighborhood: "Alto de Pinheiros", city: "São Paulo", price: 22000, area: 380, beds: 4, suites: 3, baths: 5, parking: 4, images: [p2, p5, p4], description: "Casa térrea em rua arborizada, jardim amplo e piscina.", amenities: ["Piscina", "Jardim", "Edícula"] },
  { id: "PH1098", title: "Casa de temporada com piscina perto do mar", type: "Casa", purpose: "Temporada", neighborhood: "Riviera de São Lourenço", city: "Bertioga", price: 600, area: 240, beds: 3, suites: 2, baths: 3, parking: 1, images: [p3, p2, p5, p1], tag: "Temporada", description: "Casa confortável para aproveitar dias de descanso no litoral, com piscina, espaço gourmet e ambientes integrados para receber a família.", amenities: ["Piscina", "Espaço gourmet", "Ar-condicionado", "Wi-Fi", "A poucos minutos da praia"], cleaningFee: 350, maxGuests: 6, petsAllowed: false, seasonalRates: [
    { label: "Natal / Réveillon", start: "25/12/2026", end: "09/01/2027", dailyPrice: 1300 },
    { label: "Janeiro", start: "10/01/2027", end: "31/01/2027", dailyPrice: 1050 },
    { label: "Fevereiro", start: "01/02/2027", end: "28/02/2027", dailyPrice: 820 },
    { label: "Março", start: "01/03/2027", end: "31/03/2027", dailyPrice: 600 },
  ], unavailableDates: ["2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"] },
];

export const isSale = (p: Pick<Property, "purpose">) => p.purpose === "Venda" || p.purpose === "Venda e Locação";
export const isRent = (p: Pick<Property, "purpose">) => p.purpose === "Locação" || p.purpose === "Venda e Locação";
export const isSeasonal = (p: Pick<Property, "purpose">) => p.purpose === "Temporada";
export const salePrice = (p: Property) => (isSale(p) ? p.price : undefined);
export const rentPrice = (p: Property) => (p.purpose === "Locação" ? p.price : p.rentPrice);

export function formatPrice(p: Property) {
  const v = p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: p.purpose === "Temporada" ? 2 : 0, maximumFractionDigits: p.purpose === "Temporada" ? 2 : 0 });
  return p.purpose === "Locação" ? `${v}/mês` : p.purpose === "Temporada" ? `${v}/diária` : v;
}

export function whatsappLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Extra = "tour" | "broker" | "nearby" | "features" | "video" | "condo" | "iptu" | "lat" | "lng";

const coords: Record<string, [number, number]> = {
  Barueri: [-23.5022, -46.8486], "São Paulo": [-23.5868, -46.6823], Cotia: [-23.6037, -46.8919],
  Bertioga: [-23.8065, -46.0262], "Campos do Jordão": [-22.7396, -45.5912],
};

const hoodsX = [["Moema", "São Paulo"], ["Jardins", "São Paulo"], ["Tamboré", "Santana de Parnaíba"], ["Brooklin", "São Paulo"], ["Perdizes", "São Paulo"], ["Aldeia da Serra", "Barueri"], ["Juquehy", "São Sebastião"], ["Vila Madalena", "São Paulo"]] as const;
const nonSeasonalBase = base.filter((p) => p.purpose !== "Temporada");
const extras = [...nonSeasonalBase, ...nonSeasonalBase].slice(0, 16).map((p, k) => {
  const [n, c] = hoodsX[k % hoodsX.length]!;
  const f = 0.8 + ((k * 37) % 50) / 100;
  return { ...p, id: `PH${1100 + k * 7}`, neighborhood: n, city: c, price: Math.round((p.price * f) / 1000) * 1000, area: Math.round(p.area * f), featured: false, bannerFeatured: false, bannerStartsAt: false, opportunity: false, previousPrice: undefined, specialCondition: undefined, tag: k % 5 === 0 ? "Novo" : undefined, images: [...p.images].reverse() } as Omit<Property, Extra>;
});

export const properties: Property[] = [...base, ...extras].map((p, i) => ({
  ...p,
  images: [...p.images, ...POOL.filter((x) => !p.images.includes(x))].slice(0, 10).concat(p.images).slice(0, 10),
  tour: "https://my.matterport.com/show/?m=SxQL3iGyoDo&play=1",
  broker: brokers[i % brokers.length]!,
  condo: p.type.startsWith("Casa") ? 1200 + i * 150 : 1800 + i * 200,
  iptu: Math.round(p.price * (p.purpose === "Venda" ? 0.0006 : 0.05)),
  acceptsTrade: p.acceptsTrade ?? false,
  video: "https://www.youtube.com/embed/zumJJUL_ruM",
  lat: coords[p.city]?.[0] ?? -23.55,
  lng: coords[p.city]?.[1] ?? -46.63,
  nearby: [
    { name: "Supermercado", dist: `${300 + i * 50} m` }, { name: "Escola bilíngue", dist: `${600 + i * 40} m` },
    { name: "Parque", dist: `${800 + i * 30} m` }, { name: "Hospital", dist: `${1.2 + i * 0.2} km`.replace(".", ",") },
    { name: "Shopping", dist: `${1.5 + i * 0.3} km`.replace(/(\.\d)\d+/, "$1").replace(".", ",") }, { name: "Academia", dist: `${200 + i * 20} m` },
  ],
  features: {
    "Imóvel": ["Piso porcelanato", "Ar-condicionado", "Armários planejados", "Varanda", "Aquecimento a gás", "Closet"],
    "Condomínio": ["Portaria 24h", "Piscina", "Academia", "Salão de festas", "Playground", "Espaço pet"],
  },
}));

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const slugPart = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const propertySeoTitle = (p: Property) => {
  const purpose = p.purpose === "Venda" ? "à venda" : p.purpose === "Locação" ? "para alugar" : p.purpose === "Temporada" ? "para temporada" : "à venda e para alugar";
  const price = p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
  return `${p.type} com ${p.beds} dormitórios ${purpose}, ${p.area} m² por ${price}${p.purpose === "Temporada" ? " a diária" : ""} — ${p.neighborhood} — ${p.city}/SP`;
};
export const legacyPropertySlug = (p: Property) => slugPart(`${p.type}-${p.beds}-dormitorios-${p.purpose}-${p.area}m2-${p.neighborhood}-${p.city}-${p.id}`);
export const propertySlug = (p: Property) => {
  const purpose = p.purpose === "Venda" ? "venda" : p.purpose === "Locação" ? "locacao" : p.purpose === "Temporada" ? "temporada" : "venda-e-locacao";
  return slugPart(`${p.type}-${purpose}-${p.neighborhood}-${p.id}`);
};
export const propertyPath = (p: Property) => `/imoveis/${propertySlug(p)}`;
export const ADDRESS = "Av. Paulista, 1000 – Bela Vista, São Paulo/SP";
export const HOURS = [["Seg. a sex.", "9h às 19h"], ["Sábado", "9h às 14h"], ["Domingo", "Plantão via WhatsApp"]] as const;
export const PHONE_RENT = "5511988888888";
export const PHONE_RENT_LABEL = "(11) 98888-8888";
