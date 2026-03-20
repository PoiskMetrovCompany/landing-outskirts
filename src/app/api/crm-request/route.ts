import { NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")
const CRM_LEAD_PATH = "crm/yasny-bereg-lead-novosibirsk"
const CRM_LEAD_API_URL = API_BASE ? `${API_BASE}/${CRM_LEAD_PATH}` : undefined
const CRM_SOURCE = process.env.CRM_SOURCE ?? ""

interface CrmRequestPayload {
  phone?: string
  title?: string
}

function getCsrfTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(/XSRF-TOKEN=([^;]+)/)
  if (!match) return null
  try {
    const encoded = match[1].replace(/-/g, "+").replace(/_/g, "/")
    return decodeURIComponent(Buffer.from(encoded, "base64").toString("utf-8"))
  } catch {
    return null
  }
}

function getSetCookies(headers: Headers): string[] {
  const h = headers as Headers & { getSetCookie?(): string[] }
  if (typeof h.getSetCookie === "function") {
    return h.getSetCookie()
  }
  const single = headers.get("set-cookie")
  return single ? [single] : []
}

export async function POST(request: Request) {
  try {
    if (!CRM_LEAD_API_URL) {
      return NextResponse.json(
        {
          message:
            "CRM endpoint is not configured. Set NEXT_PUBLIC_API_URL in environment variables.",
        },
        { status: 500 },
      )
    }

    const body = (await request.json()) as CrmRequestPayload
    const { phone, title } = body

    if (!phone || !title) {
      return NextResponse.json(
        { message: "Missing required fields: phone, title" },
        { status: 400 },
      )
    }

    const headers: Record<string, string> = {
      accept: "application/json",
      "Content-Type": "application/vnd.api+json",
    }

    const apiOrigin = API_BASE ? new URL(API_BASE).origin : ""
    const csrfCookieUrl = apiOrigin ? `${apiOrigin}/sanctum/csrf-cookie` : ""

    if (csrfCookieUrl) {
      const csrfResponse = await fetch(csrfCookieUrl, {
        method: "GET",
        cache: "no-store",
      })
      const setCookies = getSetCookies(csrfResponse.headers)
      const cookieHeader = setCookies.join("; ")
      const csrfToken = getCsrfTokenFromCookie(cookieHeader)
      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }
      if (cookieHeader) {
        const cookieParts = setCookies.map((h) => h.split(";")[0]?.trim()).filter(Boolean)
        if (cookieParts.length > 0) {
          headers["Cookie"] = cookieParts.join("; ")
        }
      }
    }

    const response = await fetch(CRM_LEAD_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        phone,
        title,
        source: CRM_SOURCE,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      const responseText = await response.text()
      return NextResponse.json(
        {
          message: "CRM request failed",
          status: response.status,
          details: responseText,
        },
        { status: response.status },
      )
    }

    let data: unknown = null

    try {
      data = JSON.parse(await response.text())
    } catch {
      data = null
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error("CRM proxy error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
