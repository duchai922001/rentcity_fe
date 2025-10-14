export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  balance: number;
  expiryDate: string;
  type: 'primary' | 'secondary';
}

export interface RevenueStats {
  contracts: number;
  services: number;
  deposits: number;
  profits: number;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  loremIpsum: string;
  datePublished: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
