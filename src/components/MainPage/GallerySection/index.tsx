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
    title: "Комфорт класс",
    description:
      "Оптимальное сочетание цены, качества строительства и функциональных планировок",
    imageIndex: 0,
    offsetTop: true,
  },
  {
    id: "near-river",
    title: "Рядом набережная и водоем",
    description:
      "Прогулочные маршруты у воды и живописная атмосфера рядом с домом",
    imageIndex: 1,
  },
  {
    id: "closed-area",
    title: "Закрытая территория",
    description: "Контролируемый доступ и приватная среда для спокойной жизни",
    imageIndex: 2,
    offsetTop: true,
  },
  {
    id: "yard",
    title: "Благоустроенный двор и придомовая территория",
    description:
      "Озеленение, зоны отдыха и продуманное пространство для жителей всех возрастов",
    imageIndex: 3,
  },
  {
    id: "view-apartments",
    title: "Видовые квартиры",
    description: "Живописные виды на город, парк или воду из окон вашего дома",
    imageIndex: 4,
    offsetTop: true,
  },
  {
    id: "view-rooms",
    title: "Колясочные комнаты",
    description:
      "Специальные помещения для хранения колясок и сезонного транспорта",
    imageIndex: 5,
  },
  {
    id: "view-parking",
    title: "Подземная парковка",
    description:
      "Удобное хранение автомобиля с прямым доступом к жилым секциям",
    imageIndex: 6,
    offsetTop: true,
  },
  {
    id: "view-schools",
    title: "Рядом школы и детские сады",
    description:
      "Современная архитектура, продуманные планировки и высокий уровень комфорта для жизни и работы",
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

    const handleScreenXssChange = (event: MediaQueryListEvent | MediaQueryList) => {
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
