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
      "ЖК «Околица» - это честная новостройка масс-сегмента. Здесь не будет мраморного лобби и консьержа в белых перчатках. Но за свои деньги вы получаете современное, теплое, аккуратное жилье с готовой отделкой - и при этом не влезаете в ипотеку, от которой перехватывает дыхание.",
      "Приятный бонус, о котором мало кто знает. Формально территория комплекса пока относится к поселку Садовый, а не к Новосибирску. Звучит как минус - но на деле оборачивается реальной экономией: жители платят пониженные коммунальные и получают скидку на автострахование. Присоединение к городу планируется ориентировочно к 2030 году, а до тех пор эти льготы - ваши.",
      "О транспорте - честно. Дорога до центра потребует времени, особенно в утренний час пик. Если ваш офис на площади Ленина, закладывайте на дорогу больше, чем 20 минут. Но если вы работаете удаленно, трудитесь в северной части города или готовы к разумному",
    ],
    rightColumn: [
      "компромиссу между локацией и стоимостью жилья - «Околица» становится одним из самых логичных вариантов. А для тех, кто привык считать деньги, простая арифметика: разница в цене квадратного метра между центром и «Околицей» с лихвой покрывает расходы на дорогу.",
      "Рядом продолжают расти и другие жилые комплексы - «Приозерный», «Тайгинский парк», уже сданные «Инфинити» и «Онега». Район набирает критическую массу жителей, а вместе с ней - магазины, сервисы и маршруты общественного транспорта. Те, кто покупает квартиру сейчас, заходят на старте - по самой выгодной цене и с перспективой роста стоимости, когда территория официально войдет в черту Новосибирска.",
      "Как официальный партнер застройщика, мы поможем подобрать квартиру под вашу ситуацию, рассчитать ипотеку и организовать просмотр.",
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
          Жизнь на «Околице»: что важно знать перед покупкой
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
