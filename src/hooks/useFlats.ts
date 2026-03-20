"use client"

import { useEffect, useState } from "react"

import type { FilterState } from "@/components/CataloguePage/CatalogueFilterBar"

import type { ApiFlat } from "./mappers/flatMapper"

const FLATS_ENDPOINT = "/api/flats"

const ROOM_TO_API: Record<string, string> = {
  studio: "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4+": "4",
}

function buildFlatsQuery(
  filters: FilterState,
  page: number,
  limit: number,
): string {
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("limit", String(limit))

  if (filters.house.length > 0) {
    params.set("buildingIds", filters.house.join(","))
  }
  if (filters.rooms.length > 0) {
    const roomValues = filters.rooms
      .map((r) => ROOM_TO_API[r] ?? r)
      .filter(Boolean)
    if (roomValues.length > 0) {
      params.set("rooms", roomValues.join(","))
    }
  }
  if (filters.price.min) params.set("priceFrom", filters.price.min)
  if (filters.price.max) params.set("priceTo", filters.price.max)
  if (filters.area.min) params.set("areaFrom", filters.area.min)
  if (filters.area.max) params.set("areaTo", filters.area.max)
  if (filters.floor.min) params.set("floorFrom", filters.floor.min)
  if (filters.floor.max) params.set("floorTo", filters.floor.max)

  return `${FLATS_ENDPOINT}?${params.toString()}`
}

interface FlatsResponse {
  data?: ApiFlat[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UseFlatsOptions {
  filters: FilterState
  page?: number
  limit?: number
}

export interface UseFlatsResult {
  flats: ApiFlat[]
  totalCount: number
  isLoading: boolean
  pagination: { page: number; limit: number; total: number; totalPages: number } | null
}

export const useFlats = ({
  filters,
  page = 1,
  limit = 20,
}: UseFlatsOptions): UseFlatsResult => {
  const [flats, setFlats] = useState<ApiFlat[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [pagination, setPagination] = useState<UseFlatsResult["pagination"]>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadFlats = async () => {
      try {
        setIsLoading(true)
        const url = buildFlatsQuery(filters, page, limit)

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { accept: "*/*" },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch flats: ${response.status}`)
        }

        const result: FlatsResponse = await response.json()
        setFlats(result.data ?? [])
        setTotalCount(result.pagination?.total ?? 0)
        setPagination(result.pagination ?? null)
      } catch (error) {
        if (controller.signal.aborted) return
        console.error("Failed to load flats", error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadFlats()

    return () => controller.abort()
  }, [filters, page, limit])

  return { flats, totalCount, isLoading, pagination }
}
