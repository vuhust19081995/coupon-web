# Coupon Website - Next.js Affiliate Coupon Platform

A modern, responsive coupon website built with Next.js, designed for affiliate marketing with zero-cost static site deployment on Vercel.

## 🚀 Features

- **Modern Design**: Clean, responsive UI inspired by CouponBirds.com
- **Compact Layout**: Space-efficient coupon cards for better user experience
- **Peel-off Effect**: Interactive coupon reveal animation
- **Static Site**: JSON-based data storage for zero-cost hosting
- **SEO Optimized**: Dynamic metadata and structured data
- **Mobile First**: Fully responsive design
- **Fast Performance**: Optimized with Next.js 15 and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Storage**: JSON files (no database required)
- **Deployment**: Vercel (static export)
- **Language**: TypeScript

## 📁 Project Structure

```
coupon-web/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   └── codes/[brand]/  # Dynamic brand pages
│   ├── components/         # Reusable React components
│   │   ├── CouponCard.tsx  # Individual coupon display
│   │   ├── CouponTabs.tsx  # Coupon filtering tabs
│   │   └── ActionButton.tsx # Affiliate link buttons
│   └── lib/                # Utilities and data functions
│       ├── data.ts         # Data loading functions
│       └── utils.ts        # Helper functions and types
├── data/
│   └── coupons/           # JSON files for each brand
├── scripts/               # Python crawling scripts
└── public/               # Static assets
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd coupon-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Data Management

### Adding New Brands

1. Create a new JSON file in `data/coupons/` with the format:
```json
{
  "brandKey": "brand-name-coupon",
  "brandName": "Brand Name",
  "brandUrl": "https://brand.com",
  "affiliateUrl": "https://affiliate-link.com",
  "description": "Brand description...",
  "coupons": [
    {
      "id": "unique-id",
      "title": "Deal Title",
      "code": "COUPON20",
      "description": "Deal description",
      "discount": "20%",
      "type": "code",
      "expiryDate": "2025-12-31",
      "isVerified": true,
      "usedCount": 500,
      "successRate": 90
    }
  ],
  "categories": ["Category1", "Category2"],
  "rating": 4.5,
  "totalCoupons": 5,
  "activeCoupons": 4
}
```

### Using the Crawling Script

The project includes Python scripts for automated coupon crawling:

1. Navigate to the scripts directory:
```bash
cd scripts
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Add brands to `brands.csv`:
```csv
Brand Name,Affiliate Link,Website URL
Nature Made,https://affiliate-link.com,https://naturemade.com
```

4. Run the crawler:
```bash
python main.py
```

## 🚀 Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Build Settings** (if needed):
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (for first deployment)
   - Project name: Enter your desired name
   - Directory: `./` (current directory)

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

### Method 3: Static Export (Alternative)

For completely static hosting on any platform:

1. **Configure for static export** in `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }

   module.exports = nextConfig
   ```

2. **Build and export**:
   ```bash
   npm run build
   ```

3. **Deploy the `out/` folder** to any static hosting service.

## 🔧 Environment Variables

For production deployment, you may want to set:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📈 SEO & Performance

- **Automatic sitemap generation** for all brand pages
- **Dynamic metadata** with Open Graph tags
- **Structured data** for better search visibility
- **Image optimization** with Next.js Image component
- **Static generation** for fast loading times

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom colors/themes
- Update components in `src/components/` for UI changes
- Customize layouts in `src/app/` for page structure

### Branding
- Replace logo and favicon in `public/`
- Update site metadata in `src/app/layout.tsx`
- Modify color scheme in Tailwind config

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Happy Couponing! 🎉**
