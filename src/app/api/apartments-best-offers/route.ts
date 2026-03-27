import { NextRequest, NextResponse } from "next/server"

import { RESIDENTIAL_COMPLEX_KEY } from "@/lib/residentialComplex"

const BEST_OFFERS_ENDPOINT = "/apartments-best-offers/from-developer"

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

    const rooms = searchParams.get("rooms")
    if (rooms !== null && rooms !== "") {
      query.set("rooms", rooms)
    }

    const url = `${origin.replace(/\/$/, "")}${BEST_OFFERS_ENDPOINT}?${query.toString()}`
    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch best offers from upstream API",
          status: response.status,
        },
        { status: response.status },
      )
    }

    const data: unknown = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Best offers proxy error:", error)
    return NextResponse.json(
      { message: "Failed to reach best offers upstream API" },
      { status: 502 },
    )
  }
}
