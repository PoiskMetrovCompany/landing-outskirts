import type { ReactNode } from "react"
import Image from "next/image"

import Button from "@/components/ui/Button"

import styles from "./promoCard.module.scss"

interface PromoCardProps {
  imageSrc: string
  imageAlt: string
  title: ReactNode
  subtitle: string
  buttonLabel?: string
  onButtonClick?: () => void
}

const PromoCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  buttonLabel = "Оставить заявку",
  onButtonClick,
}: PromoCardProps) => {
  return (
    <article className={styles.promoCard}>
      <div className={styles.promoCard__imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.promoCard__image}
          sizes="390px"
        />
      </div>

      <div className={styles.promoCard__content}>
        <div className={styles.promoCard__texts}>
          <h3 className={styles.promoCard__title}>{title}</h3>
          <p className={styles.promoCard__subtitle}>{subtitle}</p>
        </div>

        <Button
          color="begie"
          className={styles.promoCard__button}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </article>
  )
}

export default PromoCard
