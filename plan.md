# Kế hoạch Website Affiliate Mã Giảm Giá SaaS

## 1. Giới thiệu dự án

Website affiliate mã giảm giá tập trung vào các phần mềm SaaS ở thị trường nước ngoài. Mục tiêu xây dựng một nền tảng tĩnh với chi phí vận hành gần như bằng 0, tối ưu SEO để có thu nhập thụ động từ affiliate marketing.

**Đặc điểm chính:**
- Static site không cần server/database
- Dữ liệu lưu trong file JSON tĩnh
- Tự động crawl và cập nhật coupon
- Tối ưu SEO cho traffic tự nhiên
- Chi phí vận hành ~$0 (chỉ domain + Vercel free)

## 2. Mục tiêu cụ thể

### Ngắn hạn (1-3 tháng)
⬜ Xây dựng MVP với 20-50 brand SaaS phổ biến
⬜ Đạt 1000+ organic visitors/tháng
⬜ Thu nhập đầu tiên từ affiliate (>$100/tháng)
⬜ Index 100+ trang trên Google

### Dài hạn (6-12 tháng)
⬜ Mở rộng 200+ brand SaaS
⬜ Đạt 10,000+ organic visitors/tháng
⬜ Thu nhập ổn định $1000-1500/tháng (~10 triệu VND)
⬜ Top 3 cho các keyword chính

## 3. Công nghệ sử dụng

### Frontend
- **Next.js 14** (App Router) - Static Site Generation
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **React Hook Form** - Form handling

### Deployment & Hosting
- **Vercel** - Hosting (free tier)
- **Cloudflare** - CDN và DNS (free)

### SEO & Analytics
- **Next.js SEO** - Meta tags, sitemap
- **Google Analytics 4** - Traffic tracking
- **Google Search Console** - SEO monitoring

### Data Management
- **JSON files** - Static data storage
- **CSV** - Brand list management
- **Python scripts** - Crawling automation

## 4. Cấu trúc thư mục dự án

```
coupon-web/
├── public/
│   ├── images/
│   │   └── brands/           # Logo các brand
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── page.tsx          # Trang chủ
│   │   ├── codes/
│   │   │   └── [brand]/      # Dynamic routes cho từng brand
│   │   ├── blog/             # Content marketing
│   │   └── layout.tsx
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ExclusiveCodes.tsx
│   │   │   ├── FeaturedStores.tsx
│   │   │   └── PopularStores.tsx
│   │   ├── CouponCard.tsx
│   │   ├── BrandHeader.tsx
│   │   └── SEOHead.tsx
│   └── lib/
│       └── utils.ts
├── data/
│   ├── brands.csv            # Danh sách brand
│   └── coupons/
│       ├── naturemade-com.json
│       ├── element-code.json
│       └── ...
└── scripts/
    ├── crawl-coupons.py      # Script crawl tự động (Python)
    ├── requirements.txt      # Python dependencies
    └── generate-sitemap.js   # Tạo sitemap
```

### Định dạng file JSON brand

```json
{
  "brandKey": "naturemade-com",
  "brandName": "Nature Made",
  "brandUrl": "https://naturemade.com",
  "affiliateUrl": "https://affiliate-link.com/naturemade",
  "description": "Nature Made offers premium vitamins and supplements...",
  "logo": "/images/brands/naturemade-com.png",
  "lastUpdated": "2024-01-15T10:30:00Z",
  "coupons": [
    {
      "id": "nm001",
      "title": "20% Off First Order",
      "code": "WELCOME20",
      "description": "Get 20% discount on your first purchase",
      "discount": "20%",
      "type": "percentage",
      "expiryDate": "2024-02-28",
      "isVerified": true,
      "usedCount": 1250,
      "successRate": 85
    }
  ],
  "categories": ["Health", "Supplements"],
  "rating": 4.5,
  "totalCoupons": 8,
  "activeCoupons": 6
}
```

## 5. Kế hoạch nội dung ban đầu

### Chủ đề content marketing
⬜ "Best SaaS Deals 2024" - keyword: saas deals, software discounts
⬜ "Top 10 Project Management Tools with Coupons" - keyword: project management coupons
⬜ "Email Marketing Software Discounts" - keyword: email marketing deals
⬜ "Design Tools Promo Codes" - keyword: design software coupons
⬜ "CRM Software Deals and Discounts" - keyword: crm deals

