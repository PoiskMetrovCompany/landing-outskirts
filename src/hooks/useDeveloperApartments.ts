"use client"

import { useEffect, useState } from "react"

const APARTMENTS_ENDPOINT =
  "/apartments/from-developer?residential_complex_key=61e6a214131222ba38b0b47c"

export interface DeveloperApartment {
  id: number
  key: string
  apartment_type: string
  renovation: string | null
  floor: number | null
  room_count: number | null
  area: number | null
  plan_URL: string | null
}

interface DeveloperApartmentsResponse {
  data?: {
    attributes?: {
      complex?: {
        apartments_by_key?: DeveloperApartment[]
      }
    }
  }
}

interface UseDeveloperApartmentsResult {
  apartments: DeveloperApartment[]
  isLoading: boolean
  totalCount: number
}

export const useDeveloperApartments = (
  limit?: number,
): UseDeveloperApartmentsResult => {
  const [apartments, setApartments] = useState<DeveloperApartment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined")
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const loadApartments = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(`${apiUrl}${APARTMENTS_ENDPOINT}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch apartments: ${response.status}`)
        }

        const result: DeveloperApartmentsResponse = await response.json()
        const fetchedApartments =
          result.data?.attributes?.complex?.apartments_by_key ?? []
        const nextApartments =
          typeof limit === "number"
            ? fetchedApartments.slice(0, limit)
            : fetchedApartments

        console.log("Developer apartments response", nextApartments)
        setTotalCount(fetchedApartments.length)
        setApartments(nextApartments)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        console.error("Failed to load developer apartments", error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadApartments()

    return () => {
      controller.abort()
    }
  }, [limit])

  return { apartments, isLoading, totalCount }
}
