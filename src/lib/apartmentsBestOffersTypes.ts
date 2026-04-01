import type { ApiFlat } from "@/hooks/mappers/flatMapper"

export interface ApartmentsBestOffersAttributes {
  room_types: string[]
  room_labels?: string[]
  apartments: ApiFlat[]
}

export interface ApartmentsBestOffersJson {
  data?: {
    attributes?: ApartmentsBestOffersAttributes
  }
}

export function parseApartmentsBestOffersJson(
  json: unknown,
): ApartmentsBestOffersAttributes | null {
  const root = json as ApartmentsBestOffersJson
  const attrs = root.data?.attributes
  if (!attrs) return null
  return {
    room_types: attrs.room_types ?? [],
    room_labels: attrs.room_labels,
    apartments: attrs.apartments ?? [],
  }
}
