"use client"

import { useSearchParams } from "next/navigation"
import { OrderForm } from "@/components/order-form"

export function OrderFormWrapper() {
  const searchParams = useSearchParams()
  const service = searchParams.get("service") || undefined
  const charId = searchParams.get("char") || undefined

  return <OrderForm initialService={service} initialCharacterId={charId} />
}
