import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Types for our data structure
export interface Coupon {
  id: string
  title: string
  code: string
  description: string
  discount: string
  type: 'code' | 'deal' | 'percentage' | 'fixed' | 'trial'
  expiryDate: string
  isVerified: boolean
  usedCount: number
  successRate: number
  recentSaving?: string
  savedTime?: string
}

export interface Brand {
  brandKey: string
  brandName: string
  brandUrl: string
  affiliateUrl: string
  description: string
  logo: string
  lastUpdated: string
  coupons: Coupon[]
  categories: string[]
  rating: number
  totalCoupons: number
  activeCoupons: number
  features?: string[]
}

export interface BrandListItem {
  name: string
  affiliateLink: string
  branchLink: string
}

// Client-side utility functions

// Helper function to create brand key from name
export function createBrandKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, '') // Remove leading/trailing dashes
}

// Format functions
export function formatDiscount(discount: string, type: string): string {
  if (type === 'trial') return discount
  if (type === 'percentage') return `${discount} OFF`
  return discount
}

export function formatTimeAgo(timeString: string): string {
  // Simple time ago formatting
  const timeMap: { [key: string]: string } = {
    'hour': 'hr',
    'hours': 'hrs', 
    'day': 'day',
    'days': 'days'
  }
  
  return timeString.replace(/(\d+)\s+(hour|hours|day|days)/, (_, num, unit) => {
    return `${num} ${timeMap[unit] || unit}`
  })
}
