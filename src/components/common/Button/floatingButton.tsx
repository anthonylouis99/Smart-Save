// components/cart/CartButton.tsx
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../../context/switchContext";

export const CartButton = ({ onOpen }: { onOpen: () => void }) => {
  const { cart } = useCart();

  return (
    <button
      onClick={onOpen}
      className=" bg-[var(--cartItems-background)] text-white p-6 rounded-full shadow-lg flex items-center justify-center relative hover:scale-105 transition"
    >
      <ShoppingCart size={20} className="color-[var(--card-text)]" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white rounded-full px-2 py-1">
          {cart.length}
        </span>
      )}
    </button>
  );
};
