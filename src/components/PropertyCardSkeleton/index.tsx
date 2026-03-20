import clsx from "clsx"

import Skeleton from "@/components/ui/skeleton"

import styles from "./propertyCardSkeleton.module.scss"

interface PropertyCardSkeletonProps {
  className?: string
  showButton?: boolean
}

const PropertyCardSkeleton = ({
  className,
  showButton = true,
}: PropertyCardSkeletonProps) => {
  return (
    <article
      className={clsx(styles.propertyCardSkeleton, className)}
      aria-hidden="true"
    >
      <div className={styles.propertyCardSkeleton__badges}>
        <Skeleton
          className={styles.propertyCardSkeleton__badge}
          width={124}
          height={32}
          border="48px"
        />
      </div>

      <div className={styles.propertyCardSkeleton__imageWrap}>
        <Skeleton
          className={styles.propertyCardSkeleton__image}
          height={214}
          border="32px"
        />
        <Skeleton
          className={styles.propertyCardSkeleton__imageAccent}
          width="58%"
          height="72%"
          border="24px"
        />
      </div>

      <div className={styles.propertyCardSkeleton__content}>
        <Skeleton
          className={styles.propertyCardSkeleton__title}
          width="76%"
          height={42}
          border="12px"
        />

        <ul className={styles.propertyCardSkeleton__description}>
          <li className={styles.propertyCardSkeleton__descriptionItem}>
            <Skeleton width={74} height={18} border="8px" />
          </li>
          <li className={styles.propertyCardSkeleton__descriptionItem}>
            <Skeleton width={68} height={18} border="8px" />
          </li>
          <li className={styles.propertyCardSkeleton__descriptionItem}>
            <Skeleton width={96} height={18} border="8px" />
          </li>
          <li className={styles.propertyCardSkeleton__descriptionItem}>
            <Skeleton width={116} height={18} border="8px" />
          </li>
        </ul>
      </div>

      {showButton && (
        <Skeleton
          className={styles.propertyCardSkeleton__button}
          height={48}
          border="40px"
        />
      )}
    </article>
  )
}

export default PropertyCardSkeleton
