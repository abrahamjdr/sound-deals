import BannerCarousel from "@/components/BannerCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenido a Sound Deals
      </h1>

      <div className="w-full max-w-6xl mx-auto mb-10">
        <BannerCarousel />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">
            Audífonos de Alta Fidelidad
          </h3>
          <p className="text-sm opacity-80">
            Escucha música como nunca antes con nuestros modelos Hi-Fi para
            audiófilos exigentes.
          </p>
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Modelos Inalámbricos</h3>
          <p className="text-sm opacity-80">
            Olvídate de los cables y disfruta de libertad total con conectividad
            bluetooth 5.2.
          </p>
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Equipos para Gaming</h3>
          <p className="text-sm opacity-80">
            Con micrófonos integrados, sonido envolvente y diseño ergonómico
            para largas sesiones.
          </p>
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Accesorios y repuestos</h3>
          <p className="text-sm opacity-80">
            Pads, cables, estuches y más para mantener tus audífonos siempre
            como nuevos.
          </p>
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Atención a Empresas</h3>
          <p className="text-sm opacity-80">
            Soluciones a gran escala para revendedores o dotación corporativa
            con descuentos por volumen.
          </p>
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">
            Soporte Técnico y Garantía
          </h3>
          <p className="text-sm opacity-80">
            Todos nuestros productos cuentan con garantía local y soporte
            dedicado en línea.
          </p>
        </div>
      </section>
    </main>
  );
}
