"use client"

import { useEffect, useState } from "react"

import {
  parseApartmentsBestOffersJson,
  type ApartmentsBestOffersAttributes,
} from "@/lib/apartmentsBestOffersTypes"

const BEST_OFFERS_API = "/api/apartments-best-offers"

function buildUrl(rooms: string | undefined): string {
  if (!rooms) return BEST_OFFERS_API
  const p = new URLSearchParams()
  p.set("rooms", rooms)
  return `${BEST_OFFERS_API}?${p.toString()}`
}

export interface UseApartmentsBestOffersResult
  extends ApartmentsBestOffersAttributes {
  isLoading: boolean
}

const empty: ApartmentsBestOffersAttributes = {
  room_types: [],
  apartments: [],
}

export function useApartmentsBestOffers(
  rooms: string | undefined,
): UseApartmentsBestOffersResult {
  const [state, setState] = useState<ApartmentsBestOffersAttributes>(empty)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(buildUrl(rooms), {
          signal: controller.signal,
          headers: { accept: "application/json" },
        })
        if (!response.ok) {
          throw new Error(`Best offers ${response.status}`)
        }
        const json: unknown = await response.json()
        const parsed = parseApartmentsBestOffersJson(json)
        if (!controller.signal.aborted) {
          setState(
            parsed ?? {
              room_types: [],
              apartments: [],
            },
          )
        }
      } catch (e) {
        if (controller.signal.aborted) return
        console.error("Failed to load best offers", e)
        setState(empty)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [rooms])

  return {
    ...state,
    isLoading,
  }
}
