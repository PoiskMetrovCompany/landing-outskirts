"use client"

import { useState, useEffect } from "react"
import HotOfferDialog from "@/components/HotOfferDialog"

export default function AutoHotOfferDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  return <HotOfferDialog isOpen={isOpen} onOpenChange={setIsOpen} />
}
