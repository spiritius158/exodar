import { Star } from "lucide-react"

const reviews = [
  {
    name: "Thralldor",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Ordered 3k gold for my epic flying and it showed up in my mailbox before I even alt-tabbed back. Genuinely shocked how quick that was. Already placed another order for raid consumes.",
    service: "Gold Selling",
    date: "1 day ago",
  },
  {
    name: "Zulthane",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Had my Shaman boosted from 60 to 70 in just over two days. Came back to a character with all the Outland flight paths and solid quest gear. Way faster than I expected.",
    service: "Character Boosting",
    date: "2 days ago",
  },
  {
    name: "Sylvara",
    realm: "Dreamscythe (PvE)",
    rating: 5,
    text: "Needed gold fast for flasks before our Gruul raid night. Placed the order, went to grab food, came back and it was already done. Smooth and no questions asked.",
    service: "Gold Selling",
    date: "3 days ago",
  },
  {
    name: "Morkai",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "60-70 boost on my Warrior alt. The booster kept me updated through Discord the whole time, which I appreciated. Character was ready with decent quest blues and rested XP used perfectly.",
    service: "Character Boosting",
    date: "4 days ago",
  },
  {
    name: "Lunareth",
    realm: "Nightslayer (PvP)",
    rating: 5,
    text: "Been buying gold here weekly for a month now. Every single time it arrives within minutes. Prices are fair and I never had a single issue. My go-to for TBC Classic.",
    service: "Gold Selling",
    date: "5 days ago",
  },
  {
    name: "Ashvane",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Got my Rogue from 60 to 70 and the guy even did some of the important Outland quest chains along the way. Logged in to a clean character with bags sorted. Really professional.",
    service: "Character Boosting",
    date: "5 days ago",
  },
  {
    name: "Drakthul",
    realm: "Thunderstrike (PvE)",
    rating: 5,
    text: "2k gold delivered in about a minute and a half. I counted. These guys do not mess around. Already told two guildies about this site.",
    service: "Gold Selling",
    date: "6 days ago",
  },
  {
    name: "Felweaver",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Boosted my Mage 60-70 and honestly the speed was insane. Took less than 48 hours and the character had all the relevant Outland reps started. Felt like getting a brand new alt handed to me.",
    service: "Character Boosting",
    date: "1 week ago",
  },
  {
    name: "Grimjaw",
    realm: "Thunderstrike (PvE)",
    rating: 5,
    text: "Just wanted some gold for gems and enchants. Simple order, delivered fast, no hassle. Exactly what you want from a service like this.",
    service: "Gold Selling",
    date: "1 week ago",
  },
  {
    name: "Sunfury",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Didn't have time to level my Paladin alt through Outland so I ordered the 60-70 boost. Done in about two and a half days, booster was communicative and the account was safe the entire time.",
    service: "Character Boosting",
    date: "1 week ago",
  },
  {
    name: "Khalessa",
    realm: "Dreamscythe (PvE)",
    rating: 5,
    text: "Bought 5k gold and it was in my bags faster than a Mage portal. No weird trades, no sketchy stuff. Clean delivery every time I order.",
    service: "Gold Selling",
    date: "9 days ago",
  },
  {
    name: "Rotgut",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "My Hunter went from 60 to 70 while I was at work. Came home, logged in, and everything looked legit. Good quest gear, pet was fed, no random garbage in bags. Quality work.",
    service: "Character Boosting",
    date: "10 days ago",
  },
  {
    name: "Boomkin",
    realm: "Nightslayer (PvP)",
    rating: 5,
    text: "I keep coming back because the gold is always cheap and always fast. This is my fourth order and it never takes longer than five minutes. Reliable is the word.",
    service: "Gold Selling",
    date: "11 days ago",
  },
  {
    name: "Shadowpine",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "60-70 leveling boost for my Warlock. The booster finished ahead of schedule and even farmed a few dungeon blues along the way. Definitely exceeded my expectations for the price.",
    service: "Character Boosting",
    date: "12 days ago",
  },
  {
    name: "Frostweaver",
    realm: "Thunderstrike (PvE)",
    rating: 5,
    text: "Quick gold delivery as always. Needed it last minute for raid night enchants and they came through in under two minutes. Can't ask for more than that.",
    service: "Gold Selling",
    date: "13 days ago",
  },
  {
    name: "Venomstrike",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Ordered the 60-70 boost on my Druid. Booster was super responsive on Discord, finished in just under 3 days. Character came back with Cenarion Expedition rep nearly at Honored. Great service.",
    service: "Character Boosting",
    date: "13 days ago",
  },
  {
    name: "Emberstorm",
    realm: "Dreamscythe (PvE)",
    rating: 5,
    text: "4k gold, took maybe three minutes. I use this for my weekly flask stock and it never disappoints. Good prices compared to everywhere else I checked.",
    service: "Gold Selling",
    date: "2 weeks ago",
  },
  {
    name: "Tuskbreaker",
    realm: "Spineshatter (PvP)",
    rating: 5,
    text: "Had my Priest boosted from 60 to 70. The whole process was smooth, got regular updates, and the character was in great shape when I got it back. Would use again for my next alt.",
    service: "Character Boosting",
    date: "2 weeks ago",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/60 uppercase">
            Testimonials
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Words of Valor
          </h2>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-parchment/50 sm:text-base">
            Hear from the heroes who trusted us with their TBC Classic Anniversary journey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl border border-stone bg-stone-dark/50 p-6 transition-all duration-300 hover:border-fel-green/20"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-parchment/60">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-parchment">{review.name}</p>
                  <p className="text-[11px] text-parchment/40">{review.realm}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-semibold tracking-wider text-fel-green/60 uppercase">
                    {review.service}
                  </span>
                  <span className="text-[10px] text-parchment/30">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
