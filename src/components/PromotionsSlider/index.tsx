"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import MoreLink from "../ui/MoreLink"
import styles from "./promotionsSlider.module.scss"

const slides = [
  {
    title: "КВАРТИРЫ ПОД 0,1% НА ЭТАПЕ СТРОЙКИ",
    price: "от 13 980 ₽/мес",
    href: "#",
  },
  {
    title: "РАССРОЧКА 0% ОТ ЗАСТРОЙЩИКА",
    price: "от 80 000 ₽/мес",
    href: "#",
  },
  {
    title: "ИПОТЕКА ОТ 3,7% НА ВЕСЬ СРОК",
    price: "от 17 653 ₽/мес",
    href: "#",
  },
  {
    title: "СКИДКИ НА ПАРКИНГ ДО 250 000 ₽",
    price: "от 560 000 ₽",
    href: "#",
  },
  {
    title: "КВАРТИРЫ ПОД 0,1% НА ЭТАПЕ СТРОЙКИ",
    price: "от 13 980 ₽/мес",
    href: "#",
  },
]

const activeBulletColors = [
  "var(--White-White-100)",
  "var(--White-White-100)",
  "var(--White-White-100)",
  "var(--White-White-100)",
  "var(--White-White-100)",
]

interface PromotionsSliderProps {
  onMoreClick?: () => void
}

const PromotionsSlider = ({ onMoreClick }: PromotionsSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const sliderStyle = {
    "--promotions-active-bullet-color": activeBulletColors[activeSlide],
  } as CSSProperties

  return (
    <section className={styles.promotions} aria-label="Все акции">
      <article className={styles.promotions__card}>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          className={styles.promotions__slider}
          style={sliderStyle}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            renderBullet: (_, className) => {
              return `<span class="${className} ${styles.promotions__bullet}"></span>`
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              className={styles.promotions__slide}
              key={`${slide.title}-${index}`}
            >
              <div className={styles.promotions__content}>
                <div className={styles.promotions__textGroup}>
                  <h2 className={styles.promotions__title}>{slide.title}</h2>
                  <p className={styles.promotions__price}>{slide.price}</p>
                </div>

                <MoreLink
                  href={slide.href}
                  className={styles.promotions__moreLink}
                  onClick={(event) => {
                    if (!onMoreClick) return

                    event.preventDefault()
                    onMoreClick()
                  }}
                >
                  Подробнее
                </MoreLink>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
    </section>
  )
}

export default PromotionsSlider
