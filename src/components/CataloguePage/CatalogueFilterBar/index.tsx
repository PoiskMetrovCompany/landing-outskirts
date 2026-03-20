"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import CatalogueFiltersModal from "../CatalogueFiltersModal"

import styles from "./catalogueFilterBar.module.scss"

// ─── Types ───────────────────────────────────────────────────────────────────

type ActiveDropdown = "house" | "rooms" | "price" | "area" | "floor" | null

interface RangeValue {
  min: string
  max: string
}

export interface HouseOption {
  value: string
  label: string
  subtitle?: string
}

export interface FilterState {
  house: string[]
  rooms: string[]
  price: RangeValue
  area: RangeValue
  floor: RangeValue
  floorOptions?: string[]
}

// ─── Static data ──────────────────────────────────────────────────────────────

const ROOM_OPTIONS = [
  { value: "studio", label: "Студия" },
  { value: "1", label: "1 комната" },
  { value: "2", label: "2 комнаты" },
  { value: "3", label: "3 комнаты" },
  { value: "4", label: "4 комнаты" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CheckboxProps {
  checked: boolean
}

const Checkbox = ({ checked }: CheckboxProps) => (
  <div
    className={clsx(
      styles.filterBar__checkbox,
      checked && styles["filterBar__checkbox--checked"],
    )}
    aria-hidden="true"
  >
    {checked && (
      <svg
        className={styles.filterBar__checkboxIcon}
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
      >
        <path
          d="M1 3.5L4 6.5L10 1"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
)

interface CheckboxItemProps {
  label: string
  subtitle?: string
  checked: boolean
  onClick: () => void
  itemClassName?: string
}

const CheckboxItem = ({
  label,
  subtitle,
  checked,
  onClick,
  itemClassName,
}: CheckboxItemProps) => (
  <button
    type="button"
    className={clsx(styles.filterBar__checkboxItem, itemClassName)}
    onClick={onClick}
    role="checkbox"
    aria-checked={checked}
  >
    <Checkbox checked={checked} />
    <div className={styles.filterBar__checkboxItemText}>
      <span className={styles.filterBar__checkboxItemLabel}>{label}</span>
      {subtitle && (
        <span className={styles.filterBar__checkboxItemSubtitle}>
          {subtitle}
        </span>
      )}
    </div>
  </button>
)

interface FilterTriggerProps {
  label: string
  isActive: boolean
  hasValue: boolean
  onClick: () => void
}

const FilterTrigger = ({
  label,
  isActive,
  hasValue,
  onClick,
}: FilterTriggerProps) => (
  <button
    type="button"
    className={clsx(
      styles.filterBar__trigger,
      (isActive || hasValue) && styles["filterBar__trigger--active"],
    )}
    onClick={onClick}
    aria-expanded={isActive}
  >
    <span className={styles.filterBar__triggerText}>{label}</span>
    <IconImage
      className={clsx(
        styles.filterBar__triggerIcon,
        isActive && styles["filterBar__triggerIcon--open"],
      )}
      iconLink="/icons/catalogue/arrow-down-catalogue.svg"
      alt="раскрыть"
    />
  </button>
)

interface RangePanelProps {
  value: RangeValue
  onChange: (v: RangeValue) => void
  unit?: string
}

const RangePanel = ({ value, onChange, unit }: RangePanelProps) => (
  <div className={styles.filterBar__rangePanel}>
    <div className={styles.filterBar__rangeRow}>
      <label className={styles.filterBar__rangeField}>
        <span className={styles.filterBar__rangeLabel}>от</span>
        <input
          type="number"
          className={styles.filterBar__rangeInput}
          value={value.min}
          onChange={(e) => onChange({ ...value, min: e.target.value })}
          min={0}
          placeholder=""
        />
        {unit && <span className={styles.filterBar__rangeUnit}>{unit}</span>}
      </label>
      <label className={styles.filterBar__rangeField}>
        <span className={styles.filterBar__rangeLabel}>до</span>
        <input
          type="number"
          className={styles.filterBar__rangeInput}
          value={value.max}
          onChange={(e) => onChange({ ...value, max: e.target.value })}
          min={0}
          placeholder=""
        />
        {unit && <span className={styles.filterBar__rangeUnit}>{unit}</span>}
      </label>
    </div>
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

interface CatalogueFilterBarProps {
  onApply?: (filters: FilterState) => void
  houseOptions?: HouseOption[]
  hideHouseFilter?: boolean
}

export const INITIAL_FILTERS: FilterState = {
  house: [],
  rooms: [],
  price: { min: "", max: "" },
  area: { min: "", max: "" },
  floor: { min: "", max: "" },
  floorOptions: [],
}

const CatalogueFilterBar = ({
  onApply,
  houseOptions,
  hideHouseFilter = false,
}: CatalogueFilterBarProps) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isCompactFilterLabels, setIsCompactFilterLabels] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1439px)").matches
      : false,
  )

  const {
    house: selectedHouse,
    rooms: selectedRooms,
    price,
    area,
    floor,
  } = filters
  const houseFilterOptions: HouseOption[] = houseOptions ?? []

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1439px)")
    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompactFilterLabels(event.matches)
    }

    media.addEventListener("change", handleChange)

    return () => media.removeEventListener("change", handleChange)
  }, [])

  const toggle = (name: ActiveDropdown) =>
    setActiveDropdown((prev) => (prev === name ? null : name))

  const toggleHouse = (val: string) =>
    setFilters((prev) => ({
      ...prev,
      house: prev.house.includes(val)
        ? prev.house.filter((v) => v !== val)
        : [...prev.house, val],
    }))

  const toggleRoom = (val: string) =>
    setFilters((prev) => ({
      ...prev,
      rooms: prev.rooms.includes(val)
        ? prev.rooms.filter((v) => v !== val)
        : [...prev.rooms, val],
    }))

  const getHouseLabel = () => {
    if (selectedHouse.length === 0)
      return isCompactFilterLabels ? "Дом" : "Выберите дом"
    if (selectedHouse.length === 1) {
      return (
        houseFilterOptions.find((o) => o.value === selectedHouse[0])?.label ??
        "Дом"
      )
    }
    return `${selectedHouse.length} дома`
  }

  const getRoomsLabel = () => {
    if (selectedRooms.length === 0)
      return isCompactFilterLabels ? "Комнат" : "Кол-во комнат"
    if (selectedRooms.length === 1) {
      return ROOM_OPTIONS.find((o) => o.value === selectedRooms[0])?.label ?? ""
    }
    return `${selectedRooms.length} типа`
  }

  const getRangeLabel = (
    val: RangeValue,
    defaultLabel: string,
    unit: string,
  ) => {
    if (!val.min && !val.max) return defaultLabel
    if (val.min && val.max)
      return `${val.min}–${val.max}${unit ? " " + unit : ""}`
    if (val.min) return `от ${val.min}${unit ? " " + unit : ""}`
    return `до ${val.max}${unit ? " " + unit : ""}`
  }

  const handleApply = () => {
    onApply?.(filters)
    setActiveDropdown(null)
  }

  const handleResetFilters = () => setFilters(INITIAL_FILTERS)

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.house.length > 0) count += filters.house.length
    if (filters.rooms.length > 0) count += filters.rooms.length
    if (filters.price.min || filters.price.max) count += 1
    if (filters.area.min || filters.area.max) count += 1
    if (filters.floor.min || filters.floor.max) count += 1
    if ((filters.floorOptions?.length ?? 0) > 0)
      count += filters.floorOptions!.length
    return count
  }

  return (
    <div className={styles.filterBar} ref={containerRef}>
      <div className={styles.filterBar__inputs}>
        <div className={styles.filterBar__desktopInputs}>
          {!hideHouseFilter && (
            <>
              <div className={styles.filterBar__dropdownWrap}>
                <FilterTrigger
                  label={getHouseLabel()}
                  isActive={activeDropdown === "house"}
                  hasValue={selectedHouse.length > 0}
                  onClick={() => toggle("house")}
                />
                {activeDropdown === "house" && (
                  <div className={styles.filterBar__panel}>
                    {houseFilterOptions.map((opt) => (
                      <CheckboxItem
                        key={opt.value}
                        label={opt.label}
                        subtitle={opt.subtitle}
                        checked={selectedHouse.includes(opt.value)}
                        onClick={() => toggleHouse(opt.value)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.filterBar__separator} />
            </>
          )}

          {/* Кол-во комнат */}
          <div className={styles.filterBar__dropdownWrap}>
            <FilterTrigger
              label={getRoomsLabel()}
              isActive={activeDropdown === "rooms"}
              hasValue={selectedRooms.length > 0}
              onClick={() => toggle("rooms")}
            />
            {activeDropdown === "rooms" && (
              <div className={styles.filterBar__panel}>
                {ROOM_OPTIONS.map((opt) => (
                  <CheckboxItem
                    key={opt.value}
                    label={opt.label}
                    checked={selectedRooms.includes(opt.value)}
                    onClick={() => toggleRoom(opt.value)}
                    itemClassName={styles.filterBar__roomCheckboxItem}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.filterBar__separator} />

          {/* Цена */}
          <div className={styles.filterBar__dropdownWrap}>
            <FilterTrigger
              label={getRangeLabel(price, "Цена", "₽")}
              isActive={activeDropdown === "price"}
              hasValue={!!(price.min || price.max)}
              onClick={() => toggle("price")}
            />
            {activeDropdown === "price" && (
              <RangePanel
                value={price}
                onChange={(v) => setFilters((p) => ({ ...p, price: v }))}
                unit="₽"
              />
            )}
          </div>

          <div className={styles.filterBar__separator} />

          {/* Площадь */}
          <div className={styles.filterBar__dropdownWrap}>
            <FilterTrigger
              label={getRangeLabel(area, "Площадь", "м²")}
              isActive={activeDropdown === "area"}
              hasValue={!!(area.min || area.max)}
              onClick={() => toggle("area")}
            />
            {activeDropdown === "area" && (
              <RangePanel
                value={area}
                onChange={(v) => setFilters((p) => ({ ...p, area: v }))}
                unit="м²"
              />
            )}
          </div>

          <div className={styles.filterBar__separator} />

          {/* Этаж */}
          <div className={styles.filterBar__dropdownWrap}>
            <FilterTrigger
              label={getRangeLabel(floor, "Этаж", "")}
              isActive={activeDropdown === "floor"}
              hasValue={!!(floor.min || floor.max)}
              onClick={() => toggle("floor")}
            />
            {activeDropdown === "floor" && (
              <RangePanel
                value={floor}
                onChange={(v) => setFilters((p) => ({ ...p, floor: v }))}
              />
            )}
          </div>
        </div>

        <div className={styles.filterBar__mobileControls}>
          <label className={styles.filterBar__mobileSearch}>
            <IconImage
              className={styles.filterBar__mobileSearchIcon}
              iconLink="/icons/catalogue/search-dark-beige.svg"
              alt="Поиск"
            />
            <input
              type="text"
              placeholder="Введите название"
              className={styles.filterBar__mobileSearchInput}
            />
          </label>

          <Button
            color="black"
            className={styles.filterBar__mobileOptions}
            aria-label="Открыть фильтры"
            onClick={() => setIsFiltersModalOpen(true)}
          >
            <IconImage
              className={styles.filterBar__mobileOptionsIcon}
              iconLink="/icons/catalogue/options-white.svg"
              alt="Фильтры"
            />
          </Button>
        </div>
      </div>

      <CatalogueFiltersModal
        open={isFiltersModalOpen}
        onOpenChange={setIsFiltersModalOpen}
        houseOptions={houseFilterOptions}
        hideHouseFilter={hideHouseFilter}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApply}
        onReset={handleResetFilters}
        activeFiltersCount={getActiveFiltersCount()}
      />

      <Button
        color="yellow"
        className={styles.filterBar__submit}
        onClick={handleApply}
      >
        Показать
      </Button>
    </div>
  )
}

export default CatalogueFilterBar
