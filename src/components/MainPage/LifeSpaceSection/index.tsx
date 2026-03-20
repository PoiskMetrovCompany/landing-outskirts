"use client"

import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"
import clsx from "clsx"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"
import RequestDialog from "@/components/RequestDialog"
import moreLinkStyles from "@/components/ui/MoreLink/moreLink.module.scss"

import styles from "./lifeSpaceSection.module.scss"

interface LifeSpaceSlide {
  id: string
  leftColumn: string[]
  rightColumn: string[]
}

interface LifeSpaceMobileSlide {
  id: string
  paragraphs: string[]
}

const LIFE_SPACE_SLIDES: LifeSpaceSlide[] = [
  {
    id: "life-space-1",
    leftColumn: [
      "ЖК Ясный берег - это жилой проект, в котором город, природа и человек существуют не отдельно, а вместе. Не просто дом с видом на реку, а целый микрорайон, выстроенный вокруг идеи: хорошая жизнь начинается прямо за порогом квартиры.",
      "Вы находитесь в семи минутах езды от центра Новосибирска. Но когда выходите во двор - слышите не гул трафика, а детей на площадке и шелест листвы.",
    ],
    rightColumn: [
      "Это и есть главное противоречие, которое Ясный берег умудрился разрешить.",
      "В центре микрорайона - парк площадью 4 гектара, где высажено более 5 000 растений. Одиннадцать построенных домов стоят вокруг него кварталами, а не стеной, поэтому небо здесь не закрыто, и ощущение простора сохраняется даже на нижних этажах.",
    ],
  },
]

const LIFE_SPACE_MOBILE_SLIDES: LifeSpaceMobileSlide[] =
  LIFE_SPACE_SLIDES.flatMap((slide) => [
    {
      id: `${slide.id}-left`,
      paragraphs: slide.leftColumn,
    },
    {
      id: `${slide.id}-right`,
      paragraphs: slide.rightColumn,
    },
  ])

const LifeSpaceSection = () => {
  const desktopSwiperRef = useRef<SwiperClass | null>(null)
  const mobileSwiperRef = useRef<SwiperClass | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDesktopBeginning, setIsDesktopBeginning] = useState(true)
  const [isDesktopEnd, setIsDesktopEnd] = useState(false)
  const [isMobileEnd, setIsMobileEnd] = useState(false)

  const openRequestDialog = () => setIsDialogOpen(true)

  const handleDesktopSliderState = (swiper: SwiperClass) => {
    desktopSwiperRef.current = swiper
    setIsDesktopBeginning(swiper.isBeginning)
    setIsDesktopEnd(swiper.isEnd)
  }

  const handleMobileSliderState = (swiper: SwiperClass) => {
    mobileSwiperRef.current = swiper
    setIsMobileEnd(swiper.isEnd)
  }

  return (
    <section className={styles.lifeSpace} aria-labelledby="life-space-title">
      <header className={styles.lifeSpace__header} id="ceo">
        <h2 id="life-space-title" className={styles.lifeSpace__title}>
          пространство для новой жизни
        </h2>

        <div className={styles.lifeSpace__controls}>
          {/* <div className={styles.lifeSpace__arrows}>
            <Button
              color="white"
              className={styles.lifeSpace__arrowButton}
              onClick={() => desktopSwiperRef.current?.slidePrev()}
              aria-label="Предыдущий слайд"
              disabled={isDesktopBeginning}
            >
              <IconImage
                className={[
                  styles.lifeSpace__arrowIcon,
                  styles["lifeSpace__arrowIcon--prev"],
                ].join(" ")}
                imageClassName={styles.lifeSpace__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt="Стрелка влево"
                loading="lazy"
              />
            </Button>

            <Button
              color="white"
              className={styles.lifeSpace__arrowButton}
              onClick={() => desktopSwiperRef.current?.slideNext()}
              aria-label="Следующий слайд"
              disabled={isDesktopEnd}
            >
              <IconImage
                className={styles.lifeSpace__arrowIcon}
                imageClassName={styles.lifeSpace__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt="Стрелка вправо"
                loading="lazy"
              />
            </Button>
          </div> */}

          <Button
            color="yellow"
            className={styles.lifeSpace__actionButton}
            onClick={openRequestDialog}
          >
            Выбрать квартиру
          </Button>
        </div>
      </header>

      <div className={styles.lifeSpace__sliderDesktop}>
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          className={styles.lifeSpace__slider}
          onSwiper={handleDesktopSliderState}
          onSlideChange={handleDesktopSliderState}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 1,
              spaceBetween: 32,
            },
            1920: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
        >
          {LIFE_SPACE_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className={styles.lifeSpace__slide}>
              <article className={styles.lifeSpace__content}>
                <div className={styles.lifeSpace__column}>
                  {slide.leftColumn.map((paragraph) => (
                    <p key={paragraph} className={styles.lifeSpace__paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className={styles.lifeSpace__column}>
                  {slide.rightColumn.map((paragraph) => (
                    <p key={paragraph} className={styles.lifeSpace__paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.lifeSpace__sliderMobile}>
        <Swiper
          slidesPerView={1}
          spaceBetween={12}
          className={styles.lifeSpace__slider}
          onSwiper={handleMobileSliderState}
          onSlideChange={handleMobileSliderState}
        >
          {LIFE_SPACE_MOBILE_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className={styles.lifeSpace__slide}>
              <article className={styles.lifeSpace__contentMobile}>
                <div className={styles.lifeSpace__columnMobile}>
                  {slide.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.lifeSpace__paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {!isMobileEnd && (
                  <button
                    type="button"
                    className={clsx(
                      moreLinkStyles.moreLink,
                      moreLinkStyles["moreLink--dark"],
                      styles.lifeSpace__showMoreButton,
                    )}
                    onClick={() => mobileSwiperRef.current?.slideNext()}
                    aria-label="Показать следующий слайд"
                  >
                    Показать ещё
                  </button>
                )}
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button
        color="yellow"
        width="full"
        className={styles.lifeSpace__actionButtonMobile}
        onClick={openRequestDialog}
      >
        Выбрать квартиру
      </Button>

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}

export default LifeSpaceSection
