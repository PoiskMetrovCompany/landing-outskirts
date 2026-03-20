"use client"

import { useCallback, useMemo, useState } from "react"

import PropertyCard from "@/components/PropertyCard"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import RequestDialog from "@/components/RequestDialog"
import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"
import MoreLink from "@/components/ui/MoreLink"
import Skeleton from "@/components/ui/skeleton"
import PersonalDiscountFormSection from "@/components/MainPage/PersonalDiscountFormSection"
import PromoCard from "@/components/CataloguePage/PromoCard"
import CatalogueFilterBar, {
  INITIAL_FILTERS,
  type FilterState,
} from "@/components/CataloguePage/CatalogueFilterBar"
import CatalogueTagsBar from "@/components/CataloguePage/CatalogueTagsBar"
import { useBuildings } from "@/hooks/useBuildings"
import { useFlats } from "@/hooks/useFlats"
import { mapFlatToOfferCard } from "@/hooks/mappers/flatMapper"

import styles from "./catalogueSection.module.scss"

const INITIAL_VISIBLE_CARDS = 10
const SHOW_MORE_STEP = 12
const SKELETON_CARDS = Array.from(
  { length: INITIAL_VISIBLE_CARDS },
  (_, index) => `catalogue-skeleton-${index}`,
)

const CatalogueSection = () => {
  const [visibleCardsCount, setVisibleCardsCount] = useState(
    INITIAL_VISIBLE_CARDS,
  )
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(INITIAL_FILTERS)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false)
  const { houseOptions } = useBuildings()
  const { flats, totalCount, isLoading } = useFlats({
    filters: appliedFilters,
    page: 1,
    limit: visibleCardsCount,
  })

  const cards = useMemo(() => flats.map(mapFlatToOfferCard), [flats])

  const handleApplyFilters = useCallback((filters: FilterState) => {
    setIsShowMoreLoading(false)
    setAppliedFilters(filters)
    setVisibleCardsCount(INITIAL_VISIBLE_CARDS)
  }, [])
  const initialCards = useMemo(
    () => cards.slice(0, INITIAL_VISIBLE_CARDS),
    [cards],
  )
  const extraCards = useMemo(
    () => cards.slice(INITIAL_VISIBLE_CARDS, visibleCardsCount),
    [cards, visibleCardsCount],
  )

  const rowOneCards = initialCards.slice(0, 3)
  const rowOneCardsBeforePromo = rowOneCards.slice(0, 2)
  const rowOneCardsAfterPromo = rowOneCards.slice(2, 3)
  const rowTwoCards = initialCards.slice(3, 7)
  const rowThreeCards = initialCards.slice(7, 10)
  const canShowMore = visibleCardsCount < totalCount
  const openRequestDialog = () => setIsRequestDialogOpen(true)
  const showOnlyAdditionalSkeletons = isLoading && isShowMoreLoading
  const showFullGridSkeleton = isLoading && !isShowMoreLoading
  const pendingExtraCardsCount = Math.max(
    Math.min(visibleCardsCount, totalCount) - cards.length,
    0,
  )
  const pendingExtraCardIds = Array.from(
    { length: pendingExtraCardsCount },
    (_, index) => `catalogue-extra-skeleton-${index}`,
  )

  return (
    <section className={styles.catalogueSection} aria-label="Каталог квартир">
      <div className={styles.catalogueSection__headingRow}>
        <h1 className={styles.catalogueSection__heading}>Каталог квартир</h1>
        <MoreLink
          href="/"
          color="dark"
          className={styles.catalogueSection__backLink}
        >
          <span className={styles.catalogueSection__backLinkContent}>
            <IconImage
              iconLink="/icons/catalogue/arrow-back.svg"
              alt="back"
              className={styles.catalogueSection__backLinkIcon}
              imageClassName={styles.catalogueSection__backLinkIconImage}
            />
            <IconImage
              iconLink="/icons/catalogue/arrow-back-sm.svg"
              alt="back"
              className={styles.catalogueSection__backLinkIconMobile}
              imageClassName={styles.catalogueSection__backLinkIconImage}
            />
            <span>Вернуться на главную</span>
          </span>
        </MoreLink>
      </div>

      <div className={styles.catalogueSection__filtersBlock}>
        <CatalogueFilterBar
          houseOptions={houseOptions}
          onApply={handleApplyFilters}
        />
        <CatalogueTagsBar />
      </div>

      <div className={styles.catalogueSection__resultsBlock}>
        {isLoading ? (
          <Skeleton
            className={styles.catalogueSection__countSkeleton}
            width={182}
            height={24}
            border="10px"
          />
        ) : (
          <p className={styles.catalogueSection__count}>
            Найдено {totalCount} квартир
          </p>
        )}

        {showFullGridSkeleton ? (
          <div className={styles.catalogueSection__grid}>
            {SKELETON_CARDS.map((cardId) => (
              <PropertyCardSkeleton
                key={cardId}
                className={styles.catalogueSection__card}
                showButton={false}
              />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className={styles.catalogueSection__emptyLayout}>
            <div className={styles.catalogueSection__emptyState}>
              <p className={styles.catalogueSection__emptyTitle}>
                Подходящих вариантов нет
              </p>
              <p className={styles.catalogueSection__emptyText}>
                Измените фильтры или оставьте заявку и мы подберем квартиру для
                вас
              </p>
            </div>
            <div className={styles.catalogueSection__bannerWrapper}>
              <PersonalDiscountFormSection
                variant="orange"
                title="Подберите квартиру мечты и получите персональную скидку от застройщика"
                buttonLabel="Оставить заявку"
              />
            </div>
          </div>
        ) : (
          <div className={styles.catalogueSection__grid}>
            {rowOneCardsBeforePromo.map((card) => (
              <PropertyCard
                key={card.id}
                className={styles.catalogueSection__card}
                badges={card.badges}
                imageSrc={card.imageSrc}
                imageAlt={`Планировка ${card.title}`}
                title={card.title}
                description={card.description}
                price={card.price}
                showButton={false}
                onCardClick={openRequestDialog}
              />
            ))}

            <div className={styles.catalogueSection__tabletOnly}>
              <PromoCard
                imageSrc="/images/catalogue/image-discount.webp"
                imageAlt="скидка на квартиры"
                title="скидка на квартиры"
                subtitle="до 4%"
                onButtonClick={openRequestDialog}
              />
            </div>

            {rowOneCardsAfterPromo.map((card) => (
              <PropertyCard
                key={card.id}
                className={styles.catalogueSection__card}
                badges={card.badges}
                imageSrc={card.imageSrc}
                imageAlt={`Планировка ${card.title}`}
                title={card.title}
                description={card.description}
                price={card.price}
                showButton={false}
                onCardClick={openRequestDialog}
              />
            ))}

            <div className={styles.catalogueSection__tabletHidden}>
              <PromoCard
                imageSrc="/images/catalogue/image-discount.webp"
                imageAlt="скидка на квартиры"
                title="скидка на квартиры"
                subtitle="до 4%"
                onButtonClick={openRequestDialog}
              />
            </div>

            {rowTwoCards.map((card) => (
              <PropertyCard
                key={card.id}
                className={styles.catalogueSection__card}
                badges={card.badges}
                imageSrc={card.imageSrc}
                imageAlt={`Планировка ${card.title}`}
                title={card.title}
                description={card.description}
                price={card.price}
                showButton={false}
                onCardClick={openRequestDialog}
              />
            ))}

            <div className={styles.catalogueSection__bannerWrapper}>
              <PersonalDiscountFormSection
                variant="orange"
                title="Подберите квартиру мечты и получите персональную скидку от застройщика"
                buttonLabel="Оставить заявку"
              />
            </div>

            {rowThreeCards.map((card) => (
              <PropertyCard
                key={card.id}
                className={styles.catalogueSection__card}
                badges={card.badges}
                imageSrc={card.imageSrc}
                imageAlt={`Планировка ${card.title}`}
                title={card.title}
                description={card.description}
                price={card.price}
                showButton={false}
                onCardClick={openRequestDialog}
              />
            ))}

            <PromoCard
              imageSrc="/images/catalogue/image-builder-discount.webp"
              imageAlt="Семейная ипотека"
              title="Семейная ипотека"
              subtitle="первоначальный взнос от ~20%"
              onButtonClick={openRequestDialog}
            />

            {extraCards.map((card) => (
              <PropertyCard
                key={card.id}
                className={styles.catalogueSection__card}
                badges={card.badges}
                imageSrc={card.imageSrc}
                imageAlt={`Планировка ${card.title}`}
                title={card.title}
                description={card.description}
                price={card.price}
                showButton={false}
                onCardClick={openRequestDialog}
              />
            ))}
            {showOnlyAdditionalSkeletons &&
              pendingExtraCardIds.map((cardId) => (
                <PropertyCardSkeleton
                  key={cardId}
                  className={styles.catalogueSection__card}
                  showButton={false}
                />
              ))}
          </div>
        )}
      </div>

      {canShowMore && (
        <div className={styles.catalogueSection__showMore}>
          <Button
            color="underline"
            className={styles.catalogueSection__showMoreButton}
            disabled={isLoading}
            onClick={() => {
              setIsShowMoreLoading(true)
              setVisibleCardsCount((prev) => prev + SHOW_MORE_STEP)
            }}
          >
            Показать ещё
          </Button>
        </div>
      )}

      <RequestDialog
        isOpen={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </section>
  )
}

export default CatalogueSection
