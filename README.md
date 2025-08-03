# KUINI Honey Website - Complete Package

A modern, responsive website for KUINI - Premium New Zealand Manuka Honey brand with scalable products section.

## 🚀 Key Features

- **Scalable Products Section**: Automatically adjusts grid layout for any number of products (1-100+)
- **6 Test Products Included**: Full product showcase with detailed information
- **Config-driven content**: All website content and colors updated via `config/site-config.json`
- **Smart Grid System**: CSS automatically optimizes layout based on product count
- **Product Filtering**: Built-in category filters for large product catalogs (6+ products)
- **Responsive design**: Beautiful layouts on all devices
- **Modern aesthetics**: Rich earthy color palette with elegant typography
- **Accessibility**: High contrast, keyboard navigation, screen reader support
- **Local assets**: All media files included and organized for easy hosting

## 📁 Project Structure

```
kuini-honey-website/
├── index.html                 # Main HTML file with scalable products section
├── assets/
│   ├── css/
│   │   └── styles.css        # Enhanced CSS with smart grid system
│   ├── js/
│   │   └── app.js           # JavaScript with products management
│   └── images/
│       ├── hero-background.jpg        # Hero section background
│       ├── beekeeper-portrait.jpg     # Beekeeper profile image
│       ├── honey-grading-chart.png    # UMF/MGO grading infographic
│       ├── product-reserve.jpg        # Product images (6 included)
│       ├── product-platinum.jpg
│       ├── product-classic.jpg
│       ├── product-daily.jpg
│       ├── product-pure.jpg
│       ├── product-wildflower.jpg
│       ├── manuka-flower.jpg          # Decorative images
│       └── honeycomb-pattern.jpg
├── config/
│   └── site-config.json      # Website configuration with 6 test products
└── README.md                 # This file
```

## 🛍️ Products Section Features

### Scalable Grid System
The products section automatically adapts to any number of products:

- **1-3 products**: Single row, centered layout
- **4-6 products**: Optimized 2x2 or 3x2 grid
- **7+ products**: Dynamic grid with filtering options
- **Mobile**: Always single column for best mobile experience

### Smart Product Cards
Each product card includes:
- High-quality product image
- UMF/MGO grade badges
- Detailed descriptions and tasting notes
- Feature lists with checkmarks
- Size and price range information
- "Best for" usage recommendations

### Automatic Filtering (6+ Products)
When you have 6 or more products, the system automatically shows category filters:
- All Products
- Therapeutic Grade (UMF 15+, 20+, 25+)
- Daily Use (UMF 5+, 10+)
- Special Blends (Multi-floral, Wildflower)

## 📦 6 Test Products Included

1. **KUINI Reserve UMF 25+** (Ultra Premium) - Medical grade therapeutic honey
2. **KUINI Platinum UMF 20+** (Premium) - High-potency wellness support
3. **KUINI Classic UMF 15+** (Premium) - Perfect balance for daily use
4. **KUINI Daily UMF 10+** (Accessible Premium) - Family-friendly option
5. **KUINI Pure UMF 5+** (Entry Premium) - Great for cooking and beginners
6. **KUINI Wildflower Blend** (Artisan) - Unique multi-floral blend

## 🎨 Adding/Editing Products

### Add New Products
Edit `config/site-config.json` and add to the `content.products` array:

```json
{
  "name": "KUINI Ultra UMF 30+",
  "grade": "UMF 30+ | MGO 1500+",
  "description": "Our highest therapeutic grade for serious wellness",
  "tasting_notes": "Intensely medicinal with complex herbal notes",
  "features": ["UMF 30+ certified", "MGO 1500+", "Medical grade", "Ultra rare"],
  "image": "assets/images/product-ultra.jpg",
  "price_range": "Ultra Premium",
  "size": "250g",
  "best_for": "Medical applications, wound care, intensive therapy"
}
```

### Automatic Grid Adjustment
The system will automatically:
- Update the grid layout based on product count
- Show/hide category filters as needed
- Optimize spacing and animations
- Handle responsive breakpoints

### Product Images
- Recommended size: 400x500px (portrait orientation)
- Format: JPG or PNG
- File size: Under 500KB each
- Place in `assets/images/` directory

## 🚀 Deployment

1. **Upload Files**: Upload the entire `kuini-honey-website` folder to your web server
2. **Test Products**: All 6 test products will display automatically
3. **Customize**: Edit `config/site-config.json` to update products and content
4. **Go Live**: Your scalable honey product showcase is ready!

### Hosting Checklist
- [ ] All files uploaded to server
- [ ] Images load correctly
- [ ] Products display in responsive grid
- [ ] Filters work (if 6+ products)
- [ ] Mobile layout functions properly
- [ ] Config file accessible via browser

## 🔧 Customization

### Colors & Theme
Update colors in `config/site-config.json`:
```json
{
  "theme": {
    "colors": {
      "primary": {
        "honey_gold": "#D4A574"
      },
      "accent": {
        "forest_green": "#2D5016"
      }
    }
  }
}
```

### Product Categories
Products are automatically categorized by:
- UMF rating (therapeutic vs daily use)
- Product type (standard vs specialty blends)
- Custom categories can be added via JavaScript

### Grid Breakpoints
The CSS automatically handles:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-4 columns based on product count
- Large screens: Optimized spacing

## 📱 Mobile Optimization

- Products stack in single column on mobile
- Touch-friendly product cards
- Optimized images for mobile screens
- Fast loading with lazy loading
- Smooth scrolling and animations

## 🔍 SEO & Performance

- Semantic HTML structure for each product
- Optimized images with alt text
- Lazy loading for better performance
- Clean URLs and meta descriptions
- Fast CSS grid system
- Minimal JavaScript overhead

## 🛠️ Technical Details

### CSS Grid System
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

/* Smart adjustments based on product count */
.products-grid[data-product-count="6"] {
  grid-template-columns: repeat(3, 1fr);
}
```

### JavaScript Features
- Dynamic product rendering from config
- Smart grid optimization
- Category filtering system
- Lazy loading and animations
- Error handling and fallbacks

## 📞 Support

The website includes:
- Comprehensive error handling
- Fallback content if config fails
- Console logging for debugging
- Responsive design testing
- Cross-browser compatibility

## 📈 Scaling Up

This system easily handles:
- **Small catalogs**: 1-10 products with elegant layouts
- **Medium catalogs**: 10-50 products with filtering
- **Large catalogs**: 50+ products with advanced categorization
- **Enterprise**: Unlimited products with performance optimization

---

🍯 **Ready to showcase your premium Manuka honey collection with a professional, scalable website!**
