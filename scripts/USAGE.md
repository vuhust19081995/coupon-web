# CouponHub - Hướng dẫn sử dụng hoàn chỉnh

## 📋 Tổng quan

Hệ thống CouponHub bao gồm:
- **Next.js Website**: Frontend hiển thị coupon codes
- **Python Crawler**: Script crawl data từ CouponBirds
- **CSV Management**: Quản lý danh sách brands
- **JSON Data**: Lưu trữ thông tin brands và coupons

## 🚀 Cách sử dụng

### 1. Chuẩn bị file brands.csv

File `data/brands.csv` cần có cấu trúc:

```csv
Name,Brand Link,Affiliate Link
Nature Made,https://www.couponbirds.com/codes/naturemade.com,https://naturemade.com/affiliate/123456
Canva Pro,https://www.couponbirds.com/codes/canva.com,https://partner.canva.com/c/123456/canva-pro
```

**Lưu ý quan trọng:**
- **Brand Link**: Link CouponBirds để crawl data (format: `https://www.couponbirds.com/codes/[domain]`)
- **Affiliate Link**: Link affiliate của bạn (khi user click "Get Code" sẽ mở tab mới)

### 2. Chạy Python Crawler

```bash
cd scripts
source venv/bin/activate  # Nếu chưa có venv: python3 -m venv venv && pip install -r requirements.txt
python crawl-coupons.py
```

**Kết quả:**
- Tạo file JSON cho mỗi brand trong `data/coupons/`
- Mỗi file chứa: brand info, coupons, categories, rating, features

### 3. Kiểm tra Website

```bash
# Từ thư mục gốc
npm run dev
```

**Truy cập:**
- Homepage: http://localhost:3000
- Brand pages: http://localhost:3000/codes/[brand-key]

## 📁 Cấu trúc Files

```
coupon-web/
├── data/
│   ├── brands.csv          # Danh sách brands để crawl
│   └── coupons/           # JSON files cho từng brand
│       ├── nature-made.json
│       ├── canva-pro.json
│       └── ...
├── scripts/
│   ├── crawl-coupons.py   # Script crawl chính
│   ├── requirements.txt   # Python dependencies
│   ├── brands-template.csv # Template CSV
│   └── README.md          # Hướng dẫn chi tiết
└── src/                   # Next.js source code
```

## 🔧 Tùy chỉnh

### Thêm brand mới

1. Thêm dòng mới vào `data/brands.csv`:
```csv
New Brand,https://www.couponbirds.com/codes/newbrand.com,https://newbrand.com/affiliate/your-id
```

2. Chạy crawler:
```bash
cd scripts && python crawl-coupons.py
```

3. Brand mới sẽ có trang tại: `/codes/new-brand`

### Cập nhật affiliate links

Chỉnh sửa cột "Affiliate Link" trong `data/brands.csv` và chạy lại crawler.

### Tùy chỉnh coupon data

Chỉnh sửa trực tiếp file JSON trong `data/coupons/` hoặc modify script `crawl-coupons.py`.

## 🎯 Tính năng Website

### Homepage
- Hero section với search
- Featured deals carousel
- Popular stores grid
- Newsletter signup

### Brand Pages
- Brand header với rating và stats
- Featured deal highlight
- Coupon cards với success rates
- Sidebar với brand info và tips
- SEO-optimized meta tags

### Interactive Features
- Click to reveal coupon codes
- Copy to clipboard
- Open affiliate links in new tab
- Responsive design

## 📊 Data Structure

### Brand JSON Format
```json
{
  "brandKey": "nature-made",
  "brandName": "Nature Made", 
  "brandUrl": "https://www.couponbirds.com/codes/naturemade.com",
  "affiliateUrl": "https://naturemade.com/affiliate/123456",
  "description": "Brand description...",
  "coupons": [
    {
      "id": "unique-id",
      "title": "Deal title",
      "code": "COUPON20",
      "discount": "20%",
      "expiryDate": "2025-09-06",
      "isVerified": true,
      "usedCount": 500,
      "successRate": 90
    }
  ],
  "categories": ["Software", "Tools"],
  "rating": 4.5,
  "totalCoupons": 3,
  "activeCoupons": 3
}
```

## 🚨 Troubleshooting

### Crawler Issues
- **403 Forbidden**: CouponBirds blocks requests → Script tự động tạo sample data
- **CSV Error**: Kiểm tra format và encoding UTF-8
- **Permission Error**: Đảm bảo quyền ghi trong thư mục `data/coupons/`

### Website Issues  
- **Brand not found**: Kiểm tra file JSON có tồn tại trong `data/coupons/`
- **Affiliate link không hoạt động**: Kiểm tra URL trong CSV file
- **Page 404**: Đảm bảo brand key khớp với filename (lowercase, dashes)

## 💡 Tips

1. **Batch Processing**: Crawler tự động xử lý tất cả brands trong CSV
2. **Rate Limiting**: Script có delay ngẫu nhiên để tránh bị block
3. **Fallback Data**: Nếu crawl thất bại, tự động tạo sample coupons
4. **SEO Ready**: Meta tags và structured data được tạo tự động
5. **Mobile Friendly**: Responsive design cho mọi thiết bị

## 🔄 Workflow

1. **Setup**: Chuẩn bị brands.csv với affiliate links
2. **Crawl**: Chạy Python script để tạo JSON data  
3. **Deploy**: Website tự động load data từ JSON files
4. **Update**: Chỉnh sửa CSV và chạy lại crawler khi cần

Hệ thống đã sẵn sàng để bạn bắt đầu kiếm tiền từ affiliate marketing! 🎉
