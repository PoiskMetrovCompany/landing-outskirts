import { NextResponse } from "next/server"

const BUILDINGS_ENDPOINT = "/buildings"

export async function GET() {
  try {
    const origin = process.env.NEXT_PUBLIC_API_URL?.trim()
    if (!origin) {
      return NextResponse.json(
        { message: "NEXT_PUBLIC_API_URL is not configured" },
        { status: 500 },
      )
    }

    const url = `${origin.replace(/\/$/, "")}${BUILDINGS_ENDPOINT}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch buildings from upstream API",
          status: response.status,
        },
        { status: response.status },
      )
    }

    const data: unknown = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Buildings proxy error:", error)
    return NextResponse.json(
      { message: "Failed to reach buildings upstream API" },
      { status: 502 },
    )
  }
}
