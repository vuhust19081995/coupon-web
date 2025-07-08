import fs from 'fs'
import path from 'path'
import { Brand, Coupon } from './utils'

// Server-side data loading functions
export async function getBrandData(brandKey: string): Promise<Brand | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'coupons', `${brandKey}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as Brand
  } catch (error) {
    console.error(`Error loading brand data for ${brandKey}:`, error)
    return null
  }
}

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const couponsDir = path.join(process.cwd(), 'data', 'coupons')
    const files = fs.readdirSync(couponsDir)
    const brands: Brand[] = []
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const brandKey = file.replace('.json', '')
        const brand = await getBrandData(brandKey)
        if (brand) {
          brands.push(brand)
        }
      }
    }
    
    return brands
  } catch (error) {
    console.error('Error loading all brands:', error)
    return []
  }
}

export async function getFeaturedBrands(limit: number = 8): Promise<Brand[]> {
  const allBrands = await getAllBrands()
  // Sort by rating and return top brands
  return allBrands
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export async function getPopularBrands(limit: number = 12): Promise<Brand[]> {
  const allBrands = await getAllBrands()
  // Sort by total coupon usage (sum of usedCount)
  return allBrands
    .sort((a, b) => {
      const aUsage = a.coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0)
      const bUsage = b.coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0)
      return bUsage - aUsage
    })
    .slice(0, limit)
}

export async function getExclusiveCoupons(limit: number = 8): Promise<{brand: Brand, coupon: Coupon}[]> {
  const allBrands = await getAllBrands()
  const exclusiveCoupons: {brand: Brand, coupon: Coupon}[] = []
  
  for (const brand of allBrands) {
    // Get the best coupon from each brand (highest success rate)
    const bestCoupon = brand.coupons
      .filter(coupon => coupon.isVerified)
      .sort((a, b) => b.successRate - a.successRate)[0]
    
    if (bestCoupon) {
      exclusiveCoupons.push({ brand, coupon: bestCoupon })
    }
  }
  
  return exclusiveCoupons
    .sort((a, b) => b.coupon.successRate - a.coupon.successRate)
    .slice(0, limit)
}
