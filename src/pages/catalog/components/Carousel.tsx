import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import type { Product } from "../../../interfaces/Product";

interface carouselProps {
  productDetails: Product;
}
const Carousel = ({ productDetails }: carouselProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-t-xl lg:rounded-t-none w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {productDetails.images.map((image) => (
          <SwiperSlide key={image.url}>
            <img
              src={image.url}
              alt={productDetails.name}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
