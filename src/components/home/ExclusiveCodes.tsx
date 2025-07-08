'use client'

import { useState } from 'react'
import { Copy, ExternalLink, Check, Star } from 'lucide-react'
import { Brand, Coupon, formatDiscount, formatTimeAgo } from '@/lib/utils'
import Link from 'next/link'

interface ExclusiveCodesProps {
  exclusiveCoupons: { brand: Brand; coupon: Coupon }[]
}

export default function ExclusiveCodes({ exclusiveCoupons }: ExclusiveCodesProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [revealedCodes, setRevealedCodes] = useState<Set<string>>(new Set())

  const handleCopyCode = async (code: string, couponId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(couponId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleRevealCode = (couponId: string) => {
    setRevealedCodes(prev => new Set([...prev, couponId]))
  }

  const handleVisitStore = (affiliateUrl: string) => {
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              CouponHub Exclusive Codes
            </h2>
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
          <p className="text-lg text-gray-600">
            Hand-picked deals you won&apos;t find anywhere else
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exclusiveCoupons.map(({ brand, coupon }) => (
            <div
              key={`${brand.brandKey}-${coupon.id}`}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Brand Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">
                    {brand.brandName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{brand.brandName}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{brand.rating}</span>
                  </div>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {formatDiscount(coupon.discount, coupon.type)}
                </span>
              </div>

              {/* Coupon Title */}
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {coupon.title}
              </h4>

              {/* Recent Savings */}
              {coupon.recentSaving && coupon.savedTime && (
                <p className="text-sm text-green-600 mb-3">
                  A user saved {coupon.recentSaving} {formatTimeAgo(coupon.savedTime)}
                </p>
              )}

              {/* Coupon Code */}
              <div className="mb-4">
                {revealedCodes.has(coupon.id) ? (
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-sm flex-1">
                      {coupon.code}
                    </code>
                    <button
                      onClick={() => handleCopyCode(coupon.code, coupon.id)}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === coupon.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRevealCode(coupon.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Get Code
                  </button>
                )}
              </div>

              {/* Success Rate */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{coupon.successRate}% success rate</span>
                <span>{coupon.usedCount.toLocaleString()} used</span>
              </div>

              {/* Visit Store Button */}
              <button
                onClick={() => handleVisitStore(brand.affiliateUrl)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span>Visit Store</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* View All Coupons Link */}
              <div className="mt-3 text-center">
                <Link
                  href={`/codes/${brand.brandKey}`}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View all {brand.brandName} coupons →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/codes"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            View All Exclusive Deals
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
