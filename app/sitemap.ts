import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exodar.market'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/services/gold`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/boosting`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/accounts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Server-specific gold landing pages
    ...([
      'spineshatter-horde',
      'spineshatter-alliance',
      'thunderstrike-horde',
      'thunderstrike-alliance',
      'nightslayer-horde',
      'nightslayer-alliance',
      'dreamscythe-horde',
      'dreamscythe-alliance',
    ] as const).map((server) => ({
      url: `${siteUrl}/gold/${server}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${siteUrl}/items`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Item/service landing pages
    ...([
      'primal-nether-boost',
      'primal-fire-farming',
      'talbuk-mount-farm',
      'cenarion-hippogryph-boost',
      'eye-of-quagmirran-run',
      'badge-of-justice-farm',
      'drums-of-battle-kit',
      'darkmoon-card-vengeance',
      'raid-consumables-bulk',
      'spellstrike-whitemend-craft',
    ] as const).map((item) => ({
      url: `${siteUrl}/items/${item}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
