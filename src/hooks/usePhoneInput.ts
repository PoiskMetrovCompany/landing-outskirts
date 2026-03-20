import { useCallback } from "react"
import type { ChangeEvent, InputHTMLAttributes } from "react"
import type { NumberFormatValues } from "react-number-format"

type InputValue = InputHTMLAttributes<HTMLInputElement>["value"]
type InputChangeHandler = InputHTMLAttributes<HTMLInputElement>["onChange"]

const normalizeFieldValue = (
  fieldValue: InputValue | undefined,
): string | number | undefined => {
  if (
    typeof fieldValue === "string" ||
    typeof fieldValue === "number" ||
    fieldValue === undefined
  ) {
    return fieldValue
  }

  return fieldValue.join("")
}

const normalizePhoneValue = (fieldValue: InputValue | undefined) => {
  const normalizedValue = normalizeFieldValue(fieldValue)

  if (normalizedValue === undefined) {
    return undefined
  }

  const rawValue = String(normalizedValue)
  const trimmedValue = rawValue.trim()

  if (!trimmedValue) {
    return ""
  }

  const digits = rawValue.replace(/\D/g, "")

  if (!digits) {
    return ""
  }

  if (trimmedValue.startsWith("+7")) {
    return digits.slice(1, 11)
  }

  if (trimmedValue.startsWith("8") && digits.length === 11) {
    return digits.slice(1, 11)
  }

  if (digits.length <= 10) {
    return digits
  }

  return digits.slice(-10)
}

interface UsePhoneInputParams {
  value?: InputValue
  defaultValue?: InputValue
  onChange?: InputChangeHandler
}

const usePhoneInput = ({
  value,
  defaultValue,
  onChange,
}: UsePhoneInputParams) => {
  const normalizedValue = normalizePhoneValue(value)
  const normalizedDefaultValue = normalizePhoneValue(defaultValue)

  const handlePhoneValueChange = useCallback(
    ({ formattedValue, value: numericValue }: NumberFormatValues) => {
      if (!onChange) {
        return
      }

      const nextValue = numericValue ? formattedValue : ""

      onChange({
        target: { value: nextValue },
        currentTarget: { value: nextValue },
      } as ChangeEvent<HTMLInputElement>)
    },
    [onChange],
  )

  return {
    normalizedValue,
    normalizedDefaultValue,
    handlePhoneValueChange,
  }
}

export default usePhoneInput
