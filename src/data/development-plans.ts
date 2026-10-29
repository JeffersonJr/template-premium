import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";

export type DevelopmentPlan = {
  id: string;
  code: string;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  floor: string;
  minPrice: number;
  maxPrice: number;
  entry: number;
  monthlyPayment: string;
  annualPayment: string;
  highlights: string[];
  images: string[];
};

export type DevelopmentTower = {
  id: string;
  name: string;
  status: string;
  floors: number;
  unitsCount: number;
  plans: DevelopmentPlan[];
};

const plans: DevelopmentPlan[] = [
  {
    id: "final-1",
    code: "85",
    name: "Planta Final 1",
    type: "Apartamento",
    area: 105.62,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parking: 2,
    floor: "Andares 3 a 16",
    minPrice: 878000,
    maxPrice: 960000,
    entry: 87800,
    monthlyPayment: "Consulte a equipe",
    annualPayment: "Consulte a equipe",
    highlights: [
      "3 dormitórios, sendo 1 suíte",
      "2 demi-suítes e lavabo",
      "Varanda gourmet",
      "2 vagas privativas",
    ],
    images: [p1, p2, p3],
  },
  {
    id: "final-2",
    code: "75",
    name: "Planta Final 2",
    type: "Apartamento",
    area: 92.4,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 1,
    floor: "Andares 2 a 16",
    minPrice: 742000,
    maxPrice: 835000,
    entry: 74200,
    monthlyPayment: "Consulte a equipe",
    annualPayment: "Consulte a equipe",
    highlights: [
      "3 dormitórios",
      "Suíte com closet",
      "Sala integrada à varanda",
      "1 vaga privativa",
    ],
    images: [p2, p4, p5],
  },
  {
    id: "final-4",
    code: "105",
    name: "Planta Final 4",
    type: "Apartamento",
    area: 128.3,
    bedrooms: 4,
    suites: 3,
    bathrooms: 4,
    parking: 2,
    floor: "Andares 4 a 16",
    minPrice: 1085000,
    maxPrice: 1240000,
    entry: 108500,
    monthlyPayment: "Consulte a equipe",
    annualPayment: "Consulte a equipe",
    highlights: [
      "4 dormitórios, sendo 3 suítes",
      "Living ampliado",
      "Varanda gourmet",
      "2 vagas privativas",
    ],
    images: [p3, p5, p1],
  },
];

/** Conteúdo demonstrativo para apresentar como torres e plantas podem ser exibidas. */
export const sampleDevelopmentTowers: DevelopmentTower[] = [
  {
    id: "torre-unica",
    name: "Torre Única",
    status: "Em construção",
    floors: 16,
    unitsCount: plans.length,
    plans,
  },
  {
    id: "torre-jardim",
    name: "Torre Jardim",
    status: "Lançamento",
    floors: 18,
    unitsCount: 2,
    plans: [plans[1]!, plans[2]!],
  },
];
