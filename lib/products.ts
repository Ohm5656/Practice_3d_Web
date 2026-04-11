export type Product = {
  id: string;
  name: string;
  description: string;
  tagline: string;
  price: number;
  image: string;
  specs: string[];
  cardImageScale: number;
  detailImageScale: number;
  hideImageMark?: boolean;
};

export const products: Product[] = [
  {
    id: "stealth",
    name: "AeroChron Stealth",
    description: "The ultimate iteration of mechanical darkness.",
    tagline: "The darkness, redefined.",
    price: 14999,
    image: "/images/stealth.png",
    specs: ["Ceramic Bezel", "Grade 5 Titanium", "Matte Finish"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "classic",
    name: "AeroChron Classic",
    description: "Polished steel precision. A timeless choice.",
    tagline: "Precision engineered.",
    price: 12499,
    image: "/images/classic.png",
    specs: ["Polished Steel", "Sapphire Crystal", "Silver Dial"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "rosegold",
    name: "AeroChron Rose Gold",
    description: "Warm elegance meets high-end horology.",
    tagline: "Uncompromising elegance.",
    price: 18999,
    image: "/images/rosegold.png",
    specs: ["18k Rose Gold", "Leather Strap", "Exhibition Back"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "cobalt",
    name: "AeroChron Cobalt",
    description: "Deep sapphire blue dial for the adventurous.",
    tagline: "Make waves.",
    price: 13499,
    image: "/images/cobalt.png",
    specs: ["Deep Blue Dial", "Brushed Steel", "300m Water Resist"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "obsidian",
    name: "AeroChron Obsidian",
    description: "Forged in absolute perfection. Dark and mysterious.",
    tagline: "Forged in absolute perfection.",
    price: 15999,
    image: "/images/obsidian.png",
    specs: ["Blackened Case", "Dark Dial", "Anti-Reflective Crystal"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "titanium",
    name: "AeroChron Titanium",
    description: "Ultra-lightweight strength. Crafted for the skies.",
    tagline: "Crafted for the skies.",
    price: 17999,
    image: "/images/titanium.png",
    specs: ["Grade 5 Titanium", "Featherlight Build", "Scratch Resistant"],
    cardImageScale: 1.08,
    detailImageScale: 1.12,
  },
  {
    id: "chronograph",
    name: "AeroChron Chronograph",
    description: "Precision timing with multiple subdials.",
    tagline: "Precision timing, perfected.",
    price: 19999,
    image: "/images/chronograph.png",
    specs: ["Triple Subdial", "Tachymeter Bezel", "Column Wheel Movement"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
  {
    id: "emerald",
    name: "AeroChron Emerald",
    description: "Striking green dial reflecting pure luxury.",
    tagline: "Striking green. Pure luxury.",
    price: 16999,
    image: "/images/emerald.png",
    specs: ["Forest Green Dial", "Yellow Gold Case", "Exhibition Caseback"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
  {
    id: "lunar",
    name: "AeroChron Lunar",
    description: "Celestial complication with moon phase.",
    tagline: "Time meets the cosmos.",
    price: 21999,
    image: "/images/lunar.png",
    specs: ["Moon Phase Complication", "Star-Map Dial", "White Gold Case"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
  {
    id: "skeleton",
    name: "AeroChron Skeleton",
    description: "Exposed mechanics. A raw view of time.",
    tagline: "A raw view of time.",
    price: 24999,
    image: "/images/skeleton.png",
    specs: ["Open-Worked Movement", "Visible Escapement", "Gold Accents"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
  {
    id: "sapphire",
    name: "AeroChron Sapphire",
    description: "Intense blue aesthetics inspired by deep oceans.",
    tagline: "Inspired by deep oceans.",
    price: 17499,
    image: "/images/sapphire.png",
    specs: ["Electric Blue Dial", "Ceramic Bezel", "300m Water Resistant"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
  {
    id: "diamond",
    name: "AeroChron Diamond",
    description: "Encrusted with premium VVS diamonds. Pure brilliance.",
    tagline: "Pure brilliance. Unrivaled.",
    price: 35000,
    image: "/images/diamond.png",
    specs: ["VVS Diamond Set", "Platinum Case", "Mother of Pearl Dial"],
    cardImageScale: 1.34,
    detailImageScale: 1.4,
    hideImageMark: true,
  },
];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product])
) as Record<string, Product>;
