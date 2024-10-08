"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { ICONS, LOGO } from "@/constant/icons";
import { IMAGES_BANNER } from "@/constant/images";
import "swiper/css";
import { useMatchingStore } from "@/store/matchingStore";
import { getSession } from "@/lib/database/getSession";
import { useRouter } from "next/navigation";
import useOpenToggle from "@/hooks/useOpenToggle";
import LoginModal from "@/components/modal/LoginModal";
import { useUserStore } from "@/store/userStore";

SwiperCore.use([Navigation, Scrollbar, Autoplay]);

const { bannerImg } = IMAGES_BANNER;

export default function Banner() {
  const { matching } = useMatchingStore();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;
  const router = useRouter();
  const { isOpen, setIsOpen, openToggle } = useOpenToggle();
  const { user } = useUserStore();

  const handleMatchingClick = async () => {
    if (user) {
      router.push("/matching");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center relative z-dropdown">
        <Swiper
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}>
          <SwiperSlide>
            <Image src={bannerImg.src} alt={bannerImg.alt} width={375} height={194} priority className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={bannerImg.src} alt={bannerImg.alt} width={375} height={194} priority className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={bannerImg.src} alt={bannerImg.alt} width={375} height={194} priority className="w-full" />
          </SwiperSlide>
        </Swiper>
        <div className="absolute right-4 bottom-4 z-[1000] flex justify-center items-center w-[45px] h-[20px] bg-gray-1000 bg-opacity-50 rounded-[100px]">
          <span className="text-white text-center text-[11px] font-semibold tracking-[-0.22px] leading-[16.5px] ">
            {currentSlide} / {totalSlides}
          </span>
        </div>
      </div>
      {!matching && (
        <button
          type="button"
          onClick={handleMatchingClick}
          className="w-full h-[43px] py-[11px] pl-[16px] flex shrink-0 items-center gap-[8px] bg-[#0F0F0F] text-white text-[14px] font-medium tracking-[-0.28px] leading-[21px]">
          <img src={LOGO.logoColor.src} alt={LOGO.logoColor.alt} width={12} height={15} />
          매칭 항목 선택하고 딱 맞는 스터디 추천받기
          <img
            src={ICONS.rightArrowWhite.src}
            alt={ICONS.rightArrowWhite.alt}
            width={16}
            height={20}
            className="w-[16px] h-[20px]"
          />
        </button>
      )}
      {isOpen && <LoginModal onClose={openToggle} />}
    </>
  );
}
