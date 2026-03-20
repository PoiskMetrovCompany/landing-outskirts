"use client"

import { useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

import PropertyCard from "@/components/PropertyCard"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import RequestDialog from "@/components/RequestDialog"
import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"
import type { FilterState } from "@/components/CataloguePage/CatalogueFilterBar"
import { useFlats } from "@/hooks/useFlats"
import { mapFlatToOfferCard } from "@/hooks/mappers/flatMapper"
import type { PropertyType } from "@/hooks/mappers/mapper"
import styles from "./bestOffersSection.module.scss"

const tabs: { id: PropertyType; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "st", label: "СТ" },
  { id: "1k", label: "1К" },
  { id: "2k", label: "2К" },
  { id: "3k", label: "3К" },
  { id: "4k", label: "4+К" },
]

const ROOM_FILTER_MAP: Record<Exclude<PropertyType, "all">, string> = {
  st: "studio",
  "1k": "1",
  "2k": "2",
  "3k": "3",
  "4k": "4",
}

const LIMIT_ALL = 12
const LIMIT_BY_ROOM = 7

const skeletonCards = Array.from(
  { length: 8 },
  (_, index) => `skeleton-${index}`,
)

const BestOffersSection = () => {
  const [activeTab, setActiveTab] = useState<PropertyType>("all")
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const filters: FilterState = useMemo(
    () => ({
      house: [],
      rooms: activeTab === "all" ? [] : [ROOM_FILTER_MAP[activeTab]],
      price: { min: "", max: "" },
      area: { min: "", max: "" },
      floor: { min: "", max: "" },
    }),
    [activeTab],
  )

  const limit = activeTab === "all" ? LIMIT_ALL : LIMIT_BY_ROOM
  const { flats, isLoading } = useFlats({ filters, page: 1, limit })

  const openRequestDialog = () => setIsDialogOpen(true)

  const offerCards = useMemo(() => flats.map(mapFlatToOfferCard), [flats])

  const handleTabChange = (tab: PropertyType) => {
    setActiveTab(tab)
    swiperRef.current?.slideTo(0)
  }

  const handleSliderState = (swiper: SwiperClass) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const slides = isLoading ? skeletonCards : offerCards

  return (
    <section className={styles.bestOffers} aria-label="Лучшие предложения">
      <header className={styles.bestOffers__header}>
        <div className={styles.bestOffers__headerLeft}>
          <div className={styles.bestOffers__titleWrap}>
            <h2 className={styles.bestOffers__title}>Лучшие предложения</h2>

            <Button
              color="yellow"
              className={styles.bestOffers__catalogButtonMobile}
              href="/catalogue"
            >
              Перейти к каталог
            </Button>
          </div>

          <nav className={styles.bestOffers__tabs} aria-label="Тип квартиры">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                color="white"
                className={clsx(
                  styles.bestOffers__tab,
                  activeTab === tab.id && styles["bestOffers__tab--active"],
                )}
                onClick={() => handleTabChange(tab.id)}
                aria-pressed={activeTab === tab.id}
                style={
                  activeTab === tab.id
                    ? { color: "var(--Yellow-100)" }
                    : undefined
                }
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className={styles.bestOffers__controls}>
          <div className={styles.bestOffers__arrows}>
            <Button
              color="white"
              className={styles.bestOffers__arrowButton}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Предыдущие предложения"
              disabled={isBeginning}
            >
              <IconImage
                className={styles.bestOffers__arrowIcon}
                imageClassName={styles.bestOffers__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt=""
                loading="lazy"
              />
            </Button>

            <Button
              color="white"
              className={styles.bestOffers__arrowButton}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Следующие предложения"
              disabled={isEnd}
            >
              <IconImage
                className={clsx(
                  styles.bestOffers__arrowIcon,
                  styles["bestOffers__arrowIcon--next"],
                )}
                imageClassName={styles.bestOffers__arrowIconImage}
                iconLink="/icons/header/arrow-slide-right.svg"
                alt=""
                loading="lazy"
              />
            </Button>
          </div>

          <Button
            color="yellow"
            className={styles.bestOffers__catalogButton}
            href="/catalogue"
          >
            Перейти к каталог
          </Button>
        </div>
      </header>

      <Swiper
        slidesPerView={4}
        spaceBetween={40}
        className={styles.bestOffers__slider}
        onSwiper={handleSliderState}
        onSlideChange={handleSliderState}
        breakpoints={{
          0: {
            spaceBetween: 12,
            slidesPerView: "auto",
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          1024: {
            spaceBetween: 24,
            slidesPerView: 4,
          },
          1440: {
            spaceBetween: 32,
            slidesPerView: 4,
          },
          1920: {
            spaceBetween: 40,
            slidesPerView: 4,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={typeof slide === "string" ? slide : slide.id}
            className={styles.bestOffers__slide}
          >
            {typeof slide === "string" ? (
              <PropertyCardSkeleton className={styles.bestOffers__card} />
            ) : (
              <PropertyCard
                className={styles.bestOffers__card}
                badges={slide.badges}
                imageSrc={slide.imageSrc}
                imageAlt={`Планировка ${slide.title}`}
                title={slide.title}
                description={slide.description}
                price={slide.price}
                detailsLabel="Подробнее"
                onDetailsClick={openRequestDialog}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        color="yellow"
        className={styles.bestOffers__catalogButtonMobileBottom}
        href="/catalogue"
      >
        Перейти к каталог
      </Button>

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}

export default BestOffersSection
