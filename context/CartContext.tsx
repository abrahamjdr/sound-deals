"use client"; // solo necesario si usáramos App Router, en Pages no hace
import { createContext, useContext, useState, ReactNode } from "react";
// Definir el tipo de item en el carrito
interface CartItem {
  id: string;
  nombre: string;
  precioBase: number;
  cantidad: number;
}
// Definir qué expone el contexto
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}
// Crear contexto (inicialmente undefined hasta que sea provisto)
const CartContext = createContext<CartContextType | undefined>(undefined);
// Componente proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Añadir producto al carrito
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Ver si ya existe en el carrito
      const exists = prev.find((prod) => prod.id === item.id);
      if (exists) {
        // Si ya está, incrementamos su cantidad
        return prev.map((prod) =>
          prod.id === item.id
            ? { ...prod, cantidad: prod.cantidad + item.cantidad }
            : prod
        );
      } else {
        // Si no está, lo agregamos
        return [...prev, item];
      }
    });
  };
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((prod) =>
        prod.id === id
          ? { ...prod, cantidad: quantity < 1 ? 1 : quantity }
          : prod
      )
    );
  };
  // Quitar producto del carrito
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((prod) => prod.id !== id));
  };
  const value: CartContextType = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
// Custom hook para usar el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
