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
  title:
    "Купить квартиру в ЖК Околица Новосибирск - от 3,9 млн ₽ | Ипотека от 4,1%",
  description:
    "ЖК Околица - жилой комплекс в Калининском районе Новосибирска у березовой рощи. Продажа квартир с ремонтом под ключ от застройщика КПД-Газстрой: студии, двух- и трехкомнатные. Цены от 3 900 000 ₽. Семейная ипотека от 6%, субсидированная от 4,1%, рассрочка. Дворы без машин, школа рядом. Официальный партнер застройщика - запишитесь на просмотр.",
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
    title:
      "Купить квартиру в ЖК Околица Новосибирск - от 3,9 млн ₽ | Ипотека от 4,1%",
    siteName: "ЖК Околица",
    locale: "ru_RU",
    description:
      "ЖК Околица - жилой комплекс в Калининском районе Новосибирска у березовой рощи. Продажа квартир с ремонтом под ключ от застройщика КПД-Газстрой: студии, двух- и трехкомнатные. Цены от 3 900 000 ₽. Семейная ипотека от 6%, субсидированная от 4,1%, рассрочка. Дворы без машин, школа рядом. Официальный партнер застройщика - запишитесь на просмотр.",
    type: "website",
    images: [
      {
        url: "/image.jpg",
        width: 1200,
        height: 630,
        alt: "ЖК Околица",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Купить квартиру в ЖК Околица Новосибирск - от 3,9 млн ₽ | Ипотека от 4,1%",
    description:
      "ЖК Околица - жилой комплекс в Калининском районе Новосибирска у березовой рощи. Продажа квартир с ремонтом под ключ от застройщика КПД-Газстрой: студии, двух- и трехкомнатные. Цены от 3 900 000 ₽. Семейная ипотека от 6%, субсидированная от 4,1%, рассрочка. Дворы без машин, школа рядом. Официальный партнер застройщика - запишитесь на просмотр.",
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
