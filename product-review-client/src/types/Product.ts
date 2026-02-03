import type { ReactNode } from "react";

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  description: ReactNode;
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviews: Review[];
}
