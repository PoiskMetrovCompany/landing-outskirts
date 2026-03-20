"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React from "react"
import clsx from "clsx"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import type { FilterState, HouseOption } from "../CatalogueFilterBar"

import styles from "./catalogueFiltersModal.module.scss"

// ─── Constants ─────────────────────────────────────────────────────────────────

const ROOM_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4" },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface CatalogueFiltersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  houseOptions?: HouseOption[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApply: () => void
  onReset: () => void
  activeFiltersCount: number
}

// ─── Component ─────────────────────────────────────────────────────────────────

const CatalogueFiltersModal = ({
  open,
  onOpenChange,
  houseOptions,
  filters,
  onFiltersChange,
  onApply,
  onReset,
  activeFiltersCount,
}: CatalogueFiltersModalProps) => {
  const handleClose = () => onOpenChange(false)
  const houseFilterOptions = houseOptions ?? []

  const toggleHouse = (value: string) => {
    const next = filters.house.includes(value)
      ? filters.house.filter((v) => v !== value)
      : [...filters.house, value]
    onFiltersChange({ ...filters, house: next })
  }

  const toggleRoom = (value: string) => {
    const next = filters.rooms.includes(value)
      ? filters.rooms.filter((v) => v !== value)
      : [...filters.rooms, value]
    onFiltersChange({ ...filters, rooms: next })
  }

  const handleApply = () => {
    onApply()
    handleClose()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modal__overlay} />
        <Dialog.Content
          className={styles.modal__content}
          onEscapeKeyDown={handleClose}
          onInteractOutside={handleClose}
        >
          <Dialog.Title asChild>
            <VisuallyHidden>Фильтры поиска квартир</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Выберите параметры поиска: дом, количество комнат, цену, площадь,
              этаж
            </VisuallyHidden>
          </Dialog.Description>

          <div className={styles.modal__container}>
            {/* Header */}
            <div className={styles.modal__header}>
              <h2 className={styles.modal__title}>Фильтры</h2>
              <button
                type="button"
                onClick={handleClose}
                className={styles.modal__close}
                aria-label="Закрыть"
              >
                <IconImage
                  iconLink="/icons/catalogue/close-popup.svg"
                  alt="Закрыть"
                  className={styles.modal__closeIcon}
                />
              </button>
            </div>

            {/* Content */}
            <div className={styles.modal__contentArea}>
              {/* Дом */}
              <div className={styles.modal__section}>
                <div className={styles.modal__sectionLabel}>Дом</div>
                <div className={styles.modal__sectionOptions}>
                  {houseFilterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={clsx(
                        styles.modal__filterButton,
                        filters.house.includes(opt.value) &&
                          styles["modal__filterButton--active"],
                      )}
                      onClick={() => toggleHouse(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Количество комнат */}
              <div className={styles.modal__section}>
                <div className={styles.modal__sectionLabel}>
                  Количество комнат
                </div>
                <div className={styles.modal__sectionOptions}>
                  {ROOM_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={clsx(
                        styles.modal__filterButton,
                        filters.rooms.includes(opt.value) &&
                          styles["modal__filterButton--active"],
                      )}
                      onClick={() => toggleRoom(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className={styles.modal__section}>
                <div className={styles.modal__sectionLabel}>Цена</div>
                <div className={styles.modal__rangeRow}>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="от"
                      value={filters.price.min}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          price: {
                            ...filters.price,
                            min: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit}>₽</span>
                  </div>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="до"
                      value={filters.price.max}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          price: {
                            ...filters.price,
                            max: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit}>₽</span>
                  </div>
                </div>
              </div>

              {/* Площадь */}
              <div className={styles.modal__section}>
                <div className={styles.modal__sectionLabel}>Площадь</div>
                <div className={styles.modal__rangeRow}>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="от"
                      value={filters.area.min}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          area: {
                            ...filters.area,
                            min: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit}>м²</span>
                  </div>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="до"
                      value={filters.area.max}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          area: {
                            ...filters.area,
                            max: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit}>м²</span>
                  </div>
                </div>
              </div>

              {/* Этаж */}
              <div className={styles.modal__section}>
                <div className={styles.modal__sectionLabel}>Этаж</div>
                <div className={styles.modal__rangeRow}>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="от"
                      value={filters.floor.min}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          floor: {
                            ...filters.floor,
                            min: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit} />
                  </div>
                  <div className={styles.modal__rangeField}>
                    <input
                      type="number"
                      className={styles.modal__rangeInput}
                      placeholder="до"
                      value={filters.floor.max}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          floor: {
                            ...filters.floor,
                            max: e.target.value,
                          },
                        })
                      }
                      min={0}
                    />
                    <span className={styles.modal__rangeUnit} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.modal__footer}>
              <Button
                color="gray-2"
                className={styles.modal__resetButton}
                onClick={onReset}
              >
                Сбросить фильтры
                {activeFiltersCount > 0 && (
                  <span className={styles.modal__resetCount}>
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <Button
                color="yellow"
                className={styles.modal__applyButton}
                onClick={handleApply}
              >
                Показать
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CatalogueFiltersModal
