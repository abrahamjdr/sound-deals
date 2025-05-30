import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
interface CartItem {
  id: string;
  nombre: string;
  precioBase: number;
  cantidad: number;
}

export default function CotizarPage() {
  const { cart, updateQuantity } = useCart();
  const [commission, setCommission] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (total: number, item: CartItem) => total + item.precioBase * item.cantidad,
    0
  );

  const handleCommission = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/calculate-commission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtotal, // Aquí mandas el subtotal
          items: cart, // Aquí mandas todos los productos del carrito
        }),
      });
      const data = await res.json();
      setCommission(data.commission); // El cálculo de la comisión
    } catch (err) {
      console.error("Error al calcular comisión:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      handleCommission();
    } else {
      setCommission(null);
    }
  }, [cart]);

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Resumen de Cotización
      </h1>

      {cart.length === 0 ? (
        <p className="text-center">No hay productos en el carrito.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          <ul className="divide-y divide-light-border dark:divide-dark-border">
            {cart.map((item: CartItem) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${item.precioBase.toFixed(2)} x {item.cantidad}
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 px-2 py-1 border rounded bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border"
                />
              </li>
            ))}
          </ul>

          <div className="text-right space-y-2">
            <p className="text-lg font-semibold">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <button
              onClick={handleCommission}
              className="bg-primary text-white px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 transition"
            >
              Calcular Comisión
            </button>
            {loading ? (
              <p className="text-sm">Calculando comisión...</p>
            ) : commission !== null ? (
              <p className="text-sm">
                Comisión estimada: ${commission.toFixed(2)}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
