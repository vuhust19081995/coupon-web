import HeroSection from '@/components/home/HeroSection'
import ExclusiveCodes from '@/components/home/ExclusiveCodes'
import FeaturedStores from '@/components/home/FeaturedStores'
import PopularStores from '@/components/home/PopularStores'
import { getExclusiveCoupons, getFeaturedBrands, getPopularBrands } from '@/lib/data'

export default async function Home() {
  // Load data for all sections
  const [exclusiveCoupons, featuredBrands, popularBrands] = await Promise.all([
    getExclusiveCoupons(8),
    getFeaturedBrands(8),
    getPopularBrands(12)
  ])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExclusiveCodes exclusiveCoupons={exclusiveCoupons} />
      <FeaturedStores featuredBrands={featuredBrands} />
      <PopularStores popularBrands={popularBrands} />
    </main>
  )
}
