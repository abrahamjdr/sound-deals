// scripts/seed.ts
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "../../lib/dbConnect";
import Product from "../../lib/models/Product";

async function seedProducts() {
  await dbConnect();

  await Product.deleteMany(); // Limpia la colección antes de poblarla

  const products = Array.from({ length: 20 }).map((_, i) => ({
    nombre: `Audífono Modelo ${i + 1}`,
    sku: `AUD-${String(i + 1).padStart(3, "0")}`,
    descripcion: `Audífono de alta calidad, modelo número ${i + 1}.`,
    categoria: ["In-Ear", "Over-Ear", "Gaming", "Cancelación de Ruido"][i % 4],
    precioBase: parseFloat((50 + i * 7.5).toFixed(2)),
    especificaciones: JSON.stringify([
      `Bluetooth ${5 + (i % 2)}`,
      `${20 + i}h de batería`,
      `${i + 1} micrófonos`,
    ]),
  }));

  await Product.insertMany(products);

  console.log("✅ Productos insertados con éxito");
  process.exit();
}

seedProducts().catch((err) => {
  console.error("❌ Error insertando productos:", err);
  process.exit(1);
});
