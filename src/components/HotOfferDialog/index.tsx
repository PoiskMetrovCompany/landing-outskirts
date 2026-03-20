"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import Image from "next/image"

import RequestDialog from "@/components/RequestDialog"
import Button from "@/components/ui/Button"

import styles from "./hotOfferDialog.module.scss"

const ZERO_TIMER = {
  days: "00",
  hours: "00",
  minutes: "00",
}

const getInitialTimer = () => {
  const now = new Date()
  const deadline = new Date(now.getFullYear(), 2, 31, 0, 0, 0, 0)
  const difference = deadline.getTime() - now.getTime()

  if (difference <= 0) {
    return ZERO_TIMER
  }

  const totalMinutes = Math.floor(difference / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
  }
}

export default function HotOfferDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [timer] = useState(getInitialTimer)

  const handleRequestClick = () => {
    onOpenChange(false)
    setIsRequestDialogOpen(true)
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialog__overlay} />
          <Dialog.Content className={styles.dialog__content}>
            <div className={styles.dialog__bg}>
              <Image
                src="/images/main-page/popup/popup-bg.webp"
                alt="Background"
                fill
                className={styles.dialog__bgImage}
              />
              <div className={styles.dialog__gradient} />
            </div>

            <div className={styles.dialog__top}>
              <div className={styles.dialog__timer}>
                <span className={styles.dialog__timerText}>До конца акции</span>
                <div className={styles.dialog__timerValues}>
                  <span>{timer.days} дн</span>
                  <span>:</span>
                  <span>{timer.hours} ч</span>
                  <span>:</span>
                  <span>{timer.minutes} мин</span>
                </div>
              </div>
              <Dialog.Title className={styles.dialog__title}>
                Горячие предложения на 1-комн. квартиры
              </Dialog.Title>
            </div>

            <div className={styles.dialog__centerImageWrapper}>
              <Image
                src="/images/main-page/popup/popup-show.webp"
                alt="Горячее предложение"
                fill
                className={styles.dialog__centerImage}
              />
            </div>

            <div className={styles.dialog__bottom}>
              <Button
                color="yellow"
                width="full"
                className={styles.dialog__button}
                onClick={handleRequestClick}
              >
                Оставить заявку
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <RequestDialog
        isOpen={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </>
  )
}
