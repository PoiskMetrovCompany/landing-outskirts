"use client"

import { useEffect, useState } from "react"

import type { HouseOption } from "@/components/CataloguePage/CatalogueFilterBar"

interface Building {
  id: number
  externalId: number
  name: string
  builtYear: number | null
  readyQuarter: number | null
}

interface BuildingsResponse {
  data?: Building[]
}

interface UseBuildingsResult {
  houseOptions: HouseOption[]
  isLoading: boolean
}

const BUILDINGS_ENDPOINT = "/api/buildings"

const formatHouseLabel = (name: string) => name.replace(/\s-\s/g, " – ")

const formatHouseSubtitle = (
  readyQuarter: number | null,
  builtYear: number | null,
) => {
  if (!readyQuarter || !builtYear) {
    return undefined
  }

  return `${readyQuarter} квартал ${builtYear} года`
}

export const useBuildings = (): UseBuildingsResult => {
  const [houseOptions, setHouseOptions] = useState<HouseOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadBuildings = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(BUILDINGS_ENDPOINT, {
          signal: controller.signal,
          headers: { accept: "*/*" },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch buildings: ${response.status}`)
        }

        const result: BuildingsResponse = await response.json()
        const nextHouseOptions = (result.data ?? []).map((building) => ({
          value: String(building.externalId),
          label: formatHouseLabel(building.name),
          subtitle: formatHouseSubtitle(building.readyQuarter, building.builtYear),
        }))

        setHouseOptions(nextHouseOptions)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        console.error("Failed to load buildings", error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadBuildings()

    return () => {
      controller.abort()
    }
  }, [])

  return { houseOptions, isLoading }
}
