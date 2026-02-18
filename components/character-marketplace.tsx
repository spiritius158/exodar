"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, Filter, Shield, Star, ArrowRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type TbcCharacter = {
  id: number
  race: string
  className: string
  level: number
  spec: string
  faction: "Horde" | "Alliance"
  gearTier: string
  professions: [string, string]
  profSkills: [number, number]
  notableItems: string[]
  server: string
  price: number
  description: string
  tier: "T4" | "Pre-Raid" | "PvP"
  status: "available" | "reserved"
}

// Deterministic gold/email per character based on ID
function seededGold(id: number): number {
  const x = Math.sin(id * 7 + 3) * 10000
  return Math.floor((x - Math.floor(x)) * 401) + 100
}

function emailType(id: number): "full" | "fake-bnet" {
  return id % 3 === 0 ? "fake-bnet" : "full"
}

export type CharacterWithExtras = TbcCharacter & {
  emailAccess: "full" | "fake-bnet"
  goldInBags: number
}

export function getCharacterExtras(char: TbcCharacter): CharacterWithExtras {
  return {
    ...char,
    emailAccess: emailType(char.id),
    goldInBags: seededGold(char.id),
  }
}

export const characters: TbcCharacter[] = [
  // ── HORDE ──────────────────────────────────────────
  {
    id: 1, race: "Blood Elf", className: "Paladin", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [310, 295],
    notableItems: ["Hallowed Raiment (3/5)", "Revered rep healing gear"], server: "Spineshatter (PvP)",
    price: 389.99, description: "Holy Paladin wearing mostly blue Hallowed dungeon set and Lower City reputation healing pieces. Basic Jewelcrafting with a few uncommon cuts. Ready for early Karazhan healing but needs gear across the board.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 2, race: "Troll", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Beast Lord Armor (4/5)", "Valanos Longbow"], server: "Spineshatter (PvP)",
    price: 323.99, description: "BM Hunter with nearly complete Beast Lord dungeon set from heroics. Blue quality bow from normal Steamvault. Full heroic dungeon blues in remaining slots. Solid pre-raid setup.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 3, race: "Orc", className: "Warrior", level: 70, spec: "Arms",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 300],
    notableItems: ["Gladiators Greatsword", "Bold blue plate set"], server: "Spineshatter (PvP)",
    price: 296.99, description: "Arms Warrior in mostly blue heroic dungeon plate. Has the blue PvP honor greatsword for DPS. A few green quest items still in offslots. Needs a lot of heroic dungeon farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 4, race: "Undead", className: "Rogue", level: 70, spec: "Combat",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [290, 300],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 315.99, description: "Combat Rogue with partial Wastewalker dungeon set and blue heroic swords. Engineering barely started. Most gear is blue quality from heroic dungeons and normal mode drops.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 5, race: "Blood Elf", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Continuum Blade"], server: "Dreamscythe (PvE)",
    price: 301.99, description: "Destro Warlock wearing mostly Mana-Etched heroic dungeon blues and quest caster pieces. Has the blue Keepers of Time sword. Tailoring partially leveled, Enchanting low. Needs heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 6, race: "Orc", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [295, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic dungeon weapons"], server: "Spineshatter (PvP)",
    price: 295.99, description: "Enh Shaman with partial Tidefury dungeon set and blue heroic weapons. Rest is Cenarion Expedition and Thrallmar rep blues. Needs a lot of upgrades for raid readiness.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 7, race: "Troll", className: "Mage", level: 70, spec: "Arcane",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 290],
    notableItems: ["Mana-Etched Regalia (4/5)", "Scryer rep offhand"], server: "Spineshatter (PvP)",
    price: 309.99, description: "Arcane Mage in nearly full Mana-Etched heroic blues. Scryer reputation offhand and Lower City caster ring. Tailoring partially done. Blue gear throughout, Karazhan ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 8, race: "Undead", className: "Priest", level: 70, spec: "Shadow",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 300],
    notableItems: ["Frozen Shadoweave Set", "Heroic caster blues"], server: "Spineshatter (PvP)",
    price: 337.99, description: "Shadow Priest with crafted Frozen Shadoweave set as the only epics. Everything else is blue quality from heroic dungeons and reputation vendors. Decent mana battery starter for Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 9, race: "Orc", className: "Hunter", level: 70, spec: "Survival",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [285, 305],
    notableItems: ["Beast Lord Armor (2/5)", "Heroic dungeon bow"], server: "Thunderstrike (PvE)",
    price: 286.99, description: "Survival Hunter in mostly normal and heroic dungeon blues with a couple Beast Lord pieces. Blue quality ranged weapon. Several green quest items still equipped. Needs lots of heroic runs.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 10, race: "Blood Elf", className: "Paladin", level: 70, spec: "Protection",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [280, 300],
    notableItems: ["Righteous Armor (3/5)", "Heroic dungeon shield"], server: "Nightslayer (PvP)",
    price: 319.99, description: "Prot Paladin in blue Righteous dungeon set with a heroic shield. Far from uncrushable. Rep gear from Honor Hold and Sha'tar filling other slots. Needs lots of heroic grinding.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 11, race: "Undead", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Herbalism"], profSkills: [310, 315],
    notableItems: ["Mana-Etched Regalia (2/5)", "Heroic caster offpieces"], server: "Spineshatter (PvP)",
    price: 280.99, description: "Affliction Lock with partial Mana-Etched blues and normal dungeon caster pieces. A couple green quest items still worn. Basic pre-raid gear, needs heavy heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 12, race: "Tauren", className: "Druid", level: 70, spec: "Feral",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Earthwarden", "Wastewalker Armor (2/5)"], server: "Spineshatter (PvP)",
    price: 328.99, description: "Feral Bear with crafted Earthwarden epic mace and the rest all blue dungeon gear. Partial Wastewalker set. Can do heroics comfortably but needs upgrades for Karazhan tanking.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 13, race: "Orc", className: "Shaman", level: 70, spec: "Elemental",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [300, 290],
    notableItems: ["Tidefury Raiment (2/5)", "Cenarion Expedition rep gear"], server: "Spineshatter (PvP)",
    price: 292.99, description: "Ele Shaman in partial Tidefury dungeon blues and Cenarion Expedition reputation caster gear. JC barely started. All blue and green quality gear. Needs lots of heroic dungeon runs.",
    tier: "Pre-Raid", status: "reserved",
  },
  {
    id: 14, race: "Tauren", className: "Warrior", level: 70, spec: "Protection",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (3/5)", "Heroic tanking blues"], server: "Dreamscythe (PvE)",
    price: 311.99, description: "Prot Warrior in partial Bold dungeon set and heroic blues. Has some reputation tank pieces from Keepers of Time. Far from uncrushable, needs heavy heroic farming to be Kara ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 15, race: "Blood Elf", className: "Mage", level: 70, spec: "Fire",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [305, 275],
    notableItems: ["Mana-Etched Regalia (3/5)", "Scryer rep caster ring"], server: "Thunderstrike (PvE)",
    price: 289.99, description: "Fire Mage with partial Mana-Etched heroic blues and Scryer reputation pieces. Enchanting barely leveled. All blue and green gear, ready for heroic grinding toward Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 16, race: "Troll", className: "Priest", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [325, 320],
    notableItems: ["Hallowed Raiment (3/5)", "Lower City rep healing"], server: "Nightslayer (PvP)",
    price: 306.99, description: "Holy Priest with partial Hallowed dungeon set and Lower City reputation healing blues. Alchemy at a useful level for making pots. All blue gear, decent Karazhan entry healer.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 17, race: "Blood Elf", className: "Rogue", level: 70, spec: "Mutilate",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [270, 290],
    notableItems: ["Wastewalker Armor (2/5)", "Normal dungeon daggers"], server: "Spineshatter (PvP)",
    price: 275.99, description: "Mutilate Rogue with a couple Wastewalker pieces and mostly normal dungeon blues. Daggers are blue quality from regular dungeons. Engineering barely started. Needs extensive gearing.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 18, race: "Orc", className: "Warlock", level: 70, spec: "Demonology",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [315, 290],
    notableItems: ["Mana-Etched Regalia (3/5)", "Sha'tar rep caster ring"], server: "Spineshatter (PvP)",
    price: 298.99, description: "Demo Warlock with partial Mana-Etched heroic blues and reputation caster gear. Felguard does okay damage. Most slots are blue quality, some green quest items remain.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 19, race: "Tauren", className: "Druid", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 310],
    notableItems: ["Moonglade Raiment (3/5)", "Cenarion rep healing"], server: "Spineshatter (PvP)",
    price: 303.99, description: "Resto Druid with partial Moonglade dungeon healing set and Cenarion Expedition rep blues. All blue gear with a couple greens left. Decent HoT healing but needs heavy upgrades.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 20, race: "Undead", className: "Mage", level: 70, spec: "Frost",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [310, 295],
    notableItems: ["Blue PvP honor gear (4/5)", "Honor caster staff"], server: "Spineshatter (PvP)",
    price: 333.99, description: "Frost Mage with mostly blue honor PvP gear set from battleground vendors. Some resilience for casual arena. Mixed in a few heroic dungeon blues in other slots.",
    tier: "PvP", status: "available",
  },
  {
    id: 21, race: "Undead", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [305, 295],
    notableItems: ["Blue PvP honor set (3/5)", "Honor daggers"], server: "Spineshatter (PvP)",
    price: 337.99, description: "Sub Rogue with partial blue honor PvP set and honor daggers. Engineering partially leveled for bombs. Mixed heroic dungeon blues in remaining slots. Low resilience.",
    tier: "PvP", status: "available",
  },
  {
    id: 22, race: "Orc", className: "Warrior", level: 70, spec: "Arms",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 305],
    notableItems: ["Blue PvP honor plate (3/5)", "Honor two-hander"], server: "Nightslayer (PvP)",
    price: 328.99, description: "Arms Warrior with partial blue honor PvP plate and honor two-hand weapon. Orc stun resist helps in battlegrounds. Rest is mixed heroic and quest blues.",
    tier: "PvP", status: "reserved",
  },
  // ── ALLIANCE ───────────────────────────────────────
  {
    id: 23, race: "Draenei", className: "Paladin", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [305, 295],
    notableItems: ["Hallowed Raiment (4/5)", "Sha'tar rep healing"], server: "Spineshatter (PvP)",
    price: 315.99, description: "Holy Paladin with nearly complete Hallowed dungeon set and Sha'tar reputation healing blues. Draenei racial HoT is a small bonus. Full pre-raid blue gear, Kara ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 24, race: "Night Elf", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [295, 290],
    notableItems: ["Beast Lord Armor (3/5)", "Heroic dungeon bow"], server: "Spineshatter (PvP)",
    price: 309.99, description: "BM Hunter with partial Beast Lord heroic dungeon set and blue quality bow. Engineering barely started. Rest is blue dungeon gear and a few green quest items.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 25, race: "Human", className: "Warrior", level: 70, spec: "Arms",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 300],
    notableItems: ["Bold Armor (2/5)", "Heroic dungeon sword"], server: "Nightslayer (PvP)",
    price: 299.99, description: "Arms Warrior with a couple Bold dungeon pieces and heroic blue sword. Human racial expertise on swords is nice. Rest is mixed heroic and normal dungeon blues.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 26, race: "Night Elf", className: "Druid", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Moonglade Raiment (3/5)", "Heroic healing blues"], server: "Dreamscythe (PvE)",
    price: 306.99, description: "Resto Druid with partial Moonglade healing set and heroic dungeon healing blues. Shadowmeld for arena utility. All blue gear, ready for Karazhan entry healing.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 27, race: "Draenei", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [325, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Rep healing trinkets"], server: "Spineshatter (PvP)",
    price: 309.99, description: "Resto Shaman healer with partial Tidefury dungeon blues and reputation healing pieces. Alchemy useful for making pots. Mostly blue gear throughout, solid Karazhan healer starter.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 28, race: "Gnome", className: "Mage", level: 70, spec: "Arcane",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 300],
    notableItems: ["Mana-Etched Regalia (4/5)", "KoT rep caster ring"], server: "Spineshatter (PvP)",
    price: 312.99, description: "Arcane Mage with near-complete Mana-Etched heroic set and Keepers of Time reputation ring. Escape Artist racial is handy in PvP. Solid blue pre-raid caster gear.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 29, race: "Night Elf", className: "Rogue", level: 70, spec: "Combat",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [285, 290],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon swords"], server: "Nightslayer (PvP)",
    price: 308.99, description: "Combat Rogue with partial Wastewalker dungeon set and blue heroic swords. Shadowmeld for stealth opening. Engineering barely started. All blue quality gear throughout.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 30, race: "Human", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [305, 295],
    notableItems: ["Heroic dungeon two-hander", "Bold Armor (2/5)"], server: "Thunderstrike (PvE)",
    price: 296.99, description: "Ret Paladin with a blue heroic dungeon two-hander and partial Bold plate. Human expertise on swords helps. Rest is mixed heroic and quest blues. Needs lots of upgrades.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 31, race: "Draenei", className: "Priest", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [315, 295],
    notableItems: ["Hallowed Raiment (3/5)", "Aldor rep healing pieces"], server: "Spineshatter (PvP)",
    price: 303.99, description: "Holy Priest with partial Hallowed dungeon set and Aldor reputation healing blues. Draenei racial HoT is a small extra heal. All blue quality gear, ready for early Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 32, race: "Gnome", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [310, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Normal dungeon wand"], server: "Spineshatter (PvP)",
    price: 293.99, description: "Destro Warlock with partial Mana-Etched heroic blues and normal dungeon offpieces. A couple green quest items still worn. Escape Artist racial is useful. Needs lots of heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 33, race: "Night Elf", className: "Druid", level: 70, spec: "Feral",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [295, 305],
    notableItems: ["Wastewalker Armor (2/5)", "Heroic tanking blues"], server: "Spineshatter (PvP)",
    price: 299.99, description: "Feral Bear with partial Wastewalker and heroic dungeon tanking blues. Can tank heroics okay but needs serious upgrades for Karazhan. Earthwarden not yet obtained.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 34, race: "Human", className: "Warrior", level: 70, spec: "Protection",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (4/5)", "Heroic tanking shield"], server: "Dreamscythe (PvE)",
    price: 321.99, description: "Prot Warrior with near-complete Bold dungeon set and a blue heroic shield. Far from uncrushable but can tank heroics. Human sword expertise helps with threat. Needs raid gear.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 35, race: "Dwarf", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [285, 300],
    notableItems: ["Beast Lord Armor (1/5)", "Valanos Longbow"], server: "Spineshatter (PvP)",
    price: 277.99, description: "BM Hunter with one Beast Lord piece and blue quality bow. Rest is normal dungeon blues and a few green quest items. Dwarf Stoneform helps vs rogues. Needs heavy heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 36, race: "Draenei", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [290, 295],
    notableItems: ["Tidefury Raiment (2/5)", "Heroic dungeon weapons"], server: "Spineshatter (PvP)",
    price: 287.99, description: "Enh Shaman with partial Tidefury blues and heroic dungeon weapons. Draenei hit aura helps with melee cap. Mixed blue and green gear. Needs lots of heroic runs to be Kara ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 37, race: "Human", className: "Paladin", level: 70, spec: "Protection",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [280, 290],
    notableItems: ["Righteous Armor (3/5)", "Heroic tanking shield"], server: "Dreamscythe (PvE)",
    price: 313.99, description: "Prot Paladin with partial Righteous dungeon set and blue tanking shield. Good AoE threat but very far from uncrushable. Engineering barely started. Needs heavy heroic grinding.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 38, race: "Gnome", className: "Mage", level: 70, spec: "Frost",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [300, 275],
    notableItems: ["Mana-Etched Regalia (2/5)", "Normal dungeon caster"], server: "Spineshatter (PvP)",
    price: 281.99, description: "Frost Mage with a couple Mana-Etched blues and normal dungeon caster gear. Good for AoE farming. Several green items still equipped. Enchanting barely started.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 39, race: "Night Elf", className: "Priest", level: 70, spec: "Shadow",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [315, 300],
    notableItems: ["Frozen Shadoweave Set", "Normal dungeon blues"], server: "Thunderstrike (PvE)",
    price: 334.99, description: "Shadow Priest with crafted Frozen Shadoweave set as only epics. Everything else is blue quality from normal and heroic dungeons. Useful mana battery but needs lots of gear work.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 40, race: "Dwarf", className: "Paladin", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [310, 300],
    notableItems: ["Hallowed Raiment (2/5)", "Heroic healing blues"], server: "Thunderstrike (PvE)",
    price: 290.99, description: "Holy Paladin with a couple Hallowed pieces and heroic healing blues. Alchemy at a useful level. Dwarf Stoneform for poison removal. Green items still in some slots.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 41, race: "Human", className: "Rogue", level: 70, spec: "Combat",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [275, 285],
    notableItems: ["Normal dungeon swords", "Assassination Armor (1/5)"], server: "Spineshatter (PvP)",
    price: 270.99, description: "Combat Rogue with normal dungeon blue swords and one Assassination set piece. Human sword expertise is strong for Combat. Mostly blues and greens. Needs extensive gearing.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 42, race: "Night Elf", className: "Druid", level: 70, spec: "Balance",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [305, 285],
    notableItems: ["Mana-Etched Regalia (2/5)", "Cenarion rep caster"], server: "Thunderstrike (PvE)",
    price: 292.99, description: "Boomkin with partial Mana-Etched blues and Cenarion Expedition reputation caster gear. Brings innervate and battle rez utility. All blue and green gear, needs lots of upgrades.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 43, race: "Gnome", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Herbalism"], profSkills: [300, 305],
    notableItems: ["Mana-Etched Regalia (2/5)", "Normal dungeon offpieces"], server: "Spineshatter (PvP)",
    price: 283.99, description: "Affliction Warlock with partial Mana-Etched and normal dungeon blues. Good sustained DoT damage for Kara entry. Gnome Escape Artist helps in PvP. Several green items remain.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 44, race: "Draenei", className: "Warrior", level: 70, spec: "Arms",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [305, 290],
    notableItems: ["Bold Armor (2/5)", "Heroic dungeon axe"], server: "Spineshatter (PvP)",
    price: 289.99, description: "Arms Warrior with partial Bold dungeon plate and a blue heroic dungeon axe. Draenei hit aura helps the party. Mixed blue and green gear. Needs lots of heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  // ── PvP SPECIALISTS ────────────────────────────────
  {
    id: 45, race: "Undead", className: "Priest", level: 70, spec: "Discipline",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [310, 300],
    notableItems: ["Blue PvP honor set (4/5)", "Honor healing mace"], server: "Spineshatter (PvP)",
    price: 331.99, description: "Disc Priest with nearly full blue honor PvP healing set from BG vendors. Low resilience for arena. Some heroic dungeon healing pieces mixed in for versatility.",
    tier: "PvP", status: "available",
  },
  {
    id: 46, race: "Blood Elf", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 300],
    notableItems: ["Blue PvP honor plate (3/5)", "Honor two-hander"], server: "Nightslayer (PvP)",
    price: 323.99, description: "Ret Paladin with partial blue honor PvP plate and honor weapon. Blood Elf silence is useful. Rest is mixed heroic and quest blues. Low resilience for serious arena.",
    tier: "PvP", status: "available",
  },
  {
    id: 47, race: "Orc", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Alchemy", "Herbalism"], profSkills: [320, 305],
    notableItems: ["Blue PvP honor set (3/5)", "Honor healing shield"], server: "Spineshatter (PvP)",
    price: 324.99, description: "Resto Shaman with partial blue honor PvP healing set and honor shield. Orc stun resist helps in BGs. Rest is heroic dungeon healing blues. Casual PvP healer.",
    tier: "PvP", status: "available",
  },
  {
    id: 48, race: "Human", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [300, 290],
    notableItems: ["Blue PvP honor set (4/5)", "Honor daggers"], server: "Spineshatter (PvP)",
    price: 343.99, description: "Sub Rogue with nearly full blue honor PvP set and honor daggers. Human Perception catches stealth. Engineering partially done for bombs. Okay for casual BG play.",
    tier: "PvP", status: "available",
  },
  {
    id: 49, race: "Gnome", className: "Warlock", level: 70, spec: "Soul Link",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [305, 290],
    notableItems: ["Blue PvP honor set (3/5)", "Honor caster staff"], server: "Nightslayer (PvP)",
    price: 321.99, description: "Soul Link Warlock with partial blue honor PvP set and honor caster staff. Gnome Escape Artist breaks roots. Tanky with pet out but low resilience. Mixed heroic blues in offslots.",
    tier: "PvP", status: "available",
  },
  {
    id: 50, race: "Night Elf", className: "Druid", level: 70, spec: "Feral",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Leatherworking", "Skinning"], profSkills: [295, 310],
    notableItems: ["Blue PvP honor set (3/5)", "Honor mace"], server: "Nightslayer (PvP)",
    price: 330.99, description: "Feral PvP Druid with partial blue honor PvP set and honor weapon. Shadowmeld for restealth. Mixed heroic dungeon leather in other slots. Okay for casual flag carrying.",
    tier: "PvP", status: "reserved",
  },
  // ── EXTRA VARIETY ──────────────────────────────────
  {
    id: 51, race: "Troll", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [320, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Lower City healing blues"], server: "Dreamscythe (PvE)",
    price: 308.99, description: "Resto Shaman healer with partial Tidefury dungeon set and Lower City rep healing blues. Alchemy for consumable crafting. All blue quality gear, decent Kara entry healer.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 52, race: "Tauren", className: "Druid", level: 70, spec: "Balance",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [295, 280],
    notableItems: ["Mana-Etched Regalia (1/5)", "Normal dungeon caster"], server: "Thunderstrike (PvE)",
    price: 274.99, description: "Boomkin in mostly normal dungeon caster blues with one Mana-Etched piece. Moonkin aura crit buff is useful for the group. Lots of green items still worn. Heavy gearing needed.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 53, race: "Blood Elf", className: "Priest", level: 70, spec: "Discipline",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [305, 290],
    notableItems: ["Hallowed Raiment (2/5)", "Normal dungeon healing"], server: "Spineshatter (PvP)",
    price: 295.99, description: "Disc Priest with a couple Hallowed pieces and normal dungeon healing blues. Power Infusion for casters. Mixed blue and green gear, needs lots of heroic dungeon grinding.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 54, race: "Dwarf", className: "Priest", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [315, 305],
    notableItems: ["Hallowed Raiment (3/5)", "Heroic healing trinkets"], server: "Thunderstrike (PvE)",
    price: 311.99, description: "Holy Priest with partial Hallowed set and heroic healing blues. Dwarf Fear Ward is very useful in Karazhan. Alchemy at a handy level. All blue gear, ready for Kara entry.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 55, race: "Troll", className: "Warrior", level: 70, spec: "Fury",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [305, 290],
    notableItems: ["Bold Armor (2/5)", "Normal dungeon weapons"], server: "Spineshatter (PvP)",
    price: 278.99, description: "Fury Warrior with a couple Bold dungeon pieces and normal dungeon blue weapons. Troll Berserking haste for extra burst. Mix of blues and greens. Heavy gearing needed.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 56, race: "Draenei", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [295, 285],
    notableItems: ["Heroic dungeon mace", "Righteous Armor (1/5)"], server: "Dreamscythe (PvE)",
    price: 284.99, description: "Ret Paladin with a blue heroic mace and one Righteous plate piece. Draenei hit aura helps the group. Mostly blues and greens throughout. Needs heavy heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 57, race: "Undead", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Herbalism"], profSkills: [305, 295],
    notableItems: ["Mana-Etched Regalia (2/5)", "Normal dungeon caster"], server: "Spineshatter (PvP)",
    price: 286.99, description: "Destro Warlock with partial Mana-Etched blues and normal dungeon caster gear. Undead Will of the Forsaken helps in PvP. Several green items still equipped.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 58, race: "Night Elf", className: "Hunter", level: 70, spec: "Marksmanship",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [290, 295],
    notableItems: ["Beast Lord Armor (2/5)", "Heroic dungeon bow"], server: "Spineshatter (PvP)",
    price: 302.99, description: "Marks Hunter with a couple Beast Lord pieces and heroic blue bow. Engineering barely started. Most gear is blue quality from heroic dungeons. Needs more heroic and rep farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 59, race: "Troll", className: "Mage", level: 70, spec: "Fire",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [310, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 301.99, description: "Fire Mage with partial Mana-Etched heroic blues and a decent caster trinket. Troll Berserking for burst. Rest is mixed heroic and normal dungeon blues. Kara entry ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 60, race: "Human", className: "Mage", level: 70, spec: "Arcane",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [295, 275],
    notableItems: ["Mana-Etched Regalia (2/5)", "Normal dungeon offpieces"], server: "Thunderstrike (PvE)",
    price: 267.99, description: "Arcane Mage in partial Mana-Etched blues and normal dungeon caster offpieces. Several green items still worn. Enchanting barely started. Needs heavy heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  // ── HORDE BATCH 2 (61-110) ──────────────────────────────────
  {
    id: 61, race: "Orc", className: "Warrior", level: 70, spec: "Fury",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (3/5)", "Heroic dungeon axes"], server: "Spineshatter (PvP)",
    price: 305.99, description: "Fury Warrior with partial Bold dungeon plate and two blue heroic axes. Orc racial axe bonus makes this a solid pre-raid DPS character. Rest is heroic dungeon offpieces.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 62, race: "Blood Elf", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [305, 300],
    notableItems: ["Righteous Armor (3/5)", "Heroic dungeon 2H mace"], server: "Spineshatter (PvP)",
    price: 311.99, description: "Ret Paladin in partial Righteous dungeon blues with a solid 2H mace from heroic Slave Pens. Jewelcrafting started with several uncommon cuts learned. Seal of Blood ready for raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 63, race: "Undead", className: "Priest", level: 70, spec: "Shadow",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [340, 295],
    notableItems: ["Frozen Shadoweave Set", "Heroic caster offhand"], server: "Spineshatter (PvP)",
    price: 345.99, description: "Shadow Priest with crafted Frozen Shadoweave 3-piece set and heroic dungeon offpieces. Tailoring well advanced. WotF makes this an excellent PvE and PvP hybrid.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 64, race: "Troll", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [310, 325],
    notableItems: ["Tidefury Raiment (4/5)", "Rep healing trinkets"], server: "Nightslayer (PvP)",
    price: 319.99, description: "Resto Shaman healer with nearly complete Tidefury dungeon set and reputation healing trinkets. Alchemy producing Super Mana Pots. Chain heal build ready for Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 65, race: "Blood Elf", className: "Mage", level: 70, spec: "Fire",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 300],
    notableItems: ["Spellfire Set (2/3)", "Mana-Etched Regalia (2/5)"], server: "Spineshatter (PvP)",
    price: 333.99, description: "Fire Mage with partial Spellfire crafted set and Mana-Etched heroic blues filling remaining slots. Tailoring progressing toward full Spellfire. Strong burst DPS ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 66, race: "Orc", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Beast Lord Armor (3/5)", "Heroic dungeon crossbow"], server: "Spineshatter (PvP)",
    price: 308.99, description: "BM Hunter with partial Beast Lord set from heroics and a solid crossbow. Orc pet damage bonus. Mixed heroic and normal dungeon blues in remaining slots.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 67, race: "Undead", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 290],
    notableItems: ["Frozen Shadoweave Set", "Mana-Etched Regalia (1/5)"], server: "Dreamscythe (PvE)",
    price: 339.99, description: "Affliction Lock with full Frozen Shadoweave crafted 3-piece and one Mana-Etched heroic blue. WotF racial for PvP utility. Tailoring well advanced toward profitable patterns.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 68, race: "Troll", className: "Rogue", level: 70, spec: "Combat",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [310, 305],
    notableItems: ["Wastewalker Armor (4/5)", "Heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 325.99, description: "Combat Rogue with nearly complete Wastewalker set from heroics and blue sword drops. Engineering well started with goggles incoming. Troll Berserking for burst.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 69, race: "Blood Elf", className: "Warlock", level: 70, spec: "Demonology",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 280],
    notableItems: ["Blue PvP honor set (3/5)", "Honor caster staff"], server: "Spineshatter (PvP)",
    price: 329.99, description: "Demo Warlock with partial blue honor PvP set and honor caster staff. Felguard tank spec. Blood Elf mana tap utility for arenas. Rest is heroic dungeon caster blues.",
    tier: "PvP", status: "available",
  },
  {
    id: 70, race: "Orc", className: "Shaman", level: 70, spec: "Elemental",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [300, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 298.99, description: "Ele Shaman with partial Tidefury caster blues and a heroic caster trinket. Orc Hardiness for stun resist. Jewelcrafting started. Lightning bolt build for pre-raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 71, race: "Blood Elf", className: "Paladin", level: 70, spec: "Protection",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Righteous Armor (4/5)", "Heroic tanking shield"], server: "Thunderstrike (PvE)",
    price: 328.99, description: "Prot Paladin with nearly complete Righteous dungeon set and a solid heroic tanking shield. Consecration AoE tank ready for heroics and early Karazhan trash pulls.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 72, race: "Troll", className: "Priest", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Hallowed Raiment (3/5)", "Lower City rep healing"], server: "Spineshatter (PvP)",
    price: 307.99, description: "Holy Priest healer with partial Hallowed dungeon set and Lower City reputation healing pieces. Tailoring progressing. Troll regeneration is solid for long healing fights.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 73, race: "Undead", className: "Mage", level: 70, spec: "Frost",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [315, 285],
    notableItems: ["Blue PvP honor set (4/5)", "Honor caster offhand"], server: "Spineshatter (PvP)",
    price: 337.99, description: "Frost Mage with mostly blue PvP honor set and honor caster offhand. WotF for fear break in arenas. Strong kiting and control spec for battlegrounds and 2v2 arenas.",
    tier: "PvP", status: "available",
  },
  {
    id: 74, race: "Orc", className: "Hunter", level: 70, spec: "Marksmanship",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Beast Lord Armor (2/5)", "Sonic Spear"], server: "Dreamscythe (PvE)",
    price: 299.99, description: "Marks Hunter with partial Beast Lord and the blue polearm from heroic Underbog. Orc pet damage bonus still useful even in MM spec. Mixed heroic blues otherwise.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 75, race: "Blood Elf", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [305, 300],
    notableItems: ["Blue PvP honor set (3/5)", "Honor daggers"], server: "Spineshatter (PvP)",
    price: 331.99, description: "Sub Rogue with partial blue PvP honor set and honor daggers. Arcane Torrent silence for arena combos. Engineering started for goggles. Strong opener burst in arenas.",
    tier: "PvP", status: "available",
  },
  {
    id: 76, race: "Troll", className: "Warrior", level: 70, spec: "Protection",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [305, 310],
    notableItems: ["Bold Armor (4/5)", "Heroic tanking sword and shield"], server: "Spineshatter (PvP)",
    price: 322.99, description: "Prot Warrior tank with nearly full Bold dungeon set and a heroic tanking sword with shield. Troll Berserking for threat gen. Ready for heroic dungeons and Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 77, race: "Blood Elf", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [340, 295],
    notableItems: ["Spellfire Set (3/3)", "Heroic caster offpieces"], server: "Spineshatter (PvP)",
    price: 359.99, description: "Destro Warlock with full crafted Spellfire 3-piece set and heroic dungeon caster offpieces filling remaining slots. Tailoring maxed for Spellfire. High spell damage ready for raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 78, race: "Orc", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 315],
    notableItems: ["Tidefury Raiment (2/5)", "Heroic dungeon fists"], server: "Nightslayer (PvP)",
    price: 291.99, description: "Enh Shaman with partial Tidefury and heroic dungeon fist weapons. Orc Hardiness and Blood Fury for melee burst. Windfury procs hit hard. Needs more heroic upgrades.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 79, race: "Undead", className: "Priest", level: 70, spec: "Discipline",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Blue PvP honor set (4/5)", "Honor healing mace"], server: "Spineshatter (PvP)",
    price: 339.99, description: "Disc Priest with nearly full blue PvP honor set and honor healing mace. WotF plus Fear Ward makes this the ultimate arena healer. Pain Suppression and Power Infusion ready.",
    tier: "PvP", status: "available",
  },
  {
    id: 80, race: "Blood Elf", className: "Mage", level: 70, spec: "Arcane",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 300],
    notableItems: ["Spellfire Set (2/3)", "Mana-Etched Regalia (3/5)"], server: "Spineshatter (PvP)",
    price: 341.99, description: "Arcane Mage with partial Spellfire and partial Mana-Etched dungeon set. Arcane Torrent for mana return. Strong burst in both PvE and PvP. Approaching Kara-ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 81, race: "Troll", className: "Hunter", level: 70, spec: "Survival",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [295, 310],
    notableItems: ["Beast Lord Armor (2/5)", "Heroic dungeon bow"], server: "Thunderstrike (PvE)",
    price: 293.99, description: "Survival Hunter with partial Beast Lord and a solid heroic bow. Troll Bow Specialization bonus. Expose Weakness build for raid support. Needs more heroic farming.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 82, race: "Orc", className: "Warrior", level: 70, spec: "Arms",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Blue PvP honor set (3/5)", "Honor 2H axe"], server: "Spineshatter (PvP)",
    price: 327.99, description: "Arms Warrior with partial blue PvP honor set and a blue honor 2H axe. Orc axe racial plus Hardiness makes this a top-tier arena warrior. Mortal Strike build ready.",
    tier: "PvP", status: "available",
  },
  {
    id: 83, race: "Blood Elf", className: "Paladin", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [315, 320],
    notableItems: ["Hallowed Raiment (4/5)", "Sha'tar rep healing trinket"], server: "Spineshatter (PvP)",
    price: 321.99, description: "Holy Paladin with nearly complete Hallowed dungeon set and a healing trinket from Sha'tar rep. Alchemy producing Super Mana Pots. Flash of Light build for Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 84, race: "Undead", className: "Rogue", level: 70, spec: "Mutilate",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [300, 305],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon daggers"], server: "Dreamscythe (PvE)",
    price: 313.99, description: "Mutilate Rogue with partial Wastewalker and blue heroic daggers. WotF for PvP fears. Engineering started. Envenom build doing solid single-target DPS in heroics.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 85, race: "Troll", className: "Shaman", level: 70, spec: "Elemental",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [305, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Cenarion Expedition caster ring"], server: "Spineshatter (PvP)",
    price: 302.99, description: "Ele Shaman with partial Tidefury caster blues and Cenarion Expedition rep ring. Troll Berserking for lightning bolt burst. Jewelcrafting producing uncommon cuts.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 86, race: "Blood Elf", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 290],
    notableItems: ["Frozen Shadoweave (2/3)", "Mana-Etched Regalia (2/5)"], server: "Spineshatter (PvP)",
    price: 329.99, description: "Affliction Warlock with partial Frozen Shadoweave and some Mana-Etched heroic blues. Arcane Torrent for mana tap. DoT build ramping for raid boss fights.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 87, race: "Orc", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Beast Lord Armor (3/5)", "Valanos Longbow"], server: "Spineshatter (PvP)",
    price: 315.99, description: "BM Hunter with partial Beast Lord and the blue longbow from normal Steamvault. Orc pet damage bonus with a well-leveled Ravager. Pre-raid ready for Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 88, race: "Undead", className: "Mage", level: 70, spec: "Frost",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster wand"], server: "Thunderstrike (PvE)",
    price: 304.99, description: "Frost Mage with partial Mana-Etched set and a heroic caster wand. WotF for PvP utility. Frost build good for dungeons and farming. Tailoring progressing toward Spellfire.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 89, race: "Blood Elf", className: "Priest", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 295],
    notableItems: ["Primal Mooncloth Set (2/3)", "Hallowed Raiment (2/5)"], server: "Spineshatter (PvP)",
    price: 343.99, description: "Holy Priest with partial crafted Primal Mooncloth set and some Hallowed dungeon blues. Tailoring well advanced. Blood Elf mana tap for sustain. Strong raid healer.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 90, race: "Troll", className: "Warrior", level: 70, spec: "Fury",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 305],
    notableItems: ["Bold Armor (3/5)", "Dual heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 310.99, description: "Fury Warrior with partial Bold dungeon plate and dual blue heroic swords. Troll Berserking for attack speed burst during execute phase. Solid pre-raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 91, race: "Orc", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [320, 325],
    notableItems: ["Tidefury Raiment (4/5)", "Heroic healing shield"], server: "Spineshatter (PvP)",
    price: 324.99, description: "Resto Shaman with nearly full Tidefury dungeon set and a heroic healing shield. Alchemy producing Mad Alchemist Potions. Chain heal ready for 25-man raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 92, race: "Blood Elf", className: "Rogue", level: 70, spec: "Combat",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [310, 305],
    notableItems: ["Wastewalker Armor (4/5)", "Heroic dungeon maces"], server: "Nightslayer (PvP)",
    price: 327.99, description: "Combat Rogue with nearly full Wastewalker from heroics and blue mace drops for mace spec build. Engineering goggles incoming. Blade Flurry cleave for Karazhan trash.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 93, race: "Undead", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [340, 295],
    notableItems: ["Spellfire Set (2/3)", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 347.99, description: "Destro Lock with partial Spellfire crafted set and a strong heroic caster trinket. WotF racial. Tailoring near max. Shadow bolt build pumping in heroic dungeons.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 94, race: "Troll", className: "Mage", level: 70, spec: "Fire",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Mana-Etched Regalia (4/5)", "KoT rep caster ring"], server: "Spineshatter (PvP)",
    price: 318.99, description: "Fire Mage with nearly full Mana-Etched heroic set and Keepers of Time rep caster ring. Troll Berserking for Fireball spam. Scorch debuff build ready for raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 95, race: "Blood Elf", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 300],
    notableItems: ["Blue PvP honor set (3/5)", "Honor 2H sword"], server: "Spineshatter (PvP)",
    price: 323.99, description: "Ret Paladin with partial blue PvP honor set and honor 2H sword. Seal of Blood for high burst. Arcane Torrent silence for arena combos. Solid BG and arena character.",
    tier: "PvP", status: "available",
  },
  {
    id: 96, race: "Orc", className: "Warrior", level: 70, spec: "Arms",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (2/5)", "Heroic dungeon 2H axe"], server: "Dreamscythe (PvE)",
    price: 294.99, description: "Arms Warrior with partial Bold plate and a blue heroic 2H axe. Orc axe racial bonus. Mortal Strike cleave build. Needs more heroic runs for full pre-raid setup.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 97, race: "Blood Elf", className: "Mage", level: 70, spec: "Arcane",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 295],
    notableItems: ["Mana-Etched Regalia (3/5)", "Scryer rep caster items"], server: "Spineshatter (PvP)",
    price: 312.99, description: "Arcane Mage in partial Mana-Etched with Scryer reputation caster accessories. Arcane Torrent mana return for extended fights. Tailoring approaching Spellfire.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 98, race: "Undead", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [305, 300],
    notableItems: ["Blue PvP honor set (4/5)", "Honor daggers"], server: "Spineshatter (PvP)",
    price: 341.99, description: "Sub Rogue with nearly full blue PvP honor set and honor daggers. WotF plus Cloak of Shadows for ultimate anti-caster kit. Engineering for goggles. Arena nightmare.",
    tier: "PvP", status: "available",
  },
  {
    id: 99, race: "Troll", className: "Priest", level: 70, spec: "Shadow",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 290],
    notableItems: ["Frozen Shadoweave Set", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 349.99, description: "Shadow Priest with full Frozen Shadoweave 3-piece and a solid heroic caster trinket. Troll Berserking for shadowbolt weaving. Vampiric Touch mana battery for raid groups.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 100, race: "Orc", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 315],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic dungeon fists"], server: "Spineshatter (PvP)",
    price: 299.99, description: "Enh Shaman with partial Tidefury and heroic fist weapons. Orc Blood Fury plus Windfury procs. Stormstrike build doing solid melee DPS. Heroic dungeon ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 101, race: "Blood Elf", className: "Warlock", level: 70, spec: "Demonology",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster offhand"], server: "Thunderstrike (PvE)",
    price: 306.99, description: "Demo Warlock with partial Mana-Etched and a heroic caster offhand. Felguard tanking heroic trash. Arcane Torrent for mana. Soul Link build for survivability.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 102, race: "Troll", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 320],
    notableItems: ["Beast Lord Armor (4/5)", "Heroic dungeon gun"], server: "Spineshatter (PvP)",
    price: 322.99, description: "BM Hunter with nearly full Beast Lord from heroics and a solid gun drop. Troll Bow Specialization doesnt apply but Berserking compensates. Strong pre-raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 103, race: "Blood Elf", className: "Paladin", level: 70, spec: "Holy",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [315, 305],
    notableItems: ["Hallowed Raiment (4/5)", "Aldor rep healing pieces"], server: "Spineshatter (PvP)",
    price: 326.99, description: "Holy Paladin with nearly complete Hallowed dungeon healing set and Aldor reputation pieces. Jewelcrafting producing some rare cuts. Flash of Light build raid ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 104, race: "Undead", className: "Mage", level: 70, spec: "Frost",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 290],
    notableItems: ["Blue PvP honor set (3/5)", "Honor caster wand"], server: "Spineshatter (PvP)",
    price: 326.99, description: "Frost Mage with partial blue PvP honor set and honor wand. WotF for arena fear breaks. Ice Block plus Blink kiting. Strong 2v2 and 3v3 arena potential.",
    tier: "PvP", status: "available",
  },
  {
    id: 105, race: "Orc", className: "Warrior", level: 70, spec: "Fury",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 310],
    notableItems: ["Bold Armor (4/5)", "Dual heroic dungeon axes"], server: "Spineshatter (PvP)",
    price: 331.99, description: "Fury Warrior with nearly full Bold set and dual heroic axes. Orc axe racial making these hit extra hard. Whirlwind and Rampage build pumping in dungeons.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 106, race: "Blood Elf", className: "Rogue", level: 70, spec: "Combat",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [315, 305],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon swords"], server: "Nightslayer (PvP)",
    price: 316.99, description: "Combat Rogue with partial Wastewalker and blue heroic swords. Engineering near goggles. Arcane Torrent for interrupt. Blade Flurry cleave DPS build.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 107, race: "Troll", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [315, 325],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic healing trinket"], server: "Spineshatter (PvP)",
    price: 309.99, description: "Resto Shaman with partial Tidefury and a solid heroic healing trinket. Alchemy producing flasks. Chain heal spam build ready for Karazhan and Gruul.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 108, race: "Undead", className: "Priest", level: 70, spec: "Discipline",
    faction: "Horde", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 295],
    notableItems: ["Blue PvP honor set (3/5)", "Honor healing mace and shield"], server: "Spineshatter (PvP)",
    price: 333.99, description: "Disc Priest with partial PvP honor set and honor healing weapons. WotF for fear immunity. Pain Suppression and Power Infusion. The most wanted arena healer in TBC.",
    tier: "PvP", status: "available",
  },
  {
    id: 109, race: "Blood Elf", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 290],
    notableItems: ["Spellfire Set (2/3)", "Mana-Etched Regalia (2/5)"], server: "Spineshatter (PvP)",
    price: 338.99, description: "Destro Lock with partial Spellfire and Mana-Etched blues. Arcane Torrent mana tap. Tailoring progressing toward full Spellfire. Shadowbolt spam build for raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 110, race: "Orc", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Horde", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Beast Lord Armor (3/5)", "Heroic dungeon crossbow"], server: "Dreamscythe (PvE)",
    price: 311.99, description: "BM Hunter with partial Beast Lord and a heroic crossbow. Orc pet damage bonus with Ravager pet. Steady shot rotation mastered. Ready for Karazhan DPS slot.",
    tier: "Pre-Raid", status: "available",
  },
  // ── ALLIANCE BATCH 2 (111-160) ──────────────────────────────
  {
    id: 111, race: "Human", className: "Warrior", level: 70, spec: "Arms",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 310],
    notableItems: ["Bold Armor (3/5)", "Heroic dungeon 2H sword"], server: "Spineshatter (PvP)",
    price: 307.99, description: "Arms Warrior with partial Bold plate and a heroic 2H sword. Human sword racial bonus. Perception for rogue detection in arenas. Mortal Strike build ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 112, race: "Draenei", className: "Paladin", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [310, 305],
    notableItems: ["Hallowed Raiment (4/5)", "Sha'tar rep healing gear"], server: "Spineshatter (PvP)",
    price: 323.99, description: "Holy Paladin with nearly full Hallowed dungeon set and Sha'tar reputation healing accessories. Draenei HoT racial. Jewelcrafting started. Karazhan healer ready.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 113, race: "Night Elf", className: "Druid", level: 70, spec: "Feral",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Wastewalker Armor (3/5)", "Earthwarden"], server: "Spineshatter (PvP)",
    price: 331.99, description: "Feral Bear tank with partial Wastewalker and the Earthwarden mace from Cenarion Expedition rep. Shadowmeld for threat drops. Ready to main tank heroic dungeons.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 114, race: "Gnome", className: "Mage", level: 70, spec: "Arcane",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 300],
    notableItems: ["Spellfire Set (2/3)", "Mana-Etched Regalia (3/5)"], server: "Nightslayer (PvP)",
    price: 343.99, description: "Arcane Mage with partial Spellfire and Mana-Etched blues. Gnome Escape Artist for PvP roots. Extra intellect racial. Tailoring approaching full Spellfire.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 115, race: "Human", className: "Rogue", level: 70, spec: "Combat",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [310, 305],
    notableItems: ["Wastewalker Armor (4/5)", "Heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 328.99, description: "Combat Rogue with nearly full Wastewalker and heroic sword drops. Human sword racial for extra expertise. Perception for arena rogue matchups. Engineering started.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 116, race: "Draenei", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [315, 325],
    notableItems: ["Tidefury Raiment (4/5)", "Heroic healing trinket"], server: "Spineshatter (PvP)",
    price: 319.99, description: "Resto Shaman with nearly full Tidefury dungeon set and a solid healing trinket. Draenei HoT racial stacks with chain heal. Alchemy producing raid flasks.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 117, race: "Night Elf", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Beast Lord Armor (3/5)", "Valanos Longbow"], server: "Dreamscythe (PvE)",
    price: 312.99, description: "BM Hunter with partial Beast Lord and Valanos Longbow. Shadowmeld for feign death combos. Night Elf dodge bonus. Strong pre-raid DPS with Ravager pet.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 118, race: "Human", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [340, 295],
    notableItems: ["Spellfire Set (3/3)", "Heroic caster offpieces"], server: "Spineshatter (PvP)",
    price: 357.99, description: "Destro Warlock with full Spellfire 3-piece and heroic caster offpieces. Tailoring maxed. Human spirit bonus for life tap efficiency. Top-tier pre-raid caster DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 119, race: "Dwarf", className: "Priest", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 295],
    notableItems: ["Primal Mooncloth Set (2/3)", "Hallowed Raiment (2/5)"], server: "Spineshatter (PvP)",
    price: 341.99, description: "Holy Priest with partial Primal Mooncloth crafted set and Hallowed blues. Dwarf Fear Ward is essential for raid encounters. Stoneform for poison removal.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 120, race: "Gnome", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 290],
    notableItems: ["Frozen Shadoweave Set", "Heroic caster trinket"], server: "Thunderstrike (PvE)",
    price: 345.99, description: "Affliction Lock with full Frozen Shadoweave 3-piece and a solid caster trinket. Gnome Escape Artist for PvP roots and slows. Extra intellect for larger mana pool.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 121, race: "Human", className: "Paladin", level: 70, spec: "Protection",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 305],
    notableItems: ["Righteous Armor (4/5)", "Heroic tanking shield"], server: "Spineshatter (PvP)",
    price: 329.99, description: "Prot Paladin with nearly full Righteous dungeon set and a heroic tanking shield. Human sword expertise bonus. Consecration AoE tanking for heroics and Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 122, race: "Night Elf", className: "Druid", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 315],
    notableItems: ["Moonglade Raiment (4/5)", "Cenarion rep healing pieces"], server: "Spineshatter (PvP)",
    price: 321.99, description: "Resto Druid healer with nearly full Moonglade dungeon healing set and Cenarion rep pieces. Lifebloom HoT stacking ready. Shadowmeld for dungeon wipe recovery.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 123, race: "Gnome", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [310, 300],
    notableItems: ["Blue PvP honor set (4/5)", "Honor daggers"], server: "Spineshatter (PvP)",
    price: 339.99, description: "Sub Rogue with nearly full blue PvP honor set and honor daggers. Escape Artist for root breaks. Engineering for goggles. Top-tier arena opener burst.",
    tier: "PvP", status: "available",
  },
  {
    id: 124, race: "Draenei", className: "Warrior", level: 70, spec: "Fury",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Bold Armor (4/5)", "Dual heroic dungeon maces"], server: "Nightslayer (PvP)",
    price: 325.99, description: "Fury Warrior with nearly full Bold plate and dual heroic maces. Draenei HoT racial for self-sustain. Hit rating bonus from Heroic Presence. Solid pre-raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 125, race: "Human", className: "Mage", level: 70, spec: "Fire",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 295],
    notableItems: ["Mana-Etched Regalia (4/5)", "KoT rep caster ring"], server: "Spineshatter (PvP)",
    price: 317.99, description: "Fire Mage with nearly full Mana-Etched heroic blues and Keepers of Time rep ring. Human spirit bonus for mana regen. Scorch debuff build for raid support DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 126, race: "Night Elf", className: "Hunter", level: 70, spec: "Marksmanship",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Beast Lord Armor (2/5)", "Sonic Spear"], server: "Spineshatter (PvP)",
    price: 298.99, description: "Marks Hunter with partial Beast Lord and Sonic Spear from heroic Underbog. Shadowmeld for feign death macro combos. Night Elf dodge. Trueshot Aura for raid groups.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 127, race: "Draenei", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Blue PvP honor set (3/5)", "Honor 2H mace"], server: "Spineshatter (PvP)",
    price: 319.99, description: "Ret Paladin with partial blue PvP honor set and honor 2H mace. Draenei Heroic Presence for hit. Seal of Command crits devastating in battlegrounds.",
    tier: "PvP", status: "available",
  },
  {
    id: 128, race: "Dwarf", className: "Priest", level: 70, spec: "Discipline",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Blue PvP honor set (4/5)", "Honor healing mace"], server: "Spineshatter (PvP)",
    price: 343.99, description: "Disc Priest with nearly full PvP honor set and honor healing mace. Dwarf Fear Ward essential for arena. Stoneform removes bleeds and poisons. Top arena healer.",
    tier: "PvP", status: "available",
  },
  {
    id: 129, race: "Human", className: "Warlock", level: 70, spec: "Demonology",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster offhand"], server: "Thunderstrike (PvE)",
    price: 303.99, description: "Demo Warlock with partial Mana-Etched and heroic offhand. Felguard tank build for heroic dungeons. Human spirit bonus for life tap. Soul Link survivability.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 130, race: "Night Elf", className: "Druid", level: 70, spec: "Balance",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 315],
    notableItems: ["Moonglade Raiment (3/5)", "Heroic caster leather offpieces"], server: "Spineshatter (PvP)",
    price: 308.99, description: "Boomkin with partial Moonglade set and heroic caster leather offpieces. Moonkin Form aura boosts raid caster DPS. Shadowmeld utility. Innervate for healers.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 131, race: "Gnome", className: "Mage", level: 70, spec: "Frost",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 285],
    notableItems: ["Blue PvP honor set (4/5)", "Honor caster staff"], server: "Spineshatter (PvP)",
    price: 335.99, description: "Frost Mage with nearly full blue PvP honor set and honor caster staff. Gnome Escape Artist breaks roots. Extra intellect. Ice Block plus Blink kiting master.",
    tier: "PvP", status: "available",
  },
  {
    id: 132, race: "Human", className: "Warrior", level: 70, spec: "Protection",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (4/5)", "Heroic tanking sword and shield"], server: "Dreamscythe (PvE)",
    price: 326.99, description: "Prot Warrior tank with nearly full Bold plate and heroic tanking sword plus shield. Human sword racial for expertise. Shield Block build ready for Karazhan.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 133, race: "Draenei", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic dungeon fists"], server: "Spineshatter (PvP)",
    price: 301.99, description: "Enh Shaman with partial Tidefury and heroic fist weapons. Draenei Heroic Presence hit rating bonus. Windfury procs with fist weapons. Stormstrike melee build.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 134, race: "Night Elf", className: "Rogue", level: 70, spec: "Mutilate",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [305, 300],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon daggers"], server: "Spineshatter (PvP)",
    price: 315.99, description: "Mutilate Rogue with partial Wastewalker and heroic dagger drops. Shadowmeld for restealth combos. Envenom poison build doing strong single-target in heroics.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 135, race: "Human", className: "Paladin", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Alchemy", "Herbalism"], profSkills: [320, 325],
    notableItems: ["Hallowed Raiment (3/5)", "Lower City healing blues"], server: "Nightslayer (PvP)",
    price: 313.99, description: "Holy Paladin with partial Hallowed set and Lower City reputation healing gear. Alchemy producing Elixirs. Human racial Perception. Flash of Light build for raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 136, race: "Gnome", className: "Warlock", level: 70, spec: "Destruction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 295],
    notableItems: ["Spellfire Set (2/3)", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 347.99, description: "Destro Lock with partial Spellfire and a strong heroic caster trinket. Gnome intellect bonus for larger mana pool. Escape Artist utility. Shadowbolt spam build.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 137, race: "Draenei", className: "Warrior", level: 70, spec: "Arms",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Blue PvP honor set (3/5)", "Honor 2H mace"], server: "Spineshatter (PvP)",
    price: 321.99, description: "Arms Warrior with partial blue PvP honor set and a blue honor 2H mace. Draenei Heroic Presence for hit. Mortal Strike build crushing in battlegrounds.",
    tier: "PvP", status: "available",
  },
  {
    id: 138, race: "Night Elf", className: "Druid", level: 70, spec: "Feral",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 320],
    notableItems: ["Wastewalker Armor (4/5)", "Heroic dungeon staff"], server: "Spineshatter (PvP)",
    price: 323.99, description: "Feral Cat DPS with nearly full Wastewalker and a heroic dungeon feral staff. Shadowmeld prowl opener. Shred and Rip bleed build doing solid dungeon DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 139, race: "Human", className: "Rogue", level: 70, spec: "Combat",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [315, 305],
    notableItems: ["Wastewalker Armor (3/5)", "Heroic dungeon maces"], server: "Dreamscythe (PvE)",
    price: 318.99, description: "Combat Rogue with partial Wastewalker and heroic maces for mace spec build. Human mace racial bonus for extra procs. Blade Flurry cleave. Engineering near goggles.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 140, race: "Draenei", className: "Shaman", level: 70, spec: "Elemental",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Jewelcrafting", "Mining"], profSkills: [305, 310],
    notableItems: ["Tidefury Raiment (3/5)", "Heroic caster offhand"], server: "Spineshatter (PvP)",
    price: 303.99, description: "Ele Shaman with partial Tidefury caster blues and heroic offhand. Draenei Heroic Presence for spell hit. Lightning bolt burst build. Jewelcrafting producing cuts.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 141, race: "Dwarf", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 320],
    notableItems: ["Beast Lord Armor (4/5)", "Heroic dungeon gun"], server: "Spineshatter (PvP)",
    price: 324.99, description: "BM Hunter with nearly full Beast Lord and a heroic gun drop. Dwarf gun specialization bonus. Stoneform removes poisons. Solid pre-raid DPS with Bear pet.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 142, race: "Night Elf", className: "Priest", level: 70, spec: "Shadow",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [335, 290],
    notableItems: ["Frozen Shadoweave Set", "Heroic caster wand"], server: "Thunderstrike (PvE)",
    price: 344.99, description: "Shadow Priest with full Frozen Shadoweave 3-piece and a heroic wand. Shadowmeld for drink breaks in PvP. Starshards racial. Vampiric Touch mana battery for raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 143, race: "Human", className: "Mage", level: 70, spec: "Arcane",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Mana-Etched Regalia (3/5)", "Scryer rep caster items"], server: "Spineshatter (PvP)",
    price: 311.99, description: "Arcane Mage with partial Mana-Etched and Scryer rep caster accessories. Human spirit for mana regen. Arcane Blast spam build doing strong burst DPS.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 144, race: "Gnome", className: "Rogue", level: 70, spec: "Combat",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Engineering", "Mining"], profSkills: [305, 300],
    notableItems: ["Wastewalker Armor (2/5)", "Heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 303.99, description: "Combat Rogue with partial Wastewalker and heroic sword drops. Escape Artist for root breaks mid-combat. Engineering started. Needs more heroic farming for full set.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 145, race: "Draenei", className: "Paladin", level: 70, spec: "Retribution",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 305],
    notableItems: ["Righteous Armor (3/5)", "Heroic dungeon 2H sword"], server: "Spineshatter (PvP)",
    price: 314.99, description: "Ret Paladin with partial Righteous plate and a heroic 2H sword. Draenei Heroic Presence. Seal of Command crits for burst DPS. Approaching Karazhan readiness.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 146, race: "Night Elf", className: "Druid", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 315],
    notableItems: ["Blue PvP honor set (3/5)", "Honor healing staff"], server: "Nightslayer (PvP)",
    price: 327.99, description: "Resto Druid with partial PvP honor set and honor healing staff. Shadowmeld for drink breaks in arenas. HoT rolling in PvP is incredibly strong. Cyclone control.",
    tier: "PvP", status: "available",
  },
  {
    id: 147, race: "Human", className: "Warrior", level: 70, spec: "Fury",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [320, 310],
    notableItems: ["Bold Armor (3/5)", "Dual heroic dungeon swords"], server: "Spineshatter (PvP)",
    price: 316.99, description: "Fury Warrior with partial Bold plate and dual heroic swords. Human sword racial for extra expertise on both weapons. Whirlwind cleave build for dungeons.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 148, race: "Draenei", className: "Shaman", level: 70, spec: "Restoration",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Alchemy", "Herbalism"], profSkills: [315, 320],
    notableItems: ["Blue PvP honor set (3/5)", "Honor healing shield"], server: "Spineshatter (PvP)",
    price: 329.99, description: "Resto Shaman with partial PvP honor set and honor healing shield. Draenei HoT racial stacks with Earth Shield. Alchemy for arena potions. Strong 3v3 healer.",
    tier: "PvP", status: "available",
  },
  {
    id: 149, race: "Night Elf", className: "Hunter", level: 70, spec: "Survival",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [300, 315],
    notableItems: ["Beast Lord Armor (3/5)", "Heroic dungeon bow"], server: "Spineshatter (PvP)",
    price: 309.99, description: "Survival Hunter with partial Beast Lord and a heroic bow. Shadowmeld for trap combos. Expose Weakness debuff for raid melee groups. Night Elf dodge bonus.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 150, race: "Human", className: "Warlock", level: 70, spec: "Affliction",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [340, 295],
    notableItems: ["Frozen Shadoweave Set", "Mana-Etched Regalia (1/5)"], server: "Dreamscythe (PvE)",
    price: 348.99, description: "Affliction Lock with full Frozen Shadoweave 3-piece and one Mana-Etched blue. Tailoring maxed. Human spirit for life tap efficiency. DoT build for raid bosses.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 151, race: "Dwarf", className: "Priest", level: 70, spec: "Holy",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [330, 290],
    notableItems: ["Hallowed Raiment (4/5)", "Aldor rep healing trinket"], server: "Spineshatter (PvP)",
    price: 327.99, description: "Holy Priest with nearly full Hallowed dungeon set and Aldor rep healing trinket. Dwarf Fear Ward crucial for raid bosses. Stoneform for poison encounters.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 152, race: "Gnome", className: "Mage", level: 70, spec: "Fire",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster trinket"], server: "Spineshatter (PvP)",
    price: 313.99, description: "Fire Mage with partial Mana-Etched and a strong heroic caster trinket. Gnome intellect bonus. Escape Artist. Scorch debuff build for raid DPS support.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 153, race: "Night Elf", className: "Druid", level: 70, spec: "Feral",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Leatherworking", "Skinning"], profSkills: [310, 320],
    notableItems: ["Blue PvP honor set (3/5)", "Honor feral staff"], server: "Spineshatter (PvP)",
    price: 331.99, description: "Feral Cat Druid with partial PvP honor set and honor feral staff. Shadowmeld prowl for restealth in arenas. Mangle bleed pressure. Cyclone and root utility.",
    tier: "PvP", status: "available",
  },
  {
    id: 154, race: "Human", className: "Rogue", level: 70, spec: "Subtlety",
    faction: "Alliance", gearTier: "PvP Geared", professions: ["Engineering", "Mining"], profSkills: [310, 305],
    notableItems: ["Blue PvP honor set (4/5)", "Honor daggers"], server: "Thunderstrike (PvE)",
    price: 341.99, description: "Sub Rogue with nearly full PvP honor set and honor daggers. Human Perception for mirror matchups. Shadowstep plus Preparation. Engineering near goggles.",
    tier: "PvP", status: "available",
  },
  {
    id: 155, race: "Draenei", className: "Paladin", level: 70, spec: "Protection",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [315, 310],
    notableItems: ["Righteous Armor (3/5)", "Heroic tanking sword and shield"], server: "Spineshatter (PvP)",
    price: 317.99, description: "Prot Paladin with partial Righteous plate and heroic tanking sword with shield. Draenei HoT racial. Consecration AoE tanking build for heroics and early raids.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 156, race: "Night Elf", className: "Hunter", level: 70, spec: "Beast Mastery",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 315],
    notableItems: ["Beast Lord Armor (2/5)", "Heroic dungeon crossbow"], server: "Spineshatter (PvP)",
    price: 297.99, description: "BM Hunter with partial Beast Lord and heroic crossbow. Shadowmeld macro combos. Night Elf agility bonus. Needs more Beast Lord pieces from heroic runs.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 157, race: "Dwarf", className: "Warrior", level: 70, spec: "Arms",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Blacksmithing", "Mining"], profSkills: [310, 305],
    notableItems: ["Bold Armor (3/5)", "Heroic dungeon 2H mace"], server: "Spineshatter (PvP)",
    price: 306.99, description: "Arms Warrior with partial Bold plate and heroic 2H mace. Dwarf Stoneform removes bleeds in PvP. Mace specialization stun procs. Mortal Strike build.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 158, race: "Gnome", className: "Warlock", level: 70, spec: "Demonology",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [320, 285],
    notableItems: ["Mana-Etched Regalia (3/5)", "Heroic caster offhand"], server: "Nightslayer (PvP)",
    price: 305.99, description: "Demo Warlock with partial Mana-Etched and heroic offhand. Felguard tank build. Gnome intellect bonus for larger mana pool. Escape Artist utility in dungeons.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 159, race: "Human", className: "Mage", level: 70, spec: "Frost",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Tailoring", "Enchanting"], profSkills: [325, 290],
    notableItems: ["Mana-Etched Regalia (2/5)", "Normal dungeon caster offpieces"], server: "Spineshatter (PvP)",
    price: 289.99, description: "Frost Mage with partial Mana-Etched and normal dungeon caster gear. Human spirit for regen. Frost build good for dungeon farming and leveling alts via boosts.",
    tier: "Pre-Raid", status: "available",
  },
  {
    id: 160, race: "Draenei", className: "Shaman", level: 70, spec: "Enhancement",
    faction: "Alliance", gearTier: "Pre-Raid Geared", professions: ["Leatherworking", "Skinning"], profSkills: [305, 310],
    notableItems: ["Tidefury Raiment (2/5)", "Heroic dungeon axes"], server: "Spineshatter (PvP)",
    price: 295.99, description: "Enh Shaman with partial Tidefury and heroic dungeon axes. Draenei Heroic Presence for melee hit. Windfury procs with axes. Stormstrike build for pre-raid DPS.",
    tier: "Pre-Raid", status: "available",
  },
]

