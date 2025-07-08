'use client'

import { Brand } from '@/lib/utils'
import { Star, ExternalLink, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface BrandHeaderProps {
  brand: Brand
}

export default function BrandHeader({ brand }: BrandHeaderProps) {
  const handleVisitStore = () => {
    window.open(brand.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/codes" className="hover:text-blue-600 transition-colors">
                All Deals
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{brand.brandName}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Brand Info */}
          <div className="flex-1">
            <div className="flex items-start gap-6 mb-6">
              {/* Brand Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-gray-700">
                  {brand.brandName.charAt(0)}
                </span>
              </div>

              {/* Brand Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {brand.brandName} Codes & Deals
                </h1>
                
                {/* Rating and Stats */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(brand.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {brand.rating}
                    </span>
                    <span className="text-gray-600">
                      ({brand.totalCoupons} deals)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      {brand.activeCoupons} active deals
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {brand.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Last updated: {new Date(brand.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 text-center">
                Ready to save money?
              </h3>
              
              <button
                onClick={handleVisitStore}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold mb-4 flex items-center justify-center gap-2"
              >
                <span>Visit {brand.brandName}</span>
                <ExternalLink className="w-5 h-5" />
              </button>

              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Click any coupon below to reveal the code</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {brand.totalCoupons}
                  </div>
                  <div className="text-xs text-gray-600">Total Deals</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">
                    {brand.activeCoupons}
                  </div>
                  <div className="text-xs text-gray-600">Active Now</div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified & Updated Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
