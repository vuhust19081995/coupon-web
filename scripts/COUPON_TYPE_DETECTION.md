# Coupon Type Detection System

## Overview
The crawling script has been updated to automatically detect and differentiate between two types of coupons:
- **Code**: Requires a coupon code to be entered at checkout
- **Deal**: Automatic discount that doesn't require a code

## Detection Logic

### Method: `determine_coupon_type(element)`
This method analyzes HTML elements to determine the coupon type based on:

#### Code Indicators
Keywords that suggest a coupon code is required:
- "get code", "show code", "reveal code", "copy code"
- "coupon code", "promo code", "discount code"
- "use code", "apply code"

#### Deal Indicators  
Keywords that suggest no code is needed:
- "get deal", "shop now", "shop sale", "get offer"
- "no code needed", "no code required"
- "automatic discount", "sale", "deal", "offer"

#### Button Analysis
The script also examines button text and CSS classes:
- Buttons with "code" or "coupon" → Code type
- Buttons with "deal", "shop", "offer" → Deal type

## Implementation Details

### Updated Methods

1. **`extract_couponbirds_data()`**
   - Uses `determine_coupon_type()` to classify coupons
   - Generates appropriate codes based on type
   - Sets correct type field in coupon data

2. **`extract_coupon_data()`**
   - Generic coupon extraction with type detection
   - Handles both code and deal scenarios

3. **`extract_promotional_offers()`**
   - Pattern-based detection with predefined types
   - Maps promotional patterns to coupon types

4. **`generate_sample_coupons()`**
   - Creates mix of code and deal samples
   - Provides realistic examples of both types

### Code Generation Logic

**For Code Type:**
- If actual code found: Use extracted code
- If no code found: Generate random code (e.g., "SAVE20")

**For Deal Type:**
- Always set code to "NO CODE NEEDED"
- Focus on discount description

## Output Format

Each coupon now includes a `type` field:

```json
{
  "id": "brandname123",
  "title": "Special Coupon - 20%",
  "code": "SAVE20",
  "description": "Save with this verified Brand coupon code",
  "discount": "20%",
  "type": "code",
  "expiryDate": "2025-12-31",
  "isVerified": true,
  "usedCount": 500,
  "successRate": 90,
  "recentSaving": "$50.00",
  "savedTime": "2 hours ago"
}
```

## Benefits

1. **Accurate Classification**: Distinguishes between codes and deals
2. **Better User Experience**: Users know what to expect
3. **Improved UI**: Frontend can display appropriate buttons/actions
4. **Data Quality**: More structured and meaningful coupon data

## Usage

The updated script automatically applies type detection when crawling:
- CouponBirds pages (specialized crawler)
- Generic coupon sites
- Promotional content extraction
- Sample coupon generation

No additional configuration required - the detection runs automatically during the crawling process.
