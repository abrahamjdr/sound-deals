import { useState } from "react";
import { useCart } from "../context/CartContext";
export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [commission, setCommission] = useState<number | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  // Calcular subtotal sumando cada item
  const subtotal = cart.reduce(
    (acc, item) => acc + item.precioBase * item.cantidad,
    0
  );
  const handleCalculateCommission = async () => {
    setCalculating(true);
    try {
      const res = await fetch("/api/calculate-commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtotal }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommission(data.commission);
      } else {
        console.error("Error al calcular comisión:", data.error || res.status);
        setCommission(null);
      }
    } catch (err) {
      console.error("Error de red al calcular comisión:", err);
      setCommission(null);
    } finally {
      setCalculating(false);
    }
  };
  if (cart.length === 0) {
    return (
      <div className="p-4">
        <p>No hay productos en la cotización.</p>
      </div>
    );
  }
  return (
    <div className="p-4 mt-6 border-t-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Cotización</h2>
      <table className="w-full text-sm mb-4">
        <thead className="text-left border-b">
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
            {/* columna para botón eliminar */}
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.nombre}</td>
              <td className="py-2">${item.precioBase.toFixed(2)}</td>
              <td className="py-2">
                <input
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value, 10);
                    updateQuantity(item.id, isNaN(qty) ? 1 : qty);
                  }}
                  className="w-16 p-1 border"
                />
              </td>
              <td className="py-2">
                ${(item.precioBase * item.cantidad).toFixed(2)}
              </td>
              <td className="py-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Resumen de totales */}
      <div className="text-right mb-4">
        <p className="text-lg">
          Subtotal:{" "}
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        {commission !== null && (
          <p className="text-lg">
            Comisión del vendedor:{" "}
            <span className="font-semibold">${commission.toFixed(2)}</span>
          </p>
        )}
      </div>
      {/* Botón para calcular comisión */}
      <div className="text-right">
        <button
          onClick={handleCalculateCommission}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bggreen-700 disabled:opacity-50"
          disabled={calculating}
        >
          {calculating ? "Calculando..." : "Calcular Comisión"}
        </button>
      </div>
    </div>
  );
}
