#!/usr/bin/env python3
"""
Test script for Nature Made brand
"""

import sys
import os
import importlib.util

# Load the crawl-coupons module
spec = importlib.util.spec_from_file_location("crawl_coupons", "crawl-coupons.py")
crawl_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(crawl_module)

CouponCrawler = crawl_module.CouponCrawler

def main():
    crawler = CouponCrawler()
    
    # Nature Made brand data
    brand_row = {
        'Name': 'Nature Made',
        'Brand Link': 'https://www.couponbirds.com/codes/naturemade.com',
        'Affiliate Link': 'https://naturemade.com/affiliate/123456'
    }
    
    print(f"Processing: {brand_row['Name']}")
    print(f"Brand Link: {brand_row['Brand Link']}")
    print(f"Affiliate Link: {brand_row['Affiliate Link']}")
    
    # Crawl coupons
    coupons = crawler.crawl_couponbirds_coupons(
        brand_row['Brand Link'], 
        brand_row['Name']
    )
    
    print(f"Found {len(coupons)} coupons")
    
    # Generate brand data
    brand_data = crawler.generate_brand_data(brand_row, coupons)
    
    # Save to JSON
    crawler.save_brand_data(brand_data)
    
    print(f"Successfully created: {brand_data['brandKey']}.json")

if __name__ == "__main__":
    main()
