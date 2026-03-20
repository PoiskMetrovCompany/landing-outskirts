"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"

import CatalogPresentationSection from "@/components/CatalogPresentationSection"

import styles from "./catalogPresentationDialog.module.scss"

type PresentationVariant = "catalog" | "family-mortgage"

export default function CatalogPresentationDialog({
  isOpen,
  onOpenChange,
  presentationVariant = "catalog",
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  presentationVariant?: PresentationVariant
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialog__overlay} />
        <Dialog.Content className={styles.dialog__content}>
          <Dialog.Title className={styles.dialog__visuallyHidden}>
            Получение презентации проекта
          </Dialog.Title>
          <Dialog.Description className={styles.dialog__visuallyHidden}>
            Форма для отправки телефона и получения презентации проекта
          </Dialog.Description>

          <div className={styles.dialog__bg}>
            <Image
              src="/images/main-page/popup/popup-bg.webp"
              alt="Background"
              fill
              className={styles.dialog__bgImage}
            />
            <div className={styles.dialog__gradient} />
          </div>

          <CatalogPresentationSection
            variant="dialog"
            presentationVariant={presentationVariant}
            onSuccess={() => onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
