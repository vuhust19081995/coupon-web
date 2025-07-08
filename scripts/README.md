# CouponHub Crawler - Hướng dẫn sử dụng

## Cấu trúc file brands.csv

File `brands.csv` cần có 3 cột chính:

```csv
Name,Brand Link,Affiliate Link
Nature Made,https://www.couponbirds.com/codes/naturemade.com,https://naturemade.com/affiliate/123456
Canva Pro,https://www.couponbirds.com/codes/canva.com,https://partner.canva.com/c/123456/canva-pro
```

### Giải thích các cột:

1. **Name**: Tên brand (sẽ hiển thị trên website)
2. **Brand Link**: Link CouponBirds để crawl data (format: `https://www.couponbirds.com/codes/[domain]`)
3. **Affiliate Link**: Link affiliate của bạn (khi user click "Get Code" sẽ mở tab mới với link này)

## Cách sử dụng

### 1. Chuẩn bị môi trường

```bash
cd scripts
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Chuẩn bị file brands.csv

- Copy file `brands-template.csv` thành `../data/brands.csv`
- Chỉnh sửa file với các brand và affiliate links của bạn
- Đảm bảo Brand Link có format đúng: `https://www.couponbirds.com/codes/[domain]`

### 3. Chạy crawler

```bash
source venv/bin/activate
python crawl-coupons.py
```

### 4. Kết quả

Script sẽ tạo ra các file JSON trong thư mục `../data/coupons/`:
- `naturemade.json`
- `canva-pro.json` 
- `notion.json`
- ...

Mỗi file chứa thông tin brand và danh sách coupon codes.

## Lưu ý quan trọng

1. **Rate Limiting**: Script có delay ngẫu nhiên giữa các request để tránh bị block
2. **Fallback Data**: Nếu crawl thất bại, script sẽ tạo sample coupons
3. **Brand Key**: Tên file JSON được tạo từ brand name (lowercase, replace spaces với dashes)
4. **Affiliate Links**: Đảm bảo affiliate links của bạn hoạt động đúng

## Troubleshooting

### Lỗi 403 Forbidden
- CouponBirds có anti-bot protection
- Script sẽ tự động fallback sang sample data
- Có thể thử thay đổi User-Agent hoặc sử dụng proxy

### File không được tạo
- Kiểm tra quyền ghi file trong thư mục `../data/coupons/`
- Đảm bảo thư mục tồn tại

### CSV format error
- Đảm bảo file CSV có đúng 3 cột
- Không có dấu phẩy thừa trong tên brand
- Sử dụng UTF-8 encoding

## Ví dụ Brand Links

```
https://www.couponbirds.com/codes/naturemade.com
https://www.couponbirds.com/codes/canva.com
https://www.couponbirds.com/codes/notion.so
https://www.couponbirds.com/codes/figma.com
https://www.couponbirds.com/codes/adobe.com
```

Format: `https://www.couponbirds.com/codes/[brand-domain]`
