import type { Metadata } from "next"
import { Oswald, Onest } from "next/font/google"
import Script from "next/script"
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
  metadataBase: new URL("https://xn-----7kcfeupdbmbhf5ajbfb5bqe2h.xn--p1ai"),
  title:
    "Купить квартиру в ЖК Околица Новосибирск - от 3,9 млн ₽ | Ипотека от 4,1%",
  description:
    "ЖК Околица - жилой комплекс в Калининском районе Новосибирска у березовой рощи. Продажа квартир с ремонтом под ключ от застройщика КПД-Газстрой: студии, двух- и трехкомнатные. Цены от 3 900 000 ₽. Семейная ипотека от 6%, субсидированная от 4,1%, рассрочка. Дворы без машин, школа рядом. Официальный партнер застройщика - запишитесь на просмотр.",
  verification: {
    yandex: "39f02a14a101e707",
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.ico",
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108259065', 'ym');

            ym(108259065, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108259065"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
