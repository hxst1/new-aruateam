export type ColorKey = "black" | "purple" | "red" | "white";
export type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;              // cents
  currency: "EUR";
  images: string[];
  tags: string[];
  colorway?: ColorKey | [ColorKey] | [ColorKey, ColorKey];
  inStock: boolean;
  description?: string;

  // opcionales
  sizeOptions?: SizeKey[];
  dimensions?: string;
  specs?: { label: string; value: string }[];
};

export type CartLine = {
  key: string;                // único por variante (id + talla)
  productId: string;
  slug: string;
  name: string;               // puedes incluir talla visualmente si quieres
  price: number;              // cents
  currency: string;
  image: string | null;
  qty: number;

  // NUEVO
  colorway?: ColorKey[];
  size?: SizeKey | null;
};

export type CartState = { lines: CartLine[] };
