'use client'

import { useState } from 'react'
import { Coupon, Brand } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

interface CouponCardProps {
  coupon: Coupon
  brand: Brand
  featured?: boolean
}

export default function CouponCard({ coupon, brand, featured = false }: CouponCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleRevealCode = () => {
    setIsRevealed(true)
    // Open affiliate URL in new tab
    window.open(brand.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getDiscountColor = () => {
    if (coupon.type === 'trial') return 'from-purple-500 to-indigo-500'
    if (parseInt(coupon.discount) >= 50) return 'from-red-500 to-pink-500'
    if (parseInt(coupon.discount) >= 30) return 'from-orange-500 to-red-500'
    return 'from-green-500 to-emerald-500'
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 ${
      featured ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
    }`}>
      <div className="flex items-center justify-between">
        {/* Left side - Discount and Content */}
        <div className="flex items-center gap-4 flex-1">
          {/* Discount Badge */}
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${getDiscountColor()} text-white flex flex-col items-center justify-center`}>
              <span className="text-sm font-bold leading-tight">
                {coupon.discount}
              </span>
              <span className="text-xs opacity-90">
                {coupon.type === 'code' ? 'CODE' : 'OFF'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2">
              {featured && (
                <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  ⭐ Staff Pick
                </span>
              )}
              {coupon.isVerified && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  ✓ Verified
                </span>
              )}
              {coupon.type === 'code' && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Exclusive
                </span>
              )}
            </div>

            {/* Brand name */}
            <div className="text-sm text-gray-500 mb-1">
              ← {brand.brandName}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {coupon.title}
            </h3>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {coupon.recentSaving && (
                <span className="flex items-center gap-1">
                  💎 A user saved {coupon.recentSaving} {coupon.savedTime}
                </span>
              )}
              {coupon.usedCount > 0 && (
                <span>🔥 {coupon.usedCount} used</span>
              )}
              <span>✅ {coupon.successRate}% success</span>
            </div>
          </div>
        </div>

        {/* Right side - Action Button */}
        <div className="flex-shrink-0 ml-4">
          {coupon.type === 'code' ? (
            <div className="relative">
              {/* Hidden coupon code background */}
              <div className="absolute inset-0 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-mono font-bold text-sm">
                  {coupon.code}
                </span>
              </div>

              {/* Peel-off button overlay */}
              <button
                onClick={isRevealed ? handleCopyCode : handleRevealCode}
                className={`relative z-10 font-semibold transition-all duration-300 min-w-[120px] h-12 ${
                  isRevealed
                    ? 'bg-green-500 hover:bg-green-600 text-white rounded-lg px-6'
                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                } ${!isRevealed ? 'rounded-l-lg pl-6 pr-2' : 'rounded-lg px-6'}`}
                style={{
                  clipPath: !isRevealed
                    ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                    : 'none'
                }}
              >
                {isRevealed ? (
                  <span className="flex items-center justify-center gap-2">
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? 'Copied!' : coupon.code}
                  </span>
                ) : (
                  'Get Code'
                )}
              </button>

              {/* Peel corner with number */}
              {!isRevealed && (
                <div className="absolute top-0 right-0 w-6 h-6 bg-teal-400 transform rotate-45 origin-bottom-left translate-x-3 -translate-y-3 border-2 border-dashed border-white flex items-center justify-center">
                  <span className="text-white font-bold text-xs transform -rotate-45">
                    {coupon.code.slice(-2)}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => window.open(brand.affiliateUrl, '_blank', 'noopener,noreferrer')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 min-w-[120px]"
            >
              Get Discount
            </button>
          )}
        </div>
      </div>

      {/* Proof section - only show if there's recent activity */}
      {coupon.recentSaving && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              💎 A user saved {coupon.recentSaving} {coupon.savedTime}
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              Proof ⌄
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
