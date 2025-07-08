import { notFound } from 'next/navigation'
import { getBrandData, getAllBrands } from '@/lib/data'
import CouponCard from '@/components/CouponCard'
import ActionButton from '@/components/ActionButton'
import CouponTabs from '@/components/CouponTabs'
import { Metadata } from 'next'

interface BrandPageProps {
  params: {
    brand: string
  }
}

// Generate static params for all brands
export async function generateStaticParams() {
  try {
    const brands = await getAllBrands()

    return brands.map((brand) => ({
      brand: brand.brandKey,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const brand = await getBrandData(resolvedParams.brand)
  
  if (!brand) {
    return {
      title: 'Brand Not Found',
    }
  }

  return {
    title: `${brand.brandName} Coupon Codes & Promo Codes - Save Up to ${brand.coupons[0]?.discount || '50%'}`,
    description: `Get the latest ${brand.brandName} coupon codes and deals. ${brand.description.substring(0, 150)}...`,
    keywords: `${brand.brandName} coupon, ${brand.brandName} promo code, ${brand.brandName} discount, ${brand.categories.join(', ')}`,
    openGraph: {
      title: `${brand.brandName} Coupon Codes & Deals`,
      description: `Save money on ${brand.brandName} with verified coupon codes and exclusive deals.`,
      type: 'website',
    },
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const resolvedParams = await params
  const brand = await getBrandData(resolvedParams.brand)

  if (!brand) {
    notFound()
  }

  // Sort coupons by success rate and verification status
  const sortedCoupons = brand.coupons.sort((a, b) => {
    // Verified coupons first
    if (a.isVerified && !b.isVerified) return -1
    if (!a.isVerified && b.isVerified) return 1
    // Then by success rate
    return b.successRate - a.successRate
  })

  const featuredCoupon = sortedCoupons[0]
  const otherCoupons = sortedCoupons.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 order-2 lg:order-1">
            <div className="space-y-6">
              {/* Brand Header moved to sidebar */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {brand.brandName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      {brand.brandName} Codes & Deals
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(brand.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {brand.rating} ({brand.totalCoupons} deals)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                        ✓ {brand.activeCoupons} active deals
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {brand.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  📅 Last updated: {new Date(brand.lastUpdated).toLocaleDateString()}
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-center">
                    Ready to save money?
                  </h3>
                  
                  <ActionButton
                    url={brand.affiliateUrl}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold mb-2 flex items-center justify-center gap-2"
                  >
                    <span>Visit {brand.brandName}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </ActionButton>
                  
                  <p className="text-xs text-gray-600 text-center">
                    Click any coupon below to reveal the code
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{brand.totalCoupons}</div>
                    <div className="text-xs text-gray-600">Total Deals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{brand.activeCoupons}</div>
                    <div className="text-xs text-gray-600">Active Now</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                    ✓ Verified & Updated Daily
                  </div>
                </div>
              </div>

              {/* Coupon Statistics */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Coupon Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Coupons</span>
                    <span className="font-semibold">{brand.totalCoupons}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Coupon Codes</span>
                    <span className="font-semibold">{brand.coupons.filter(c => c.type === 'code').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deals & Sales</span>
                    <span className="font-semibold">{brand.coupons.filter(c => c.type === 'deal').length}</span>
                  </div>
                </div>
              </div>
              
              {/* About Brand */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">About {brand.brandName} Coupon</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {brand.brandName} Coupon offers innovative solutions and services. Save money with 
                  our exclusive coupon codes and promotional offers.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <a href="/" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <a href="/deals" className="hover:text-blue-600">All Deals</a>
              <span>/</span>
              <span className="text-gray-900">{brand.brandName} Coupon</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {brand.brandName} Coupon Codes & Deals - July 2025
              </h1>
              <p className="text-gray-600">
                {brand.activeCoupons} active deals available • Updated daily • Verified by our team
              </p>
            </div>

            {/* Coupon Tabs */}
            <CouponTabs
              coupons={sortedCoupons}
              totalCoupons={brand.totalCoupons}
            />

            {/* Featured Coupon */}
            {featuredCoupon && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Deal</h2>
                <CouponCard coupon={featuredCoupon} brand={brand} featured={true} />
              </div>
            )}

            {/* Other Coupons */}
            {otherCoupons.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Deals</h2>
                <div className="space-y-4">
                  {otherCoupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} brand={brand} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
