import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type CartContextValue = {
  count: number;
  addItem: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const value = useMemo<CartContextValue>(
    () => ({
      count,
      addItem: () => setCount((current) => current + 1),
    }),
    [count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
