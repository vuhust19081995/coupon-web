'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo and Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Coupon</span>Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            High-Quality SaaS Coupons & Deals
          </p>
          <p className="text-lg text-gray-500">
            Save money on your favorite software tools
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for brands, software, or deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">Trusted by 50,000+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-medium">4.8/5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="font-medium">$2M+ saved this year</span>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-12">
          <p className="text-gray-500 mb-4">Popular categories:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Design Tools',
              'Productivity',
              'Marketing',
              'Development',
              'Project Management',
              'Communication'
            ].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
