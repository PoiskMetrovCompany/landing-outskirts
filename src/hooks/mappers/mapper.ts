import type { PropertyCardBadge } from "@/components/PropertyCard"
import type { DeveloperApartment } from "@/hooks/useDeveloperApartments"

export type PropertyType = "all" | "st" | "1k" | "2k" | "3k" | "4k"

export interface OfferCard {
  id: string
  type: Exclude<PropertyType, "all">
  title: string
  badges: PropertyCardBadge[]
  description: string[]
  imageSrc: string
  price?: string
}

const DEFAULT_PLAN_IMAGE = "/images/main-page/flat.webp"

const getRoomCountLabel = (apartment: DeveloperApartment) => {
  if (apartment.apartment_type === "Студия" || apartment.room_count === 0) {
    return "Студия"
  }

  return `${apartment.room_count ? Number(apartment.room_count % 20)?.toFixed(0) : "-"}-комн`
}

const getPropertyType = (apartment: DeveloperApartment): OfferCard["type"] => {
  if (apartment.apartment_type === "Студия" || apartment.room_count === 0) {
    return "st"
  }

  if (apartment.room_count === 1) {
    return "1k"
  }

  if (apartment.room_count === 2) {
    return "2k"
  }

  if (apartment.room_count === 3) {
    return "3k"
  }

  return "4k"
}

const formatArea = (area: number | null) => {
  if (area === null) {
    return "0 м²"
  }

  return `${area.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
  })} м²`
}

export const mapApartmentToOfferCard = (
  apartment: DeveloperApartment,
): OfferCard => ({
  id: apartment.key,
  type: getPropertyType(apartment),
  title: `${getRoomCountLabel(apartment)}, ${formatArea(apartment.area)}`,
  badges: [],
  description: [
    `Этаж ${apartment.floor ?? "-"}`,
    // "I кв 2025",
    // "Дом кирпичный",
    `Отделка ${apartment.renovation?.toLocaleLowerCase() ?? "-"}`,
  ],
  imageSrc: apartment.plan_URL ?? DEFAULT_PLAN_IMAGE,
})
