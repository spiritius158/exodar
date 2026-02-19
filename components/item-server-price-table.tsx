import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ItemServerPriceTableProps {
  itemName: string
  prices: {
    spineshatter: number
    thunderstrike: number
    nightslayer: number
    dreamscythe: number
  }
  orderSlug: string
}

const servers = [
  { key: "spineshatter" as const, name: "Spineshatter", type: "PvP", population: "High" },
  { key: "thunderstrike" as const, name: "Thunderstrike", type: "PvE", population: "Medium" },
  { key: "nightslayer" as const, name: "Nightslayer", type: "PvP", population: "Medium" },
  { key: "dreamscythe" as const, name: "Dreamscythe", type: "PvE", population: "Low" },
]

const popColors = {
  High: "text-fel-green-glow",
  Medium: "text-gold",
  Low: "text-fel-orange-glow",
}

export function ItemServerPriceTable({ itemName, prices, orderSlug }: ItemServerPriceTableProps) {
  const lowestPrice = Math.min(...Object.values(prices))

  return (
    <div className="overflow-x-auto rounded-xl border border-gold/15 parchment-card">
      <table className="w-full min-w-[540px] text-left">
        <caption className="sr-only">
          {itemName} service prices across all TBC Classic Anniversary Phase 1 servers, updated February 2026
        </caption>
        <thead>
          <tr className="border-b border-gold/15 bg-gold/5">
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Server</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Type</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Population</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Price</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase"><span className="sr-only">Action</span></th>
          </tr>
        </thead>
        <tbody>
          {servers.map((srv, i) => {
            const price = prices[srv.key]
            const isCheapest = price === lowestPrice

            return (
              <tr
                key={srv.key}
                className={cn(
                  "border-b border-stone/50 transition-colors",
                  isCheapest && "bg-gold/5",
                  !isCheapest && i % 2 === 0 && "bg-stone-dark/20"
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-bold", isCheapest ? "text-gold" : "text-parchment")}>
                      {srv.name}
                    </span>
                    {isCheapest && (
                      <span className="rounded-full border border-fel-green/30 bg-fel-green/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-fel-green-glow uppercase">
                        Best Price
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-parchment/50">{srv.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-bold", popColors[srv.population])}>
                    {srv.population}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-black text-gold gold-shimmer">${price.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/order?service=item&item=${orderSlug}&server=${srv.key}`}
                    className="inline-flex items-center gap-1 rounded-md border border-gold/20 bg-gold/5 px-3 py-1.5 text-[11px] font-bold tracking-wider text-gold uppercase transition-all hover:border-gold/40 hover:bg-gold/10"
                  >
                    Order
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
