'use client'

import { Brand } from '@/lib/utils'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

interface FeaturedStoresProps {
  featuredBrands: Brand[]
}

export default function FeaturedStores({ featuredBrands }: FeaturedStoresProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              CouponHub Featured Stores
            </h2>
            <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></div>
          </div>
          <p className="text-lg text-gray-600">
            Top-rated brands with the best deals and highest savings
          </p>
        </div>

        {/* Featured Stores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.brandKey}
              href={`/codes/${brand.brandKey}`}
              className="group bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Brand Logo Placeholder */}
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                <span className="text-xl font-bold text-gray-700 group-hover:text-blue-600">
                  {brand.brandName.charAt(0)}
                </span>
              </div>
              
              {/* Brand Name */}
              <h3 className="text-sm font-semibold text-gray-900 text-center mb-2 line-clamp-2">
                {brand.brandName}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{brand.rating}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Store Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredBrands.slice(0, 3).map((brand) => (
            <div
              key={`detail-${brand.brandKey}`}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Brand Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">
                    {brand.brandName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{brand.brandName}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{brand.rating}</span>
                    <span className="text-sm text-gray-400">
                      • {brand.activeCoupons} active deals
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {brand.description}
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {brand.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Best Deal Preview */}
              {brand.coupons.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Best Deal: {brand.coupons[0].title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {brand.coupons[0].discount} OFF
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600">
                        {brand.coupons[0].successRate}% success
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* View Deals Button */}
              <Link
                href={`/codes/${brand.brandKey}`}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View {brand.totalCoupons} Deals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Become Partner CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want to become a featured partner?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join our featured partner program and get premium placement, increased visibility, 
            and access to our growing community of deal-seekers.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Become a Featured Partner
          </button>
        </div>
      </div>
    </section>
  )
}
