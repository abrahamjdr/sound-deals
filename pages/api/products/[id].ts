import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/Product";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query; // obtén el id de la URL
  try {
    if (req.method === "GET") {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.status(200).json(product);
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({
        error: `Método ${req.method} no
permitido`,
      });
    }
  } catch (error: unknown) {
    console.error(`Error en GET /api/products/${id}:`, error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
