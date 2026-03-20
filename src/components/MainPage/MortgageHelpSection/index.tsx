"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Dropdown from "@/components/ui/Dropdown"

import styles from "./mortgageHelpSection.module.scss"
import Input from "@/components/ui/Input"

const REQUEST_API_URL = "/api/crm-request"

const contactTypeOptions = [
  { value: "call", label: "Звонок на телефон" },
  { value: "messenger", label: "Написать в мессенджер" },
]

const contactTypeCommentMap: Record<string, string> = {
  call: "звонить на телефон",
  messenger: "Написать в мессенджер",
}

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

const MortgageHelpSection = () => {
  const [phone, setPhone] = useState("")
  const [contactType, setContactType] = useState(contactTypeOptions[0].value)
  const [isApproved, setIsApproved] = useState(false)
  const [isMarketingApproved, setIsMarketingApproved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = useMemo(() => {
    return phone.trim() !== "" && !!contactType && isApproved && !isSubmitting
  }, [contactType, isApproved, isSubmitting, phone])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    setIsSubmitting(true)

    const preferredContact =
      contactTypeCommentMap[contactType] || contactTypeOptions[0].label
    const payload = {
      phone: getApiPhone(phone),
      title: `Клиент Лендинга Околица хочет получить помощь с ипотекой. Просит ${preferredContact}`,
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

      setPhone("")
      setIsApproved(false)
      setIsMarketingApproved(false)
      setContactType(contactTypeOptions[0].value)
    } catch (error) {
      console.error("Ошибка отправки ипотечной заявки:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="mortgage"
      className={styles.mortgageHelpSection}
      aria-label="Заявка на помощь в получении ипотеки"
    >
      <article className={styles.mortgageHelpSection__card}>
        <div className={styles.mortgageHelpSection__content}>
          <div className={styles.mortgageHelpSection__info}>
            <h2 className={styles.mortgageHelpSection__title}>
              Мы поможем{" "}
              <br className={styles.mortgageHelpSection__titleBreak} /> получить
              ипотеку
            </h2>

            <p className={styles.mortgageHelpSection__description}>
              Мы добиваемся одобрения по ипотеке чаще других, потому что наши
              специалисты знают все нюансы банковских требований
            </p>
          </div>

          <form
            className={styles.mortgageHelpSection__form}
            onSubmit={handleSubmit}
          >
            <div className={styles.mortgageHelpSection__fields}>
              <label className={styles.mortgageHelpSection__fieldLabel}>
                <Input
                  color="light"
                  type="tel"
                  name="phone"
                  placeholder="Ваш телефон"
                  aria-label="Ваш телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <Dropdown
                className={styles.mortgageHelpSection__dropdown}
                options={contactTypeOptions}
                value={contactType}
                onChange={setContactType}
                placeholder="Звонок на телефон"
                arrowIconLink="/icons/dropdown-arrow-light.svg"
              />
            </div>

            <Button
              className={styles.mortgageHelpSection__button}
              color="white"
              htmlType="submit"
              disabled={!isFormValid}
            >
              {isSubmitting ? "Отправляем..." : "Оставить заявку"}
            </Button>

            <label className={styles.mortgageHelpSection__approval}>
              <input
                className={styles.mortgageHelpSection__checkbox}
                type="checkbox"
                name="approval"
                checked={isApproved}
                onChange={(e) => setIsApproved(e.target.checked)}
              />

              <span className={styles.mortgageHelpSection__approvalText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/policy">
                    политики обработки персональных данных
                  </Link>
                </strong>
              </span>
            </label>

            <label className={styles.mortgageHelpSection__approval}>
              <input
                className={styles.mortgageHelpSection__checkbox}
                type="checkbox"
                name="marketing-approval"
                checked={isMarketingApproved}
                onChange={(e) => setIsMarketingApproved(e.target.checked)}
              />

              <span className={styles.mortgageHelpSection__approvalText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/agreement">рекламной рассылки</Link>
                </strong>
              </span>
            </label>
          </form>
        </div>
      </article>
    </section>
  )
}

export default MortgageHelpSection
