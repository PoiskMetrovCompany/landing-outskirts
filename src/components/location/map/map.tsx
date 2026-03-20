"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./map.module.scss"

const MARKER_COORDINATES = {
  latitude: 55.014516,
  longitude: 82.891464,
}

const MAP_ZOOM = 16

const YANDEX_MAP_SCRIPT_ID = "yandex-maps-v3-script"
const YANDEX_MAP_API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY

type MapLocation = {
  center: [number, number]
  zoom: number
}

type YandexMapInstance = {
  destroy: () => void
}

declare global {
  interface Window {
    ymaps3?: {
      ready: Promise<void>
      YMap: new (
        container: HTMLElement,
        props: {
          location: MapLocation
          mode?: "auto" | "raster" | "vector"
        },
        children?: unknown[],
      ) => YandexMapInstance
      YMapDefaultSchemeLayer: new (props?: Record<string, unknown>) => unknown
      YMapDefaultFeaturesLayer: new (props?: Record<string, unknown>) => unknown
      YMapMarker: new (
        props: {
          coordinates: [number, number]
        },
        element?: HTMLElement,
      ) => unknown
    }
  }
}

const loadYandexScript = async () => {
  if (window.ymaps3) {
    await window.ymaps3.ready
    return window.ymaps3
  }

  const existing = document.getElementById(
    YANDEX_MAP_SCRIPT_ID,
  ) as HTMLScriptElement | null

  if (existing) {
    return new Promise<NonNullable<Window["ymaps3"]>>((resolve, reject) => {
      const resolveMapApi = async () => {
        if (!window.ymaps3) {
          reject(new Error("Yandex Maps API is unavailable"))
          return
        }

        await window.ymaps3.ready
        resolve(window.ymaps3)
      }

      existing.addEventListener(
        "load",
        () => {
          void resolveMapApi()
        },
        { once: true },
      )

      if (window.ymaps3) {
        void resolveMapApi()
      }
    })
  }

  return new Promise<NonNullable<Window["ymaps3"]>>((resolve, reject) => {
    const script = document.createElement("script")
    const params = new URLSearchParams({
      lang: "ru_RU",
    })

    if (YANDEX_MAP_API_KEY) {
      params.set("apikey", YANDEX_MAP_API_KEY)
    }

    script.id = YANDEX_MAP_SCRIPT_ID
    script.src = `https://api-maps.yandex.ru/v3/?${params.toString()}`
    script.async = true
    script.onload = async () => {
      if (!window.ymaps3) {
        reject(new Error("Yandex Maps API is unavailable"))
        return
      }

      await window.ymaps3.ready
      resolve(window.ymaps3)
    }
    script.onerror = () => reject(new Error("Yandex Maps script load failed"))
    document.head.appendChild(script)
  })
}

export const Map = () => {
  const mapRootRef = useRef<HTMLDivElement | null>(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    let mapInstance: YandexMapInstance | null = null
    let isMounted = true

    const initMap = async () => {
      let ymaps3
      try {
        ymaps3 = await loadYandexScript()
      } catch {
        if (isMounted) setMapError(true)
        return
      }

      if (!isMounted || !mapRootRef.current) {
        return
      }

      const markerElement = document.createElement("div")
      markerElement.className = styles.map__marker

      const markerImage = document.createElement("img")
      markerImage.className = styles.map__markerImage
      markerImage.src = "/images/main-page/map-view.webp"
      markerImage.alt = "Метка жилого комплекса"
      markerImage.draggable = false

      markerElement.appendChild(markerImage)

      mapInstance = new ymaps3.YMap(
        mapRootRef.current,
        {
          location: {
            center: [MARKER_COORDINATES.longitude, MARKER_COORDINATES.latitude],
            zoom: MAP_ZOOM,
          },
          mode: "vector",
        },
        [
          new ymaps3.YMapDefaultSchemeLayer({}),
          new ymaps3.YMapDefaultFeaturesLayer({}),
          new ymaps3.YMapMarker(
            {
              coordinates: [
                MARKER_COORDINATES.longitude,
                MARKER_COORDINATES.latitude,
              ],
            },
            markerElement,
          ),
        ],
      )
    }

    void initMap()

    return () => {
      isMounted = false
      mapInstance?.destroy()
    }
  }, [])

  if (mapError) {
    console.log(
      "Yandex Maps API:",
      process.env.NEXT_PUBLIC_YANDEX_MAP_KEY || "API key no provided",
    )
    console.log("Failed to load Yandex Maps API: ", mapError)
    return (
      <div className={styles.map}>
        <div
          className={styles.map__placeholder}
          aria-label="Карта временно недоступна"
        />
      </div>
    )
  }

  return (
    <div className={styles.map}>
      <div
        ref={mapRootRef}
        className={styles.map__canvas}
        aria-label="Карта с адресом жилого комплекса"
      />
    </div>
  )
}
