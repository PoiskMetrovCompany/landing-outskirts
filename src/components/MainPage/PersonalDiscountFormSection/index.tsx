"use client"

import { useState } from "react"
import clsx from "clsx"

import CatalogPresentationDialog from "@/components/CatalogPresentationDialog"
import RequestDialog from "@/components/RequestDialog"
import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import styles from "./personalDiscountFormSection.module.scss"

interface PersonalDiscountFormSectionProps {
  title?: string
  buttonLabel?: string
  variant?: "default" | "orange"
}

const PersonalDiscountFormSection = ({
  title = "Скачайте каталог квартир под ставку 0,1%",
  buttonLabel = "Скачать каталог",
  variant = "default",
}: PersonalDiscountFormSectionProps) => {
  const [isCatalogDialogOpen, setIsCatalogDialogOpen] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const shouldOpenRequestDialog = buttonLabel.trim() === "Оставить заявку"

  const handleButtonClick = () => {
    if (shouldOpenRequestDialog) {
      setIsRequestDialogOpen(true)
      return
    }

    setIsCatalogDialogOpen(true)
  }

  return (
    <>
      <section
        className={clsx(
          styles.personalDiscount,
          variant === "orange" && styles["personalDiscount--orange"],
        )}
        aria-label="Персональная скидка застройщика"
      >
        <p className={styles.personalDiscount__title}>{title}</p>

        <Button
          color={variant === "orange" ? "gray" : "gray"}
          className={styles.personalDiscount__button}
          onClick={handleButtonClick}
        >
          <span className={styles.personalDiscount__buttonText}>
            {buttonLabel}
          </span>

          <IconImage
            className={styles.personalDiscount__buttonIcon}
            imageClassName={styles.personalDiscount__buttonIconImage}
            iconLink="/icons/arrow-right-download.svg"
            alt="Стрелка вправо"
            loading="lazy"
          />
        </Button>
      </section>

      <CatalogPresentationDialog
        isOpen={isCatalogDialogOpen}
        onOpenChange={setIsCatalogDialogOpen}
      />
      <RequestDialog
        isOpen={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </>
  )
}

export default PersonalDiscountFormSection
