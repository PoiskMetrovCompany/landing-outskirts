"use client"

import { MouseEvent, useState } from "react"

import CatalogPresentationDialog from "@/components/CatalogPresentationDialog"
import RequestDialog from "@/components/RequestDialog"
import styles from "./purchaseWaysSection.module.scss"
import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"
import MoreLink from "@/components/ui/MoreLink"

export default function PurchaseWaysSection() {
  const [isCatalogDialogOpen, setIsCatalogDialogOpen] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)

  const handleOpenCatalogDialog = () => {
    setIsCatalogDialogOpen(true)
  }

  const handleOpenRequestDialog = (
    event?: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    event?.preventDefault()
    setIsRequestDialogOpen(true)
  }

  return (
    <>
      <section className={styles.purchaseWays} aria-label="Способы покупки">
        <h2 className={styles.purchaseWays__title}>Способы покупки</h2>

        <div className={styles.purchaseWays__content}>
          <article className={styles.purchaseWays__leftCard}>
            <h3 className={styles.purchaseWays__leftCardTitle}>
              Ипотека с льготной ставкой от 5%
            </h3>

            <Button
              className={styles.purchaseWays__leftCardButton}
              color="yellow"
              onClick={handleOpenCatalogDialog}
            >
              Скачать каталог
            </Button>
          </article>

          <div className={styles.purchaseWays__rightColumn}>
            <article
              className={styles.purchaseWays__rightCardPrimary}
              aria-label="Стандартная ипотека"
            >
              <h3 className={styles.purchaseWays__rightCardPrimaryTitle}>
                трейд-ин старого жилья
              </h3>

              <MoreLink
                color="light"
                href="/catalogue"
                onClick={handleOpenRequestDialog}
              >
                Выбрать квартиру
              </MoreLink>

              <IconImage
                className={styles.purchaseWays__primaryIconWrap}
                imageClassName={styles.purchaseWays__iconImage}
                style={{ position: "absolute" }}
                iconLink="/icons/main-page/mortgage-01.svg"
                alt="Декоративная иконка стандартной ипотеки"
                loading="lazy"
              />
            </article>

            <div className={styles.purchaseWays__bottomCards}>
              <article
                className={styles.purchaseWays__rightCardSecondary}
                aria-label="Рассрочка от застройщика"
              >
                <h3 className={styles.purchaseWays__rightCardSecondaryTitle}>
                  Рассрочка от застройщика
                </h3>

                <MoreLink
                  color="dark"
                  href="/catalogue"
                  onClick={handleOpenRequestDialog}
                >
                  Выбрать квартиру
                </MoreLink>

                <IconImage
                  className={styles.purchaseWays__secondaryIconWrapDesktop}
                  imageClassName={styles.purchaseWays__iconImage}
                  style={{ position: "absolute" }}
                  iconLink="/icons/main-page/mortgage-02.svg"
                  alt="Декоративная иконка рассрочки"
                  loading="lazy"
                />

                <IconImage
                  className={styles.purchaseWays__secondaryIconWrapMobile}
                  imageClassName={styles.purchaseWays__iconImage}
                  style={{ position: "absolute" }}
                  iconLink="/icons/main-page/mortgage-02-xxs.svg"
                  alt="Декоративная иконка рассрочки"
                  loading="lazy"
                />
              </article>

              <article
                className={styles.purchaseWays__rightCardSecondary}
                aria-label="Скидка за наличный расчет"
              >
                <h3 className={styles.purchaseWays__rightCardSecondaryTitle}>
                  скидка на квартиры 4%
                </h3>

                <MoreLink
                  color="dark"
                  href="/catalogue"
                  onClick={handleOpenRequestDialog}
                >
                  Выбрать квартиру
                </MoreLink>

                <IconImage
                  className={styles.purchaseWays__tertiaryIconWrapDesktop}
                  imageClassName={styles.purchaseWays__iconImage}
                  style={{ position: "absolute" }}
                  iconLink="/icons/main-page/mortgage-03.svg"
                  alt="Декоративная иконка скидки при полной оплате"
                  loading="lazy"
                />

                <IconImage
                  className={styles.purchaseWays__tertiaryIconWrapMobile}
                  imageClassName={styles.purchaseWays__iconImage}
                  style={{ position: "absolute" }}
                  iconLink="/icons/main-page/mortgage-03-xxs.svg"
                  alt="Декоративная иконка скидки при полной оплате"
                  loading="lazy"
                />
              </article>
            </div>
          </div>
        </div>
      </section>

      <CatalogPresentationDialog
        isOpen={isCatalogDialogOpen}
        onOpenChange={setIsCatalogDialogOpen}
        presentationVariant="family-mortgage"
      />
      <RequestDialog
        isOpen={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </>
  )
}
