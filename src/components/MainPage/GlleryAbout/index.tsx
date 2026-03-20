"use client"

import { useMemo, useRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import styles from "./glleryAbout.module.scss"

const gallerySlides = [
  {
    id: "gallery-1",
    imageSrc: "/images/main-page/gallery/gallery-1.webp",
    alt: "Галлерея фото 1",
    aspectRatio: 1634 / 919,
  },
  {
    id: "gallery-2",
    imageSrc: "/images/main-page/gallery/gallery-2.webp",
    alt: "Галлерея фото 2",
    aspectRatio: 1378 / 919,
  },
  {
    id: "gallery-3",
    imageSrc: "/images/main-page/gallery/gallery-3.webp",
    alt: "Галлерея фото 3",
    aspectRatio: 1378 / 919,
  },
  {
    id: "gallery-4",
    imageSrc: "/images/main-page/gallery/gallery-4.webp",
    alt: "Галлерея фото 4",
    aspectRatio: 1378 / 919,
  },
  {
    id: "gallery-5",
    imageSrc: "/images/main-page/gallery/gallery-5.webp",
    alt: "Галлерея фото 5",
    aspectRatio: 1378 / 919,
  },
  {
    id: "gallery-6",
    imageSrc: "/images/main-page/gallery/gallery-6.webp",
    alt: "Галлерея фото 6",
    aspectRatio: 1378 / 919,
  },
  {
    id: "gallery-7",
    imageSrc: "/images/main-page/gallery/gallery-7.webp",
    alt: "Галлерея фото 7",
    aspectRatio: 1634 / 919,
  },
  {
    id: "gallery-8",
    imageSrc: "/images/main-page/gallery/gallery-8.webp",
    alt: "Галлерея фото 8",
    aspectRatio: 1634 / 919,
  },
  {
    id: "gallery-9",
    imageSrc: "/images/main-page/gallery/gallery-9.webp",
    alt: "Галлерея фото 9",
    aspectRatio: 1634 / 919,
  },
  {
    id: "gallery-10",
    imageSrc: "/images/main-page/gallery/gallery-10.webp",
    alt: "Галлерея фото 10",
    aspectRatio: 1378 / 919,
  },
]

const GlleryAbout = () => {
  const prevButtonRef = useRef<HTMLButtonElement | null>(null)
  const nextButtonRef = useRef<HTMLButtonElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null)
  const [zoomedImageAlt, setZoomedImageAlt] = useState("")
  const [zoomedImageAspectRatio, setZoomedImageAspectRatio] = useState<number>(
    881 / 750,
  )

  const visibleIndexes = useMemo(
    () => new Set([activeSlide, activeSlide + 1]),
    [activeSlide],
  )

  const handleSliderState = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex)
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const openZoom = (imageSrc: string, alt: string, aspectRatio: number) => {
    setZoomedImageSrc(imageSrc)
    setZoomedImageAlt(alt)
    setZoomedImageAspectRatio(aspectRatio)
  }

  const closeZoom = () => {
    setZoomedImageSrc(null)
    setZoomedImageAlt("")
    setZoomedImageAspectRatio(881 / 750)
  }

  return (
    <section className={styles.glleryAbout} aria-label="Галерея проекта">
      <header className={styles.glleryAbout__header}>
        <h2 className={styles.glleryAbout__title}>ГАЛЕРЕЯ ПРОЕКТА</h2>

        <nav
          className={styles.glleryAbout__controls}
          aria-label="Навигация галереи"
        >
          <Button
            ref={prevButtonRef}
            color="white"
            className={styles.glleryAbout__arrowButton}
            aria-label="Предыдущий слайд"
            disabled={isBeginning}
          >
            <IconImage
              className={styles.glleryAbout__arrowIconWrap}
              imageClassName={styles.glleryAbout__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt=""
              loading="lazy"
            />
          </Button>

          <Button
            ref={nextButtonRef}
            color="white"
            className={styles.glleryAbout__arrowButton}
            aria-label="Следующий слайд"
            disabled={isEnd}
          >
            <IconImage
              className={clsx(
                styles.glleryAbout__arrowIconWrap,
                styles["glleryAbout__arrowIconWrap--next"],
              )}
              imageClassName={styles.glleryAbout__arrowIconImage}
              iconLink="/icons/header/arrow-slide-right.svg"
              alt=""
              loading="lazy"
            />
          </Button>
        </nav>
      </header>

      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={40}
        breakpoints={{
          0: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 24,
          },
          1440: {
            spaceBetween: 32,
          },
          1920: {
            spaceBetween: 40,
          },
        }}
        className={styles.glleryAbout__slider}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation === "boolean") {
            return
          }

          swiper.params.navigation = {
            ...(swiper.params.navigation || {}),
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }
        }}
        onSwiper={handleSliderState}
        onSlideChange={handleSliderState}
      >
        {gallerySlides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(
              styles.glleryAbout__slide,
              !visibleIndexes.has(index) &&
                styles["glleryAbout__slide--dimmed"],
            )}
          >
            <article className={styles.glleryAbout__card}>
              <IconImage
                className={styles.glleryAbout__imageWrap}
                imageClassName={styles.glleryAbout__image}
                iconLink={slide.imageSrc}
                alt={slide.alt}
              />

              <button
                type="button"
                className={styles.glleryAbout__zoomButton}
                aria-label={`Открыть ${slide.alt} в полном размере`}
                onClick={() =>
                  openZoom(slide.imageSrc, slide.alt, slide.aspectRatio)
                }
              >
                <IconImage
                  className={styles.glleryAbout__zoomIconWrap}
                  imageClassName={styles.glleryAbout__zoomIconImage}
                  iconLink="/icons/header/image-zoom.svg"
                  alt=""
                  loading="lazy"
                />
              </button>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {zoomedImageSrc && (
        <div
          className={styles.glleryAbout__zoomOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onClick={closeZoom}
        >
          <Button
            color="white"
            className={styles.glleryAbout__zoomCloseButton}
            aria-label="Закрыть просмотр изображения"
            onClick={closeZoom}
          >
            <IconImage
              className={styles.glleryAbout__zoomCloseIconWrap}
              imageClassName={styles.glleryAbout__zoomCloseIconImage}
              iconLink="/icons/x-close-white.svg"
              alt=""
              loading="lazy"
            />
          </Button>

          <div
            className={styles.glleryAbout__zoomImageWrap}
            onClick={(event) => event.stopPropagation()}
            style={{ aspectRatio: zoomedImageAspectRatio }}
          >
            <Image
              src={zoomedImageSrc}
              alt={zoomedImageAlt}
              fill
              className={styles.glleryAbout__zoomImage}
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default GlleryAbout