const allClasses = ["All", ...Array.from(new Set(characters.map((c) => c.className))).sort()]
const allFactions = ["All", "Horde", "Alliance"]
const allTiers = ["All", "T4", "Pre-Raid", "PvP"]

const factionColors = {
  Horde: "text-red-400 bg-red-500/10 border-red-500/30",
  Alliance: "text-blue-400 bg-blue-500/10 border-blue-500/30",
}

const tierColors: Record<string, string> = {
  T4: "text-gold bg-gold/10 border-gold/30",
  "Pre-Raid": "text-parchment/60 bg-parchment/5 border-parchment/20",
  PvP: "text-fel-orange-glow bg-fel-orange/10 border-fel-orange/30",
}

const classImages: Record<string, string> = {
  Paladin: "/images/classes/paladin.jpg",
  Hunter: "/images/classes/hunter.jpg",
  Warrior: "/images/classes/warrior.jpg",
  Rogue: "/images/classes/rogue.jpg",
  Warlock: "/images/classes/warlock.jpg",
  Shaman: "/images/classes/shaman.jpg",
  Mage: "/images/classes/mage.jpg",
  Priest: "/images/classes/priest.jpg",
  Druid: "/images/classes/druid.jpg",
}

const classColors: Record<string, string> = {
  Warrior: "text-[#C79C6E]",
  Paladin: "text-[#F58CBA]",
  Hunter: "text-[#ABD473]",
  Rogue: "text-[#FFF569]",
  Priest: "text-[#FFFFFF]",
  Shaman: "text-[#0070DE]",
  Mage: "text-[#69CCF0]",
  Warlock: "text-[#9482C9]",
  Druid: "text-[#FF7D0A]",
}

