'use client'

import { useState } from 'react'
import { Coupon } from '@/lib/utils'

interface CouponTabsProps {
  coupons: Coupon[]
  totalCoupons: number
}

export default function CouponTabs({ coupons, totalCoupons }: CouponTabsProps) {
  const [activeTab, setActiveTab] = useState('all')

  const verifiedCount = coupons.filter(c => c.isVerified).length
  const codesCount = coupons.filter(c => c.type === 'code').length
  const dealsCount = coupons.filter(c => c.type === 'deal').length

  const tabs = [
    { id: 'all', label: `All (${totalCoupons})`, count: totalCoupons },
    { id: 'verified', label: `Verified (${verifiedCount})`, count: verifiedCount },
    { id: 'codes', label: `Codes (${codesCount})`, count: codesCount },
    { id: 'deals', label: `Deals (${dealsCount})`, count: dealsCount },
  ]

  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-white bg-teal-500 rounded-t-lg border-teal-500'
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
