"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"

import Button from "@/components/ui/Button"
import Dropdown from "@/components/ui/Dropdown"
import Input from "@/components/ui/Input"
import IconImage from "@/components/ui/IconImage"

import styles from "./requestDialog.module.scss"

const REQUEST_API_URL = "/api/crm-request"

const requestTypeOptions = [
  { value: "excursion", label: "Записаться на экскурсию" },
  { value: "consultation", label: "Консультация" },
]

const requestTypeCommentMap: Record<string, string> = {
  consultation: "получить консультацию",
  excursion: "записаться на прием",
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

export default function RequestDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}) {
  const [phone, setPhone] = useState("")
  const [requestType, setRequestType] = useState(
    requestTypeOptions[1]?.value ?? "",
  )
  const [isApprovalChecked, setIsApprovalChecked] = useState(false)
  const [isMarketingApprovalChecked, setIsMarketingApprovalChecked] =
    useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isButtonDisabled = useMemo(() => {
    return !phone.trim() || !requestType || !isApprovalChecked || isSubmitting
  }, [isApprovalChecked, isSubmitting, phone, requestType])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isButtonDisabled) {
      return
    }

    setIsSubmitting(true)

    const selectedAction = requestTypeCommentMap[requestType] || requestType.toUpperCase()
    const payload = {
      phone: getApiPhone(phone),
      title: `Пользователь хочет ${selectedAction} ЖК Ясный берег`,
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
      setIsApprovalChecked(false)
      setIsMarketingApprovalChecked(false)
      setRequestType(requestTypeOptions[1]?.value ?? "")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialog__overlay} />
        <Dialog.Content className={styles.dialog__content}>
          <div className={styles.dialog__header}>
            <Dialog.Title className={styles.dialog__title}>
              оставить Заявку
            </Dialog.Title>
            <Dialog.Description className={styles.dialog__description}>
              Оставьте свои контакты, и мы свяжемся с вами, чтобы помочь с
              выбором и ответить на вопросы
            </Dialog.Description>
          </div>

          <form className={styles.dialog__form} onSubmit={handleSubmit}>
            <div className={styles.dialog__fields}>
              <Dropdown
                options={requestTypeOptions}
                value={requestType}
                onChange={setRequestType}
                placeholder="Консультация"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Ваш телефон"
                aria-label="Ваш телефон"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className={styles.dialog__bottom}>
              <Button
                className={styles.dialog__submitButton}
                color="gray-2"
                width="full"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </Button>

              <label className={styles.dialog__approval}>
                <input
                  className={styles.dialog__checkbox}
                  type="checkbox"
                  name="approval"
                  checked={isApprovalChecked}
                  onChange={(event) =>
                    setIsApprovalChecked(event.target.checked)
                  }
                />
                <span className={styles.dialog__approvalText}>
                  Я соглашаюсь с условиями{" "}
                  <strong>
                    <Link href="/policy">политики обработки персональных данных</Link>
                  </strong>
                </span>
              </label>

              <label className={styles.dialog__approval}>
                <input
                  className={styles.dialog__checkbox}
                  type="checkbox"
                  name="marketing-approval"
                  checked={isMarketingApprovalChecked}
                  onChange={(event) =>
                    setIsMarketingApprovalChecked(event.target.checked)
                  }
                />
                <span className={styles.dialog__approvalText}>
                  Я соглашаюсь с условиями{" "}
                  <strong>
                    <Link href="/agreement">рекламной рассылки</Link>
                  </strong>
                </span>
              </label>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
