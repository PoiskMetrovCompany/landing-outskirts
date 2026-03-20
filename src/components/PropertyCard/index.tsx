import clsx from "clsx"
import Image from "next/image"

import Button from "@/components/ui/Button"

import styles from "./propertyCard.module.scss"

export type PropertyCardBadgeTone = "yellow" | "black"

export interface PropertyCardBadge {
  label: string
  tone: PropertyCardBadgeTone
}

interface PropertyCardProps {
  className?: string
  badges: PropertyCardBadge[]
  imageSrc: string
  imageAlt: string
  title: string
  description: string[]
  price?: string
  detailsLabel?: string
  showButton?: boolean
  onCardClick?: () => void
  onDetailsClick?: () => void
}

const PropertyCard = ({
  className,
  badges,
  imageSrc,
  imageAlt,
  title,
  description,
  price,
  detailsLabel = "Подробнее",
  showButton = true,
  onCardClick,
  onDetailsClick,
}: PropertyCardProps) => {
  const isCardClickable = Boolean(onCardClick)

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onCardClick) {
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onCardClick()
    }
  }

  return (
    <article
      className={clsx(
        styles.propertyCard,
        isCardClickable && styles["propertyCard--clickable"],
        className,
      )}
      onClick={onCardClick}
      onKeyDown={handleCardKeyDown}
      role={isCardClickable ? "button" : undefined}
      tabIndex={isCardClickable ? 0 : undefined}
      aria-label={isCardClickable ? `Открыть заявку для ${title}` : undefined}
    >
      <div className={styles.propertyCard__badges}>
        {badges.map((badge) => (
          <span
            key={`${badge.label}-${badge.tone}`}
            className={clsx(
              styles.propertyCard__badge,
              styles[`propertyCard__badge--${badge.tone}`],
            )}
          >
            {badge.label}
          </span>
        ))}
      </div>

      <div className={styles.propertyCard__imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.propertyCard__image}
          sizes="(max-width: 1919px) 100vw, 336px"
        />
      </div>

      <div className={styles.propertyCard__content}>
        <h3 className={styles.propertyCard__title}>{title}</h3>

        <ul className={styles.propertyCard__description}>
          {description.map((item) => (
            <li key={item} className={styles.propertyCard__descriptionItem}>
              {item}
            </li>
          ))}
        </ul>

        {price && <p className={styles.propertyCard__price}>{price}</p>}
      </div>

      {showButton && (
        <Button
          color="begie"
          className={styles.propertyCard__button}
          onClick={onDetailsClick}
        >
          {detailsLabel}
        </Button>
      )}
    </article>
  )
}

export default PropertyCard
