"use client"

import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import IconImage from "@/components/ui/IconImage"

import styles from "./dropdown.module.scss"

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  initialValue?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  triggerClassName?: string
  menuClassName?: string
  arrowIconLink?: string
  selectedIconLink?: string
}

const Dropdown = ({
  options,
  initialValue,
  value,
  onChange,
  placeholder,
  className,
  triggerClassName,
  menuClassName,
  arrowIconLink = "/icons/dropdown-arrow.svg",
  selectedIconLink = "/icons/dropdown-ok.svg",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [innerSelectedValue, setInnerSelectedValue] = useState(
    initialValue || "",
  )
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedValue = value ?? innerSelectedValue

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  )
  const triggerText = selectedOption?.label || placeholder || ""

  const handleSelect = (optionValue: string) => {
    if (value === undefined) {
      setInnerSelectedValue(optionValue)
    }

    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div
      className={clsx(
        styles.dropdown,
        isOpen && styles["dropdown--open"],
        className,
      )}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={clsx(styles.dropdown__trigger, triggerClassName)}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className={styles.dropdown__triggerText}>{triggerText}</span>

        <IconImage
          className={clsx(
            styles.dropdown__triggerIcon,
            isOpen && styles["dropdown__triggerIcon--open"],
          )}
          iconLink={arrowIconLink}
          alt="Открыть список"
          loading="lazy"
        />
      </button>

      {isOpen && (
        <div className={clsx(styles.dropdown__menu, menuClassName)}>
          <ul className={styles.dropdown__list}>
            {options.map((option) => {
              const isSelected = option.value === selectedValue

              return (
                <li key={option.value} className={styles.dropdown__item}>
                  <button
                    type="button"
                    className={styles.dropdown__itemButton}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span
                      className={clsx(
                        styles.dropdown__itemText,
                        isSelected && styles["dropdown__itemText--selected"],
                      )}
                    >
                      {option.label}
                    </span>

                    {isSelected && (
                      <IconImage
                        className={styles.dropdown__selectedIcon}
                        iconLink={selectedIconLink}
                        alt="Выбранный пункт"
                        loading="lazy"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <span className={styles.dropdown__scroll} aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

export default Dropdown
