// components/Banner.tsx
export default function Banner() {
  return (
    <section className="relative w-full h-[400px] bg-cover bg-center bg-[url('/banner1.jpg')] flex items-center justify-center text-white text-center">
      <div className="bg-black/60 p-6 rounded">
        <h2 className="text-4xl font-bold mb-2">Audífonos de Alta Calidad</h2>
        <p className="text-lg">La mejor tecnología al alcance de tus oídos</p>
      </div>
    </section>
  );
}
