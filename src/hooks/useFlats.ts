"use client"

import { useEffect, useState } from "react"

import type { FilterState } from "@/components/CataloguePage/CatalogueFilterBar"

import type { ApiFlat } from "./mappers/flatMapper"

const FLATS_ENDPOINT = "/api/flats"

const ROOM_TO_API: Record<string, string> = {
  studio: "studio",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
}

function buildFlatsQuery(
  filters: FilterState,
  page: number,
  limit: number,
): string {
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("per_page", String(limit))

  if (filters.rooms.length > 0) {
    const roomValues = filters.rooms
      .map((r) => ROOM_TO_API[r] ?? r)
      .filter(Boolean)
    if (roomValues.length > 0) {
      params.set("rooms", roomValues.join(","))
    }
  }
  if (filters.price.min) params.set("price_from", filters.price.min)
  if (filters.price.max) params.set("price_to", filters.price.max)
  if (filters.area.min) params.set("area_from", filters.area.min)
  if (filters.area.max) params.set("area_to", filters.area.max)
  if (filters.floor.min) params.set("floor_from", filters.floor.min)
  if (filters.floor.max) params.set("floor_to", filters.floor.max)

  return `${FLATS_ENDPOINT}?${params.toString()}`
}

interface FlatsResponse {
  data?: {
    attributes?: {
      apartments?: ApiFlat[]
      complex?: {
        apartments_by_key?: ApiFlat[]
      }
    }
  }
  meta?: {
    pagination?: {
      current_page: number
      per_page: number
      total: number
      last_page: number
    }
  }
}

export interface UseFlatsOptions {
  filters: FilterState
  page?: number
  limit?: number
  append?: boolean
}

export interface UseFlatsResult {
  flats: ApiFlat[]
  totalCount: number
  isLoading: boolean
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
}

export const useFlats = ({
  filters,
  page = 1,
  limit = 20,
  append = false,
}: UseFlatsOptions): UseFlatsResult => {
  const [flats, setFlats] = useState<ApiFlat[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [pagination, setPagination] =
    useState<UseFlatsResult["pagination"]>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadFlats = async () => {
      try {
        setIsLoading(true)
        if (page === 1) {
          setFlats([])
          setTotalCount(0)
          setPagination(null)
        }

        const url = buildFlatsQuery(filters, page, limit)

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { accept: "*/*" },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch flats: ${response.status}`)
        }

        const result: FlatsResponse = await response.json()
        const apartments =
          result.data?.attributes?.apartments ??
          result.data?.attributes?.complex?.apartments_by_key ??
          []
        const responsePagination = result.meta?.pagination

        setFlats((prev) => {
          if (!append || page === 1) {
            return apartments
          }

          const prevIds = new Set(
            prev.map((flat) => flat.key || String(flat.id)),
          )
          const nextFlats = apartments.filter(
            (flat) => !prevIds.has(flat.key || String(flat.id)),
          )

          return nextFlats.length > 0 ? [...prev, ...nextFlats] : prev
        })
        setTotalCount(responsePagination?.total ?? apartments.length)
        setPagination(
          responsePagination
            ? {
                page: responsePagination.current_page,
                limit: responsePagination.per_page,
                total: responsePagination.total,
                totalPages: responsePagination.last_page,
              }
            : null,
        )
      } catch (error) {
        if (controller.signal.aborted) return
        if (page === 1) {
          setFlats([])
          setTotalCount(0)
          setPagination(null)
        }
        console.error("Failed to load flats", error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadFlats()

    return () => controller.abort()
  }, [append, filters, page, limit])

  return { flats, totalCount, isLoading, pagination }
}
