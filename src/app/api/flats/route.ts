import { NextRequest, NextResponse } from "next/server"

const FLATS_ENDPOINT = "/apartments/from-developer"
const RESIDENTIAL_COMPLEX_KEY = "6214c40646b6ccc0cfc39dc7"

const ALLOWED_PARAMS = [
  "page",
  "per_page",
  "rooms",
  "price_from",
  "price_to",
  "area_from",
  "area_to",
  "floor_from",
  "floor_to",
] as const

export async function GET(request: NextRequest) {
  try {
    const origin = process.env.NEXT_PUBLIC_API_URL?.trim()
    if (!origin) {
      return NextResponse.json(
        { message: "NEXT_PUBLIC_API_URL is not configured" },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)

    const query = new URLSearchParams()
    query.set("residential_complex_key", RESIDENTIAL_COMPLEX_KEY)

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
