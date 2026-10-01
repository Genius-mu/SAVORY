'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SelectedOption, DeliveryDetails } from '@/types';
import confetti from 'canvas-confetti';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedOptions?: SelectedOption[],
    specialInstructions?: string,
    quantity?: number
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  couponCode: string;
  discountPercentage: number;
  applyCoupon: (code: string) => boolean;
  tipPercentage: number;
  setTipPercentage: (tip: number) => void;
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  tipAmount: number;
  discountAmount: number;
  totalPrice: number;
  totalItemsCount: number;
  toastMessage: string | null;
  triggerConfetti: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    method: 'delivery',
    address: '742 Evergreen Terrace, Brooklyn, NY',
    unit: 'Apt 4B',
    notes: 'Leave at front porch please',
    branch: 'Brooklyn Craft Kitchen (1.2 miles away)',
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load cart & settings from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('savory_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
      const savedCoupon = localStorage.getItem('savory_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
        setDiscountPercentage(20);
      }
      const savedDelivery = localStorage.getItem('savory_delivery');
      if (savedDelivery) {
        setDeliveryDetails(JSON.parse(savedDelivery));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on change ONLY after initial load completes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('savory_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart, isLoaded]);

  // Save delivery details to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('savory_delivery', JSON.stringify(deliveryDetails));
    } catch (e) {
      console.error('Failed to save delivery details:', e);
    }
  }, [deliveryDetails, isLoaded]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#123C2B', '#F9D661', '#FF8A50', '#FF6B6B'],
    });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (
    product: Product,
    selectedOptions: SelectedOption[] = [],
    specialInstructions = '',
    quantity = 1
  ) => {
    const optionsKey = selectedOptions
      .map((opt) => `${opt.groupTitle}:${opt.optionName}`)
      .sort()
      .join('|');

    const cartId = `${product.id}_${optionsKey}_${specialInstructions}`;
    const extraOptionsPrice = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
    const unitPrice = product.price + extraOptionsPrice;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          cartId,
          product,
          quantity,
          selectedOptions,
          specialInstructions,
          unitPrice,
        },
      ];
    });

    showToast(`Added ${product.name} to your crave cart! 🍔`);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercentage(0);
    try {
      localStorage.removeItem('savory_coupon');
    } catch {
      // Ignore
    }
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAVORY20' || cleanCode === 'CRAVE20') {
      setCouponCode(cleanCode);
      setDiscountPercentage(20);
      try {
        localStorage.setItem('savory_coupon', cleanCode);
      } catch {
        // Ignore
      }
      showToast('🎉 Coupon SAVORY20 applied! 20% OFF');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setCouponCode(cleanCode);
      setDiscountPercentage(10);
      try {
        localStorage.setItem('savory_coupon', cleanCode);
      } catch {
        // Ignore
      }
      showToast('🎉 Free Shipping Coupon applied!');
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const deliveryFee = deliveryDetails.method === 'pickup' ? 0 : subtotalAfterDiscount > 30 ? 0 : 3.99;
  const tax = subtotalAfterDiscount * 0.08;
  const tipAmount = (subtotalAfterDiscount * tipPercentage) / 100;
  const totalPrice = Math.max(0, subtotalAfterDiscount + deliveryFee + tax + tipAmount);
  const totalItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        couponCode,
        discountPercentage,
        applyCoupon,
        tipPercentage,
        setTipPercentage,
        deliveryDetails,
        setDeliveryDetails,
        subtotal,
        tax,
        deliveryFee,
        tipAmount,
        discountAmount,
        totalPrice,
        totalItemsCount,
        toastMessage,
        triggerConfetti,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
