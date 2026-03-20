import type { PropertyCardBadge } from "@/components/PropertyCard"
import type { OfferCard } from "./mapper"

export interface ApiFlat {
  id: number
  key: string
  apartment_type: string
  floor: number | null
  room_count: number | null
  price: number | null
  area: number | null
  renovation: string | null
  description: string
  plan_URL: string | null
  building_key: string | null
}

const DEFAULT_PLAN_IMAGE = "/images/main-page/flat.webp"

const normalizeRoomCount = (rooms: number | null) => {
  if (rooms === null || Number.isNaN(rooms)) {
    return null
  }

  if (rooms >= 20) {
    return rooms % 20
  }

  return rooms
}

const getRoomLabel = (rooms: number | null) => {
  if (rooms === 0) return "Студия"
  if (rooms === null) return "-комн"
  return `${rooms}-комн`
}

const formatRenovation = (renovation: string | null) => {
  if (!renovation) return "-"
  const lower = renovation.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

const formatPrice = (price: number | null) => {
  if (typeof price === "number" && Number.isFinite(price) && price > 0) {
    return `От ${price.toLocaleString("ru-RU")} ₽`
  }
  return undefined
}

const getOfferCardType = (rooms: number | null): OfferCard["type"] => {
  if (rooms === 0) return "st"
  if (rooms === 1) return "1k"
  if (rooms === 2) return "2k"
  if (rooms === 3) return "3k"
  return "4k"
}

const formatArea = (area: number | null) => {
  if (typeof area !== "number" || !Number.isFinite(area)) {
    return "0"
  }

  return area.toLocaleString("ru-RU", {
    minimumFractionDigits: Number.isInteger(area) ? 0 : 1,
    maximumFractionDigits: 2,
  })
}

export const mapFlatToOfferCard = (flat: ApiFlat): OfferCard => {
  const rooms = normalizeRoomCount(flat.room_count)

  return {
    id: flat.key || String(flat.id),
    type: getOfferCardType(rooms),
    title: `${getRoomLabel(rooms)}, ${formatArea(flat.area)} м²`,
    badges: [] as PropertyCardBadge[],
    description: [
      `Этаж ${flat.floor ?? "-"}`,
      `Отделка ${formatRenovation(flat.renovation)}`,
    ],
    imageSrc: flat.plan_URL ?? DEFAULT_PLAN_IMAGE,
    price: formatPrice(flat.price),
  }
}
