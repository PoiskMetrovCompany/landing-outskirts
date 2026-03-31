"use client"

import { useRef, useState } from "react"
import type { CSSProperties } from "react"
import { Fragment } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

import Button from "../ui/Button"
import IconImage from "../ui/IconImage"
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
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const sliderStyle = {
    "--promotions-active-bullet-color": activeBulletColors[activeSlide],
  } as CSSProperties

  return (
    <section className={styles.promotions} aria-label="Все акции">
      <article className={styles.promotions__card}>
        <Swiper
          slidesPerView={1}
          autoHeight
          className={styles.promotions__slider}
          style={sliderStyle}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
          onSlideChange={(swiper) => {
            swiperRef.current = swiper
            setActiveSlide(swiper.realIndex)
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.promotions__arrows} aria-label="Навигация по акциям">
          <Button
            color="transparent"
            className={styles.promotions__arrowButton}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Предыдущая акция"
            disabled={isBeginning}
          >
            <IconImage
              className={styles.promotions__arrowIcon}
              imageClassName={styles.promotions__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt=""
              loading="lazy"
            />
          </Button>

          <Button
            color="transparent"
            className={styles.promotions__arrowButton}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Следующая акция"
            disabled={isEnd}
          >
            <IconImage
              className={[styles.promotions__arrowIcon, styles["promotions__arrowIcon--next"]].join(
                " ",
              )}
              imageClassName={styles.promotions__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt=""
              loading="lazy"
            />
          </Button>
        </div>
      </article>
    </section>
  )
}

export default PromotionsSlider
