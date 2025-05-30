import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  categoria: string;
  precioBase: number;
  especificaciones?: string;
}

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((prod) => {
    const s = search.toLowerCase();
    return (
      prod.nombre.toLowerCase().includes(s) ||
      prod.sku.toLowerCase().includes(s) ||
      prod.categoria.toLowerCase().includes(s)
    );
  });

  const handleAddToCart = (prod: Product) => {
    addToCart({
      id: prod._id,
      nombre: prod.nombre,
      precioBase: prod.precioBase,
      cantidad: 1,
    });
  };

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Catálogo de Productos
      </h1>

      <input
        type="text"
        placeholder="Buscar por nombre, SKU o categoría"
        className="w-full max-w-xl mx-auto mb-6 px-4 py-2 border rounded-md bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <li
              key={prod._id}
              className="p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-sm flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2">{prod.nombre}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                SKU: {prod.sku}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Categoría: {prod.categoria}
              </p>
              <p className="text-sm mb-2">{prod.descripcion}</p>
              <p className="font-semibold mb-4">
                ${prod.precioBase.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(prod)}
                className="mt-auto bg-primary bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded transition"
              >
                Añadir al Carrito
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
