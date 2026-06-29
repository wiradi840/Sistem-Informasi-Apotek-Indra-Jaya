/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  isPromo: boolean;
  discountPercent?: number;
  unit: string;
  dosage?: string;
  indication?: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Layanan {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
