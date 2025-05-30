import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/Product";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(); // Asegura conexión a DB
  try {
    if (req.method === "GET") {
      const products = await Product.find({});
      return res.status(200).json(products);
    } else if (req.method === "POST") {
      const {
        nombre,
        sku,
        descripcion,
        categoria,
        precioBase,
        especificaciones,
      } = req.body;
      if (!nombre || !sku || !descripcion || !categoria || !precioBase) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }
      try {
        const nuevo = new Product({
          nombre,
          sku,
          descripcion,
          categoria,
          precioBase,
          especificaciones,
        });
        const prodGuardado = await nuevo.save();
        return res.status(201).json(prodGuardado);
      } catch (e: unknown) {
        console.error("Error creando producto:", e);
        // Si es error de duplicado de SKU, manejarlo específicamente
        if (
          typeof e === "object" &&
          e !== null &&
          "code" in e &&
          (e as any).code === 11000 &&
          "keyPattern" in e &&
          (e as any).keyPattern &&
          (e as any).keyPattern.sku
        ) {
          return res.status(409).json({ error: `El SKU '${sku}' ya existe` });
        }
        return res.status(500).json({ error: "Error al crear el producto" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        error: `Método ${req.method} no
permitido`,
      });
    }
  } catch (error: unknown) {
    console.error("Error en GET /api/products:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
