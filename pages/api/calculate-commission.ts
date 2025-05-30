import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Método ${req.method} no
    permitido`,
    });
  }
  const { subtotal, items } = req.body;
  try {
    // Validamos entrada
    if (subtotal === undefined && !items) {
      return res
        .status(400)
        .json({ error: "Datos de cotización noproporcionados" });
    }
    // Lógica de cálculo de comisión:
    let commission = 0;
    if (items && Array.isArray(items)) {
      // Opción: calcular a partir de items (sumar subtotales)
      const sum = items.reduce(
        (acc, it) => acc + it.precioBase * it.cantidad,
        0
      );
      commission = sum * 0.1; // ejemplo: 10% del total
    } else if (subtotal !== undefined) {
      // Opción: calcular directamente del subtotal
      const sub =
        typeof subtotal === "number" ? subtotal : parseFloat(subtotal);
      commission = sub * 0.1; // 10% comisión
    }
    // Redondeamos a 2 decimales por estética
    commission = Math.round(commission * 100) / 100;
    return res.status(200).json({ commission });
  } catch (error: unknown) {
    console.error("Error calculando comisión:", error);
    if (subtotal === undefined || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Datos de cotización no proporcionados" });
    }
    return res
      .status(500)
      .json({ error: "Error interno en cálculo de comisión" });
  }
}
