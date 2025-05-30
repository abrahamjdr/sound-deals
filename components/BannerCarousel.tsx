// components/BannerCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    image: "/banner1.jpg",
    title: "Audífonos de Alta Calidad",
    description: "La mejor tecnología al alcance de tus oídos",
  },
  {
    image: "/banner2.jpg",
    title: "Sonido Inigualable",
    description: "Auriculares premium para los amantes del audio",
  },
  {
    image: "/banner3.jpg",
    title: "Comodidad Todo el Día",
    description: "Diseño ergonómico para largas jornadas de uso",
  },
];

export default function BannerCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="w-full h-[400px]"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white text-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="bg-black/60 p-6 rounded">
              <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
              <p className="text-lg">{banner.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
