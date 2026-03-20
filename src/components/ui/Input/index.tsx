"use client"
import React, { InputHTMLAttributes } from "react"
import clsx from "clsx"
import { PatternFormat } from "react-number-format"

import usePhoneInput from "@/hooks/usePhoneInput"

import styles from "./input.module.scss"

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  wrapperClassName?: string
  color?: "light" | "dark"
}

const Input = ({
  className,
  wrapperClassName,
  color = "dark",
  type,
  onChange,
  value,
  defaultValue,
  ...props
}: InputProps) => {
  const inputClassName = clsx(
    styles.input__field,
    className,
    styles[`input__field--${color}`],
  )

  const { normalizedValue, normalizedDefaultValue, handlePhoneValueChange } =
    usePhoneInput({ value, defaultValue, onChange })

  return (
    <label
      className={clsx(
        styles.input,
        wrapperClassName,
        styles[`input--${color}`],
      )}
    >
      {type === "tel" ? (
        <PatternFormat
          className={inputClassName}
          format="+7 (###) ###-##-##"
          mask="_"
          type="tel"
          valueIsNumericString
          value={normalizedValue}
          defaultValue={normalizedDefaultValue}
          onValueChange={handlePhoneValueChange}
          {...props}
        />
      ) : (
        <input
          className={inputClassName}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
      )}
    </label>
  )
}

export default Input
