"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"

import Button from "@/components/ui/Button"
import Dropdown from "@/components/ui/Dropdown"

import styles from "./excursionSection.module.scss"
import Input from "@/components/ui/Input"

const REQUEST_API_URL = "/api/crm-request"

const requestTypeOptions = [
  { value: "excursion", label: "Записаться на экскурсию" },
  { value: "consultation", label: "Получить консультацию" },
]

const contactTypeOptions = [
  { value: "call", label: "Звонок на телефон" },
  { value: "messenger-tg", label: "Написать в telegram" },
  { value: "messenger-ws", label: "Написать в whatsapp" },
]

const requestTypeCommentMap: Record<string, string> = {
  excursion: "записаться на экскурсию",
  consultation: "получить консультацию",
}

const contactTypeCommentMap: Record<string, string> = {
  call: "звонком на мобильный",
  "messenger-tg": "в telegram",
  "messenger-ws": "в whatsapp",
}

const getApiPhone = (rawPhone: string) => {
  const digits = rawPhone.replace(/\D/g, "")

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `+7${digits.slice(1)}`
  }

  if (digits.length === 10) {
    return `+7${digits}`
  }

  return `+${digits}`
}

const ExcursionSection = () => {
  const [phone, setPhone] = useState("")
  const [requestType, setRequestType] = useState(
    requestTypeOptions[0]?.value ?? "",
  )
  const [contactType, setContactType] = useState(
    contactTypeOptions[0]?.value ?? "",
  )
  const [isApprovalChecked, setIsApprovalChecked] = useState(false)
  const [isMarketingApprovalChecked, setIsMarketingApprovalChecked] =
    useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isButtonDisabled = useMemo(() => {
    return (
      !phone.trim() ||
      !requestType ||
      !contactType ||
      !isApprovalChecked ||
      isSubmitting
    )
  }, [contactType, isApprovalChecked, isSubmitting, phone, requestType])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isButtonDisabled) {
      return
    }

    setIsSubmitting(true)

    const requestCommentPart =
      requestTypeCommentMap[requestType] || requestTypeOptions[0]?.label.toLowerCase()
    const contactCommentPart =
      contactTypeCommentMap[contactType] || contactTypeOptions[0]?.label.toLowerCase()
    const payload = {
      phone: getApiPhone(phone),
      title: `Клиента Лендинга Ясный берег заинтересовал проект он хочет ${requestCommentPart} ${contactCommentPart}`,
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
      setRequestType(requestTypeOptions[0]?.value ?? "")
      setContactType(contactTypeOptions[0]?.value ?? "")
      setIsApprovalChecked(false)
      setIsMarketingApprovalChecked(false)
    } catch (error) {
      console.error("Ошибка отправки заявки на экскурсию:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={styles.excursionSection}
      aria-label="Записаться на экскурсию"
    >
      <article className={styles.excursionSection__card}>
        <h2 className={styles.excursionSection__title}>
          Заинтересовал проект? расскажем подробнее
        </h2>

        <form className={styles.excursionSection__form} onSubmit={handleSubmit}>
          <div className={styles.excursionSection__fields}>
            <Input
              wrapperClassName={styles.excursionSection__input}
              className={styles.excursionSection__inputField}
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              aria-label="Ваш телефон"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />

            <Dropdown
              options={requestTypeOptions}
              value={requestType}
              onChange={setRequestType}
              placeholder="Записаться на экскурсию"
              triggerClassName={styles.excursionSection__dropdownTrigger}
            />

            <Dropdown
              options={contactTypeOptions}
              value={contactType}
              onChange={setContactType}
              placeholder="Звонок на телефон"
              triggerClassName={styles.excursionSection__dropdownTrigger}
            />
          </div>

          <div className={styles.excursionSection__bottom}>
            <Button
              className={styles.excursionSection__button}
              color="yellow-gray"
              htmlType="submit"
              disabled={isButtonDisabled}
            >
              {isSubmitting ? "Отправляем..." : "Записаться на экскурсию"}
            </Button>

            <label className={styles.excursionSection__approval}>
              <input
                className={styles.excursionSection__checkbox}
                type="checkbox"
                name="approval"
                checked={isApprovalChecked}
                onChange={(event) => setIsApprovalChecked(event.target.checked)}
              />
              <span className={styles.excursionSection__approvalText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/policy">политики обработки персональных данных</Link>
                </strong>
              </span>
            </label>

            <label className={styles.excursionSection__approval}>
              <input
                className={styles.excursionSection__checkbox}
                type="checkbox"
                name="marketing-approval"
                checked={isMarketingApprovalChecked}
                onChange={(event) =>
                  setIsMarketingApprovalChecked(event.target.checked)
                }
              />
              <span className={styles.excursionSection__approvalText}>
                Я соглашаюсь с условиями{" "}
                <strong>
                  <Link href="/agreement">рекламной рассылки</Link>
                </strong>
              </span>
            </label>
          </div>
        </form>
      </article>
    </section>
  )
}

export default ExcursionSection
