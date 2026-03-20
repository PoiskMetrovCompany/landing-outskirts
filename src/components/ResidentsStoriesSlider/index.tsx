"use client"

import { useRef, useState } from "react"
import type { CSSProperties } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import styles from "./residentsStoriesSlider.module.scss"

interface ReviewCard {
  id: string
  imageSrc: string
  imageAlt: string
  aspectRatio: string
}

interface ReviewSlide {
  id: string
  cards: ReviewCard[]
}

const REVIEW_SLIDES: ReviewSlide[] = [
  {
    id: "review-column-1",
    cards: [
      {
        id: "review-1",
        imageSrc: "/images/main-page/reviews/review-1.webp",
        imageAlt:
          "Живу там. Очень нравится наш район. Школа строится. Много магазинов. Маршрутка N38 ходит до ж.д.вокзала. Остановка «Мост» находится на мосту. Общественный транспорт ходит часто. Набережная своя. В квартирах Венеции очень тепло.",
        aspectRatio: "167/91",
      },
      {
        id: "review-2",
        imageSrc: "/images/main-page/reviews/review-2.webp",
        imageAlt:
          "Отличный жк, отличная зелёная зона, удобное расположение, отзывчивая управляющая компания!",
        aspectRatio: "152/131",
      },
    ],
  },
  {
    id: "review-column-2",
    cards: [
      {
        id: "review-3",
        imageSrc: "/images/main-page/reviews/review-3.webp",
        imageAlt:
          "Живём уже второй месяц, очень комфортное место,чувствуется простор,тишина.Все рядышком.Обь рядом,прогулки в любое время приносят удовольствие. Территория чистая везде",
        aspectRatio: "174/109",
      },
      {
        id: "review-4",
        imageSrc: "/images/main-page/reviews/review-4.webp",
        imageAlt:
          "Место очень понравилось с первого взгляда, новый комфортный микрорайон для жизни, места для занятия спортом, детские площадки, зоны отдыха, чистая зеленая ухоженная территория. Хорошие виды на город, реку",
        aspectRatio: "263/174",
      },
    ],
  },
  {
    id: "review-column-3",
    cards: [
      {
        id: "review-5",
        imageSrc: "/images/main-page/reviews/review-5.webp",
        imageAlt:
          "Хороший квартал: целый город в городе, есть все необходимое в шаговой доступности. Закрытая территория прекрасное место для игр детей",
        aspectRatio: "94/101",
      },
      {
        id: "review-6",
        imageSrc: "/images/main-page/reviews/review-6.webp",
        imageAlt:
          "Атмосферно😊видовые дома, развитая инфраструктура. По факту, недалеко от центра. Все есть для комфортной жизни,много молодых семей. Удобная транспортная развязка. Представлены все торговые сети)",
        aspectRatio: "21/13",
      },
    ],
  },
  {
    id: "review-column-4",
    cards: [
      {
        id: "review-7",
        imageSrc: "/images/main-page/reviews/review-7.webp",
        imageAlt:
          "Прекрасный парк с красивым ландшафтным дизайном. Красивые ухоженные разнообразные растения, много лавочек и беседок. Можно позаниматься на тренажерах, футбол, хоккей, волейбол. Летом можно посмотреть фильм в компании соседей. Праздники и концерты проводятся. Рядом с центром находится. От ЖК до вокзала бегает маршрутка . Красивые дома и удобные квартиры. Много магазинов и аптек",
        aspectRatio: "86/75",
      },
      {
        id: "review-8",
        imageSrc: "/images/main-page/reviews/review-8.webp",
        imageAlt:
          "Очень приятный и милый современный микрорайон, расположен на берегу Оби, инфраструктура для отдыха и прогулок очень достойная, зелень, дорожки, приветливые жильцы, очень много молодых семей",
        aspectRatio: "91/57",
      },
    ],
  },
]

const ResidentsStoriesSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handleSliderState = (swiper: SwiperClass) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section
      className={styles.residentsStories}
      aria-labelledby="residents-stories-title"
    >
      <header className={styles.residentsStories__header}>
        <h2
          id="residents-stories-title"
          className={styles.residentsStories__title}
        >
          Истории жителей
        </h2>

        <div className={styles.residentsStories__controls}>
          <div className={styles.residentsStories__arrows}>
            <Button
              color="white"
              className={styles.residentsStories__arrowButton}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Предыдущие истории жителей"
              disabled={isBeginning}
            >
              <IconImage
                className={[
                  styles.residentsStories__arrowIcon,
                  styles["residentsStories__arrowIcon--prev"],
                ].join(" ")}
                imageClassName={styles.residentsStories__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt="Стрелка влево"
                loading="lazy"
              />
            </Button>

            <Button
              color="white"
              className={styles.residentsStories__arrowButton}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Следующие истории жителей"
              disabled={isEnd}
            >
              <IconImage
                className={styles.residentsStories__arrowIcon}
                imageClassName={styles.residentsStories__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt="Стрелка вправо"
                loading="lazy"
              />
            </Button>
          </div>

          <Button
            color="yellow"
            href="/catalogue"
            className={styles.residentsStories__actionButton}
          >
            Выбрать квартиру
          </Button>
        </div>
      </header>

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={32}
        breakpoints={{
          0: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 16,
          },
          1024: {
            spaceBetween: 16,
          },
          1440: {
            spaceBetween: 24,
          },
          1920: {
            spaceBetween: 32,
          },
        }}
        className={styles.residentsStories__slider}
        onSwiper={handleSliderState}
        onSlideChange={handleSliderState}
      >
        {REVIEW_SLIDES.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={styles.residentsStories__slide}
          >
            <article className={styles.residentsStories__column}>
              {slide.cards.map((card) => (
                <div key={card.id} className={styles.residentsStories__card}>
                  <div
                    className={styles.residentsStories__imageWrapper}
                    style={
                      {
                        "--review-aspect-ratio": card.aspectRatio,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className={styles.residentsStories__image}
                      sizes="396px"
                    />
                  </div>
                </div>
              ))}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        color="yellow"
        href="/catalogue"
        className={styles.residentsStories__mobileActionButton}
      >
        Выбрать квартиру
      </Button>
    </section>
  )
}

export default ResidentsStoriesSlider
