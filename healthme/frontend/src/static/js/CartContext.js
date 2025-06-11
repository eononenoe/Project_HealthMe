import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // 전역 장바구니 상태
  const [loading, setLoading] = useState(true);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, loading, setLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