### Keyword strategy
- **Primary:** "[brand name] coupon code", "[brand name] promo code"
- **Secondary:** "saas deals", "software discounts", "[category] coupons"
- **Long-tail:** "how to save money on [software type]"

## 6. Chiến lược SEO

### On-page SEO
⬜ Tối ưu title tags: "[Brand] Coupon Codes & Promo Codes - Save Up to X%"
⬜ Meta descriptions hấp dẫn với CTA
⬜ H1, H2 structure rõ ràng
⬜ Internal linking giữa các brand pages
⬜ Schema markup cho coupons
⬜ Fast loading (Core Web Vitals)

### Off-page SEO
⬜ Guest posting trên blog công nghệ
⬜ Tham gia communities (Reddit, Discord)
⬜ Social media presence (Twitter, LinkedIn)
⬜ Backlink từ deal/coupon directories

## 7. Kế hoạch phát triển tính năng

### Phase 1 (Tuần 1-4)
⬜ Basic coupon listing
⬜ Brand pages
⬜ Search functionality
⬜ Responsive design

### Phase 2 (Tuần 5-8)
⬜ Coupon verification system
⬜ User reviews/ratings
⬜ Email newsletter signup
⬜ Blog section

### Phase 3 (Tuần 9-12)
⬜ Advanced filtering
⬜ Personalized recommendations
⬜ Social sharing
⬜ Analytics dashboard

## 8. Thiết kế chương trình crawl coupon

### File brands.csv format
```csv
Name,Affiliate Link,Branch Link
Nature Made,https://affiliate.com/naturemade,https://naturemade.com/coupons
Element Code,https://affiliate.com/elementcode,https://elementcode.com/deals
Canva Pro,https://affiliate.com/canva,https://canva.com/pricing
```

### Crawl workflow
⬜ Đọc brands.csv
⬜ Tạo brand-key từ Name (lowercase, replace spaces với dashes)
⬜ Truy cập Branch Link của từng brand
⬜ Extract coupon data (title, code, discount, expiry)
⬜ Download brand logo/images
⬜ Tạo/update file JSON tương ứng
⬜ Validate data và log errors
⬜ Schedule chạy hàng ngày

### Script crawl-coupons.py structure
```python
# Pseudo code
import pandas as pd
import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime

def crawl_all_brands():
    # Đọc file CSV brands
    brands_df = pd.read_csv('data/brands.csv')

    for index, brand in brands_df.iterrows():
        brand_key = create_brand_key(brand['Name'])
        coupons = crawl_brand_coupons(brand['Branch Link'])

        brand_data = {
            'brandKey': brand_key,
            'brandName': brand['Name'],
            'affiliateUrl': brand['Affiliate Link'],
            'brandUrl': brand['Branch Link'],
            'coupons': coupons,
            'lastUpdated': datetime.now().isoformat(),
            # ... other data
        }

        save_json(f'data/coupons/{brand_key}.json', brand_data)
        time.sleep(2)  # Avoid rate limiting

def crawl_brand_coupons(url):
    # Sử dụng requests + BeautifulSoup hoặc Selenium
    # Extract coupon data từ trang web
    pass
```

### Python dependencies (requirements.txt)
```
requests>=2.31.0
beautifulsoup4>=4.12.0
pandas>=2.0.0
selenium>=4.15.0
lxml>=4.9.0
python-dotenv>=1.0.0
```

## 9. Thiết kế UI giống CouponBirds

### Trang Home (/) - Giống https://www.couponbirds.com/
⬜ **Hero Section:**
  - Logo và tagline chính
  - Search bar lớn ở giữa
  - Value proposition (High-Quality Coupons)
  - Trust indicators (số user, rating)

⬜ **Exclusive Codes Section:**
  - "CouponBirds Exclusive Codes" banner
  - Grid layout 4 cột (desktop) / 2 cột (mobile)
  - Mỗi card hiển thị: logo brand, tên, discount %, recent savings, coupon code

⬜ **Featured Stores Section:**
  - "Featured Stores" với logo brands
  - Carousel/slider layout
  - Click vào brand → chuyển đến trang brand detail

⬜ **Popular Stores Section:**
  - "Shop at Popular Stores"
  - Grid layout brands phổ biến
  - Logo + tên brand

⬜ **Trust Building:**
  - User reviews/testimonials
  - Partners & Awards section
  - Statistics (số tiền đã tiết kiệm, số user)

