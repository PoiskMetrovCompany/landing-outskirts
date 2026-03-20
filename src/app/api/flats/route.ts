import { NextRequest, NextResponse } from "next/server"

const FLATS_ENDPOINT = "/api/flats"

const ALLOWED_PARAMS = [
  "page",
  "limit",
  "buildingIds",
  "rooms",
  "priceFrom",
  "priceTo",
  "areaFrom",
  "areaTo",
  "floorFrom",
  "floorTo",
] as const

export async function GET(request: NextRequest) {
  try {
    const origin = process.env.CLEAR_COAST_API?.trim()
    if (!origin) {
      return NextResponse.json(
        { message: "CLEAR_COAST_API is not configured" },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)

    const query = new URLSearchParams()
    for (const key of ALLOWED_PARAMS) {
      const value = searchParams.get(key)
      if (value !== null && value !== "") {
        query.set(key, value)
      }
    }

    const url = `${origin.replace(/\/$/, "")}${FLATS_ENDPOINT}?${query.toString()}`
    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "*/*" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch flats from upstream API",
          status: response.status,
        },
        { status: response.status },
      )
    }

    const data: unknown = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Flats proxy error:", error)
    return NextResponse.json(
      { message: "Failed to reach flats upstream API" },
      { status: 502 },
    )
  }
}
