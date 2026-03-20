import type { PropertyCardBadge } from "@/components/PropertyCard"
import type { OfferCard } from "./mapper"

export interface ApiFlat {
  id: number
  externalId: number
  apartment: string
  floor: number
  rooms: number
  price: number
  formattedPrice: string
  area: string
  renovation: string
  housingType: string
  livingArea: string
  description: string
  plans: string[]
  building: {
    id: number
    externalId: number
    name: string
    floors: number
    address: string
    complexName: string
    buildingState: string
  }
}

const DEFAULT_PLAN_IMAGE = "/images/main-page/flat.webp"

const getRoomLabel = (rooms: number) => {
  if (rooms === 0) return "Студия"
  return `${rooms}-комн`
}

const formatRenovation = (renovation: string) => {
  if (!renovation) return "-"
  const lower = renovation.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

const formatPrice = (price: number, formattedPrice: string) => {
  if (typeof price === "number" && Number.isFinite(price) && price > 0) {
    return `От ${price.toLocaleString("ru-RU")} ₽`
  }

  if (!formattedPrice) {
    return undefined
  }

  return formattedPrice.charAt(0).toUpperCase() + formattedPrice.slice(1)
}

const getOfferCardType = (rooms: number): OfferCard["type"] => {
  if (rooms === 0) return "st"
  if (rooms === 1) return "1k"
  if (rooms === 2) return "2k"
  if (rooms === 3) return "3k"
  return "4k"
}

export const mapFlatToOfferCard = (flat: ApiFlat): OfferCard => ({
  id: String(flat.id),
  type: getOfferCardType(flat.rooms),
  title: `${getRoomLabel(flat.rooms)}, ${flat.area} м²`,
  badges: [] as PropertyCardBadge[],
  description: [
    `Этаж ${flat.floor}`,
    `Отделка ${formatRenovation(flat.renovation)}`,
  ],
  imageSrc: flat.plans?.[0] ?? DEFAULT_PLAN_IMAGE,
  price: formatPrice(flat.price, flat.formattedPrice),
})
