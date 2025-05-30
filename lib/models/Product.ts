import mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
  nombre: string;
  sku: string;
  descripcion: string;
  categoria: string;
  precioBase: number;
  especificaciones: string;
}
const ProductSchema: Schema<IProduct> = new Schema({
  nombre: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  precioBase: { type: Number, required: true },
  especificaciones: { type: String, required: false },
});
const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
