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
        imageAlt: "Очень хороший дом",
        aspectRatio: "364/152",
      },
      {
        id: "review-2",
        imageSrc: "/images/main-page/reviews/review-2.webp",
        imageAlt:
          "Люблю Околицу всем сердцем, очень красивый дизайн под окнами тихий парк для мам с колясками, отличное озеленение, целый день мужчины с УК садят деревья , полят , девушка подстригает растения , пока газона нет , но думаю скоро появится , так как возле первого дома густой газон) ранее жила где было все в плитке сейчас не могу нарадоваться что у нас столько деревьев) Шум со стройки не слышу даже с открытыми окнами)На данный момент полностью довольна что приобрела именно тут жилье 👏🏻🙏🏻❤️",
        aspectRatio: "364/567",
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
          "Очень ждем новоселья! Приходим пока поиграть во двор, нравится площадка и, что машины по двору не ездят. Готовимся к переезду, поскорее бы 🙏",
        aspectRatio: "364/163",
      },
      {
        id: "review-4",
        imageSrc: "/images/main-page/reviews/review-4.webp",
        imageAlt:
          "ЖК нравится. Из-за готового ремонта быстро переехал и не пришлось переплачивать за съемную квартиру, сам бы ремонт долго делал.",
        aspectRatio: "364/163",
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
          "По застройщику информацию собирали, чтобы не кинули, стройку не остановили. И отзывы смотрели и в офис продаж несколько раз ездили. Планировали купить 1ккв, в итоге взяли в ипотеку 2-студию. Вообще ни разу не пожалели, что так сделали. У нас ремонт от застройщика, переехали сразу же из съема. Нам ВСЕ пока нравится.",
        aspectRatio: "364/238",
      },
      {
        id: "review-6",
        imageSrc: "/images/main-page/reviews/review-6.webp",
        imageAlt:
          "Как хорошо жить в своей квартире! Свежий воздух, удаленность от города, площадки, я бы сказала, просторы! С соседями знакомимся, обживаемся потихоньку. Ремонт делать не надо, хотя со временем, чего-нибудь придумаем и поменяем, но пока просто радуемся, что есть свой уютный уголок!",
        aspectRatio: "364/242",
      },
    ],
  },
  {
    id: "review-column-4",
    cards: [
      {
        id: "review-7",
        imageSrc: "/images/main-page/reviews/review-7.webp",
        imageAlt: "Красивый жк, роза ветров, всегда чистый воздух!",
        aspectRatio: "364/136",
      },
      {
        id: "review-8",
        imageSrc: "/images/main-page/reviews/review-8.webp",
        imageAlt:
          "У нас в плане отделки только ерундовые замечания были. Заменили пару наличников на дверях и ручку на окне. Все сделали по гарантии в течение недели. Считаю, что вполне адекватно!",
        aspectRatio: "666/324",
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
