import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ItemServerPriceTable } from "@/components/item-server-price-table"
import { ArrowRight, Check, Shield, Zap, Clock, ChevronRight, Swords, Trophy, Gem, FlaskConical, Hammer } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type ItemKey =
  | "primal-nether-boost"
  | "primal-fire-farming"
  | "primal-might-transmute"
  | "talbuk-mount-farm"
  | "cenarion-hippogryph-boost"
  | "eye-of-quagmirran-run"
  | "badge-of-justice-farm"
  | "drums-of-battle-kit"
  | "darkmoon-card-vengeance"
  | "raid-consumables-bulk"
  | "spellstrike-whitemend-craft"

interface ItemData {
  name: string
  shortName: string
  category: "Material" | "Mount" | "Trinket" | "Currency" | "Consumable" | "Craft"
  icon: string
  metaTitle: string
  metaDescription: string
  h1: string
  subtitle: string
  heroText: string
  bodyTitle: string
  bodyText: string
  howItWorks: { step: string; desc: string }[]
  priceRange: string
  deliveryTime: string
  serverPrices: { spineshatter: number; thunderstrike: number; nightslayer: number; dreamscythe: number }
  faq: { q: string; a: string }[]
}

const itemData: Record<ItemKey, ItemData> = {
  "primal-nether-boost": {
    name: "Primal Nether",
    shortName: "Primal Nether",
    category: "Material",
    icon: "/images/items/primal-nether.jpg",
    metaTitle: "Buy Primal Nether Service - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy Primal Nether farming service for TBC Classic Anniversary. Dungeon carry runs with reserved Primal Nether loot on Spineshatter, Thunderstrike & all Phase 1 servers.",
    h1: "Buy Primal Nether Service - TBC Anniversary Phase 1",
    subtitle: "Guaranteed Primal Nether Drop - Heroic Dungeon Carry",
    heroText: "Primal Nether is the most sought-after crafting material in TBC Phase 1. Since it is Soulbound, we run you through Heroic dungeons with our geared group and reserve the Nether for you. Essential for crafting Phase 1 BiS items like Spellstrike Hood, Shadowprowler's Chestguard, and Belt of Blasting.",
    bodyTitle: "Why You Need Primal Nether in TBC Phase 1 2026",
    bodyText: "Primal Nether drops from Heroic dungeon final bosses and is required for nearly every Best-in-Slot crafted item in TBC Phase 1. Since it is Bind-on-Pickup, the only way to acquire it is by running Heroics yourself or joining a reserved run. Our boosters are full Karazhan-geared players who clear any Heroic in 20-30 minutes. You join the group, we clear the dungeon, and the Primal Nether goes to you. We support all TBC Anniversary servers including Spineshatter, Thunderstrike, Nightslayer, and Dreamscythe.",
    howItWorks: [
      { step: "Order & Specify", desc: "Tell us your server, faction, and how many Primal Nethers you need." },
      { step: "Group Invite", desc: "Our geared booster team invites you to a Heroic dungeon group." },
      { step: "Dungeon Clear", desc: "We clear the Heroic in 20-30 minutes. You can AFK or participate." },
      { step: "Loot Reserved", desc: "Primal Nether is reserved for you. Need to go again? Same price." },
    ],
    priceRange: "$12.99 - $14.99",
    deliveryTime: "30-60 min",
    serverPrices: { spineshatter: 12.99, thunderstrike: 11.99, nightslayer: 13.49, dreamscythe: 14.99 },
    faq: [
      { q: "How does the Primal Nether service work?", a: "We invite you to our pre-made Heroic dungeon group. Our geared boosters clear the dungeon quickly while the Primal Nether drop is reserved for you via master loot." },
      { q: "How many Primal Nethers can I get per session?", a: "One per Heroic dungeon run. You can order multiple runs - we chain Heroics efficiently with different instances to maximize your Nethers per hour." },
      { q: "Do I need to be level 70 to join?", a: "Yes, you need to be level 70 and have the Heroic key for the specific dungeon. We can help with attunement if needed." },
    ],
  },
  "primal-fire-farming": {
    name: "Primal Fire",
    shortName: "Primal Fire",
    category: "Material",
    icon: "/images/items/primal-fire.jpg",
    metaTitle: "Buy Cheap Primal Fire - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy cheap Primal Fire for TBC Anniversary Edition. Essential for Spellstrike set, Shadoweave crafting, and Flask of Pure Death. All Phase 1 servers supported.",
    h1: "Buy Primal Fire - TBC Anniversary Phase 1",
    subtitle: "Cheapest Primal Fire Delivered to Your Character",
    heroText: "Primal Fire is one of the most in-demand crafting materials in TBC Phase 1. Essential for Spellstrike set, Shadoweave set, Flask of Pure Death, and dozens of other recipes. Skip the crowded Elemental Plateau farming and let us deliver Primal Fire directly to your character.",
    bodyTitle: "Primal Fire Farming Service - Phase 1 2026",
    bodyText: "Primal Fire drops from fire elementals in Hellfire Peninsula and Nagrand's Elemental Plateau, but farming is slow and extremely competitive on high-population servers like Spineshatter. Each Primal Fire requires 10 Mote of Fire, meaning dozens of kills per Primal. Our dedicated farming team produces hundreds of Primal Fires daily across all TBC Anniversary servers. We deliver via face-to-face trade or CoD mail at prices significantly below auction house rates.",
    howItWorks: [
      { step: "Choose Quantity", desc: "Select how many Primal Fire you need." },
      { step: "Pick Server & Faction", desc: "We support all TBC Anniversary servers - Spineshatter, Thunderstrike, Nightslayer, Dreamscythe." },
      { step: "We Farm", desc: "Our farming team gathers Motes of Fire and combines them into Primals." },
      { step: "Delivery", desc: "Primal Fire delivered via face-to-face trade in Shattrath or by CoD mail." },
    ],
    priceRange: "$4.49 - $5.49",
    deliveryTime: "15-60 min",
    serverPrices: { spineshatter: 4.99, thunderstrike: 4.49, nightslayer: 4.79, dreamscythe: 5.49 },
    faq: [
      { q: "What is the price per Primal Fire?", a: "Primal Fire costs $4.49-$5.49 each depending on server population and stock. Bulk orders of 10+ receive a 10% discount." },
      { q: "How is delivery handled?", a: "We deliver via face-to-face trade in Shattrath City or major capital cities. We can also send via CoD mail if preferred." },
      { q: "Can I buy other Primals too?", a: "Yes! We sell all Primal types: Fire, Water, Earth, Air, Life, Mana, and Shadow. We also sell Primal Might separately. Ask on Discord for bulk pricing." },
    ],
  },
  "primal-might-transmute": {
    name: "Primal Might",
    shortName: "Primal Might",
    category: "Material",
    icon: "/images/items/primal-might.jpg",
    metaTitle: "Buy Primal Might - TBC Anniversary Phase 1 Cheapest Price 2026",
    metaDescription: "Buy Primal Might for TBC Anniversary Edition. Created via Alchemy transmute, essential for Spellstrike, Whitemend, and epic crafted gear. All Phase 1 servers.",
    h1: "Buy Primal Might - TBC Anniversary Phase 1",
    subtitle: "Alchemy Transmute Primal Might - No Cooldown Waiting",
    heroText: "Primal Might is the rarest and most valuable crafting material in TBC Phase 1. Created by Alchemists via a 24-hour transmute cooldown, it's required for Spellstrike set, Whitemend set, Lionheart Executioner, and many other epic crafted items. Don't wait days for cooldowns -- buy Primal Might directly.",
    bodyTitle: "Primal Might Service - Phase 1 2026",
    bodyText: "Primal Might is created via Alchemy Transmute: Primal Might, which requires 1 Primal Fire, 1 Primal Water, 1 Primal Earth, 1 Primal Air, and 1 Primal Mana. The transmute has a 24-hour cooldown per Alchemist, making Primal Might extremely scarce and expensive on the auction house. Our team operates dozens of max-level Alchemists across all TBC Anniversary servers, producing Primal Might daily. We deliver at prices well below AH rates.",
    howItWorks: [
      { step: "Choose Quantity", desc: "Select how many Primal Might you need." },
      { step: "Pick Server & Faction", desc: "We support all TBC Anniversary servers - Spineshatter, Thunderstrike, Nightslayer, Dreamscythe." },
      { step: "We Transmute", desc: "Our Alchemists transmute Primal Might using their daily cooldowns." },
      { step: "Delivery", desc: "Primal Might delivered via face-to-face trade in Shattrath or by CoD mail." },
    ],
    priceRange: "$13.99 - $15.99",
    deliveryTime: "1-24 hrs",
    serverPrices: { spineshatter: 14.99, thunderstrike: 13.99, nightslayer: 14.49, dreamscythe: 15.99 },
    faq: [
      { q: "Why is Primal Might so expensive?", a: "Primal Might requires a 24-hour Alchemy cooldown and 5 different Primals to create. Supply is very limited compared to the massive demand for epic crafted gear in Phase 1." },
      { q: "How fast is Primal Might delivery?", a: "Delivery depends on stock. If we have Primal Might in stock, delivery is within 30 minutes. If we need to transmute, it may take up to 24 hours." },
      { q: "Can I buy Primal Might in bulk?", a: "Yes! Orders of 5+ Primal Might receive a 10% discount. Contact us on Discord for large order pricing." },
    ],
  },
  "talbuk-mount-farm": {
    name: "Kurenai / Mag'har War Talbuk",
    shortName: "War Talbuk",
    category: "Mount",
    icon: "/images/items/talbuk-mount.jpg",
    metaTitle: "Kurenai Reputation Boost - War Talbuk Mount TBC Anniversary 2026",
    metaDescription: "Buy Kurenai or Mag'har reputation boost for TBC Anniversary. Get the prestigious War Talbuk mount without the Nagrand grind. All Phase 1 servers.",
    h1: "Kurenai / Mag'har War Talbuk Mount Boost - TBC Phase 1",
    subtitle: "Skip the Nagrand Grind - Get Your Talbuk",
    heroText: "The War Talbuk is the ultimate prestige mount in TBC Classic. Requires Exalted reputation with Kurenai (Alliance) or Mag'har (Horde) through a massive Nagrand reputation grind. Our boosters handle the entire grind - from Friendly to Exalted - while you relax. Available on all TBC Anniversary Phase 1 servers.",
    bodyTitle: "Kurenai / Mag'har Reputation Boost - Phase 1 2026",
    bodyText: "Reaching Exalted with Kurenai or Mag'har requires killing thousands of Ogres in Nagrand and completing the full Nagrand quest chain. This grind typically takes 15-25 hours of focused farming. Our boosters complete this reputation grind efficiently using optimized routes through Laughing Skull Ruins and Warmaul Hill. Once Exalted, the War Talbuk mount costs 70g from the faction vendor. This is one of the rarest and most impressive mounts in TBC Phase 1.",
    howItWorks: [
      { step: "Share Account Safely", desc: "We set up secure VPN matching your region for safe play." },
      { step: "Nagrand Quests", desc: "Complete the full Nagrand quest chain for initial reputation." },
      { step: "Ogre Farming", desc: "Farm Ogres in Laughing Skull Ruins / Warmaul Hill to Exalted." },
      { step: "Mount Purchased", desc: "We buy the War Talbuk from the vendor. Your new mount awaits!" },
    ],
    priceRange: "$49.99 - $59.99",
    deliveryTime: "2-3 days",
    serverPrices: { spineshatter: 49.99, thunderstrike: 49.99, nightslayer: 52.99, dreamscythe: 54.99 },
    faq: [
      { q: "How long does the Talbuk reputation grind take?", a: "Our boosters complete Friendly to Exalted in 2-3 days with optimized farming routes. The actual playtime is approximately 15-20 hours." },
      { q: "Is my account safe during the reputation boost?", a: "Absolutely. We use premium VPN matching your region, play during your normal hours, and follow natural play patterns. Zero ban rate across all boosts." },
      { q: "Which Talbuk color do I get?", a: "At Exalted you can purchase all 8 Talbuk color variants from the vendor. We buy the one you specify, or you can choose yourself after the boost." },
    ],
  },
  "cenarion-hippogryph-boost": {
    name: "Cenarion War Hippogryph",
    shortName: "Hippogryph",
    category: "Mount",
    icon: "/images/items/cenarion-hippogryph.jpg",
    metaTitle: "Cenarion Expedition Exalted Boost - Hippogryph Mount TBC 2026",
    metaDescription: "Buy Cenarion Expedition Exalted boost for TBC Anniversary. Get the rare Cenarion War Hippogryph flying mount. All Phase 1 servers supported.",
    h1: "Cenarion War Hippogryph Mount Boost - TBC Anniversary Phase 1",
    subtitle: "Cenarion Expedition Exalted + Hippogryph Mount",
    heroText: "The Cenarion War Hippogryph is one of the rarest flying mounts in TBC Classic. Requires Exalted reputation with Cenarion Expedition and 2,000 gold. Our boosters grind the reputation through Steamvault runs and turn-ins, then purchase the mount for you. A true status symbol in Phase 1 2026.",
    bodyTitle: "Cenarion Expedition Exalted Boost - Phase 1 2026",
    bodyText: "Cenarion Expedition reputation is earned through Slave Pens, Underbog, and Steamvault runs, plus Unidentified Plant Parts turn-ins and Coilfang Armaments. Reaching Exalted typically requires 15-20 Steamvault runs plus supplementary methods. The Cenarion War Hippogryph costs 2,000g at Exalted - a significant investment, but one of the most visually stunning mounts in the game. Our boosters complete this grind efficiently over 3-4 days.",
    howItWorks: [
      { step: "Account Setup", desc: "Secure VPN connection matching your region and playtimes." },
      { step: "Reputation Farming", desc: "Steamvault runs, Plant Parts, and Coilfang Armaments turn-ins." },
      { step: "Reach Exalted", desc: "Our boosters push through Revered and into Exalted efficiently." },
      { step: "Mount Purchased", desc: "2,000g spent on the Cenarion War Hippogryph from the vendor." },
    ],
    priceRange: "$59.99 - $69.99",
    deliveryTime: "3-4 days",
    serverPrices: { spineshatter: 59.99, thunderstrike: 57.99, nightslayer: 62.99, dreamscythe: 64.99 },
    faq: [
      { q: "Does the Hippogryph mount cost include the 2,000g?", a: "Yes, the price includes the full reputation grind AND the 2,000g vendor purchase. No hidden costs." },
      { q: "Do I need epic flying for the Hippogryph?", a: "The Cenarion War Hippogryph requires epic flying skill (5,000g). If you don't have it yet, check our gold service for funding." },
      { q: "How long does Cenarion Expedition rep take?", a: "Our boosters complete it in 3-4 days using optimized Steamvault farming plus supplementary turn-ins." },
    ],
  },
  "eye-of-quagmirran-run": {
    name: "Eye of Quagmirran",
    shortName: "Eye of Quagmirran",
    category: "Trinket",
    icon: "/images/items/eye-of-quagmirran.jpg",
    metaTitle: "Eye of Quagmirran Reserved Run - Heroic Slave Pens TBC 2026",
    metaDescription: "Buy Eye of Quagmirran reserved loot run in Heroic Slave Pens for TBC Anniversary. BiS caster trinket Phase 1. All servers supported.",
    h1: "Eye of Quagmirran Reserved Run - TBC Anniversary Phase 1",
    subtitle: "BiS Caster Trinket - Heroic Slave Pens Carry",
    heroText: "Eye of Quagmirran is the absolute Best-in-Slot trinket for every caster class in TBC Phase 1. Drops from Quagmirran in Heroic Slave Pens with approximately a 15% drop rate. Our geared boosters carry you through Heroic Slave Pens runs until it drops, with the trinket reserved for you.",
    bodyTitle: "Eye of Quagmirran Farm - Phase 1 BiS Caster Trinket 2026",
    bodyText: "Every Mage, Warlock, Shadow Priest, and Elemental Shaman needs Eye of Quagmirran for TBC Phase 1. This trinket provides 37 spell haste rating on use - an incredibly powerful effect at this stage of the game. With a ~15% drop rate from Quagmirran in Heroic Slave Pens, you can expect to need 5-8 runs on average. Our boost team clears Heroic Slave Pens in 15-20 minutes per run. We run until it drops - guaranteed. Available on Spineshatter, Thunderstrike, Nightslayer, and Dreamscythe.",
    howItWorks: [
      { step: "Order & Pick Server", desc: "Tell us your server, faction, and character class." },
      { step: "Group Invite", desc: "Our geared boosters invite you to Heroic Slave Pens." },
      { step: "Speed Clear", desc: "We clear the dungeon in 15-20 minutes. You can AFK." },
      { step: "Repeat Until Drop", desc: "We run until Eye of Quagmirran drops. It is reserved for you." },
    ],
    priceRange: "$24.99 - $29.99",
    deliveryTime: "1-4 hours",
    serverPrices: { spineshatter: 24.99, thunderstrike: 23.99, nightslayer: 26.99, dreamscythe: 29.99 },
    faq: [
      { q: "What if Eye of Quagmirran doesn't drop?", a: "We guarantee the drop. We run Heroic Slave Pens as many times as needed (daily lockout resets) until it drops. The price covers all runs." },
      { q: "Is this a carry or a self-play service?", a: "You join our group and enter the dungeon. Our boosters do all the work. You can AFK at the entrance or participate - your choice." },
      { q: "How many runs does it usually take?", a: "With a ~15% drop rate, it averages 5-8 runs. Some players get it on the first run, others take more. We guarantee the drop regardless." },
    ],
  },
  "badge-of-justice-farm": {
    name: "Badge of Justice Farming",
    shortName: "Badge Farm",
    category: "Currency",
    icon: "/images/items/badge-of-justice.jpg",
    metaTitle: "Buy Badge of Justice Farm - TBC Heroic World Tour 2026",
    metaDescription: "Buy Badge of Justice farming service for TBC Anniversary. Heroic world tour boost to farm badges fast. Gear up for Phase 1 on all servers.",
    h1: "Badge of Justice Farm - TBC Heroic World Tour Phase 1",
    subtitle: "Heroic World Tour - Maximum Badges Per Day",
    heroText: "Badges of Justice are the universal currency for powerful Phase 1 gear. Each Heroic boss drops 1 badge, and Karazhan bosses drop them too. Our Heroic World Tour service runs you through every available Heroic dungeon daily for maximum badge income. Gear up fast on Spineshatter, Thunderstrike, and all Phase 1 servers.",
    bodyTitle: "Badge of Justice Farming Service - Phase 1 2026",
    bodyText: "In TBC Phase 1, Badge of Justice vendors sell powerful items including Bloodlust Brooch, Icon of the Silver Crescent, and Essence of the Martyr - trinkets that rival or exceed Karazhan drops. A full Heroic world tour (all 16 Heroics) yields approximately 48 badges per day. Our boost team clears all Heroics in an organized route that maximizes badges per hour. We also offer Karazhan badge runs for additional badge income. Perfect for alts or players catching up in Phase 1.",
    howItWorks: [
      { step: "Choose Package", desc: "Pick full world tour (16 Heroics) or partial (your choice of dungeons)." },
      { step: "Daily Schedule", desc: "We run dungeons on the daily reset schedule for maximum efficiency." },
      { step: "Fast Clears", desc: "Our geared team blitzes through each Heroic in 15-25 minutes." },
      { step: "Badges Accumulate", desc: "You collect badges from each boss. Spend them on BiS vendor gear." },
    ],
    priceRange: "$34.99 - $89.99",
    deliveryTime: "1-3 days",
    serverPrices: { spineshatter: 34.99, thunderstrike: 32.99, nightslayer: 36.99, dreamscythe: 39.99 },
    faq: [
      { q: "How many badges per full Heroic world tour?", a: "A full world tour of all 16 Heroic dungeons yields approximately 48 Badges of Justice per day (3 badges average per dungeon)." },
      { q: "Do I need all Heroic keys?", a: "Yes, you need the Heroic key for each dungeon. If you're missing keys, we offer reputation farming to unlock them." },
      { q: "Is this a carry or self-play?", a: "You join our group for each dungeon. Our boosters handle the clearing while you collect badges. You can participate or AFK." },
    ],
  },
  "drums-of-battle-kit": {
    name: "Drums of Battle Kit",
    shortName: "Drums Kit",
    category: "Consumable",
    icon: "/images/items/drums-of-battle.jpg",
    metaTitle: "Leatherworking 1-375 Kit + Drums of Battle - TBC Anniversary 2026",
    metaDescription: "Buy Leatherworking 1-375 powerleveling kit with Drums of Battle materials for TBC Anniversary. Essential for hardcore raiding. All servers.",
    h1: "Leatherworking Kit & Drums of Battle - TBC Anniversary Phase 1",
    subtitle: "Full 1-375 Materials + Drums of Battle Stockpile",
    heroText: "Every serious TBC raider needs Leatherworking for Drums of Battle - the most powerful group buff in the game. Our kit includes all materials to powerlevel Leatherworking from 1 to 375 PLUS a starting stockpile of Drums of Battle. Skip the material grind and start drumming on your first raid night.",
    bodyTitle: "Why Every TBC Raider Needs Drums of Battle in 2026",
    bodyText: "Drums of Battle provide +80 haste rating for the entire party for 30 seconds. In optimized raid groups, every player rotates drums for 100% uptime. This means Leatherworking is practically mandatory for progression raiding in TBC Phase 1. Leveling Leatherworking from 1 to 375 requires hundreds of leather pieces and specialized materials. Our kit contains every material pre-packaged and delivered to your mailbox. We also include 40x Drums of Battle to get you started immediately.",
    howItWorks: [
      { step: "Order Kit", desc: "Choose your server and faction. We prepare all materials." },
      { step: "Materials Delivered", desc: "Full 1-375 Leatherworking material kit mailed to your character." },
      { step: "Level Up", desc: "Follow our included guide to powerlevel LW 1-375 in ~3 hours." },
      { step: "Drums Ready", desc: "40x Drums of Battle included. Craft more as needed for raids." },
    ],
    priceRange: "$39.99 - $49.99",
    deliveryTime: "1-2 hours",
    serverPrices: { spineshatter: 39.99, thunderstrike: 37.99, nightslayer: 42.99, dreamscythe: 44.99 },
    faq: [
      { q: "What's included in the Leatherworking kit?", a: "All materials for 1-375 Leatherworking including Light Leather through Thick Clefthoof Leather, plus 40x pre-made Drums of Battle and a step-by-step leveling guide." },
      { q: "Can I buy just the Drums of Battle?", a: "Yes! We sell Drums of Battle separately at $3.99 each or $49.99 for a stack of 40. Bulk pricing for guilds available on Discord." },
      { q: "Is Leatherworking really mandatory for TBC raiding?", a: "For competitive guilds, yes. Drums of Battle provide the strongest group buff in TBC. Most serious raids require every member to have LW." },
    ],
  },
  "darkmoon-card-vengeance": {
    name: "Darkmoon Card: Vengeance",
    shortName: "DMC Vengeance",
    category: "Trinket",
    icon: "/images/items/darkmoon-vengeance.jpg",
    metaTitle: "Buy Darkmoon Card Vengeance - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy Darkmoon Card Vengeance and Crusade for TBC Anniversary. Powerful Phase 1 trinkets from Darkmoon Faire decks. All servers supported.",
    h1: "Darkmoon Card: Vengeance & Crusade - TBC Anniversary Phase 1",
    subtitle: "Pre-Built Darkmoon Decks Delivered to You",
    heroText: "Darkmoon Card: Vengeance and Darkmoon Card: Crusade are among the most powerful trinkets in TBC Phase 1, rivaling Karazhan drops. Our scribes and farmers assemble the complete Blessings and Furies decks so you can turn them in at the Darkmoon Faire. Skip weeks of farming and AH sniping.",
    bodyTitle: "Darkmoon Faire Decks - Phase 1 BiS Trinkets 2026",
    bodyText: "The Furies Deck creates Darkmoon Card: Vengeance (melee DPS proc dealing up to 1500 damage) and the Blessings Deck creates Darkmoon Card: Crusade (+6 attack power or +8 spell damage stacking per hit). Each deck requires 8 specific Darkmoon cards crafted by Inscribers using Primal elements. Assembling a complete deck on the AH can cost 3,000-5,000g and weeks of waiting. We deliver the complete, ready-to-turn-in deck for a fixed price.",
    howItWorks: [
      { step: "Choose Deck", desc: "Furies (Vengeance) for melee DPS or Blessings (Crusade) for casters." },
      { step: "We Assemble", desc: "Our scribes craft or collect all 8 cards for your deck." },
      { step: "Deck Delivered", desc: "Complete deck traded to you face-to-face in Shattrath." },
      { step: "Turn In", desc: "Visit Darkmoon Faire to exchange the deck for your trinket." },
    ],
    priceRange: "$79.99 - $99.99",
    deliveryTime: "1-3 days",
    serverPrices: { spineshatter: 84.99, thunderstrike: 79.99, nightslayer: 89.99, dreamscythe: 94.99 },
    faq: [
      { q: "What is Darkmoon Card: Vengeance?", a: "Vengeance is a melee DPS trinket that procs for up to 1,500 damage. It comes from the Furies Deck turned in at the Darkmoon Faire. One of the best melee trinkets in Phase 1." },
      { q: "When is the Darkmoon Faire?", a: "The Darkmoon Faire appears every first week of the month. We deliver the assembled deck anytime, and you turn it in when the Faire is active." },
      { q: "Can I buy the Crusade card instead?", a: "Yes! Darkmoon Card: Crusade comes from the Blessings Deck and is BiS for casters. Same price, same delivery." },
    ],
  },
  "raid-consumables-bulk": {
    name: "Raid Consumables Bulk Pack",
    shortName: "Consumables",
    category: "Consumable",
    icon: "/images/items/raid-consumables.jpg",
    metaTitle: "TBC Raid Consumables Bulk Buy - Destruction Potions & Flasks 2026",
    metaDescription: "Buy TBC Anniversary raid consumables in bulk. Destruction Potions, Haste Potions, Flasks, Food Buffs, and oils. Cheapest bulk prices for Phase 1.",
    h1: "TBC Raid Consumables Bulk Pack - Phase 1 2026",
    subtitle: "Full Raid Night Kit - Potions, Flasks, Food & Oils",
    heroText: "Stop spending hours farming and crafting consumables before every raid night. Our bulk consumable packs include everything you need: Destruction Potions, Haste Potions, Flasks of Blinding Light, Super Mana Potions, Blackened Basilisk, and Brilliant Wizard Oil. One order covers a full week of Karazhan, Gruul, and Mag progression.",
    bodyTitle: "Cheap TBC Raid Consumables - Phase 1 Bulk Buy 2026",
    bodyText: "Phase 1 TBC raiding demands serious consumable investment. A single Karazhan clear can burn through 10-15 Destruction Potions, 5-10 Haste Potions, 2-3 Flasks, and stacks of food and oils. At AH prices, that is 200-500g per raid night. Our bulk packs are priced 30-40% below AH rates and delivered directly to your character. We offer standard packs (enough for one raid week) and guild packs (10+ players). Available on all TBC Anniversary Phase 1 servers.",
    howItWorks: [
      { step: "Pick Pack Size", desc: "Standard (1 raid week) or Guild (10+ players)." },
      { step: "Specify Class", desc: "We customize the pack for your class - casters get Destruction Potions, melee gets Haste." },
      { step: "Materials Crafted", desc: "Our alchemists and cooks produce everything fresh." },
      { step: "Bulk Delivery", desc: "Full pack delivered via trade or CoD mail before your raid night." },
    ],
    priceRange: "$14.99 - $129.99",
    deliveryTime: "30-60 min",
    serverPrices: { spineshatter: 19.99, thunderstrike: 17.99, nightslayer: 21.99, dreamscythe: 24.99 },
    faq: [
      { q: "What's in the standard consumable pack?", a: "20x Destruction/Haste Potions, 5x Flask (your choice), 40x Super Mana Potions, 40x Blackened Basilisk, 20x Brilliant Wizard Oil or Adamantite Sharpening Stones. Customized for your class." },
      { q: "How much cheaper is this than the AH?", a: "Our bulk packs are typically 30-40% cheaper than buying everything individually on the auction house. The more you buy, the more you save." },
      { q: "Can I get a guild bulk order?", a: "Absolutely! Guild packs for 10+ players receive an additional 15% discount. Contact us on Discord for custom guild pricing." },
    ],
  },
  "spellstrike-whitemend-craft": {
    name: "Spellstrike / Whitemend Craft Service",
    shortName: "Spellstrike",
    category: "Craft",
    icon: "/images/items/spellstrike-whitemend.jpg",
    metaTitle: "Buy Spellstrike & Whitemend Set Materials - TBC Anniversary 2026",
    metaDescription: "Buy Spellstrike Hood, Spellstrike Pants, and Whitemend set materials with crafting service for TBC Anniversary. Phase 1 BiS caster gear on all servers.",
    h1: "Spellstrike & Whitemend Set Craft Service - TBC Phase 1",
    subtitle: "Full Materials + Master Crafter = Phase 1 BiS Gear",
    heroText: "Spellstrike Hood and Spellstrike Pants are the undisputed BiS caster gear in TBC Phase 1 - better than anything that drops in Karazhan. The Whitemend Wisdom set is BiS for healers. Our service includes ALL materials (Spellcloth, Primal Nethers, etc.) plus access to our skilled crafter. One order, zero hassle.",
    bodyTitle: "Spellstrike & Whitemend BiS Gear Crafting - Phase 1 2026",
    bodyText: "Crafting a Spellstrike Hood requires Spellcloth (4x), Primal Nether (1x), and Primal Might (1x) - materials worth 2,000-3,000g total. The Spellstrike Pants have similar requirements. For healers, the Whitemend Wisdom Hood and Pants provide unmatched intellect and healing power. Gathering these materials yourself means weeks of cooldowns and AH camping. We provide all materials pre-gathered, plus our master tailor crafts the items for you. This is the fastest way to get Phase 1 BiS caster gear.",
    howItWorks: [
      { step: "Choose Set", desc: "Spellstrike (caster DPS), Whitemend (healer), or both." },
      { step: "Materials Provided", desc: "We supply ALL crafting materials including Primal Nethers." },
      { step: "Master Crafter", desc: "Our tailor with the recipe crafts your items on your server." },
      { step: "Trade Complete", desc: "Items traded to you face-to-face. Equip and dominate Phase 1." },
    ],
    priceRange: "$69.99 - $139.99",
    deliveryTime: "1-2 days",
    serverPrices: { spineshatter: 79.99, thunderstrike: 74.99, nightslayer: 84.99, dreamscythe: 89.99 },
    faq: [
      { q: "Does the price include Primal Nethers?", a: "Yes! Our price covers ALL materials including the hard-to-get Primal Nethers. No additional costs." },
      { q: "Can I buy just the Spellstrike Hood?", a: "Yes, individual pieces are available. Hood starts at $39.99, Pants at $39.99, or get both for a discounted set price." },
      { q: "Is Spellstrike really better than Karazhan loot?", a: "Yes! Spellstrike Hood + Pants provide unmatched spell hit and damage. They are used by competitive casters well into Phase 2." },
    ],
  },
}

