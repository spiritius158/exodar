import { Star } from "lucide-react"

const reviews = [
  {
    name: "Thralldor",
    realm: "Nightslayer (PvP)",
    rating: 5,
    text: "Got 5k TBC gold delivered in under 3 minutes. Needed it for my epic flying mount and they came through instantly. Best TBC Classic service out there.",
    service: "Gold Selling",
    date: "2 days ago",
  },
  {
    name: "Sylvara",
    realm: "Dreamscythe (PvE)",
    rating: 5,
    text: "Full Karazhan clear with loot funneling. The team knew every boss mechanic perfectly. Got my T4 gloves and Nightbane mount in one run.",
    service: "Character Boosting",
    date: "5 days ago",
  },
  {
    name: "Grimjaw",
    realm: "Thunderstrike (PvE)",
    rating: 5,
    text: "Bought a level 70 Orc Warrior with full T4 gear and epic flying. Account transfer was smooth and everything was exactly as described.",
    service: "Accounts",
    date: "1 week ago",
  },
  {
    name: "Lunareth",
    realm: "Nightslayer (PvP)",
    rating: 5,
    text: "Been buying TBC Classic Anniversary gold here every week for consumes. Always fast, always cheap. My raid guild swears by Exodar Market.",
    service: "Gold Selling",
    date: "1 week ago",
  },
  {
    name: "Boomkin",
    realm: "Dreamscythe (PvE)",
    rating: 5,
    text: "Arena boost from 1500 to 2050 in two sessions. The gladiator pilot was insane on my Warlock. Merciless Gladiator gear here I come.",
    service: "Character Boosting",
    date: "2 weeks ago",
  },
  {
    name: "Frostweaver",
    realm: "Thunderstrike (PvE)",
    rating: 5,
    text: "Picked up a Blood Elf Paladin account with full T4 Karazhan gear and epic flying. Absolute steal for the price. Already raiding Gruul and Mag with my new guild.",
    service: "Accounts",
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
