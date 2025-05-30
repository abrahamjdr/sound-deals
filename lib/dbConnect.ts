import mongoose from "mongoose";
const MONGODB_URI: string | undefined = process.env.DB_URL;
if (!MONGODB_URI) {
  throw new Error("Por favor define la variable de entorno MONGODB_URI");
}
// Use global cache to avoid multiple connections in development
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbConnect;
