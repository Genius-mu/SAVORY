export type Category = 'all' | 'burger' | 'pizza' | 'shawarma' | 'sides' | 'combos';

export interface ProductOption {
  name: string;
  price: number;
}

export interface ProductOptionGroup {
  title: string;
  required?: boolean;
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  category: 'burger' | 'pizza' | 'shawarma' | 'sides' | 'combos';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tags: string[];
  calories?: string;
  prepTime?: string;
  rating: number;
  reviewsCount: number;
  isTopPick?: boolean;
  isDailyDeal?: boolean;
  optionGroups?: ProductOptionGroup[];
}

export interface SelectedOption {
  groupTitle: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartId: string; // unique identifier combining productId and selected options
  product: Product;
  quantity: number;
  selectedOptions?: SelectedOption[];
  specialInstructions?: string;
  unitPrice: number;
}

export interface DeliveryDetails {
  method: 'delivery' | 'pickup';
  address: string;
  unit?: string;
  notes?: string;
  branch: string;
}
