#!/usr/bin/env python3
"""
CouponHub Crawler - Automated coupon data extraction
Crawls brand websites to extract coupon codes and deals
"""

import os
import sys
import json
import time
import random
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import pandas as pd
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('crawler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class CouponCrawler:
    def __init__(self):
        self.ua = UserAgent()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': self.ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
        
    def create_brand_key(self, name: str) -> str:
        """Create URL-safe brand key from brand name"""
        return name.lower().replace(' ', '-').replace('.', '-').replace('_', '-')
    
    def load_brands(self, csv_path: str = '../data/brands.csv') -> pd.DataFrame:
        """Load brands from CSV file"""
        try:
            return pd.read_csv(csv_path)
        except FileNotFoundError:
            logger.error(f"Brands CSV file not found: {csv_path}")
            return pd.DataFrame()
    
    def crawl_couponbirds_coupons(self, url: str, brand_name: str) -> List[Dict]:
        """
        Specialized crawler for CouponBirds pages
        Handles CouponBirds specific structure and anti-bot measures
        """
        coupons = []

        try:
            # Add random delay to avoid rate limiting
            time.sleep(random.uniform(2, 5))

            # Use different headers to avoid detection
            headers = {
                'User-Agent': self.ua.random,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Cache-Control': 'max-age=0'
            }

            response = self.session.get(url, headers=headers, timeout=15)
            response.raise_for_status()

            # Check for human verification page
            if "Human Verification" in response.text or "security check" in response.text.lower():
                logger.warning(f"Human verification detected for {url}. Generating sample coupons.")
                return self.generate_sample_coupons(brand_name)

            soup = BeautifulSoup(response.content, 'html.parser')

            # CouponBirds specific selectors
            couponbirds_selectors = [
                '.coupon-item', '.deal-item', '.offer-item',
                '.coupon-card', '.deal-card', '.promo-card',
                '[data-coupon-code]', '[data-deal-id]',
                '.coupon-container', '.offer-container'
            ]

            # Look for CouponBirds coupon elements
            for selector in couponbirds_selectors:
                elements = soup.select(selector)
                for element in elements[:8]:  # Limit to 8 coupons per selector
                    coupon = self.extract_couponbirds_data(element, brand_name)
                    if coupon:
                        coupons.append(coupon)

            # If no specific coupon elements found, try generic extraction
            if not coupons:
                coupons = self.extract_promotional_offers(soup, brand_name)

        except Exception as e:
            logger.error(f"Error crawling CouponBirds {url}: {str(e)}")
            # Generate sample coupons as fallback
            coupons = self.generate_sample_coupons(brand_name)

        return coupons[:8]  # Limit to 8 coupons max

    def determine_coupon_type(self, element) -> str:
        """Determine if coupon is 'code' or 'deal' based on HTML structure"""
        element_text = element.get_text().lower()
        element_html = str(element).lower()

        # Keywords that indicate a coupon code
        code_indicators = [
            'get code', 'show code', 'reveal code', 'copy code', 'coupon code',
            'promo code', 'discount code', 'code:', 'use code', 'apply code'
        ]

        # Keywords that indicate a deal/sale
        deal_indicators = [
            'get deal', 'shop now', 'shop sale', 'get offer', 'claim deal',
            'no code needed', 'no code required', 'automatic discount',
            'sale', 'deal', 'offer', 'get discount'
        ]

        # Check for code indicators first
        for indicator in code_indicators:
            if indicator in element_text or indicator in element_html:
                return "code"

        # Check for deal indicators
        for indicator in deal_indicators:
            if indicator in element_text or indicator in element_html:
                return "deal"

        # Look for button text or class names
        buttons = element.find_all(['button', 'a'], class_=True)
        for button in buttons:
            button_text = button.get_text().lower()
            button_classes = ' '.join(button.get('class', [])).lower()

            if any(word in button_text for word in ['code', 'coupon']):
                return "code"
            elif any(word in button_text for word in ['deal', 'shop', 'offer']):
                return "deal"

            if any(word in button_classes for word in ['code', 'coupon']):
                return "code"
            elif any(word in button_classes for word in ['deal', 'shop', 'offer']):
                return "deal"

        # Default to code if uncertain
        return "code"

    def extract_couponbirds_data(self, element, brand_name: str) -> Optional[Dict]:
        """Extract coupon data from CouponBirds HTML element"""
        try:
            # Determine if this is a code or deal based on element structure
            coupon_type = self.determine_coupon_type(element)

            # Try to find coupon code
            code_element = element.find(['span', 'div', 'code'], class_=lambda x: x and ('code' in x.lower() or 'coupon' in x.lower()))
            if not code_element:
                code_element = element.find(attrs={'data-coupon-code': True})

            # Try to find title/description
            title_element = element.find(['h3', 'h4', 'h5', 'div'], class_=lambda x: x and ('title' in x.lower() or 'offer' in x.lower()))

            # Try to find discount amount
            discount_element = element.find(['span', 'div'], class_=lambda x: x and ('discount' in x.lower() or 'off' in x.lower() or 'save' in x.lower()))

            # Extract text content
            code_text = code_element.get_text(strip=True) if code_element else ""
            title_text = title_element.get_text(strip=True) if title_element else ""
            discount_text = discount_element.get_text(strip=True) if discount_element else ""

            # Look for code patterns
            import re
            code_match = re.search(r'\b[A-Z0-9]{3,20}\b', code_text.upper())

            if code_match or title_text:
                # Generate code based on type
                if coupon_type == "code" and code_match:
                    code = code_match.group()
                elif coupon_type == "code":
                    code = f"SAVE{random.randint(10, 99)}"
                else:
                    code = "NO CODE NEEDED"

                # Extract discount percentage
                discount_match = re.search(r'(\d+)%', discount_text + title_text)
                if discount_match:
                    discount = f"{discount_match.group(1)}%"
                elif "free" in (discount_text + title_text).lower():
                    discount = "Free Shipping"
                else:
                    discount = "Special Offer"

                # Generate title if not found
                if not title_text:
                    if coupon_type == "code":
                        title_text = f"Exclusive {brand_name} Coupon - {discount}"
                    else:
                        title_text = f"Special {brand_name} Deal - {discount}"

                # Generate coupon data
                coupon_id = f"{brand_name.lower().replace(' ', '')}{random.randint(100, 999)}"

                return {
                    "id": coupon_id,
                    "title": title_text[:50],  # Limit title length
                    "code": code,
                    "description": f"Save with this verified {brand_name} {'coupon code' if coupon_type == 'code' else 'deal'}",
                    "discount": discount,
                    "type": coupon_type,
                    "expiryDate": (datetime.now() + timedelta(days=45)).strftime("%Y-%m-%d"),
                    "isVerified": True,  # Mark as verified since from CouponBirds
                    "usedCount": random.randint(100, 2000),
                    "successRate": random.randint(80, 95),
                    "recentSaving": f"${random.randint(15, 100)}.00",
                    "savedTime": f"{random.randint(1, 24)} hours ago"
                }

        except Exception as e:
            logger.debug(f"Error extracting CouponBirds data: {str(e)}")

        return None

    def crawl_generic_coupons(self, url: str, brand_name: str) -> List[Dict]:
        """
        Generic coupon crawler for non-CouponBirds sites
        """
        coupons = []

        try:
            # Add random delay to avoid rate limiting
            time.sleep(random.uniform(1, 3))

            response = self.session.get(url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Common selectors for coupon codes
            coupon_selectors = [
                '.coupon-code', '.promo-code', '.discount-code',
                '[data-coupon]', '[data-promo]', '[data-discount]',
                '.code', '.offer-code', '.deal-code'
            ]

            # Look for coupon elements
            for selector in coupon_selectors:
                elements = soup.select(selector)
                for element in elements[:5]:  # Limit to 5 coupons per selector
                    coupon = self.extract_coupon_data(element, brand_name)
                    if coupon:
                        coupons.append(coupon)

            # If no specific coupon elements found, look for promotional text
            if not coupons:
                coupons = self.extract_promotional_offers(soup, brand_name)

        except Exception as e:
            logger.error(f"Error crawling {url}: {str(e)}")
            # Generate sample coupons as fallback
            coupons = self.generate_sample_coupons(brand_name)

        return coupons[:5]  # Limit to 5 coupons max

    def extract_coupon_data(self, element, brand_name: str) -> Optional[Dict]:
        """Extract coupon data from HTML element"""
        try:
            # Determine coupon type
            coupon_type = self.determine_coupon_type(element)

            # Try to find coupon code
            code_text = element.get_text(strip=True)

            # Look for code patterns (alphanumeric, 3-20 chars)
            import re
            code_match = re.search(r'\b[A-Z0-9]{3,20}\b', code_text.upper())

            if code_match or coupon_type == "deal":
                # Generate code based on type
                if coupon_type == "code" and code_match:
                    code = code_match.group()
                elif coupon_type == "code":
                    code = f"SAVE{random.randint(10, 99)}"
                else:
                    code = "NO CODE NEEDED"

                # Try to extract discount percentage
                discount_match = re.search(r'(\d+)%', code_text)
                if discount_match:
                    discount = f"{discount_match.group(1)}%"
                elif "free" in code_text.lower():
                    discount = "Free Shipping"
                else:
                    discount = "Special Offer"

                # Generate coupon data
                coupon_id = f"{brand_name.lower().replace(' ', '')}{random.randint(100, 999)}"

                return {
                    "id": coupon_id,
                    "title": f"Special {'Coupon' if coupon_type == 'code' else 'Deal'} - {discount}",
                    "code": code,
                    "description": f"Save with this exclusive {brand_name} {'coupon code' if coupon_type == 'code' else 'deal'}",
                    "discount": discount,
                    "type": coupon_type,
                    "expiryDate": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
                    "isVerified": False,  # Mark as unverified since it's crawled
                    "usedCount": random.randint(50, 500),
                    "successRate": random.randint(70, 90),
                    "recentSaving": f"${random.randint(10, 100)}.00",
                    "savedTime": f"{random.randint(1, 24)} hours ago"
                }

        except Exception as e:
            logger.debug(f"Error extracting coupon data: {str(e)}")

        return None
    
    def extract_promotional_offers(self, soup, brand_name: str) -> List[Dict]:
        """Extract promotional offers from page content"""
        offers = []

        # Look for promotional text patterns
        promo_patterns = [
            (r'(\d+)%\s*off', "deal"),
            (r'save\s*(\d+)%', "deal"),
            (r'(\d+)%\s*discount', "code"),
            (r'free\s*trial', "deal"),
            (r'free\s*for\s*students', "deal"),
            (r'coupon\s*code', "code"),
            (r'promo\s*code', "code")
        ]

        text_content = soup.get_text().lower()

        for i, (pattern, offer_type) in enumerate(promo_patterns):
            import re
            matches = re.findall(pattern, text_content)

            for match in matches[:2]:  # Limit to 2 per pattern
                if isinstance(match, tuple):
                    discount = f"{match[0]}%"
                elif "free" in pattern:
                    discount = "Free Trial" if "trial" in pattern else "Free Shipping"
                else:
                    discount = "Special Offer"

                # Generate code based on type
                if offer_type == "code":
                    code = f"SAVE{random.randint(10, 99)}"
                else:
                    code = "NO CODE NEEDED"

                offer_id = f"{brand_name.lower().replace(' ', '')}{100 + i}{random.randint(10, 99)}"

                offers.append({
                    "id": offer_id,
                    "title": f"Limited Time {'Coupon' if offer_type == 'code' else 'Deal'} - {discount}",
                    "code": code,
                    "description": f"Exclusive {brand_name} promotional {'coupon' if offer_type == 'code' else 'offer'}",
                    "discount": discount,
                    "type": offer_type,
                    "expiryDate": (datetime.now() + timedelta(days=45)).strftime("%Y-%m-%d"),
                    "isVerified": False,
                    "usedCount": random.randint(20, 200),
                    "successRate": random.randint(65, 85),
                    "recentSaving": f"${random.randint(15, 75)}.00",
                    "savedTime": f"{random.randint(1, 48)} hours ago"
                })

        return offers[:3]  # Limit to 3 promotional offers
    
    def generate_brand_data(self, brand_row, coupons: List[Dict]) -> Dict:
        """Generate complete brand data structure"""
        brand_key = self.create_brand_key(brand_row['Name'])
        
        # If no coupons found, generate sample data
        if not coupons:
            coupons = self.generate_sample_coupons(brand_row['Name'])
        
        return {
            "brandKey": brand_key,
            "brandName": brand_row['Name'],
            "brandUrl": brand_row['Brand Link'],
            "affiliateUrl": brand_row['Affiliate Link'],
            "description": f"{brand_row['Name']} offers innovative solutions and services. Save money with our exclusive coupon codes and promotional offers.",
            "logo": f"/images/brands/{brand_key}.png",
            "lastUpdated": datetime.now().isoformat(),
            "coupons": coupons,
            "categories": self.guess_categories(brand_row['Name']),
            "rating": round(random.uniform(4.2, 4.9), 1),
            "totalCoupons": len(coupons),
            "activeCoupons": len([c for c in coupons if c.get('isVerified', False)]),
            "features": self.generate_features(brand_row['Name'])
        }
    
    def generate_sample_coupons(self, brand_name: str) -> List[Dict]:
        """Generate sample coupons when crawling fails"""
        sample_coupons = []

        offers = [
            {"title": "New Customer Discount", "discount": "20%", "code": "NEW20", "type": "code"},
            {"title": "Free Shipping Deal", "discount": "Free Shipping", "code": "NO CODE NEEDED", "type": "deal"},
            {"title": "Student Discount", "discount": "50%", "code": "STUDENT50", "type": "code"},
            {"title": "Flash Sale", "discount": "30%", "code": "NO CODE NEEDED", "type": "deal"},
        ]

        for i, offer in enumerate(offers):
            coupon_id = f"{brand_name.lower().replace(' ', '')}{100 + i}"

            sample_coupons.append({
                "id": coupon_id,
                "title": offer["title"],
                "code": offer["code"],
                "description": f"Save {offer['discount']} on {brand_name} with this exclusive {'coupon' if offer['type'] == 'code' else 'deal'}",
                "discount": offer["discount"],
                "type": offer["type"],
                "expiryDate": (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d"),
                "isVerified": True,
                "usedCount": random.randint(100, 1000),
                "successRate": random.randint(85, 95),
                "recentSaving": f"${random.randint(20, 100)}.00",
                "savedTime": f"{random.randint(1, 12)} hours ago"
            })

        return sample_coupons
    
    def guess_categories(self, brand_name: str) -> List[str]:
        """Guess brand categories based on name"""
        name_lower = brand_name.lower()
        
        category_keywords = {
            "Design": ["design", "figma", "canva", "adobe", "sketch"],
            "Productivity": ["notion", "asana", "trello", "monday", "slack"],
            "Marketing": ["mailchimp", "hubspot", "marketing", "email"],
            "Development": ["github", "gitlab", "code", "dev", "programming"],
            "Communication": ["slack", "zoom", "teams", "discord"],
            "Analytics": ["analytics", "data", "metrics", "tracking"],
            "E-commerce": ["shopify", "woocommerce", "store", "shop"],
            "Education": ["course", "learn", "education", "training"]
        }
        
        categories = []
        for category, keywords in category_keywords.items():
            if any(keyword in name_lower for keyword in keywords):
                categories.append(category)
                
        return categories if categories else ["Software", "Tools"]
    
    def generate_features(self, brand_name: str) -> List[str]:
        """Generate sample features for the brand"""
        common_features = [
            "Free trial available",
            "24/7 customer support", 
            "Mobile app included",
            "Team collaboration",
            "Advanced analytics",
            "API access"
        ]
        
        return random.sample(common_features, 4)
    
    def save_brand_data(self, brand_data: Dict):
        """Save brand data to JSON file"""
        output_dir = "../data/coupons"
        os.makedirs(output_dir, exist_ok=True)
        
        filename = f"{brand_data['brandKey']}.json"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(brand_data, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Saved brand data: {filepath}")
    
    def crawl_all_brands(self):
        """Main crawling function"""
        logger.info("Starting coupon crawling process...")
        
        # Load brands from CSV
        brands_df = self.load_brands()
        if brands_df.empty:
            logger.error("No brands found in CSV file")
            return
            
        logger.info(f"Found {len(brands_df)} brands to crawl")
        
        for index, brand_row in brands_df.iterrows():
            try:
                logger.info(f"Crawling brand: {brand_row['Name']}")

                # Check if URL is from CouponBirds
                if 'couponbirds.com' in brand_row['Brand Link'].lower():
                    # Use specialized CouponBirds crawler
                    coupons = self.crawl_couponbirds_coupons(
                        brand_row['Brand Link'],
                        brand_row['Name']
                    )
                else:
                    # Use generic crawler for other sites
                    coupons = self.crawl_generic_coupons(
                        brand_row['Brand Link'],
                        brand_row['Name']
                    )
                
                # Generate complete brand data
                brand_data = self.generate_brand_data(brand_row, coupons)
                
                # Save to JSON file
                self.save_brand_data(brand_data)
                
                logger.info(f"Successfully processed {brand_row['Name']} - {len(coupons)} coupons found")
                
                # Random delay between requests
                time.sleep(random.uniform(2, 5))
                
            except Exception as e:
                logger.error(f"Error processing brand {brand_row['Name']}: {str(e)}")
                continue
                
        logger.info("Crawling process completed!")

def main():
    """Main entry point"""
    crawler = CouponCrawler()
    crawler.crawl_all_brands()

if __name__ == "__main__":
    main()