const allItemKeys = Object.keys(itemData) as ItemKey[]

const categoryColors: Record<string, string> = {
  Material: "border-fel-orange/30 bg-fel-orange/10 text-fel-orange-glow",
  Mount: "border-fel-green/30 bg-fel-green/10 text-fel-green-glow",
  Trinket: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  Currency: "border-gold/30 bg-gold/10 text-gold",
  Consumable: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Craft: "border-red-500/30 bg-red-500/10 text-red-400",
}

const categoryIcons: Record<string, typeof Gem> = {
  Material: Gem,
  Mount: Trophy,
  Trinket: Gem,
  Currency: Trophy,
  Consumable: FlaskConical,
  Craft: Hammer,
}

export function generateStaticParams() {
  return allItemKeys.map((item) => ({ item }))
}

export async function generateMetadata({ params }: { params: Promise<{ item: string }> }): Promise<Metadata> {
  const { item } = await params
  const data = itemData[item as ItemKey]
  if (!data) return { title: "Item Not Found" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"
  const pageUrl = `${siteUrl}/items/${item}`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: pageUrl,
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: data.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function ItemPage({ params }: { params: Promise<{ item: string }> }) {
  const { item } = await params
  const data = itemData[item as ItemKey]
  if (!data) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"
  const CategoryIcon = categoryIcons[data.category] || Gem

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${data.name} - TBC Classic Anniversary Service`,
    description: data.metaDescription,
    image: `${siteUrl}${data.icon}`,
    brand: { "@type": "Brand", name: "Exodar Market" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: data.serverPrices.thunderstrike.toFixed(2),
      highPrice: data.serverPrices.dreamscythe.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      offerCount: "4",
      seller: { "@type": "Organization", name: "Exodar Market" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "3400",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Items & Services", item: `${siteUrl}/items` },
      { "@type": "ListItem", position: 3, name: data.name, item: `${siteUrl}/items/${item}` },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-24 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-parchment/40">
          <li><Link href="/" className="transition-colors hover:text-gold">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/services/boosting" className="transition-colors hover:text-gold">Services</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-bold text-parchment/70">{data.shortName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-16 pt-8 sm:pb-24 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${categoryColors[data.category]}`}>
              <CategoryIcon className="h-3 w-3" />
              {data.category}
            </span>
            <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[10px] font-bold tracking-wider text-gold/80 uppercase">
              Phase 1 2026
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            {data.h1}
          </h1>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3" aria-hidden="true">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
            <Swords className="h-4 w-4 text-gold/50" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <p className="mb-2 text-sm font-bold tracking-wider text-gold/70 uppercase">{data.subtitle}</p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/60 sm:text-base">
            {data.heroText}
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-xl border border-gold/20 parchment-card px-6 py-4 text-center">
              <p className="text-xl font-black text-gold gold-shimmer sm:text-2xl">{data.priceRange}</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">price range</p>
            </div>
            <div className="rounded-xl border border-fel-green/20 parchment-card px-6 py-4 text-center">
              <p className="text-xl font-black text-fel-green-glow sm:text-2xl">{data.deliveryTime}</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">delivery time</p>
            </div>
            <div className="rounded-xl border border-fel-orange/20 parchment-card px-6 py-4 text-center">
              <p className="text-xl font-black text-fel-orange-glow sm:text-2xl">4 Servers</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">supported</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/order?service=item&item=${item}`}
              className="flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
            >
              Buy {data.shortName} Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="rounded-lg border border-gold/30 px-8 py-4 text-sm font-bold tracking-widest text-gold/70 uppercase backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold"
            >
              Compare Server Prices
            </a>
          </div>
        </div>
      </section>

      {/* Body SEO text */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <article className="rounded-xl border border-stone parchment-card p-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-parchment sm:text-2xl">
              {data.bodyTitle}
            </h2>
            <p className="text-sm leading-relaxed text-parchment/60">
              {data.bodyText}
            </p>
          </article>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            How It Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.howItWorks.map((step, i) => (
              <div key={step.step} className="relative rounded-xl border border-gold/15 parchment-card p-6 transition-all hover:border-gold/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-lg font-black text-gold">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-wider text-parchment uppercase">{step.step}</h3>
                <p className="text-xs leading-relaxed text-parchment/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            Why Choose Exodar Market
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Fast Delivery", desc: `${data.deliveryTime} average. Our boosters are online 24/7 on all TBC Anniversary servers.` },
              { icon: Shield, title: "Zero Ban Rate", desc: "Secure methods, natural patterns, VPN protection. 3,400+ satisfied customers with zero bans." },
              { icon: Clock, title: "24/7 Live Support", desc: "Reach us anytime on Discord at exodarmarket111. We respond within minutes." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-gold/15 parchment-card p-6 transition-all hover:border-gold/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-gold/20 bg-gold/5">
                  <feature.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-wider text-parchment uppercase">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-parchment/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Pricing Table */}
      <section id="pricing" className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            {data.shortName} Price by Server - Phase 1 2026
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed text-parchment/50">
            Prices vary by server population and demand. All prices include full service - no hidden costs.
          </p>
          <ItemServerPriceTable
            itemName={data.name}
            prices={data.serverPrices}
            orderSlug={item}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            {data.shortName} - Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {data.faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-gold/15 parchment-card p-6">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-parchment">
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  {f.q}
                </h3>
                <p className="pl-6 text-xs leading-relaxed text-parchment/50">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <div className="rounded-2xl border border-gold/20 parchment-card p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl">
              Ready to Get Your {data.shortName}?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-parchment/50">
              Order now and our team will get started immediately. {data.deliveryTime} average delivery on all Phase 1 TBC Anniversary servers.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/order?service=item&item=${item}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
              >
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://discord.com/users/exodarmarket111"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 px-8 py-4 text-sm font-bold tracking-widest text-[#5865F2] uppercase transition-all hover:border-[#5865F2]/60 hover:bg-[#5865F2]/20"
              >
                Ask on Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
