import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GoldPriceTableProps {
  highlightServer?: string
}

const servers = [
  { slug: "spineshatter-horde", server: "Spineshatter", faction: "Horde" as const, type: "PvP", price: 43.99, delivery: "5-10 min", stock: "High" as const },
  { slug: "spineshatter-alliance", server: "Spineshatter", faction: "Alliance" as const, type: "PvP", price: 45.99, delivery: "5-10 min", stock: "High" as const },
  { slug: "thunderstrike-horde", server: "Thunderstrike", faction: "Horde" as const, type: "PvE", price: 41.99, delivery: "5-15 min", stock: "High" as const },
  { slug: "thunderstrike-alliance", server: "Thunderstrike", faction: "Alliance" as const, type: "PvE", price: 44.99, delivery: "5-15 min", stock: "Medium" as const },
  { slug: "nightslayer-horde", server: "Nightslayer", faction: "Horde" as const, type: "PvP", price: 42.99, delivery: "10-15 min", stock: "Medium" as const },
  { slug: "nightslayer-alliance", server: "Nightslayer", faction: "Alliance" as const, type: "PvP", price: 44.99, delivery: "10-15 min", stock: "Medium" as const },
  { slug: "dreamscythe-horde", server: "Dreamscythe", faction: "Horde" as const, type: "PvE", price: 46.99, delivery: "15-30 min", stock: "Low" as const },
  { slug: "dreamscythe-alliance", server: "Dreamscythe", faction: "Alliance" as const, type: "PvE", price: 48.99, delivery: "15-30 min", stock: "Low" as const },
]

const stockColors = {
  High: "text-fel-green-glow",
  Medium: "text-gold",
  Low: "text-fel-orange-glow",
}

export function GoldPriceTable({ highlightServer }: GoldPriceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gold/15 parchment-card">
      <table className="w-full min-w-[640px] text-left">
        <caption className="sr-only">
          TBC Classic Anniversary Edition gold prices per 1,000 gold across all Phase 1 servers and factions, updated February 2026
        </caption>
        <thead>
          <tr className="border-b border-gold/15 bg-gold/5">
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Server</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Faction</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Type</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Price / 1,000g</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Delivery</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Stock</th>
            <th scope="col" className="px-4 py-3.5 text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase"><span className="sr-only">Action</span></th>
          </tr>
        </thead>
        <tbody>
          {servers.map((row, i) => {
            const isHighlighted = highlightServer === row.slug
            return (
              <tr
                key={row.slug}
                className={cn(
                  "border-b border-stone/50 transition-colors",
                  isHighlighted && "bg-gold/5",
                  !isHighlighted && i % 2 === 0 && "bg-stone-dark/20"
                )}
              >
                <td className="px-4 py-3">
                  <span className={cn("text-sm font-bold", isHighlighted ? "text-gold" : "text-parchment")}>
                    {row.server}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider",
                    row.faction === "Horde"
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  )}>
                    <img
                      src={row.faction === "Horde" ? "/images/horde-crest.png" : "/images/alliance-crest.png"}
                      alt={row.faction === "Horde" ? "Horde crest icon" : "Alliance lion crest icon"}
                      width={12}
                      height={12}
                      className="h-3 w-3"
                      loading="lazy"
                    />
                    {row.faction}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-parchment/50">{row.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-black text-gold gold-shimmer">${row.price.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-parchment/60">{row.delivery}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-bold", stockColors[row.stock])}>
                    {row.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/gold/${row.slug}`}
                    className="inline-flex items-center gap-1 rounded-md border border-gold/20 bg-gold/5 px-3 py-1.5 text-[11px] font-bold tracking-wider text-gold uppercase transition-all hover:border-gold/40 hover:bg-gold/10"
                  >
                    Buy
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
