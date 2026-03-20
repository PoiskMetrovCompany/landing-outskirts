"use client"

import { useState } from "react"
import styles from "./firstScreenSection.module.scss"
import Button from "@/components/ui/Button"
import PromotionsSlider from "@/components/PromotionsSlider"
import RequestDialog from "@/components/RequestDialog"

export default function FirstScreenSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openRequestDialog = () => setIsDialogOpen(true)

  return (
    <section className={styles.firstScreen} aria-label="Первый экран">
      <div className={styles.firstScreen__bgEllips} />
      <div className={styles.firstScreen__left}>
        <div className={styles.firstScreen__left_text}>
          <p className={styles.firstScreen__badge}>Сдача IV квартал 2028</p>

          <h1 className={styles.firstScreen__title}>
            ЯСНЫЙ БЕРЕГ — КВАРТАЛ НА БЕРЕГУ ОБИ
          </h1>
        </div>

        <div className={styles.firstScreen__actions}>
          <Button
            className={styles.firstScreen__button}
            color="yellow"
            href="/catalogue"
          >
            Выбрать квартиру
          </Button>
          <Button
            className={styles.firstScreen__button}
            color="black"
            onClick={openRequestDialog}
          >
            <span className={styles.firstScreen__buttonTextDesktop}>
              Получить консультацию
            </span>
            <span className={styles.firstScreen__buttonTextMobile}>
              Консультация
            </span>
          </Button>
        </div>
      </div>

      <div className={styles.firstScreen__sliderWrap}>
        <PromotionsSlider onMoreClick={openRequestDialog} />
      </div>

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}
