"use client"

import { useState, useTransition } from "react"
import { Coins, Sword, ScrollText, ArrowRight, ArrowLeft, Shield, Check, Loader2, ShieldCheck, Zap, Headphones, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { sendOrder, type OrderData } from "@/app/actions/send-order"
import { characters as marketplaceCharacters, getCharacterExtras, type TbcCharacter } from "@/components/character-marketplace"

const services = [
  {
    id: "gold" as const,
    title: "Gold Selling",
    subtitle: "Outland Riches",
    icon: Coins,
    color: "gold",
    description: "TBC Classic Anniversary gold delivered fast to any server.",
  },
  {
    id: "boosting" as const,
    title: "Character Boosting",
    subtitle: "Outland Power",
    icon: Sword,
    color: "blue",
    description: "TBC Classic boosts from veteran raiders and gladiators.",
  },
  {
    id: "accounts" as const,
    title: "Accounts",
    subtitle: "Battle-Ready Characters",
    icon: ScrollText,
    color: "purple",
    description: "Level 70 TBC Classic characters with endgame gear.",
  },
  {
    id: "item" as const,
    title: "Items & Services",
    subtitle: "Farming & Crafting",
    icon: Package,
    color: "green",
    description: "Primal Nethers, consumables, mounts, crafted gear, and more.",
  },
]

const itemCatalog: Record<string, { name: string; pricePerUnit: number; deliveryTime: string; category: string }> = {
  "primal-nether-boost": { name: "Primal Nether (Heroic Carry)", pricePerUnit: 12.99, deliveryTime: "30-60 min", category: "Material" },
  "primal-fire-farming": { name: "Primal Fire", pricePerUnit: 4.99, deliveryTime: "15-60 min", category: "Material" },
  "primal-might-transmute": { name: "Primal Might", pricePerUnit: 14.99, deliveryTime: "1-24 hrs", category: "Material" },
  "talbuk-mount-farm": { name: "War Talbuk Mount (Rep Grind)", pricePerUnit: 64.99, deliveryTime: "3-5 days", category: "Mount" },
  "cenarion-hippogryph-boost": { name: "Cenarion Hippogryph Mount", pricePerUnit: 89.99, deliveryTime: "5-7 days", category: "Mount" },
  "eye-of-quagmirran-run": { name: "Eye of Quagmirran (Trinket Run)", pricePerUnit: 9.99, deliveryTime: "1-3 hrs", category: "Trinket" },
  "badge-of-justice-farm": { name: "Badge of Justice Farm", pricePerUnit: 1.49, deliveryTime: "2-6 hrs", category: "Currency" },
  "drums-of-battle-kit": { name: "Drums of Battle Kit (20x)", pricePerUnit: 34.99, deliveryTime: "1-2 hrs", category: "Consumable" },
  "darkmoon-card-vengeance": { name: "Darkmoon Card: Vengeance", pricePerUnit: 149.99, deliveryTime: "2-5 days", category: "Trinket" },
  "raid-consumables-bulk": { name: "Raid Consumables Bulk Pack", pricePerUnit: 24.99, deliveryTime: "1-3 hrs", category: "Consumable" },
  "spellstrike-whitemend-craft": { name: "Spellstrike / Whitemend Craft", pricePerUnit: 79.99, deliveryTime: "1-2 days", category: "Craft" },
}

const servers = [
  "Spineshatter (PvP)", "Nightslayer (PvP)", "Dreamscythe (PvE)", "Thunderstrike (PvE)",
]

const boostTypes = [
  { value: "leveling-1-70", label: "Full Powerleveling 1-70 ($181.99)" },
  { value: "leveling-60-70", label: "Outland Leveling 60-70 ($105.99)" },
  { value: "arena-rating", label: "Arena Rating Boost ($16.99-$325.99)" },
  { value: "profession", label: "Profession Boost 0-375 ($40-$70)" },
  { value: "pre-raid-gear", label: "Pre-Raid Gear Package (+$110)" },
  { value: "pvp-honor-set", label: "PvP Honor Set (+$110)" },
]

const arenaBrackets = ["2v2", "3v3", "5v5"]

const boostAddons = [
  { value: "pre-raid-gear", label: "Pre-Raid Gear Package", price: 110 },
  { value: "pvp-honor-set", label: "PvP Honor Set", price: 110 },
  { value: "quests-leveling", label: "Quests Leveling", price: 20.93 },
  { value: "heroic-attunements", label: "All Heroic Dungeons Attunements", price: 131.27 },
  { value: "karazhan-attunement", label: "Karazhan Attunement", price: 37.78 },
  { value: "flying-60", label: "60% Flying Skill Unlock", price: 61.89 },
  { value: "flying-280", label: "280% Flying Skill Unlock", price: 232.59 },
]

const professionBoosts = [
  { value: "alchemy", label: "Alchemy 0-375", price: 42.99 },
  { value: "blacksmithing", label: "Blacksmithing 0-375", price: 42.99 },
  { value: "enchanting", label: "Enchanting 0-375", price: 42.99 },
  { value: "engineering", label: "Engineering 0-375", price: 42.99 },
  { value: "herbalism", label: "Herbalism 0-375", price: 42.99 },
  { value: "jewelcrafting", label: "Jewelcrafting 0-375", price: 42.99 },
  { value: "leatherworking", label: "Leatherworking 0-375", price: 42.99 },
  { value: "mining", label: "Mining 0-375", price: 42.99 },
  { value: "skinning", label: "Skinning 0-375", price: 42.99 },
  { value: "tailoring", label: "Tailoring 0-375", price: 42.99 },
  { value: "cooking", label: "Cooking 0-375", price: 42.99 },
  { value: "first-aid", label: "First Aid 0-375", price: 42.99 },
  { value: "fishing", label: "Fishing 0-375", price: 42.99 },
]

const accountTypes = [
  { value: "pre-raid", label: "Pre-Raid Geared Character" },
  { value: "t4-geared", label: "T4 Geared Character (Karazhan/Gruul)" },
  { value: "pvp-geared", label: "PvP Arena Geared Character" },
]

const classes = [
  "Any", "Warrior", "Paladin", "Hunter", "Rogue", "Priest",
  "Shaman", "Mage", "Warlock", "Druid",
]

const paymentMethods = [
  { value: "paypal", label: "PayPal" },
  { value: "credit-card", label: "Credit / Debit Card" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "bank-transfer", label: "Bank Transfer" },
]

function calculatePrice(data: Partial<OrderData>): number {
  if (data.service === "gold") {
    const amount = data.goldAmount || 500
    return Math.max(21.99, (amount / 10) * 0.4626)
  }
  if (data.service === "boosting") {
    if (data.boostType === "arena-rating") {
      const rating = data.arenaRating || 1500
      let total = 16.99 + ((rating - 1500) / (2200 - 1500)) * (325.99 - 16.99)
      if (data.boostAddons && Array.isArray(data.boostAddons)) {
        for (const addon of data.boostAddons) {
          const found = boostAddons.find((a) => a.value === addon)
          if (found) total += found.price
        }
      }
      if (data.boostProfessions && Array.isArray(data.boostProfessions)) {
        total += data.boostProfessions.length * 42.99
      }
      return total
    }
    const basePrices: Record<string, number> = {
      "leveling-1-70": 181.99,
      "leveling-60-70": 105.99,
      "profession": 0,
      "pre-raid-gear": 110,
      "pvp-honor-set": 110,
    }
    let total = basePrices[data.boostType || "leveling-60-70"] || 105.99
    if (data.boostAddons && Array.isArray(data.boostAddons)) {
      for (const addon of data.boostAddons) {
        const found = boostAddons.find((a) => a.value === addon)
        if (found) total += found.price
      }
    }
    if (data.boostProfessions && Array.isArray(data.boostProfessions)) {
      total += data.boostProfessions.length * 42.99
    }
    return total
  }
  if (data.service === "item") {
    const item = data.itemSlug ? itemCatalog[data.itemSlug] : null
    if (item) return item.pricePerUnit * (data.itemQuantity || 1)
    return 0
  }
  if (data.service === "accounts") {
    if (data.characterId) {
      const char = marketplaceCharacters.find((c) => c.id === Number(data.characterId))
      if (char) return char.price
    }
    const prices: Record<string, number> = {
      "pre-raid": 189.99,
      "t4-geared": 279.99,
      "pvp-geared": 319.99,
    }
    return prices[data.accountType || "pre-raid"] || 189.99
  }
  return 0
}

const steps = ["Service", "Details", "Contact", "Review"]

export function OrderForm({ initialService, initialCharacterId, initialItemSlug, initialServer }: { initialService?: string; initialCharacterId?: string; initialItemSlug?: string; initialServer?: string }) {
const [step, setStep] = useState(initialService ? 1 : 0)
  const [isPending, startTransition] = useTransition()

  const initialChar = initialCharacterId
    ? marketplaceCharacters.find((c) => c.id === Number(initialCharacterId))
    : null

  const initialItem = initialItemSlug ? itemCatalog[initialItemSlug] : null
  
const [formData, setFormData] = useState<Partial<OrderData>>({
  service: (initialService as OrderData["service"]) || undefined,
  goldAmount: 500,
  goldFaction: "Horde",
  ...(initialChar ? {
    characterId: initialCharacterId,
    accountType: initialChar.tier === "T4" ? "t4-geared" : initialChar.tier === "PvP" ? "pvp-geared" : "pre-raid",
    accountClass: initialChar.className,
    accountExpansion: initialChar.server,
  } : {}),
  ...(initialItemSlug && initialItem ? {
    itemSlug: initialItemSlug,
    itemName: initialItem.name,
    itemQuantity: 1,
    ...(initialServer ? { itemServer: initialServer } : {}),
  } : {}),
  })

  const update = (fields: Partial<OrderData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const price = calculatePrice(formData)

  const canProceed = () => {
    if (step === 0) return !!formData.service
    if (step === 1) {
      if (formData.service === "gold") return !!formData.goldServer && !!formData.goldCharacter
      if (formData.service === "boosting") {
        if (formData.boostType === "arena-rating") return !!formData.arenaBracket && !!formData.arenaRating
        return !!formData.boostType
      }
      if (formData.service === "accounts") return !!formData.characterId || !!formData.accountType
      if (formData.service === "item") return !!formData.itemSlug && !!formData.itemServer && !!formData.itemFaction
    }
    if (step === 2) return !!formData.email && !!formData.discord && !!formData.paymentMethod
    return true
  }

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const orderData: OrderData = {
          ...formData,
          service: formData.service!,
          email: formData.email || "",
          discord: formData.discord || "",
          paymentMethod: formData.paymentMethod || "",
          totalPrice: price,
        }

        const result = await sendOrder(orderData)

        if (result.success) {
          toast.success(result.message, {
            description: "Check your email for confirmation.",
            duration: 6000,
          })
          setStep(4) // success state
        } else {
          toast.error(result.message, { duration: 5000 })
        }
      } catch {
        toast.error("Failed to submit order. Please contact us on Discord (exodarmarket111).", { duration: 5000 })
      }
    })
  }

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10">
          <Check className="h-10 w-10 text-gold" />
        </div>
        <h2 className="mb-3 text-2xl font-black text-parchment sm:text-3xl">Order Submitted!</h2>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-parchment/50">
          Your order has been received and sent to our team. We will contact you via Discord
          or email within 15 minutes to process your order.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => { setStep(0); setFormData({ goldAmount: 500, goldFaction: "Horde" }) }}
            className="rounded-lg border border-gold/30 bg-stone-dark px-6 py-3 text-xs font-bold tracking-widest text-gold uppercase transition-all hover:border-gold/60 hover:bg-gold/10"
          >
            Place Another Order
          </button>
          <a
            href="/"
            className="rounded-lg bg-gold px-6 py-3 text-xs font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress steps */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => idx < step && setStep(idx)}
              disabled={idx > step}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                idx < step
                  ? "bg-gold text-deep-black cursor-pointer"
                  : idx === step
                    ? "border-2 border-gold text-gold"
                    : "border border-stone text-parchment/30"
              )}
            >
              {idx < step ? <Check className="h-4 w-4" /> : idx + 1}
            </button>
            <span className={cn(
              "hidden text-[10px] font-bold tracking-widest uppercase sm:inline",
              idx <= step ? "text-gold" : "text-parchment/30"
            )}>
              {label}
            </span>
            {idx < steps.length - 1 && (
              <div className={cn(
                "h-px w-6 sm:w-10",
                idx < step ? "bg-gold" : "bg-stone"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mx-auto max-w-2xl">
        {/* Step 0: Service Selection */}
        {step === 0 && (
          <div>
            <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">Select Your Service</h2>
            <p className="mb-8 text-center text-sm text-parchment/50">Choose the service you want to order.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => {
                const Icon = s.icon
                const selected = formData.service === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => update({ service: s.id })}
                    className={cn(
                      "group flex flex-col items-center rounded-xl border p-6 text-center transition-all duration-300",
                      selected
                        ? s.color === "gold"
                          ? "border-gold/60 bg-gold/10 shadow-[0_0_30px_rgba(201,168,76,0.2)]"
                          : s.color === "blue"
                            ? "border-fel-green/60 bg-fel-green/10 shadow-[0_0_30px_rgba(57,211,83,0.15)]"
                            : s.color === "green"
                              ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                              : "border-fel-orange/60 bg-fel-orange/10 shadow-[0_0_30px_rgba(224,93,32,0.15)]"
                        : "border-stone bg-stone-dark/50 hover:border-gold/30"
                    )}
                  >
                    <div className={cn(
                      "mb-4 flex h-14 w-14 items-center justify-center rounded-lg border",
                      selected
                        ? s.color === "gold" ? "border-gold/40 bg-gold/20" : s.color === "blue" ? "border-fel-green/40 bg-fel-green/20" : s.color === "green" ? "border-emerald-500/40 bg-emerald-500/20" : "border-fel-orange/40 bg-fel-orange/20"
                        : "border-stone bg-stone-dark"
                    )}>
                      <Icon className={cn(
                        "h-7 w-7",
                        s.color === "gold" ? "text-gold" : s.color === "blue" ? "text-fel-green-glow" : s.color === "green" ? "text-emerald-400" : "text-fel-orange-glow"
                      )} />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-parchment">{s.title}</h3>
                    <p className="text-[11px] text-parchment/40">{s.description}</p>
                    {selected && (
                      <div className={cn(
                        "mt-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
                        s.color === "gold" ? "bg-gold/20 text-gold" : s.color === "blue" ? "bg-fel-green/20 text-fel-green-glow" : s.color === "green" ? "bg-emerald-500/20 text-emerald-400" : "bg-fel-orange/20 text-fel-orange-glow"
                      )}>
                        Selected
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 1: Service Options */}
        {step === 1 && formData.service === "gold" && (
          <div>
            <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">TBC Classic Gold</h2>
            <p className="mb-8 text-center text-sm text-parchment/50">Configure your Burning Crusade Classic gold order.</p>
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Server / Realm</Label>
                <Select value={formData.goldServer || ""} onValueChange={(v) => update({ goldServer: v })}>
                  <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                    <SelectValue placeholder="Select your server" />
                  </SelectTrigger>
                  <SelectContent className="border-stone bg-stone-dark">
                    {servers.map((s) => (
                      <SelectItem key={s} value={s} className="text-parchment hover:bg-gold/10">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Faction</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Horde", "Alliance"].map((faction) => (
                    <button
                      key={faction}
                      onClick={() => update({ goldFaction: faction })}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-sm font-bold tracking-wider transition-all",
                        formData.goldFaction === faction
                          ? faction === "Horde" ? "border-red-500/60 bg-red-500/10 text-red-400" : "border-blue-500/60 bg-blue-500/10 text-blue-400"
                          : "border-stone bg-stone-dark text-parchment/50 hover:border-gold/30"
                      )}
                    >
                      {faction}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 text-sm font-bold tracking-wider text-parchment/80 uppercase">
                  Gold Amount: <span className="text-xl font-black text-gold gold-shimmer">{(formData.goldAmount || 500).toLocaleString()}g</span>
                </Label>
                <Slider
                  value={[formData.goldAmount || 500]}
                  onValueChange={([v]) => update({ goldAmount: v })}
                  min={500}
                  max={100000}
                  step={500}
                  className="mt-3"
                />
                <div className="mt-2 flex justify-between text-[10px] text-parchment/30">
                  <span>500g</span>
                  <span>100,000g</span>
                </div>
                <p className="mt-1 text-center text-[10px] text-parchment/30">$0.4626 per 10 gold</p>
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Character Name</Label>
                <Input
                  value={formData.goldCharacter || ""}
                  onChange={(e) => update({ goldCharacter: e.target.value })}
                  placeholder="Enter your character name"
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                />
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Your Discord</Label>
                <Input
                  value={formData.discord || ""}
                  onChange={(e) => update({ discord: e.target.value })}
                  placeholder="username#0000"
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                />
                <p className="mt-1 text-[10px] text-parchment/30">We will contact you on Discord to arrange delivery</p>
              </div>
              <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 text-center mana-glow" style={{ boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}>
                <span className="block text-xs font-semibold tracking-widest text-parchment/60 uppercase">Estimated Price</span>
                <span className="mt-1 block text-3xl font-black text-gold gold-shimmer">${price.toFixed(2)}</span>
                <span className="mt-1 block text-[10px] text-parchment/40">{(formData.goldAmount || 500).toLocaleString()} gold at $0.4626 / 10g</span>
              </div>
            </div>
          </div>
        )}

        {step === 1 && formData.service === "boosting" && (
          <div>
            <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">TBC Classic Boosting</h2>
            <p className="mb-8 text-center text-sm text-parchment/50">Choose your boost type and add optional extras for a complete package.</p>
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Boost Type *</Label>
                <Select value={formData.boostType || ""} onValueChange={(v) => update({ boostType: v })}>
                  <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                    <SelectValue placeholder="Select boost type" />
                  </SelectTrigger>
                  <SelectContent className="border-stone bg-stone-dark">
                    {boostTypes.map((b) => (
                      <SelectItem key={b.value} value={b.value} className="text-parchment hover:bg-fel-green/10">{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Character & Server - show for leveling */}
              {(formData.boostType === "leveling-1-70" || formData.boostType === "leveling-60-70") && (
                <>
                  <div>
                    <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Character Name</Label>
                    <Input
                      value={formData.boostCurrentLevel || ""}
                      onChange={(e) => update({ boostCurrentLevel: e.target.value })}
                      placeholder="Enter your character name"
                      className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Server</Label>
                    <Select value={formData.boostSchedule || ""} onValueChange={(v) => update({ boostSchedule: v })}>
                      <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                        <SelectValue placeholder="Select your server" />
                      </SelectTrigger>
                      <SelectContent className="border-stone bg-stone-dark">
                        {servers.map((s) => (
                          <SelectItem key={s} value={s} className="text-parchment">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Arena Rating Boost fields */}
              {formData.boostType === "arena-rating" && (
                <>
                  <div>
                    <Label className="mb-3 text-xs font-bold tracking-wider text-parchment/60 uppercase">Arena Bracket *</Label>
                    <div className="flex gap-2">
                      {arenaBrackets.map((bracket) => (
                        <button
                          key={bracket}
                          type="button"
                          onClick={() => update({ arenaBracket: bracket })}
                          className={cn(
                            "flex-1 rounded-lg border px-4 py-3 text-sm font-bold transition-all",
                            formData.arenaBracket === bracket
                              ? "border-fel-green/60 bg-fel-green/10 text-fel-green-glow"
                              : "border-stone bg-stone-dark/50 text-parchment/50 hover:border-fel-green/30"
                          )}
                        >
                          {bracket}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="mb-3 text-xs font-bold tracking-wider text-parchment/60 uppercase">
                      Target Rating: <span className="text-fel-green-glow">{formData.arenaRating || 1500}</span>
                    </Label>
                    <Slider
                      value={[formData.arenaRating || 1500]}
                      onValueChange={([v]) => update({ arenaRating: v })}
                      min={1500}
                      max={2200}
                      step={50}
                      className="mt-2"
                    />
                    <div className="mt-2 flex justify-between text-[10px] text-parchment/30">
                      <span>1500</span>
                      <span>1700</span>
                      <span>1850</span>
                      <span>2050</span>
                      <span>2200</span>
                    </div>
                    <div className="mt-3 rounded-lg border border-fel-green/20 bg-fel-green/5 px-4 py-2.5 text-center">
                      <span className="text-xs text-parchment/50">Rating boost price: </span>
                      <span className="text-sm font-black text-fel-green-glow">
                        ${(16.99 + (((formData.arenaRating || 1500) - 1500) / (2200 - 1500)) * (325.99 - 16.99)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Character Name</Label>
                    <Input
                      value={formData.boostCurrentLevel || ""}
                      onChange={(e) => update({ boostCurrentLevel: e.target.value })}
                      placeholder="Enter your character name"
                      className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Server</Label>
                    <Select value={formData.boostSchedule || ""} onValueChange={(v) => update({ boostSchedule: v })}>
                      <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                        <SelectValue placeholder="Select your server" />
                      </SelectTrigger>
                      <SelectContent className="border-stone bg-stone-dark">
                        {servers.map((s) => (
                          <SelectItem key={s} value={s} className="text-parchment">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Add-on Options - show for leveling and standalone */}
              {formData.boostType && formData.boostType !== "profession" && (
                <div>
                  <Label className="mb-3 text-xs font-bold tracking-wider text-parchment/60 uppercase">Add-on Options</Label>
                  <div className="flex flex-col gap-2">
                    {boostAddons.map((addon) => {
                      const selected = (formData.boostAddons || []).includes(addon.value)
                      return (
                        <button
                          key={addon.value}
                          type="button"
                          onClick={() => {
                            const current = formData.boostAddons || []
                            if (selected) {
                              update({ boostAddons: current.filter((a: string) => a !== addon.value) })
                            } else {
                              update({ boostAddons: [...current, addon.value] })
                            }
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all",
                            selected
                        ? "border-fel-green/60 bg-fel-green/10"
                        : "border-stone bg-stone-dark/50 hover:border-fel-green/30"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-5 w-5 items-center justify-center rounded border text-[10px]",
                              selected ? "border-fel-green bg-fel-green text-foreground" : "border-stone"
                            )}>
                              {selected && <Check className="h-3 w-3" />}
                            </div>
                            <span className={cn("text-xs font-semibold", selected ? "text-fel-green-glow" : "text-parchment/60")}>{addon.label}</span>
                          </div>
                          <span className={cn("text-xs font-bold", selected ? "text-fel-green-glow" : "text-parchment/30")}>+${addon.price.toFixed(2)}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Profession Boosts - available for all boost types */}
              <div>
                <Label className="mb-3 text-xs font-bold tracking-wider text-parchment/60 uppercase">
                  Profession Boosts <span className="normal-case text-parchment/30">($42.99 each)</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {professionBoosts.map((prof) => {
                    const selected = (formData.boostProfessions || []).includes(prof.value)
                    return (
                      <button
                        key={prof.value}
                        type="button"
                        onClick={() => {
                          const current = formData.boostProfessions || []
                          if (selected) {
                            update({ boostProfessions: current.filter((p: string) => p !== prof.value) })
                          } else {
                            update({ boostProfessions: [...current, prof.value] })
                          }
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all",
                          selected
                            ? "border-gold/60 bg-gold/10"
                            : "border-stone bg-stone-dark/50 hover:border-gold/30"
                        )}
                      >
                        <div className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[9px]",
                          selected ? "border-gold bg-gold text-deep-black" : "border-stone"
                        )}>
                          {selected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <span className={cn("text-[11px] font-semibold", selected ? "text-gold-light" : "text-parchment/50")}>{prof.label}</span>
                      </button>
                    )
                  })}
                </div>
                {(formData.boostProfessions || []).length > 0 && (
                  <p className="mt-2 text-[10px] text-gold/50">
                    {(formData.boostProfessions || []).length} profession{(formData.boostProfessions || []).length > 1 ? "s" : ""} selected = ${((formData.boostProfessions || []).length * 42.99).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Price total */}
                <div className="rounded-lg border border-fel-green/30 bg-fel-green/5 p-5 text-center" style={{ boxShadow: '0 0 20px rgba(57,211,83,0.1)' }}>
                <span className="block text-xs font-semibold tracking-widest text-parchment/60 uppercase">Estimated Price</span>
                  <span className="mt-1 block text-3xl font-black text-fel-green-glow">${price.toFixed(2)}</span>
                {((formData.boostAddons || []).length > 0 || (formData.boostProfessions || []).length > 0) && (
                  <span className="mt-1 block text-[10px] text-parchment/40">
                    {formData.boostType !== "profession" ? "Base" : ""}
                    {(formData.boostAddons || []).length > 0 ? ` + ${(formData.boostAddons || []).length} add-on${(formData.boostAddons || []).length > 1 ? "s" : ""}` : ""}
                    {(formData.boostProfessions || []).length > 0 ? ` + ${(formData.boostProfessions || []).length} profession${(formData.boostProfessions || []).length > 1 ? "s" : ""}` : ""}
                  </span>
                )}
                <p className="mt-1 text-[10px] text-parchment/30">Final price confirmed on Discord before payment</p>
              </div>
            </div>
          </div>
        )}

        {step === 1 && formData.service === "accounts" && (() => {
          const matchedChar = formData.characterId
            ? marketplaceCharacters.find((c) => c.id === Number(formData.characterId))
            : null
          return (
            <div>
              <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">TBC Classic Characters</h2>
              <p className="mb-8 text-center text-sm text-parchment/50">
                {matchedChar
                  ? "Your selected character from our marketplace."
                  : "Choose your character preferences or browse our marketplace first."}
              </p>
              <div className="flex flex-col gap-6">

                {/* Selected character preview - shown when coming from marketplace */}
                {matchedChar && (
                  <div className="rounded-xl border border-fel-orange/30 bg-fel-orange/5 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider text-fel-orange-glow uppercase">
                        #{matchedChar.id} - {matchedChar.race} {matchedChar.className}
                      </span>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase",
                        matchedChar.status === "available"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      )}>
                        {matchedChar.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><span className="text-parchment/40">Spec:</span> <span className="text-parchment/80">{matchedChar.spec}</span></div>
                      <div><span className="text-parchment/40">Level:</span> <span className="text-parchment/80">{matchedChar.level}</span></div>
                      <div><span className="text-parchment/40">Faction:</span> <span className={matchedChar.faction === "Horde" ? "text-red-400" : "text-blue-400"}>{matchedChar.faction}</span></div>
                      <div><span className="text-parchment/40">Server:</span> <span className="text-parchment/80">{matchedChar.server}</span></div>
                      <div className="col-span-2"><span className="text-parchment/40">Gear:</span> <span className="text-parchment/80">{matchedChar.gearTier}</span></div>
                      <div className="col-span-2"><span className="text-parchment/40">Professions:</span> <span className="text-parchment/80">{matchedChar.professions[0]} ({matchedChar.profSkills[0]}), {matchedChar.professions[1]} ({matchedChar.profSkills[1]})</span></div>
                      <div className="col-span-2"><span className="text-parchment/40">Notable:</span> <span className="text-gold/70">{matchedChar.notableItems.join(", ")}</span></div>
                      <div className="col-span-2"><span className="text-parchment/40">Email:</span> <span className={getCharacterExtras(matchedChar).emailAccess === "full" ? "text-green-400" : "text-amber-400"}>{getCharacterExtras(matchedChar).emailAccess === "full" ? "Full Email Access" : "Fake B.net Mail Included"}</span></div>
                      <div className="col-span-2"><span className="text-parchment/40">Gold in Bags:</span> <span className="text-gold">{getCharacterExtras(matchedChar).goldInBags}g</span></div>
                    </div>
                    <p className="mt-3 text-[10px] leading-relaxed text-parchment/40">{matchedChar.description}</p>
                    <button
                      type="button"
                      onClick={() => update({ characterId: undefined, accountType: undefined, accountClass: undefined, accountExpansion: undefined })}
                      className="mt-3 text-[10px] font-semibold text-parchment/30 underline transition-colors hover:text-parchment/50"
                    >
                      Choose a different character instead
                    </button>
                  </div>
                )}

                {/* Manual selection - shown when no character from marketplace */}
                {!matchedChar && (
                  <>
                    <div className="rounded-lg border border-fel-orange/10 bg-fel-orange/5 p-3 text-center">
                      <p className="text-[11px] text-parchment/40">
                        Want a specific character? Browse our{" "}
                        <a href="/services/accounts" className="font-semibold text-fel-orange-glow underline">marketplace</a>{" "}
                        and click Buy Now to auto-fill this form.
                      </p>
                    </div>
                    <div>
                      <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Account Type</Label>
                      <Select value={formData.accountType || ""} onValueChange={(v) => update({ accountType: v })}>
                        <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent className="border-stone bg-stone-dark">
                          {accountTypes.map((a) => (
                            <SelectItem key={a.value} value={a.value} className="text-parchment hover:bg-fel-orange/10">{a.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Preferred Class</Label>
                      <Select value={formData.accountClass || ""} onValueChange={(v) => update({ accountClass: v })}>
                        <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                          <SelectValue placeholder="Select class (optional)" />
                        </SelectTrigger>
                        <SelectContent className="border-stone bg-stone-dark">
                          {classes.map((c) => (
                            <SelectItem key={c} value={c} className="text-parchment">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Server</Label>
                      <Select value={formData.accountExpansion || ""} onValueChange={(v) => update({ accountExpansion: v })}>
                        <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                          <SelectValue placeholder="Select TBC Classic server" />
                        </SelectTrigger>
                        <SelectContent className="border-stone bg-stone-dark">
                          {servers.map((s) => (
                            <SelectItem key={s} value={s} className="text-parchment">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Price display */}
                <div className="rounded-lg border border-fel-orange/30 bg-fel-orange/5 p-5 text-center" style={{ boxShadow: '0 0 20px rgba(224,93,32,0.1)' }}>
                  <span className="block text-xs font-semibold tracking-widest text-parchment/60 uppercase">
                    {matchedChar ? `Character #${matchedChar.id} Price` : "Starting From"}
                  </span>
                  <span className="mt-1 block text-3xl font-black text-fel-orange-glow">${price.toFixed(2)}</span>
                  {matchedChar && (
                    <span className="mt-1 block text-[10px] text-parchment/40">
                      {matchedChar.race} {matchedChar.className} ({matchedChar.spec}) - {matchedChar.server}
                    </span>
                  )}
                  <p className="mt-1 text-[10px] text-parchment/30">Final price confirmed on Discord before payment</p>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Step 1: Item Service */}
        {step === 1 && formData.service === "item" && (() => {
          const selectedItem = formData.itemSlug ? itemCatalog[formData.itemSlug] : null
          return (
            <div>
              <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">Item / Service Order</h2>
              <p className="mb-8 text-center text-sm text-parchment/50">Select the item or service and configure your order.</p>
              <div className="flex flex-col gap-6">
                <div>
                  <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Item / Service *</Label>
                  <Select value={formData.itemSlug || ""} onValueChange={(v) => update({ itemSlug: v, itemName: itemCatalog[v]?.name })}>
                    <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                      <SelectValue placeholder="Select an item or service" />
                    </SelectTrigger>
                    <SelectContent className="border-stone bg-stone-dark">
                      {Object.entries(itemCatalog).map(([slug, item]) => (
                        <SelectItem key={slug} value={slug} className="text-parchment hover:bg-emerald-500/10">
                          {item.name} — ${item.pricePerUnit.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedItem && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400">{selectedItem.category}</span>
                      <span className="text-parchment/40">Delivery: {selectedItem.deliveryTime}</span>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Server / Realm *</Label>
                  <Select value={formData.itemServer || ""} onValueChange={(v) => update({ itemServer: v })}>
                    <SelectTrigger className="w-full border-stone bg-stone-dark text-parchment">
                      <SelectValue placeholder="Select your server" />
                    </SelectTrigger>
                    <SelectContent className="border-stone bg-stone-dark">
                      {servers.map((s) => (
                        <SelectItem key={s} value={s} className="text-parchment hover:bg-emerald-500/10">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Faction *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Horde", "Alliance"].map((faction) => (
                      <button
                        key={faction}
                        onClick={() => update({ itemFaction: faction })}
                        className={cn(
                          "rounded-lg border px-4 py-3 text-sm font-bold tracking-wider transition-all",
                          formData.itemFaction === faction
                            ? faction === "Horde" ? "border-red-500/60 bg-red-500/10 text-red-400" : "border-blue-500/60 bg-blue-500/10 text-blue-400"
                            : "border-stone bg-stone-dark text-parchment/50 hover:border-gold/30"
                        )}
                      >
                        {faction}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedItem && !["Mount", "Trinket", "Craft"].includes(selectedItem.category) && (
                  <div>
                    <Label className="mb-2 text-sm font-bold tracking-wider text-parchment/80 uppercase">
                      Quantity: <span className="text-xl font-black text-emerald-400">{formData.itemQuantity || 1}</span>
                    </Label>
                    <Slider
                      value={[formData.itemQuantity || 1]}
                      onValueChange={([v]) => update({ itemQuantity: v })}
                      min={1}
                      max={50}
                      step={1}
                      className="mt-3"
                    />
                    <div className="mt-2 flex justify-between text-[10px] text-parchment/30">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Character Name</Label>
                  <Input
                    value={formData.itemCharacter || ""}
                    onChange={(e) => update({ itemCharacter: e.target.value })}
                    placeholder="Enter your character name"
                    className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                  />
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5 text-center" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.1)' }}>
                  <span className="block text-xs font-semibold tracking-widest text-parchment/60 uppercase">Estimated Price</span>
                  <span className="mt-1 block text-3xl font-black text-emerald-400">${price.toFixed(2)}</span>
                  {selectedItem && (formData.itemQuantity || 1) > 1 && (
                    <span className="mt-1 block text-[10px] text-parchment/40">
                      {formData.itemQuantity} x ${selectedItem.pricePerUnit.toFixed(2)} each
                    </span>
                  )}
                  <p className="mt-1 text-[10px] text-parchment/30">Final price confirmed on Discord before payment</p>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Step 2: Contact & Payment */}
        {step === 2 && (
          <div>
            <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">Contact & Payment</h2>
            <p className="mb-8 text-center text-sm text-parchment/50">How should we reach you and process payment?</p>
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Email Address *</Label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="your@email.com"
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                />
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Discord Username *</Label>
                <Input
                  value={formData.discord || ""}
                  onChange={(e) => update({ discord: e.target.value })}
                  placeholder="username#0000 or username"
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                />
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Payment Method *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.value}
                      onClick={() => update({ paymentMethod: pm.value })}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-xs font-bold tracking-wider transition-all",
                        formData.paymentMethod === pm.value
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-stone bg-stone-dark text-parchment/50 hover:border-gold/30"
                      )}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Coupon Code (optional)</Label>
                <Input
                  value={formData.couponCode || ""}
                  onChange={(e) => update({ couponCode: e.target.value })}
                  placeholder="Enter coupon code"
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                />
              </div>
              <div>
                <Label className="mb-2 text-xs font-bold tracking-wider text-parchment/60 uppercase">Additional Notes (optional)</Label>
                <Textarea
                  value={formData.notes || ""}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder="Any special requests or instructions..."
                  className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/30"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="mb-2 text-center text-xl font-black text-parchment sm:text-2xl">Review Your Order</h2>
            <p className="mb-8 text-center text-sm text-parchment/50">Confirm everything looks correct before submitting.</p>

            <div className="flex flex-col gap-4">
              {/* Service summary */}
              <div className="rounded-xl border border-stone bg-stone-dark/50 p-6">
                <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-gold uppercase">Order Summary</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-parchment/50">Service</span>
                    <span className="text-sm font-bold text-parchment">
                      {formData.service === "gold" ? "Gold Selling" : formData.service === "boosting" ? "Character Boosting" : formData.service === "item" ? `Item: ${formData.itemName || "N/A"}` : "Accounts"}
                    </span>
                  </div>
                  {formData.service === "gold" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Server</span>
                        <span className="text-sm text-parchment">{formData.goldServer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Faction</span>
                        <span className="text-sm text-parchment">{formData.goldFaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Amount</span>
                        <span className="text-sm font-bold text-gold">{formData.goldAmount?.toLocaleString()} Gold</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Character</span>
                        <span className="text-sm text-parchment">{formData.goldCharacter}</span>
                      </div>
                    </>
                  )}
                  {formData.service === "boosting" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Type</span>
                        <span className="text-sm text-parchment">{boostTypes.find((b) => b.value === formData.boostType)?.label}</span>
                      </div>
                      {formData.boostType === "arena-rating" && formData.arenaBracket && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Bracket</span>
                          <span className="text-sm font-bold text-fel-green-glow">{formData.arenaBracket}</span>
                        </div>
                      )}
                      {formData.boostType === "arena-rating" && formData.arenaRating && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Target Rating</span>
                          <span className="text-sm font-bold text-fel-green-glow">{formData.arenaRating}</span>
                        </div>
                      )}
                      {formData.boostCurrentLevel && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Character</span>
                          <span className="text-sm text-parchment">{formData.boostCurrentLevel}</span>
                        </div>
                      )}
                      {formData.boostSchedule && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Server</span>
                          <span className="text-sm text-parchment">{formData.boostSchedule}</span>
                        </div>
                      )}
                      {(formData.boostAddons || []).length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Add-ons</span>
                          <span className="max-w-[200px] text-right text-sm text-fel-green-glow">
                            {(formData.boostAddons || []).map((a: string) => boostAddons.find((b) => b.value === a)?.label).join(", ")}
                          </span>
                        </div>
                      )}
                      {(formData.boostProfessions || []).length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Professions</span>
                          <span className="max-w-[200px] text-right text-sm text-gold-light">
                            {(formData.boostProfessions || []).map((p: string) => professionBoosts.find((b) => b.value === p)?.label).join(", ")}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  {formData.service === "accounts" && (() => {
                    const reviewChar = formData.characterId
                      ? marketplaceCharacters.find((c) => c.id === Number(formData.characterId))
                      : null
                    return (
                      <>
                        {reviewChar && (
                          <div className="flex justify-between">
                            <span className="text-sm text-parchment/50">Character ID</span>
                            <span className="text-sm font-bold text-fel-orange-glow">#{reviewChar.id} - {reviewChar.race} {reviewChar.className} ({reviewChar.spec})</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Type</span>
                          <span className="text-sm text-parchment">{accountTypes.find((a) => a.value === formData.accountType)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Class</span>
                          <span className="text-sm text-parchment">{formData.accountClass || "Any"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Server</span>
                          <span className="text-sm text-parchment">{formData.accountExpansion || "Any"}</span>
                        </div>
                        {reviewChar && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-parchment/50">Gear</span>
                              <span className="text-sm text-parchment">{reviewChar.gearTier}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-parchment/50">Professions</span>
                              <span className="max-w-[200px] text-right text-sm text-parchment/80">{reviewChar.professions.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-parchment/50">Email Access</span>
                              <span className={`text-sm ${getCharacterExtras(reviewChar).emailAccess === "full" ? "text-green-400" : "text-amber-400"}`}>
                                {getCharacterExtras(reviewChar).emailAccess === "full" ? "Full Email Access" : "Fake B.net Mail"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-parchment/50">Gold in Bags</span>
                              <span className="text-sm text-gold">{getCharacterExtras(reviewChar).goldInBags}g</span>
                            </div>
                          </>
                        )}
                      </>
                    )
                  })()}
                  {formData.service === "item" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Item</span>
                        <span className="text-sm font-bold text-emerald-400">{formData.itemName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Server</span>
                        <span className="text-sm text-parchment">{formData.itemServer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-parchment/50">Faction</span>
                        <span className="text-sm text-parchment">{formData.itemFaction}</span>
                      </div>
                      {(formData.itemQuantity || 1) > 1 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Quantity</span>
                          <span className="text-sm text-parchment">{formData.itemQuantity}</span>
                        </div>
                      )}
                      {formData.itemCharacter && (
                        <div className="flex justify-between">
                          <span className="text-sm text-parchment/50">Character</span>
                          <span className="text-sm text-parchment">{formData.itemCharacter}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Contact summary */}
              <div className="rounded-xl border border-stone bg-stone-dark/50 p-6">
                <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-fel-green-glow uppercase">Contact Details</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-parchment/50">Email</span>
                    <span className="text-sm text-parchment">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-parchment/50">Discord</span>
                    <span className="text-sm text-parchment">{formData.discord}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-parchment/50">Payment</span>
                    <span className="text-sm text-parchment">{paymentMethods.find((p) => p.value === formData.paymentMethod)?.label}</span>
                  </div>
                  {formData.couponCode && (
                    <div className="flex justify-between">
                      <span className="text-sm text-parchment/50">Coupon</span>
                      <span className="text-sm text-gold">{formData.couponCode}</span>
                    </div>
                  )}
                  {formData.notes && (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-parchment/50">Notes</span>
                      <span className="text-sm text-parchment/70">{formData.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="rounded-xl border-2 border-gold/30 bg-gold/5 p-6 text-center">
                <span className="text-xs font-bold tracking-[0.3em] text-parchment/50 uppercase">Total</span>
                <p className="mt-1 text-3xl font-black text-gold">${price.toFixed(2)}</p>
                <p className="mt-2 text-[11px] text-parchment/40">Final price may vary. Our team will confirm before processing.</p>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 py-4">
                {[
                  { icon: ShieldCheck, label: "Secure" },
                  { icon: Zap, label: "Fast" },
                  { icon: Headphones, label: "24/7 Support" },
                ].map((badge) => {
                  const Icon = badge.icon
                  return (
                    <div key={badge.label} className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-gold/60" />
                      <span className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">{badge.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-lg border border-stone bg-stone-dark/50 px-5 py-3 text-xs font-bold tracking-widest text-parchment/60 uppercase transition-all hover:border-gold/30 hover:text-parchment"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={cn(
                "flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all",
                canProceed()
                  ? "bg-gold text-deep-black hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                  : "bg-stone text-parchment/30 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-xs font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Submit Order
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
