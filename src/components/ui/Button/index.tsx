"use client"

import Link from "next/link"
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import clsx from "clsx"
import s from "./button.module.scss"

type ButtonColor =
  | "white"
  | "black"
  | "yellow"
  | "yellow-gray"
  | "begie"
  | "blue"
  | "gray"
  | "gray-2"
  | "transparent"
  | "disabled"
  | "underline"

type ButtonType = 1 | 2 | 3 | 4 | 5

type ButtonSize = "L" | "M" | "S" | "XS"

type ButtonWidth = "content" | "full"

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "type"
> {
  children: ReactNode
  href?: string
  className?: string
  color?: ButtonColor
  type?: ButtonType
  width?: ButtonWidth
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  sizeXl?: ButtonSize
  sizeLg?: ButtonSize
  sizeMd?: ButtonSize
  sizeSm?: ButtonSize
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      href,
      className,
      color = "yellow",
      type: buttonType,
      width,
      htmlType = "button",
      sizeXl,
      sizeLg,
      sizeMd,
      sizeSm,
      onClick,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const hasAdaptiveSizing =
      buttonType !== undefined ||
      sizeXl !== undefined ||
      sizeLg !== undefined ||
      sizeMd !== undefined ||
      sizeSm !== undefined

    const resolvedType = buttonType ?? 1
    const resolvedSizeXl = sizeXl ?? "M"
    const resolvedSizeLg = sizeLg ?? resolvedSizeXl
    const resolvedSizeMd = sizeMd ?? resolvedSizeLg
    const resolvedSizeSm = sizeSm ?? resolvedSizeMd

    const buttonClassName = clsx(
      s.button,
      s[`width-${width}`],
      s[`color-${color}`],
      hasAdaptiveSizing && s.adaptive,
      hasAdaptiveSizing && s[`type-${resolvedType}`],
      hasAdaptiveSizing && s[`sizeXl-${resolvedSizeXl}`],
      hasAdaptiveSizing && s[`sizeLg-${resolvedSizeLg}`],
      hasAdaptiveSizing && s[`sizeMd-${resolvedSizeMd}`],
      hasAdaptiveSizing && s[`sizeSm-${resolvedSizeSm}`],
      className,
    )

    if (href) {
      const isExternalLink = /^(https?:|mailto:|tel:|tg:)/.test(href)

      if (isExternalLink) {
        return (
          <a
            href={href}
            className={buttonClassName}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : undefined}
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className={buttonClassName}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        type={htmlType}
        onClick={onClick}
        disabled={disabled}
        {...rest}
        className={buttonClassName}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
