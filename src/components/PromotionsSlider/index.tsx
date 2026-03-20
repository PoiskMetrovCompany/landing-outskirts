"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import { Fragment } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import MoreLink from "../ui/MoreLink"
import styles from "./promotionsSlider.module.scss"

const slides = [
  {
    title: `скидка <br> на квартиры`,
    price: "до 4%",
    href: "#",
  },
  {
    title: "Квартиры <br> с ремонтом",
    price: "платеж от ~18 000 ₽/мес",
    href: "#",
  },
  {
    title: "Субсидированная ипотека",
    price: "на весь срок",
    href: "#",
  },
  {
    title: "Семейная ипотека",
    price: "первоначальный взнос от ~20%",
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

const renderTitle = (title: string) => {
  if (!title.includes("<br")) {
    return title
  }

  const titleParts = title.split(/<br\s*\/?>/i)

  return (
    <span>
      {titleParts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 ? (
            <>
              <span className={styles.promotions__titleMobileSpace}> </span>
              <br className={styles.promotions__titleBreak} />
            </>
          ) : null}
          {part.trim()}
        </Fragment>
      ))}
    </span>
  )
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
                  <h2 className={styles.promotions__title}>
                    {renderTitle(slide.title)}
                  </h2>
                  <p className={styles.promotions__price}>{slide.price}</p>
                </div>

                {/* <MoreLink
                  href={slide.href}
                  className={styles.promotions__moreLink}
                  onClick={(event) => {
                    if (!onMoreClick) return

                    event.preventDefault()
                    onMoreClick()
                  }}
                >
                  Подробнее
                </MoreLink> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
    </section>
  )
}

export default PromotionsSlider
