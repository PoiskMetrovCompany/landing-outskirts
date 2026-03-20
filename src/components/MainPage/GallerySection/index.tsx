"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

import IconImage from "@/components/ui/IconImage"
import Button from "@/components/ui/Button"

import styles from "./gallerySection.module.scss"

const galleryCardImages = [
  "/images/main-page/gallery-adv/gallery-adv-1.webp",
  "/images/main-page/gallery-adv/gallery-adv-2.webp",
  "/images/main-page/gallery-adv/gallery-adv-3.webp",
  "/images/main-page/gallery-adv/gallery-adv-4.webp",
  "/images/main-page/gallery-adv/gallery-adv-5.webp",
  "/images/main-page/gallery-adv/gallery-adv-6.webp",
  "/images/main-page/gallery-adv/gallery-adv-7.webp",
  "/images/main-page/gallery-adv/gallery-adv-8.webp",
]

interface GalleryCard {
  id: string
  title: string
  description: string
  imageIndex: number
  offsetTop?: boolean
  dimmed?: boolean
}

const galleryCards: GalleryCard[] = [
  {
    id: "comfort-class",
    title: "Экологичная и зеленая среда",
    description:
      "Вокруг большое количество озеленённых пространств для жизни и отдыха ",
    imageIndex: 0,
    offsetTop: true,
  },
  {
    id: "near-river",
    title: "Семейная инфраструктура",
    description:
      "В шаговой доступности находятся школы, детские сады, спортивные центры и торговые объекты",
    imageIndex: 1,
  },
  {
    id: "closed-area",
    title: "Развитая инфраструктура рядом",
    description:
      "Рядом ТЦ, фитнес-клубы, парки, включая крупные рекреационные пространства для прогулок и спорта",
    imageIndex: 2,
    offsetTop: true,
  },
  {
    id: "yard",
    title: "Дворы без машини благоустройство",
    description:
      "Закрытые дворы без автомобилей, детские и спортивные площадки, велодорожки и зоны отдыха ",
    imageIndex: 3,
  },
  {
    id: "view-apartments",
    title: "Удобная транспортная доступность",
    description: "ЖК находится в районе с хорошей транспортной развязкой",
    imageIndex: 4,
    offsetTop: true,
  },
  {
    id: "view-rooms",
    title: "квартиры с отделкой под ключ",
    description:
      "Все квартиры передаются с готовым ремонтом, что позволяет сразу заехать без дополнительных затрат и времени",
    imageIndex: 5,
  },
  {
    id: "view-parking",
    title: "Современные и энергоэффективные дома",
    description:
      "Используются новые технологии панельного строительства, обеспечивающие комфорт проживания",
    imageIndex: 6,
    offsetTop: true,
  },
  {
    id: "view-schools",
    title: "Безопасность и контроль доступа",
    description:
      "На территории реализованы системы видеонаблюдения и контроля доступа для повышения уровня безопасности ",
    imageIndex: 7,
  },
]

const GallerySection = () => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [isScreenXss, setIsScreenXss] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")

    const handleScreenXssChange = (
      event: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsScreenXss(event.matches)
    }

    handleScreenXssChange(mediaQuery)
    mediaQuery.addEventListener("change", handleScreenXssChange)

    return () => {
      mediaQuery.removeEventListener("change", handleScreenXssChange)
    }
  }, [])

  const handleSliderState = (swiper: SwiperClass) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section
      id="advantages"
      className={styles.gallery}
      aria-label="Преимущества и особенности"
    >
      <header className={styles.gallery__header}>
        <h2 className={styles.gallery__title}>Преимущества и особенности</h2>

        <nav
          className={styles.gallery__controls}
          aria-label="Навигация преимуществ"
        >
          <Button
            color="white"
            className={styles.gallery__arrowButton}
            aria-label="Предыдущий слайд преимуществ"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          >
            <IconImage
              className={styles.gallery__arrowIconWrap}
              imageClassName={styles.gallery__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt="Стрелка влево"
              loading="lazy"
            />
          </Button>

          <Button
            color="white"
            className={styles.gallery__arrowButton}
            aria-label="Следующий слайд преимуществ"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          >
            <IconImage
              className={clsx(
                styles.gallery__arrowIconWrap,
                styles["gallery__arrowIconWrap--next"],
              )}
              imageClassName={styles.gallery__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt="Стрелка вправо"
              loading="lazy"
            />
          </Button>
        </nav>
      </header>

      <Swiper
        slidesPerView="auto"
        spaceBetween={isScreenXss ? 12 : 40}
        className={styles.gallery__slider}
        onSwiper={handleSliderState}
        onSlideChange={handleSliderState}
      >
        {galleryCards.map((card) => (
          <SwiperSlide
            key={card.id}
            className={clsx(
              styles.gallery__slide,
              card.offsetTop && styles["gallery__slide--offsetTop"],
              card.dimmed && styles["gallery__slide--dimmed"],
            )}
          >
            <article className={styles.gallery__card}>
              <Image
                src={galleryCardImages[card.imageIndex] || galleryCardImages[0]}
                alt={card.title}
                fill
                className={styles.gallery__image}
                sizes="390px"
              />

              <div className={styles.gallery__overlay} />

              <div className={styles.gallery__content}>
                <h3 className={styles.gallery__cardTitle}>{card.title}</h3>
                <p className={styles.gallery__cardDescription}>
                  {card.description}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default GallerySection
