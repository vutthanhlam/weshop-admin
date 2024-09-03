export type Revenue = {
  month: string;
  value: number;
};

export type Product = {
  id: string;
  name: string;
  image_url: string[];
  description: string[];
  variations: string[];
  price: number;
  sold: number;
  available: number;
};

export type CustomURL = {
  title: string;
  url: string;
  active: boolean;
};

export type Variation = {
  available: number;
  color: Color | null;
  files: [String | null];
};

export enum Color {
  "Black",
  "White",
  "Gray",
  "Red",
  "Yellow",
  "Blue",
}

export type ProductBasicInfo = {
  name: string;
  description: string;
  price: number;
  category: string;
};
