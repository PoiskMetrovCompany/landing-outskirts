import type { Metadata } from "next"
import { Oswald, Onest } from "next/font/google"
import "./globals.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
})

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://poisk.metrov.site"),
  title: "Квартиры в ЖК «Ясный берег» Новосибирск — цены и планировки",
  description:
    "Продажа квартир в Ясном береге: студии, 1-, 2-, 3-комнатные с видом на Обь. Чистовая отделка, двор без машин, школа с бассейном. Ипотека, рассрочка, трейд-ин.",
  verification: {
    yandex: "e578db95ea5d131c",
  },
  icons: {
    icon: [
      { url: "/icons/Favicon.ico", sizes: "any" },
      { url: "/icons/Favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/icons/Favicon.ico",
    apple: "/icons/Favicon.ico",
  },
  openGraph: {
    title: "Квартиры в ЖК «Ясный берег» Новосибирск — цены и планировки",
    siteName: "Ясный берег",
    locale: "ru_RU",
    description:
      "Продажа квартир в Ясном береге: студии, 1-, 2-, 3-комнатные с видом на Обь. Чистовая отделка, двор без машин, школа с бассейном. Ипотека, рассрочка, трейд-ин.",
    type: "website",
    images: [
      {
        url: "/image.jpg",
        width: 1200,
        height: 630,
        alt: "Ясный берег",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Квартиры в ЖК «Ясный берег» Новосибирск — цены и планировки",
    description:
      "Продажа квартир в Ясном береге: студии, 1-, 2-, 3-комнатные с видом на Обь. Чистовая отделка, двор без машин, школа с бассейном. Ипотека, рассрочка, трейд-ин.",
    images: ["/image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${oswald.variable} ${onest.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
