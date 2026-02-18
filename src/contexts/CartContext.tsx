import { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
    id: string;
    name: string;
    model?: string;
    type: "diffuser" | "aroma";
    price: number;
    quantity: number;
    image?: string;
    variant?: string; // e.g. "100ml", "250ml" for aromas
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    totalItems: 0,
    totalPrice: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id));
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};