export function CharacterMarketplace() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [factionFilter, setFactionFilter] = useState("All")
  const [tierFilter, setTierFilter] = useState("All")
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "tier">("tier")
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(24)

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 24)
  }, [])

  const filtered = useMemo(() => {
    let result = characters.filter((c) => {
      const matchSearch = search === "" ||
        c.className.toLowerCase().includes(search.toLowerCase()) ||
        c.race.toLowerCase().includes(search.toLowerCase()) ||
        c.spec.toLowerCase().includes(search.toLowerCase()) ||
        c.server.toLowerCase().includes(search.toLowerCase())
      const matchClass = classFilter === "All" || c.className === classFilter
      const matchFaction = factionFilter === "All" || c.faction === factionFilter
      const matchTier = tierFilter === "All" || c.tier === tierFilter
      return matchSearch && matchClass && matchFaction && matchTier
    })

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price)
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price)
    else {
      const tierOrder = { T4: 0, PvP: 1, "Pre-Raid": 2 }
      result.sort((a, b) => (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9))
    }

    return result
  }, [search, classFilter, factionFilter, tierFilter, sortBy])

  const activeFilterCount = [classFilter !== "All", factionFilter !== "All", tierFilter !== "All"].filter(Boolean).length

  return (
    <div>
      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/30" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(24) }}
              placeholder="Search by class, race, spec, or server..."
              className="border-stone bg-stone-dark pl-10 text-parchment placeholder:text-parchment/30"
            />
            {search && (
              <button onClick={() => { setSearch(""); setVisibleCount(24) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/40 hover:text-parchment">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all",
              showFilters || activeFilterCount > 0
                ? "border-gold/40 bg-gold/10 text-gold"
                : "border-stone bg-stone-dark text-parchment/50 hover:border-gold/30"
            )}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-black text-deep-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 rounded-xl border border-stone bg-stone-dark/50 p-4">
            {/* Class filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">Class</span>
              <div className="flex flex-wrap gap-1.5">
                {allClasses.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setClassFilter(c); setVisibleCount(24) }}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all",
                      classFilter === c
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "bg-stone-dark border border-stone text-parchment/50 hover:border-gold/20"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Faction filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">Faction</span>
              <div className="flex gap-1.5">
                {allFactions.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setFactionFilter(f); setVisibleCount(24) }}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all",
                      factionFilter === f
                        ? f === "Horde" ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : f === "Alliance" ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : "bg-gold/20 text-gold border border-gold/40"
                        : "bg-stone-dark border border-stone text-parchment/50 hover:border-gold/20"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">Gear Tier</span>
              <div className="flex flex-wrap gap-1.5">
                {allTiers.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTierFilter(t); setVisibleCount(24) }}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all",
                      tierFilter === t
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "bg-stone-dark border border-stone text-parchment/50 hover:border-gold/20"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">Sort By</span>
              <div className="flex gap-1.5">
                {[
                  { value: "tier" as const, label: "Gear Tier" },
                  { value: "price-asc" as const, label: "Price Low" },
                  { value: "price-desc" as const, label: "Price High" },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSortBy(s.value)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all",
                      sortBy === s.value
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "bg-stone-dark border border-stone text-parchment/50 hover:border-gold/20"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setClassFilter("All"); setFactionFilter("All"); setTierFilter("All"); setVisibleCount(24) }}
                className="self-end rounded-md px-3 py-1 text-[11px] font-bold tracking-wider text-parchment/40 underline transition-colors hover:text-gold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-parchment/40">
          Showing <span className="font-bold text-parchment">{Math.min(visibleCount, filtered.length)}</span> of {filtered.length} characters
        </p>
      </div>

      {/* Character grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-stone bg-stone-dark/30 py-16 text-center">
          <Search className="mb-4 h-8 w-8 text-parchment/20" />
          <h3 className="mb-2 text-sm font-bold text-parchment/50">No Characters Found</h3>
          <p className="text-xs text-parchment/30">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visibleCount).map((char) => (
            <article
              key={char.id}
              className={cn(
                "group relative flex flex-col rounded-xl border parchment-card p-5 transition-all duration-300",
                char.status === "reserved"
                  ? "border-parchment/20 opacity-70"
                  : "border-stone hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
              )}
            >
              {/* Status badge */}
              {char.status === "reserved" && (
                <div className="absolute top-3 right-3 rounded-full bg-parchment/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-parchment/40 uppercase">
                  Reserved
                </div>
              )}

              {/* Header */}
              <div className="mb-3 flex items-start gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-stone bg-stone-dark">
                  <img
                    src={classImages[char.className] || "/images/classes/warrior.jpg"}
                    alt={`${char.className} class icon`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className={`text-sm font-bold ${classColors[char.className] || "text-parchment"}`}>
                    {char.race} {char.className}
                  </h3>
                  <p className="text-[11px] text-parchment/40">
                    {char.spec} &middot; Level {char.level}
                  </p>
                </div>
              </div>

              {/* Badges row */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider", factionColors[char.faction])}>
                  {char.faction}
                </span>
                <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider", tierColors[char.tier])}>
                  {char.gearTier}
                </span>
              </div>

              {/* Description */}
              <p className="mb-3 flex-1 text-[11px] leading-relaxed text-parchment/45">
                {char.description}
              </p>

              {/* Notable items */}
              <div className="mb-3">
                <span className="text-[9px] font-bold tracking-wider text-parchment/30 uppercase">Notable Gear</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {char.notableItems.map((item) => (
                    <span key={item} className="rounded bg-stone-dark px-1.5 py-0.5 text-[10px] text-gold/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professions */}
              <div className="mb-3">
                <span className="text-[9px] font-bold tracking-wider text-parchment/30 uppercase">Professions</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {char.professions.map((prof, idx) => (
                    <span key={prof} className="rounded bg-fel-green/5 px-1.5 py-0.5 text-[10px] text-fel-green-glow/60">
                      {prof} ({char.profSkills[idx]}/375)
                    </span>
                  ))}
                </div>
              </div>

              {/* Account Includes */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                <span className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
                  getCharacterExtras(char).emailAccess === "full"
                    ? "border-green-500/20 bg-green-500/5 text-green-400"
                    : "border-amber-500/20 bg-amber-500/5 text-amber-400"
                )}>
                  {getCharacterExtras(char).emailAccess === "full" ? "Full Email Access" : "Fake B.net Mail Included"}
                </span>
                <span className="rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-[10px] font-bold tracking-wider text-gold">
                  {getCharacterExtras(char).goldInBags}g in bags
                </span>
              </div>

              {/* Server + Price + CTA */}
              <div className="flex items-center justify-between border-t border-stone pt-3">
                <div>
                  <p className="text-[10px] text-parchment/30">{char.server}</p>
                  <p className="text-lg font-black text-gold">${char.price.toFixed(2)}</p>
                </div>
                {char.status === "available" ? (
                  <Link
                    href={`/order?service=accounts&char=${char.id}`}
                    className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-[11px] font-bold tracking-wider text-deep-black uppercase transition-all hover:bg-gold-light hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  >
                    Buy Now
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="rounded-lg border border-stone px-4 py-2 text-[11px] font-bold tracking-wider text-parchment/30 uppercase">
                    Reserved
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load More */}
      {filtered.length > visibleCount && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="rounded-lg border border-fel-orange/30 bg-fel-orange/5 px-8 py-3 text-sm font-bold tracking-wider text-fel-orange-glow uppercase transition-all hover:border-fel-orange/60 hover:bg-fel-orange/10 hover:shadow-[0_0_20px_rgba(224,93,32,0.2)]"
          >
            Load More Characters ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
}