### Brand Detail Pages (/codes/[brand]) - Giống naturemade.com page
⬜ **Brand Header:**
  - Logo brand, tên, rating, description
  - "Visit Store" button (affiliate link)
  - Breadcrumb navigation

⬜ **Coupon Cards Grid:**
  - Discount badge (20% OFF)
  - Coupon title và description
  - "Get Code" button với reveal animation
  - Expiry date và verification status
  - Success rate và used count
  - Recent savings info

⬜ **Sidebar:**
  - Categories filter
  - Related brands
  - Top brands list

### Interactive Features
⬜ Click to reveal coupon code
⬜ Copy to clipboard với animation
⬜ Open affiliate link in new tab
⬜ Coupon voting (helpful/not helpful)
⬜ Search và filter coupons
⬜ Recent savings notifications

## 10. Kênh triển khai và theo dõi

### Deployment
⬜ Setup Vercel deployment từ GitHub
⬜ Custom domain setup
⬜ SSL certificate
⬜ CDN configuration

### Monitoring tools
⬜ Google Analytics 4 setup
⬜ Google Search Console verification
⬜ Vercel Analytics
⬜ Uptime monitoring

### KPIs theo dõi
- Organic traffic growth
- Conversion rate (click to affiliate)
- Bounce rate và session duration
- Top performing keywords
- Revenue per visitor

## 11. Rủi ro và cách xử lý

### Rủi ro kỹ thuật
⬜ **Crawl bị block:** Rotate IP, add delays, use headless browser
⬜ **Data không chính xác:** Manual verification, user reporting
⬜ **Site performance:** Image optimization, lazy loading

### Rủi ro business
⬜ **Affiliate program changes:** Diversify affiliate networks
⬜ **Competition:** Focus on niche keywords, better UX
⬜ **SEO algorithm updates:** White-hat SEO, quality content

## 12. Timeline triển khai (8 tuần)

### Tuần 1: Setup & Foundation
⬜ Setup Next.js project với TypeScript
⬜ Cấu hình Tailwind CSS
⬜ Tạo basic layout và components
⬜ Setup GitHub repository

### Tuần 2: Data Structure & Crawling
⬜ Tạo brands.csv với 20 brand đầu tiên
⬜ Setup Python environment và install dependencies
⬜ Viết script crawl cơ bản với requests + BeautifulSoup
⬜ Test crawl 5 brand và tạo JSON files
⬜ Setup data validation và error handling

### Tuần 3: Core Pages Development
⬜ **Trang chủ (Home page):**
  - Hero section với search bar
  - Exclusive codes section
  - Featured stores carousel
  - Popular stores grid
⬜ **Brand detail pages ([brand] route):**
  - Brand header với logo, rating
  - Coupon cards grid layout
  - Sidebar với categories
⬜ Search functionality
⬜ Responsive design cho mobile/desktop

### Tuần 4: SEO & Content
⬜ SEO optimization (meta tags, sitemap)
⬜ Viết 5 blog posts đầu tiên
⬜ Schema markup implementation
⬜ Internal linking structure

### Tuần 5: Advanced Features
⬜ Coupon verification system
⬜ User interaction (voting, reviews)
⬜ Email newsletter signup
⬜ Social sharing buttons

### Tuần 6: Testing & Optimization
⬜ Performance optimization
⬜ Cross-browser testing
⬜ Mobile optimization
⬜ A/B test coupon card designs

### Tuần 7: Launch Preparation
⬜ Domain setup và SSL
⬜ Analytics setup (GA4, GSC)
⬜ Final content review
⬜ Backup và monitoring setup

### Tuần 8: Launch & Marketing
⬜ Soft launch với beta users
⬜ Submit to Google Search Console
⬜ Social media announcement
⬜ Monitor và fix issues

---

## Ghi chú quan trọng

- **Bắt đầu nhỏ:** Focus vào 20-30 brand chất lượng thay vì hàng trăm brand
- **Content is king:** Viết content hữu ích, không chỉ list coupon
- **User experience:** Đảm bảo site load nhanh và dễ sử dụng
- **Compliance:** Tuân thủ terms của affiliate programs
- **Patience:** SEO cần thời gian, kỳ vọng kết quả sau 3-6 tháng

**Mục tiêu cuối:** Tạo ra một passive income stream ổn định từ affiliate marketing với chi phí vận hành tối thiểu.
