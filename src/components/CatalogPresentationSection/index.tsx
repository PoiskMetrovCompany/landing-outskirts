"use client"

import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
import { useMemo, useState } from "react"

import Button from "@/components/ui/Button"

import styles from "./catalogPresentationSection.module.scss"
import Input from "../ui/Input"

type PresentationChannel = "max" | "telegram"

interface CatalogPresentationSectionProps {
  variant?: "default" | "dialog"
  presentationVariant?: PresentationVariant
  onSuccess?: () => void
}

const REQUEST_API_URL = "/api/crm-request"

const PRESENTATION_FILES = {
  catalog: "Презентация ЖК Ясный Берег.pdf",
  "family-mortgage": "Презентация квартир, Ипотека 3,7.pdf",
} as const

type PresentationVariant = keyof typeof PRESENTATION_FILES

const CatalogPresentationSection = ({
  variant = "default",
  presentationVariant = "catalog",
  onSuccess,
}: CatalogPresentationSectionProps) => {
  const presentationFileName = PRESENTATION_FILES[presentationVariant]
  const presentationFileUrl = `/presentations/${encodeURIComponent(presentationFileName)}`
  const [phone, setPhone] = useState("")
  const [isConsentChecked, setIsConsentChecked] = useState(false)
  const [isMarketingConsentChecked, setIsMarketingConsentChecked] = useState(false)
  const [isSubmittingChannel, setIsSubmittingChannel] =
    useState<PresentationChannel | null>(null)

  const SectionTag = variant === "dialog" ? "div" : "section"

  const isFormValid = useMemo(() => {
    return phone.trim() !== "" && isConsentChecked
  }, [isConsentChecked, phone])

  const getApiPhone = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, "")

    if (
      digits.length === 11 &&
      (digits.startsWith("7") || digits.startsWith("8"))
    ) {
      return `+7${digits.slice(1)}`
    }

    if (digits.length === 10) {
      return `+7${digits}`
    }

    return `+${digits}`
  }

  const downloadPresentation = () => {
    const link = document.createElement("a")
    link.href = presentationFileUrl
    link.download = presentationFileName
    link.rel = "noopener"
    document.body.append(link)
    link.click()
    link.remove()
  }

  const handlePresentationClick = async (channel: PresentationChannel) => {
    if (!isFormValid || isSubmittingChannel) {
      return
    }

    setIsSubmittingChannel(channel)

    const deliveryChannel = channel === "max" ? "MAX" : "telegram"
    const payload = {
      phone: getApiPhone(phone),
      title: `Клиент Лендинга Ясный берег хочет получить подробную презентацию проекта в ${deliveryChannel}`,
    }

    try {
      downloadPresentation()

      const response = await fetch(REQUEST_API_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      setPhone("")
      setIsConsentChecked(false)
      setIsMarketingConsentChecked(false)
      onSuccess?.()
    } catch (error) {
      console.error("Ошибка отправки заявки на презентацию:", error)
    } finally {
      setIsSubmittingChannel(null)
    }
  }

  return (
    <SectionTag
      className={clsx(
        styles.catalogPresentation,
        variant === "dialog" && styles["catalogPresentation--dialog"],
      )}
      aria-label="Получение презентации проекта"
    >
      <div className={styles.catalogPresentation__content}>
        <h2 className={styles.catalogPresentation__title}>
          Получите <span>подробную презентацию</span> проекта
        </h2>

        <form className={styles.catalogPresentation__form}>
          <label>
            <Input
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              aria-label="Ваш телефон"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <div className={styles.catalogPresentation__actions}>
            <Button
              className={`${styles.catalogPresentation__button} ${styles["catalogPresentation__button--max"]}`}
              color="blue"
              disabled={!isFormValid || Boolean(isSubmittingChannel)}
              onClick={() => void handlePresentationClick("max")}
            >
              {isSubmittingChannel === "max" ? "Отправляем..." : "Получить в MAX"}
            </Button>

            <Button
              className={styles.catalogPresentation__button}
              color="blue"
              disabled={!isFormValid || Boolean(isSubmittingChannel)}
              onClick={() => void handlePresentationClick("telegram")}
            >
              {isSubmittingChannel === "telegram"
                ? "Отправляем..."
                : "Получить в Telegram"}
            </Button>
          </div>

          <label className={styles.catalogPresentation__consent}>
            <input
              className={styles.catalogPresentation__checkbox}
              type="checkbox"
              checked={isConsentChecked}
              onChange={(event) => setIsConsentChecked(event.target.checked)}
            />
            <span className={styles.catalogPresentation__consentText}>
              Я соглашаюсь с условиями{" "}
              <strong>
                <Link href="/policy">политики обработки персональных данных</Link>
              </strong>
            </span>
          </label>

          <label className={styles.catalogPresentation__consent}>
            <input
              className={styles.catalogPresentation__checkbox}
              type="checkbox"
              checked={isMarketingConsentChecked}
              onChange={(event) =>
                setIsMarketingConsentChecked(event.target.checked)
              }
            />
            <span className={styles.catalogPresentation__consentText}>
              Я соглашаюсь с условиями{" "}
              <strong>
                <Link href="/agreement">рекламной рассылки</Link>
              </strong>
            </span>
          </label>
        </form>
      </div>

      <div className={styles.catalogPresentation__visual}>
        <Image
          src="/images/main-page/book.webp"
          alt="Каталог проекта"
          fill
          priority={false}
          className={`${styles.catalogPresentation__image} ${styles["catalogPresentation__image--default"]}`}
          sizes="(max-width: 1919px) 57vw, 1095px"
        />
        <Image
          src="/images/main-page/book-lg.webp"
          alt="Каталог проекта"
          fill
          priority={false}
          className={`${styles.catalogPresentation__image} ${styles["catalogPresentation__image--lg"]}`}
          sizes="(max-width: 1919px) 57vw, 1095px"
        />
        <Image
          src="/images/main-page/book-md.webp"
          alt="Каталог проекта"
          fill
          priority={false}
          className={`${styles.catalogPresentation__image} ${styles["catalogPresentation__image--md"]}`}
          sizes="(max-width: 1919px) 57vw, 1095px"
        />
      </div>
    </SectionTag>
  )
}

export default CatalogPresentationSection
