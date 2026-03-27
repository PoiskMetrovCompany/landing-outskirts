/** Порядок табов «Лучшие предложения» (подписи не меняем) */
const BEST_OFFERS_TAB_LABEL: Record<string, string> = {
  studio: "СТ",
  "1": "1К",
  "2": "2К",
  "3": "3К",
  "4_plus": "4+К",
  "4+": "4+К",
}

const ROOM_TYPE_SORT_INDEX: Record<string, number> = {
  studio: 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4_plus": 4,
  "4+": 4,
  "4": 5,
}

function sortRoomTypes(types: string[]): string[] {
  return [...types].sort((a, b) => {
    const ia = ROOM_TYPE_SORT_INDEX[a] ?? 99
    const ib = ROOM_TYPE_SORT_INDEX[b] ?? 99
    if (ia !== ib) return ia - ib
    return a.localeCompare(b)
  })
}

export interface BestOffersTab {
  /** Значение query `rooms` для API (как в `room_types` ответа) */
  roomsQuery: string
  label: string
}

/** Табы для секции: только «Все» + типы из API, сохраняем канонический порядок */
export function roomTypesToBestOffersTabs(roomTypes: string[]): BestOffersTab[] {
  const normalized = roomTypes.map((t) => String(t))
  return sortRoomTypes(normalized).map((roomsQuery) => ({
    roomsQuery,
    label: BEST_OFFERS_TAB_LABEL[roomsQuery] ?? roomsQuery,
  }))
}

const CATALOGUE_ROOM_LABEL: Record<string, string> = {
  studio: "Студия",
  "1": "1 комната",
  "2": "2 комнаты",
  "3": "3 комнаты",
  "4_plus": "4 комнаты",
  "4+": "4 комнаты",
  "4": "4 комнаты",
}

export interface CatalogueRoomOption {
  value: string
  label: string
}

/** Значения как в useFlats (studio, 1, 2, 3, 4) */
export function roomTypesToCatalogueOptions(
  roomTypes: string[],
): CatalogueRoomOption[] {
  const normalized = roomTypes.map((t) => String(t))
  return sortRoomTypes(normalized).map((rt) => {
    const value = apiRoomTypeToCatalogueFilterValue(rt)
    return {
      value,
      label: CATALOGUE_ROOM_LABEL[rt] ?? CATALOGUE_ROOM_LABEL[value] ?? rt,
    }
  })
}

export function apiRoomTypeToCatalogueFilterValue(apiType: string): string {
  if (apiType === "4_plus" || apiType === "4+") return "4"
  return apiType
}
