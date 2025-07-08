'use client'

import { Brand } from '@/lib/utils'
import Link from 'next/link'
import { TrendingUp, Users, Tag } from 'lucide-react'

interface PopularStoresProps {
  popularBrands: Brand[]
}

export default function PopularStores({ popularBrands }: PopularStoresProps) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shop at Popular Stores
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Most loved brands by our community with proven savings
          </p>
        </div>

        {/* Popular Stores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {popularBrands.map((brand, index) => {
            const totalUsage = brand.coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0)
            
            return (
              <Link
                key={brand.brandKey}
                href={`/codes/${brand.brandKey}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Popularity Rank */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                )}

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
                
                {/* Stats */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {totalUsage.toLocaleString()} used
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Tag className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">
                      {brand.activeCoupons} active deals
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Browse by Category
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Design Tools', count: 15, color: 'from-purple-500 to-pink-500' },
              { name: 'Productivity', count: 22, color: 'from-blue-500 to-cyan-500' },
              { name: 'Marketing', count: 18, color: 'from-green-500 to-emerald-500' },
              { name: 'Development', count: 12, color: 'from-orange-500 to-red-500' },
              { name: 'Communication', count: 8, color: 'from-indigo-500 to-purple-500' },
              { name: 'Analytics', count: 10, color: 'from-teal-500 to-blue-500' }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {category.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {category.count} brands
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-gray-600">Total Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Partner Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Never Miss a Deal</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest coupon codes and exclusive deals delivered straight to your inbox. 
            Join thousands of smart shoppers saving money every day.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}
