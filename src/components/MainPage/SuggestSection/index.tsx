"use client"
import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

import styles from "./suggestSection.module.scss"

const REQUEST_API_URL = "/api/crm-request"
const SUGGEST_PRESENTATION_FILE_NAME = "Околица. Презентация о ЖК.pdf"
const SUGGEST_PRESENTATION_FILE_URL = `/presentations/${encodeURIComponent(SUGGEST_PRESENTATION_FILE_NAME)}`

const suggestCards = [
  {
    id: "river-view",
    title: "Скидки на квартиры",
    image: "/images/main-page/suggest/suggest-1.webp",
    alt: "Скидки на квартиры",
  },
  {
    id: "river-view2",
    title: "Квартиры в ипотеку 6%",
    image: "/images/main-page/suggest/suggest-2.webp",
    alt: "Квартиры в ипотеку 6%",
  },
  {
    id: "river-view3",
    title: "Квартиры с ремонтом под ключ ",
    image: "/images/main-page/suggest/suggest-3.webp",
    alt: "Квартиры с ремонтом под ключ",
  },
  {
    id: "river-view4",
    title: "Специальные цены от застройщика",
    image: "/images/main-page/suggest/suggest-4.webp",
    alt: "Специальные цены от застройщика",
  },
]

const SuggestSection = () => {
  const [phone, setPhone] = useState("")
  const [isAgreed, setIsAgreed] = useState(false)
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = useMemo(() => {
    return phone.trim().length > 0 && isAgreed && !isSubmitting
  }, [isAgreed, isSubmitting, phone])

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
    link.href = SUGGEST_PRESENTATION_FILE_URL
    link.download = SUGGEST_PRESENTATION_FILE_NAME
    link.rel = "noopener"
    document.body.append(link)
    link.click()
    link.remove()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    setIsSubmitting(true)

    const payload = {
      phone: getApiPhone(phone),
      title:
        "Клиент Лендинга Околица хочет получить предложения от 0.1 проекта",
    }

    try {
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

      downloadPresentation()
      setPhone("")
      setIsAgreed(false)
      setIsMarketingAgreed(false)
    } catch (error) {
      console.error("Ошибка отправки заявки в suggest section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={styles.suggestSection}
      aria-label="Предложения в одном каталоге"
    >
      <div className={styles.suggestSection__content}>
        <article className={styles.suggestSection__formCard}>
          <h2 className={styles.suggestSection__title}>
            Все предложения в одном каталоге
          </h2>

          <form className={styles.suggestSection__form} onSubmit={handleSubmit}>
            <Input
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              aria-label="Ваш телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              className={styles.suggestSection__button}
              color="gray-2"
              htmlType="submit"
              disabled={!isFormValid}
            >
              {isSubmitting ? "Отправляем..." : "Скачать презентацию"}
            </Button>

            <label className={styles.suggestSection__consent}>
              <input
                className={styles.suggestSection__checkbox}
                type="checkbox"
                name="consent"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <span className={styles.suggestSection__consentText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/policy">
                    политики конфиденциальности и обработки персональных данных
                  </Link>
                </strong>
              </span>
            </label>

            <label className={styles.suggestSection__consent}>
              <input
                className={styles.suggestSection__checkbox}
                type="checkbox"
                name="marketing-consent"
                checked={isMarketingAgreed}
                onChange={(e) => setIsMarketingAgreed(e.target.checked)}
              />
              <span className={styles.suggestSection__consentText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/agreement">рекламных рассылок</Link>
                </strong>
              </span>
            </label>
          </form>
        </article>

        <ul
          className={styles.suggestSection__cards}
          aria-label="Карточки предложений"
        >
          {suggestCards.map((card) => (
            <li className={styles.suggestSection__card} key={card.id}>
              <Image
                className={styles.suggestSection__cardImage}
                src={card.image}
                alt={card.alt}
                fill
                sizes="240px"
              />
              <p className={styles.suggestSection__cardTitle}>{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SuggestSection
