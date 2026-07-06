import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

// Get directories
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

// Load .env file manually (Node compatibility fallback)
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  for (const line of envConfig.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      if (value.length > 0 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  }
}

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === "your-project-id-here") {
  console.error("❌ Error: PUBLIC_SANITY_PROJECT_ID is not defined or is set to default in .env");
  process.exit(1);
}

if (!token) {
  console.log("\n==================================================================");
  console.log("🔑 SANITY WRITE TOKEN REQUIRED");
  console.log("==================================================================");
  console.log("To import your website details into Sanity, you need a Write Token.");
  console.log("Please follow these steps to get one:");
  console.log("1. Open https://sanity.io/manage in your browser.");
  console.log(`2. Select your project: "${projectId}"`);
  console.log("3. Click on the 'API' tab.");
  console.log("4. Under 'Tokens', click 'Add API Token'.");
  console.log("5. Set Name: 'Seed Script', Role: 'Editor' (provides write permissions).");
  console.log("6. Save & copy the generated token.");
  console.log("7. Add it to your '.env' file in the puffy-parallax folder:");
  console.log("   SANITY_WRITE_TOKEN=your_token_here");
  console.log("8. Re-run this script: node scripts/seed-sanity.mjs\n");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Helper to convert array of strings into Sanity Portable Text block list
function toPortableText(paragraphs) {
  return paragraphs.map((text, i) => {
    if (text.startsWith("### ")) {
      return {
        _key: `block-${i}`,
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: text.substring(4) }],
        markDefs: []
      };
    } else if (text.startsWith("## ")) {
      return {
        _key: `block-${i}`,
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: text.substring(3) }],
        markDefs: []
      };
    } else if (text.startsWith("- ")) {
      return {
        _key: `block-${i}`,
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: text.substring(2) }],
        markDefs: []
      };
    } else {
      return {
        _key: `block-${i}`,
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: text }],
        markDefs: []
      };
    }
  });
}

// ──────────────────────────────────────────
// 1. Site Settings Document
// ──────────────────────────────────────────
const siteSettingsDoc = {
  "_id": "siteSettings",
  "_type": "siteSettings",
  "address": "Sumitra Nagar, Biharimills Colony, Patna City, Patna, Bihar 800008",
  "description": "Professional YouTube thumbnails, social media designs, and premium template packs. Up to 75% off. Trusted by 200+ content creators across India.",
  "email": "info@growsquadz.in",
  "footerColumns": [
    {
      "_key": "footercol1",
      "heading": "Services",
      "links": [
        {
          "_key": "flink1",
          "href": "/services#thumbnails",
          "label": "YouTube Thumbnails"
        },
        {
          "_key": "flink2",
          "href": "/services#social-media",
          "label": "Social Media Posts"
        },
        {
          "_key": "flink3",
          "href": "/services#video",
          "label": "Video Editing"
        },
        {
          "_key": "flink4",
          "href": "/pricing",
          "label": "Premium Packs"
        }
      ]
    },
    {
      "_key": "footercol2",
      "heading": "Company",
      "links": [
        {
          "_key": "flink5",
          "href": "/about",
          "label": "About Us"
        },
        {
          "_key": "flink6",
          "href": "/portfolio",
          "label": "Portfolio"
        },
        {
          "_key": "flink7",
          "href": "/become-a-partner",
          "label": "Become a Partner"
        },
        {
          "_key": "flink8",
          "href": "/contact",
          "label": "Contact"
        }
      ]
    },
    {
      "_key": "footercol3",
      "heading": "Legal",
      "links": [
        {
          "_key": "flink9",
          "href": "/terms-conditions",
          "label": "Terms & Conditions"
        },
        {
          "_key": "flink10",
          "href": "/disclaimer",
          "label": "Disclaimer"
        },
        {
          "_key": "flink11",
          "href": "/privacy",
          "label": "Privacy Policy"
        }
      ]
    }
  ],
  "footerCtaBody": "Join thousands of creators who trust GrowSquadz for premium designs.",
  "footerCtaEyebrow": "GET STARTED TODAY",
  "footerCtaHeading": "Ready to elevate your content?",
  "footerCtaPrimaryHref": "",
  "footerCtaPrimaryLabel": "Order Now →",
  "footerCtaSecondaryHref": "/services",
  "footerCtaSecondaryLabel": "View Services",
  "navLinks": [
    {
      "_key": "nav1",
      "href": "/",
      "label": "Home"
    },
    {
      "_key": "nav2",
      "href": "/services",
      "label": "Services"
    },
    {
      "_key": "nav3",
      "href": "/portfolio",
      "label": "Portfolio"
    },
    {
      "_key": "nav4",
      "href": "/pricing",
      "label": "Pricing"
    },
    {
      "_key": "nav5",
      "href": "/about",
      "label": "About"
    }
  ],
  "phone": "+91 74883 16199",
  "siteName": "GrowSquadz",
  "socialLinks": [
    {
      "_key": "social1",
      "href": "https://youtube.com/@growsquadz",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/></svg>",
      "label": "YouTube"
    },
    {
      "_key": "social2",
      "href": "https://www.instagram.com/growsquadz.in/",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z\"/></svg>",
      "label": "Instagram"
    },
    {
      "_key": "social3",
      "href": "https://t.me/kumarsiddharth",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z\"/></svg>",
      "label": "Telegram"
    },
    {
      "_key": "social4",
      "href": "https://wa.me/917488316199",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z\"/></svg>",
      "label": "WhatsApp"
    }
  ],
  "tagline": "India's premier creative design studio. Professional designs for content creators and businesses."
};

// ──────────────────────────────────────────
// 2. Homepage Content Document
// ──────────────────────────────────────────
const homepageDoc = {
  "_id": "homepage",
  "_type": "homepage",
  "faqItems": [
    {
      "_key": "faq1",
      "answer": "We specialize in YouTube thumbnails, video editing, social media banner art, Instagram posts/carousels, and premium template design packs tailored for creators and brands.",
      "question": "What design services does GrowSquadz offer?"
    },
    {
      "_key": "faq2",
      "answer": "Simply choose a plan from our pricing page or click any 'Order Now' button to chat with us on WhatsApp. You can share your design brief directly, and we will confirm and start working.",
      "question": "How do I place an order?"
    },
    {
      "_key": "faq3",
      "answer": "Our standard delivery time is 24 to 48 hours depending on the complexity of the design. We prioritize quick deliveries so you never miss an upload schedule.",
      "question": "What is the turnaround time for designs?"
    },
    {
      "_key": "faq4",
      "answer": "Yes, we offer revisions to ensure you get exactly what you want. Single orders include 2 rounds of revisions, while Standard and Premium design packs include unlimited revisions.",
      "question": "Do you offer revisions?"
    },
    {
      "_key": "faq5",
      "answer": "Yes, raw source files (Figma or Photoshop PSD formats) are fully included with our Standard and Premium design packages.",
      "question": "Do I get the source files?"
    }
  ],
  "heroBody": "Professional YouTube thumbnails, social media graphics, and premium design packs. Trusted by 200+ creators. Up to 75% off market rates.",
  "heroEyebrow": "India's Premier Creative Design Studio",
  "heroFootnote": "Starting at just ₹249 · Delivered in 24 hours · Revisions included",
  "heroHeadline": "Designs that make\nyour content stand out.",
  "heroPrimaryCta": {
    "href": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20to%20order%20a%20design",
    "label": "Order a Design"
  },
  "heroSecondaryCta": {
    "href": "/portfolio",
    "label": "View Our Work"
  },
  "pricingTiers": [
    {
      "_key": "tier1",
      "ctaHref": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20to%20order%20a%20Starter%20design",
      "ctaLabel": "Order Now",
      "description": "Perfect for individual creators starting out.",
      "featured": false,
      "features": [
        "1 Custom Design",
        "YouTube Thumbnail or Social Post",
        "2 Revisions",
        "WhatsApp Delivery",
        "24hr Turnaround"
      ],
      "name": "Starter",
      "originalPrice": "₹999",
      "price": "₹299"
    },
    {
      "_key": "tier2",
      "ctaHref": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20the%20Standard%20Pack",
      "ctaLabel": "Get Access",
      "description": "Best for growing channels needing consistent visuals.",
      "featured": true,
      "features": [
        "10 Custom Designs",
        "Mix of Thumbnails & Posts",
        "Unlimited Revisions",
        "Priority Support",
        "48hr Turnaround",
        "Source Files Included"
      ],
      "name": "Standard Pack",
      "originalPrice": "₹9,990",
      "price": "₹2,449"
    },
    {
      "_key": "tier3",
      "ctaHref": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20the%20Premium%20Pack",
      "ctaLabel": "Get Access",
      "description": "For professional brands wanting the full package.",
      "featured": false,
      "features": [
        "20 Custom Designs",
        "All Design Categories",
        "Unlimited Revisions",
        "Dedicated Designer",
        "24hr Priority Turnaround",
        "Source Files + Templates"
      ],
      "name": "Premium Pack",
      "originalPrice": "₹19,990",
      "price": "₹4,799"
    }
  ],
  "seoContentBody": "In the highly competitive landscape of digital media, standing out is no longer optional; it is essential for survival and growth. Every day, millions of hours of video and countless social media posts are uploaded, creating an overwhelming ocean of content. To pierce through this noise, creators and brands must leverage the power of elite visual communication. GrowSquadz was founded on this exact principle. We recognized early on that many incredibly talented creators were struggling to gain traction simply because their packaging—their thumbnails, banners, and promotional graphics—didn't reflect the high quality of their actual content. We stepped in to bridge this gap, offering a lifeline of professional graphic design tailored specifically for the fast-moving creator economy.\n\nGrowSquadz has established itself as India's premier creative design studio, specializing in crafting high-impact visual assets. Our mission is to elevate your digital presence through stunning, click-worthy designs that tell your unique story. Whether you are a growing YouTube channel looking for the perfect thumbnail designer or a corporate brand in need of a cohesive social media identity, our team of expert designers delivers unparalleled quality and innovation.\n\nWhy is professional graphic design crucial for your success?\nThe answer lies in the first impression. A YouTube thumbnail is often the only deciding factor for a viewer choosing between your video and thousands of others. At GrowSquadz, our YouTube thumbnail design services are engineered to maximize your Click-Through Rate (CTR). We understand the psychology of color, the importance of typography, and the nuances of facial expressions that make a thumbnail truly viral. We delve deep into data-driven design, analyzing current trends and optimizing for mobile viewing. With a proven track record of helping over 200 creators scale their channels, our thumbnail designs don't just look good—they perform.\n\nComprehensive Social Media Design Services\nBeyond YouTube, we offer comprehensive social media design services. Instagram, LinkedIn, Facebook, and Twitter each require a unique visual approach to engage their distinct user bases. Our packages include everything from carousel posts and infographics to story templates and banner art. We ensure that your brand identity remains consistent and captivating across all platforms. Our designs are optimized for engagement algorithms—encouraging saves, shares, and comments through strategic layouts and compelling visual hooks. By outsourcing your graphic design needs to GrowSquadz, you save valuable time that can be better spent on content creation.\n\nPremium Template Packs and Video Assets\nVideo content is king, and our expertise doesn't stop at static images. While our core lies in premium graphic design, we also understand the synergy between great video editing and great design. We provide premium template packs and visual assets that video editors and creators can seamlessly integrate into their workflows. From animated lower thirds to sleek transition graphics, our assets are designed to give your videos a professional edge without breaking the bank.\n\nAffordable Quality and a Collaborative Partner\nWhat sets GrowSquadz apart from other graphic design agencies in India? It's our commitment to affordability without compromising on quality. We believe that premium design should be accessible to everyone, which is why our services are priced competitively—up to 75% off standard market rates. Our 'Premium Pack V2' offers an incredible bundle of custom designs, unlimited revisions, and priority support.\n\nFurthermore, we pride ourselves on our seamless, hassle-free client experience. We know that creators hate endless back-and-forth emails and convoluted briefing processes. With direct WhatsApp communication, you can share your ideas instantly, and our rapid 24-48 hour turnaround ensures your content schedule never misses a beat. We are more than just a service provider; we are your creative partner. Whether you need a single viral thumbnail, a complete channel overhaul, or a long-term design partner, GrowSquadz is your ultimate destination for top-tier graphic design in India.",
  "seoContentHeading": "GrowSquadz: India's Premier Creative Design Studio for Content Creators & Brands",
  "seoDescription": "Professional YouTube thumbnails, social media designs, and premium template packs. Up to 75% off. Trusted by 200+ content creators across India.",
  "seoTitle": "GrowSquadz — India's Premier Creative Design Studio",
  "services": [
    {
      "_key": "service1",
      "description": "Scroll-stopping thumbnails that drive clicks. Trend-aware, high-contrast designs crafted for maximum CTR.",
      "gradient": "grad-a",
      "href": "/services#thumbnails",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"m8 21 4-4 4 4\"/><path d=\"M12 17v4\"/></svg>",
      "price": "From ₹299",
      "title": "YouTube Thumbnails"
    },
    {
      "_key": "service2",
      "description": "Posts, banners, stories, and reels covers. Consistent brand identity across every platform.",
      "gradient": "grad-b",
      "href": "/services#social-media",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"/></svg>",
      "price": "From ₹249",
      "title": "Social Media Designs"
    },
    {
      "_key": "service3",
      "description": "Professional video editing for YouTube, Instagram Reels, and brand content. Story-driven cuts.",
      "gradient": "grad-c",
      "href": "/services#video",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"23 7 16 12 23 17 23 7\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\"/></svg>",
      "price": "Custom Quote",
      "title": "Video Editing"
    },
    {
      "_key": "service4",
      "description": "Brand identity packages including logos, color palettes, and style guides for your business.",
      "gradient": "grad-a",
      "href": "/services#branding",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/><polyline points=\"10 9 9 9 8 9\"/></svg>",
      "price": "From ₹499",
      "title": "Logos & Branding"
    },
    {
      "_key": "service5",
      "description": "Pitch decks, business presentations, and educational slide decks that impress every audience.",
      "gradient": "grad-b",
      "href": "/services#presentations",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>",
      "price": "From ₹399",
      "title": "Presentations"
    },
    {
      "_key": "service6",
      "description": "Ready-to-use template bundles. Edit instantly in Canva or Photoshop. Save time, stay consistent.",
      "gradient": "grad-c",
      "href": "/pricing",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>",
      "price": "From ₹999",
      "title": "Premium Template Packs"
    }
  ],
  "stats": [
    {
      "_key": "stat1",
      "label": "Designs Delivered",
      "value": "500+"
    },
    {
      "_key": "stat2",
      "label": "Happy Creators",
      "value": "200+"
    },
    {
      "_key": "stat3",
      "label": "Design Categories",
      "value": "6+"
    },
    {
      "_key": "stat4",
      "label": "Savings vs. Market",
      "value": "75%"
    }
  ],
  "steps": [
    {
      "_key": "step1",
      "description": "Browse our services and select the design you need — thumbnails, social posts, or custom packs.",
      "number": "01",
      "title": "Choose Your Service"
    },
    {
      "_key": "step2",
      "description": "Send your requirements via WhatsApp. Include your brand colors, references, and any specific ideas.",
      "number": "02",
      "title": "Share Your Brief"
    },
    {
      "_key": "step3",
      "description": "Get your polished design delivered within 24–48 hours. Revisions included until you're happy.",
      "number": "03",
      "title": "Receive Your Design"
    }
  ],
  "testimonials": [
    {
      "_key": "t1",
      "avatar": "AS",
      "name": "Arjun Sharma",
      "quote": "My CTR jumped from 3% to 8% after using GrowSquadz thumbnails. The quality is insane for the price.",
      "rating": 5,
      "role": "YouTube Creator · 50K subscribers"
    },
    {
      "_key": "t2",
      "avatar": "PV",
      "name": "Priya Verma",
      "quote": "Got 20 social media designs in 2 days. Professional, on-brand, and they understood my requirements perfectly.",
      "rating": 5,
      "role": "Digital Marketer · Delhi"
    },
    {
      "_key": "t3",
      "avatar": "RK",
      "name": "Rohit Kumar",
      "quote": "Ordered the Premium Pack for our product launch. The designs were so good our team thought we hired an agency.",
      "rating": 5,
      "role": "Startup Founder · Bangalore"
    }
  ]
};

// ──────────────────────────────────────────
// 3. Service Documents (Individual Pages)
// ──────────────────────────────────────────
const servicesDocs = [
  {
    "_id": "service-thumbnails",
    "_type": "service",
    "description": "Scroll-stopping YouTube thumbnails that make viewers click. Our thumbnails are crafted to dominate your niche with high-contrast visuals, eye-catching typography, and trend-aware designs.",
    "features": [
      "Custom character/face design",
      "Brand-consistent color palette",
      "Text overlay with impact fonts",
      "A/B test variants available",
      "High-res PNG + editable source",
      "24–48hr turnaround"
    ],
    "gradient": "linear-gradient(135deg, #007cf0 0%, #00dfd8 100%)",
    "icon": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"m8 21 4-4 4 4\"/><path d=\"M12 17v4\"/></svg>",
    "order": 1,
    "pricing": [
      {
        "_key": "p1",
        "label": "Single Thumbnail",
        "original": "₹999",
        "price": "₹299"
      },
      {
        "_key": "p2",
        "label": "5 Thumbnails",
        "original": "₹4,995",
        "price": "₹1,249"
      },
      {
        "_key": "p3",
        "label": "10 Thumbnails",
        "original": "₹9,990",
        "price": "₹2,449"
      }
    ],
    "serviceId": "thumbnails",
    "title": "YouTube Thumbnails"
  },
  {
    "_id": "service-social-media",
    "_type": "service",
    "description": "Consistent, platform-optimized designs for Instagram, Facebook, LinkedIn, and more. Build a recognizable brand presence with visuals that stop the scroll and drive engagement.",
    "features": [
      "Instagram posts & stories",
      "Facebook covers & ads",
      "LinkedIn banners & posts",
      "Twitter/X header & posts",
      "Brand color consistency",
      "Multiple format sizes"
    ],
    "gradient": "linear-gradient(135deg, #7928ca 0%, #ff0080 100%)",
    "icon": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"/></svg>",
    "order": 2,
    "pricing": [
      {
        "_key": "p1",
        "label": "Single Design",
        "original": "₹999",
        "price": "₹249"
      },
      {
        "_key": "p2",
        "label": "5 Designs",
        "original": "₹4,995",
        "price": "₹999"
      },
      {
        "_key": "p3",
        "label": "10 Designs",
        "original": "₹9,990",
        "price": "₹1,899"
      }
    ],
    "serviceId": "social-media",
    "title": "Social Media Designs"
  },
  {
    "_id": "service-video",
    "_type": "service",
    "description": "Professional video editing for YouTube, Instagram Reels, and brand content. Story-driven, paced for engagement, with clean cuts, transitions, color grading, and subtitles.",
    "features": [
      "YouTube long-form & Shorts",
      "Instagram Reels editing",
      "Color grading & correction",
      "Music & SFX sync",
      "Subtitles & captions",
      "Motion graphics add-ons"
    ],
    "gradient": "linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)",
    "icon": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"23 7 16 12 23 17 23 7\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\"/></svg>",
    "order": 3,
    "pricing": [
      {
        "_key": "p1",
        "label": "Short Video (≤5 min)",
        "original": "",
        "price": "Custom"
      },
      {
        "_key": "p2",
        "label": "Long Video (5–20 min)",
        "original": "",
        "price": "Custom"
      },
      {
        "_key": "p3",
        "label": "Monthly Package",
        "original": "",
        "price": "Custom"
      }
    ],
    "serviceId": "video",
    "title": "Video Editing"
  },
  {
    "_id": "eed1a27e-0aca-4c2e-8293-a776c10fb420",
    "_type": "service",
    "description": "We create strategic and engaging content that helps education-focused brands and creators communicate clearly, build trust, and stay consistent. Every piece of content is shaped around your audience, platform, brand voice, and growth goals.",
    "features": [
      "Social Media Posts & Carousels",
      "Reels & Short-Form Content",
      "Stories & Campaign Creatives",
      "Educational Content Design",
      "Content Copy & Captions",
      "Brand-Consistent Visuals"
    ],
    "icon": "<svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"g1\" x1=\"6\" y1=\"4\" x2=\"60\" y2=\"62\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#2563EB\"/>\n      <stop offset=\"0.48\" stop-color=\"#7C3AED\"/>\n      <stop offset=\"1\" stop-color=\"#EC4899\"/>\n    </linearGradient>\n  </defs>\n  <rect width=\"64\" height=\"64\" rx=\"15\" fill=\"url(#g1)\"/>\n  <rect x=\"15\" y=\"17\" width=\"30\" height=\"31\" rx=\"5\" stroke=\"white\" stroke-width=\"2.4\"/>\n  <circle cx=\"23\" cy=\"26\" r=\"3\" stroke=\"white\" stroke-width=\"2.2\"/>\n  <path d=\"M19 38L25 32L30 37L35 32L41 38\" stroke=\"white\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <path d=\"M48 11V18M44.5 14.5H51.5\" stroke=\"white\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n</svg>",
    "order": 4,
    "serviceId": "content",
    "title": "Content Creation"
  },
  {
    "_id": "service-branding",
    "_type": "service",
    "description": "Complete brand identity packages for YouTubers, creators, and small businesses. Logo design, color palette selection, typography, and usage guidelines.",
    "features": [
      "Logo design (3 concepts)",
      "Color palette definition",
      "Typography selection",
      "Brand style guide PDF",
      "All file formats (SVG, PNG, AI)",
      "Social media kit"
    ],
    "gradient": "linear-gradient(135deg, #007cf0 0%, #7928ca 100%)",
    "icon": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"/></svg>",
    "order": 4,
    "pricing": [
      {
        "_key": "p1",
        "label": "Logo Only",
        "original": "₹2,499",
        "price": "₹499"
      },
      {
        "_key": "p2",
        "label": "Brand Kit",
        "original": "₹4,999",
        "price": "₹999"
      },
      {
        "_key": "p3",
        "label": "Full Brand Identity",
        "original": "₹9,999",
        "price": "₹1,999"
      }
    ],
    "serviceId": "branding",
    "title": "Logos & Branding"
  },
  {
    "_id": "82e221e9-bcd8-4194-be2f-1361d1020f68",
    "_type": "service",
    "description": "We help EdTech brands, educators, and educational creators improve discoverability through smarter SEO and content optimization. From search-focused content structure to on-page improvements, we align your content with what your audience is actively looking for.",
    "features": [
      "Keyword Research & Search Intent",
      "On-Page SEO Optimization",
      "Content Structure & Optimization",
      "Titles & Meta Descriptions",
      "Content Opportunity Analysis",
      "Performance Review & Improvements"
    ],
    "icon": "<svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\"\n     xmlns=\"http://www.w3.org/2000/svg\">\n\n  <defs>\n    <linearGradient id=\"seoGradient\" x1=\"5\" y1=\"4\" x2=\"60\" y2=\"61\"\n                    gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#0F766E\"/>\n      <stop offset=\"48%\" stop-color=\"#0891B2\"/>\n      <stop offset=\"100%\" stop-color=\"#2563EB\"/>\n    </linearGradient>\n\n    <linearGradient id=\"seoGlow\" x1=\"15\" y1=\"10\" x2=\"50\" y2=\"54\"\n                    gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"white\" stop-opacity=\"0.16\"/>\n      <stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Premium Gradient Background -->\n  <rect width=\"64\" height=\"64\" rx=\"15\" fill=\"url(#seoGradient)\"/>\n\n  <!-- Subtle Highlight -->\n  <rect x=\"1\" y=\"1\" width=\"62\" height=\"62\" rx=\"14\"\n        fill=\"url(#seoGlow)\"/>\n\n  <!-- Search Circle -->\n  <circle cx=\"28\" cy=\"28\" r=\"13\"\n          stroke=\"white\"\n          stroke-width=\"2.5\"/>\n\n  <!-- Search Handle -->\n  <path d=\"M37.5 37.5L48.5 48.5\"\n        stroke=\"white\"\n        stroke-width=\"3\"\n        stroke-linecap=\"round\"/>\n\n  <!-- Growth Line -->\n  <path d=\"M20 31L25.5 26L30 29L36 22\"\n        stroke=\"white\"\n        stroke-width=\"2.4\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <!-- Growth Arrow -->\n  <path d=\"M31.5 22H36V26.5\"\n        stroke=\"white\"\n        stroke-width=\"2.4\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <!-- Optimization Spark -->\n  <path d=\"M47 13V19M44 16H50\"\n        stroke=\"white\"\n        stroke-width=\"2\"\n        stroke-linecap=\"round\"/>\n</svg>",
    "order": 6,
    "serviceId": "seo",
    "title": "SEO & Content Optimization"
  }
];

// ──────────────────────────────────────────
// 4. Pricing Page Document
// ──────────────────────────────────────────
const pricingPageDoc = {
  "_id": "pricingPage",
  "_type": "pricingPage",
  "faqItems": [
    {
      "_key": "faq1",
      "answer": "Click 'Order Now' and WhatsApp us your requirements. We'll confirm and get started.",
      "question": "How do I place an order?"
    },
    {
      "_key": "faq2",
      "answer": "High-res PNG files. Source files (PSD/Figma) included in Standard and Premium packs.",
      "question": "What formats do I receive?"
    },
    {
      "_key": "faq3",
      "answer": "Individual orders get 2 revisions. Pack orders get unlimited revisions.",
      "question": "How many revisions are included?"
    },
    {
      "_key": "faq4",
      "answer": "A 20% platform fee applies to all orders. Paying via website adds a 2% processing fee + GST.",
      "question": "Is there a platform fee?"
    }
  ],
  "heroHeading": "Simple, honest pricing.",
  "heroSubheading": "No hidden fees. No complicated tiers. Up to 75% off market rates. Pick what you need.",
  "individualDesigns": [
    {
      "_key": "ind1",
      "ctaHref": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20to%20order%20a%20YouTube%20Thumbnail%20for%20%E2%82%B9299",
      "ctaLabel": "Order Now →",
      "description": "Custom, scroll-stopping thumbnail optimized for your niche. Includes 2 revisions.",
      "features": [
        "Custom design based on your brief",
        "High-res PNG + source file",
        "24hr delivery",
        "2 revisions"
      ],
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"m8 21 4-4 4 4M12 17v4\"/></svg>",
      "originalPrice": "₹999",
      "price": "₹299",
      "title": "YouTube Thumbnail Design"
    },
    {
      "_key": "ind2",
      "ctaHref": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20to%20order%20a%20Social%20Media%20Post%20for%20%E2%82%B9249",
      "ctaLabel": "Order Now →",
      "description": "Custom post for Instagram, Facebook, LinkedIn, or Twitter. Includes 2 revisions.",
      "features": [
        "Poster, Banner, Flyer, Story, Card",
        "Platform-optimized dimensions",
        "24hr delivery",
        "2 revisions"
      ],
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>",
      "originalPrice": "₹999",
      "price": "₹249",
      "title": "Social Media Post Design"
    }
  ],
  "seoDescription": "Transparent pricing for professional design services. YouTube thumbnails from ₹299, social media posts from ₹249. Premium packs up to 75% off.",
  "seoTitle": "Pricing — GrowSquadz",
  "socialMediaPacks": [
    {
      "_key": "sp1",
      "ctaId": "social-starter",
      "designs": "5",
      "featured": false,
      "name": "Starter",
      "originalPrice": "₹4,999",
      "price": "₹999",
      "savings": "Save ₹4,000"
    },
    {
      "_key": "sp2",
      "ctaId": "social-standard",
      "designs": "10",
      "featured": true,
      "name": "Standard",
      "originalPrice": "₹9,990",
      "price": "₹1,899",
      "savings": "Save ₹8,091"
    },
    {
      "_key": "sp3",
      "ctaId": "social-premium",
      "designs": "20",
      "featured": false,
      "name": "Premium",
      "originalPrice": "₹19,980",
      "price": "₹3,599",
      "savings": "Save ₹16,381"
    }
  ],
  "thumbnailPacks": [
    {
      "_key": "tp1",
      "ctaId": "thumb-starter",
      "designs": "5",
      "featured": false,
      "name": "Starter",
      "originalPrice": "₹4,995",
      "price": "₹1,249",
      "savings": "Save ₹3,745"
    },
    {
      "_key": "tp2",
      "ctaId": "thumb-standard",
      "designs": "10",
      "featured": true,
      "name": "Standard",
      "originalPrice": "₹9,990",
      "price": "₹2,449",
      "savings": "Save ₹7,541"
    },
    {
      "_key": "tp3",
      "ctaId": "thumb-premium",
      "designs": "20",
      "featured": false,
      "name": "Premium",
      "originalPrice": "₹19,990",
      "price": "₹4,799",
      "savings": "Save ₹15,181"
    }
  ]
};

// ──────────────────────────────────────────
// 5. About Page Document
// ──────────────────────────────────────────
const aboutPageDoc = {
  "_id": "aboutPage",
  "_type": "aboutPage",
  "companyInfo": [
    {
      "_key": "c1",
      "label": "Registered as",
      "value": "GrowSquadz Ventures Pvt. Ltd."
    },
    {
      "_key": "c2",
      "label": "Location",
      "value": "Patna, Bihar, India — 800008"
    },
    {
      "_key": "c3",
      "label": "Founded",
      "value": "2020"
    },
    {
      "_key": "c4",
      "label": "Team size",
      "value": "10+ designers & editors"
    }
  ],
  "ctaBody": "Order your first design today and experience the GrowSquadz difference.",
  "ctaHeading": "Ready to work together?",
  "heroHeading": "Built by creators,<br />for creators.",
  "heroSubheading": "GrowSquadz was founded with a simple mission: make world-class design accessible to every content creator in India.",
  "seoDescription": "Learn about GrowSquadz — India's premier creative design studio founded by Kumar Siddharth in Patna, Bihar.",
  "seoTitle": "About — GrowSquadz",
  "storyHeading": "Started with a thumbnail. Grew into a studio.",
  "storyParagraphs": [
    "GrowSquadz was founded by Kumar Siddharth in Patna, Bihar. What started as helping fellow creators with YouTube thumbnails quickly grew into a full-fledged creative design studio serving hundreds of creators and businesses across India.",
    "Today, we operate as <strong>GrowSquadz Ventures Private Limited</strong>, with a team of talented designers and a growing partner network. Our designs have helped creators grow their channels, improve their CTR, and build recognizable brand identities.",
    "We believe that premium design shouldn't cost a premium. That's why we offer professional-grade work at introductory prices — because every creator deserves to look their best."
  ],
  "values": [
    {
      "_key": "v1",
      "description": "Every design is crafted with attention to detail. We don't release work we're not proud of.",
      "icon": "⭐",
      "title": "Quality First"
    },
    {
      "_key": "v2",
      "description": "Premium design for everyone — not just big brands with big budgets.",
      "icon": "💰",
      "title": "Accessible Pricing"
    },
    {
      "_key": "v3",
      "description": "We're built by creators for creators. We understand your journey because we've lived it.",
      "icon": "🤝",
      "title": "Creator Community"
    },
    {
      "_key": "v4",
      "description": "Time is money for content creators. We deliver within 24–48 hours, always.",
      "icon": "⚡",
      "title": "Fast Delivery"
    }
  ]
};

// ──────────────────────────────────────────
// 5.5 Services Page Document
// ──────────────────────────────────────────
const servicesPageDoc = {
  "_id": "servicesPage",
  "_type": "servicesPage",
  "heroEyebrow": "SERVICES",
  "heroHeading": "Everything your content needs.",
  "heroSubheading": "Professional creative services at honest prices. Delivered in 24–48 hours via WhatsApp.",
  "seoDescription": "Professional design services: YouTube thumbnails from ₹299, social media posts from ₹249, video editing, logos, and brand identity packages.",
  "seoTitle": "Services — GrowSquadz"
};

// ──────────────────────────────────────────
// 6. Contact Page Document
// ──────────────────────────────────────────
const contactPageDoc = {
  "_id": "contactPage",
  "_type": "contactPage",
  "businessDetails": [
    {
      "_key": "bd1",
      "label": "REGISTERED NAME",
      "value": "GrowSquadz Ventures Private Limited"
    },
    {
      "_key": "bd2",
      "label": "ADDRESS",
      "value": "Sumitra Nagar, Biharimills Colony, Patna City, Patna, Bihar 800008"
    },
    {
      "_key": "bd3",
      "label": "BUSINESS HOURS",
      "value": "Monday – Saturday, 9 AM – 8 PM IST"
    },
    {
      "_key": "bd4",
      "label": "PAYMENT METHODS",
      "value": "UPI, Bank Transfer, Razorpay"
    }
  ],
  "channels": [
    {
      "_key": "ch1",
      "borderColor": "var(--color-hairline-strong)",
      "href": "https://wa.me/917488316199?text=Hi%2C%20I%20want%20to%20order%20a%20design",
      "iconBg": "#25d366",
      "iconColor": "white",
      "label": "WhatsApp (Fastest)",
      "platform": "whatsapp",
      "tag": "Avg. response: <1 hr",
      "value": "+91 74883 16199"
    },
    {
      "_key": "ch2",
      "borderColor": "var(--color-hairline-strong)",
      "href": "mailto:info@growsquadz.in",
      "iconBg": "var(--color-canvas-soft-2)",
      "iconColor": "var(--color-ink)",
      "label": "Email",
      "platform": "email",
      "tag": "Response within 24 hours",
      "value": "info@growsquadz.in"
    },
    {
      "_key": "ch3",
      "borderColor": "var(--color-hairline-strong)",
      "href": "https://t.me/kumarsiddharth",
      "iconBg": "#0088cc",
      "iconColor": "white",
      "label": "Telegram",
      "platform": "telegram",
      "tag": "Join our creator community",
      "value": "@kumarsiddharth"
    },
    {
      "_key": "ch4",
      "borderColor": "var(--color-hairline-strong)",
      "href": "https://www.instagram.com/growsquadz.in/",
      "iconBg": "#e1306c",
      "iconColor": "white",
      "label": "Instagram",
      "platform": "instagram",
      "tag": "See our latest work",
      "value": "@growsquadz.in"
    }
  ],
  "heroHeading": "Let's work together.",
  "heroSubheading": "We typically respond within 1 hour on WhatsApp. Drop us a message and we'll get started.",
  "quickOrderBody": "The fastest way to get started is via WhatsApp. We'll confirm your order within minutes.",
  "quickOrderHeading": "Ready to order?",
  "seoDescription": "Get in touch with GrowSquadz. Order designs via WhatsApp, email us, or connect on social media. Based in Patna, Bihar, India.",
  "seoTitle": "Contact — GrowSquadz"
};

// ──────────────────────────────────────────
// 7. Become a Partner Page Document
// ──────────────────────────────────────────
const partnerPageDoc = {
  "_id": "partnerPage",
  "_type": "partnerPage",
  "benefits": [
    {
      "_key": "b1",
      "description": "Earn market-rate commissions for every project completed. Fast payments via UPI.",
      "icon": "💰",
      "title": "Competitive Pay"
    },
    {
      "_key": "b2",
      "description": "Work on your own time. Set your own availability and take projects that fit your schedule.",
      "icon": "📅",
      "title": "Flexible Schedule"
    },
    {
      "_key": "b3",
      "description": "With 200+ active clients, there's always a steady stream of projects waiting for partners.",
      "icon": "🚀",
      "title": "Consistent Work"
    },
    {
      "_key": "b4",
      "description": "Learn from senior designers, access premium tools, and grow your portfolio with real client work.",
      "icon": "🎓",
      "title": "Skill Growth"
    },
    {
      "_key": "b5",
      "description": "Join a network of creators. Collaborate, share tips, and grow together in our partner chat.",
      "icon": "🤝",
      "title": "Supportive Community"
    },
    {
      "_key": "b6",
      "description": "Get client reviews, build a portfolio, and establish yourself as a trusted designer.",
      "icon": "⭐",
      "title": "Build Your Reputation"
    }
  ],
  "eligibilityDescription": "If you have the skills and the drive, we have the projects. No minimum experience required — we value quality and dedication above all else.",
  "eligibilityHeading": "We're looking for talented creators.",
  "heroBadge": "Join 500+ Partners",
  "heroHeading": "Turn your skills into<br />a steady income.",
  "heroSubheading": "Are you a graphic designer, video editor, or content creator? Join our partner network and earn consistently doing what you love.",
  "processSteps": [
    {
      "_key": "ps1",
      "description": "Submit the form below with your portfolio samples and skills.",
      "number": "01",
      "title": "Fill the Application"
    },
    {
      "_key": "ps2",
      "description": "Our team reviews your work within 48 hours and reaches out.",
      "number": "02",
      "title": "Portfolio Review"
    },
    {
      "_key": "ps3",
      "description": "Quick call to align on expectations, pricing, and project types.",
      "number": "03",
      "title": "Onboarding Call"
    },
    {
      "_key": "ps4",
      "description": "Get your first project assignment and start growing with us.",
      "number": "04",
      "title": "Start Earning"
    }
  ],
  "roleTags": [
    "Graphic Designers",
    "Video Editors",
    "Thumbnail Artists",
    "Social Media Designers",
    "Motion Graphic Artists",
    "Content Creators"
  ],
  "seoDescription": "Join the GrowSquadz partner network. Earn by designing and creating for 200+ clients. Flexible work, consistent projects, great community.",
  "seoTitle": "Become a Partner — GrowSquadz"
};

// ──────────────────────────────────────────
// 8. Portfolio Page Document
// ──────────────────────────────────────────
const portfolioPageDoc = {
  "_id": "portfolioPage",
  "_type": "portfolioPage",
  "ctaBody": "Order yours today and get it delivered within 24 hours.",
  "ctaHeading": "Want a design like this?",
  "filterCategories": [
    "all",
    "thumbnail",
    "social",
    "branding"
  ],
  "heroHeading": "Our recent work.",
  "heroSubheading": "A selection of designs created for our clients. Every pixel is intentional.",
  "portfolioItems": [
    {
      "_key": "pi1",
      "bgColor": "#007cf0",
      "category": "thumbnail",
      "client": "Tech Creator",
      "dotColor": "#007cf0",
      "lineColor": "#007cf0",
      "title": "Gaming Channel Thumbnail"
    },
    {
      "_key": "pi2",
      "bgColor": "#7928ca",
      "category": "social",
      "client": "Lifestyle Brand",
      "dotColor": "#7928ca",
      "lineColor": "#7928ca",
      "title": "Instagram Post Design"
    },
    {
      "_key": "pi3",
      "bgColor": "#ff4d4d",
      "category": "thumbnail",
      "client": "Finance Creator",
      "dotColor": "#ff4d4d",
      "lineColor": "#ff4d4d",
      "title": "Finance YouTube Thumbnail"
    },
    {
      "_key": "pi4",
      "bgColor": "#00dfd8",
      "category": "branding",
      "client": "EdTech Startup",
      "dotColor": "#00dfd8",
      "lineColor": "#00dfd8",
      "title": "Startup Logo Design"
    },
    {
      "_key": "pi5",
      "bgColor": "#ff0080",
      "category": "social",
      "client": "Fashion Brand",
      "dotColor": "#ff0080",
      "lineColor": "#ff0080",
      "title": "Social Media Banner"
    },
    {
      "_key": "pi6",
      "bgColor": "#f9cb28",
      "category": "thumbnail",
      "client": "Motivational Creator",
      "dotColor": "#f9cb28",
      "lineColor": "#f9cb28",
      "title": "Motivation Channel Art"
    },
    {
      "_key": "pi7",
      "bgColor": "#50e3c2",
      "category": "thumbnail",
      "client": "Food Creator",
      "dotColor": "#50e3c2",
      "lineColor": "#50e3c2",
      "title": "Cooking Show Thumbnail"
    },
    {
      "_key": "pi8",
      "bgColor": "#7928ca",
      "category": "social",
      "client": "D2C Brand",
      "dotColor": "#7928ca",
      "lineColor": "#7928ca",
      "title": "Product Launch Post"
    },
    {
      "_key": "pi9",
      "bgColor": "#007cf0",
      "category": "branding",
      "client": "Travel Creator",
      "dotColor": "#007cf0",
      "lineColor": "#007cf0",
      "title": "Creator Brand Kit"
    }
  ],
  "seoDescription": "Browse our portfolio of professional YouTube thumbnails, social media designs, logos, and brand identity work.",
  "seoTitle": "Portfolio — GrowSquadz"
};

// ──────────────────────────────────────────
// 9. Legal Pages Documents
// ──────────────────────────────────────────
const legalPagesDocs = [
  {
    "_id": "legal-disclaimer",
    "_type": "legalPage",
    "body": [
      {
        "_key": "block-0",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at info@growsquadz.in."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-1",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Disclaimers for GrowSquadz"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-2",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "All the information on this website - https://www.growsquadz.in - is published in good faith and for general information purpose only. GrowSquadz does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (GrowSquadz), is strictly at your own risk. GrowSquadz will not be liable for any losses and/or damages in connection with the use of our website."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-3",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-4",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their \"Terms of Service\" before engaging in any business or uploading any information."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-5",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Consent"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-6",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "By using our website, you hereby consent to our disclaimer and agree to its terms."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-7",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Update"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-8",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Should we update, amend or make any changes to this document, those changes will be prominently posted here."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "lastUpdated": "2026-06-29",
    "seoDescription": "Disclaimer for GrowSquadz Ventures Private Limited.",
    "slug": {
      "_type": "slug",
      "current": "disclaimer"
    },
    "title": "Disclaimer"
  },
  {
    "_id": "legal-privacy",
    "_type": "legalPage",
    "body": [
      {
        "_key": "block-0",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "At GrowSquadz, accessible from https://www.growsquadz.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GrowSquadz and how we use it."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-1",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Information We Collect"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-2",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-3",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-4",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "How We Use Your Information"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-5",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "We use the information we collect in various ways, including to:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-6",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Provide, operate, and maintain our website and services"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-7",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Improve, personalize, and expand our website and services"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-8",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Understand and analyze how you use our website"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-9",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Develop new products, services, features, and functionality"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-10",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-11",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Send you emails or WhatsApp messages regarding your design orders"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-12",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Find and prevent fraud"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-13",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Log Files"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-14",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "GrowSquadz follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "lastUpdated": "2026-06-29",
    "seoDescription": "Privacy Policy for GrowSquadz Ventures Private Limited.",
    "slug": {
      "_type": "slug",
      "current": "privacy"
    },
    "title": "Privacy Policy"
  },
  {
    "_id": "legal-terms-conditions",
    "_type": "legalPage",
    "body": [
      {
        "_key": "block-0",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Welcome to GrowSquadz! These terms and conditions outline the rules and regulations for the use of GrowSquadz Ventures Private Limited's Website, located at https://www.growsquadz.in."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-1",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "By accessing this website we assume you accept these terms and conditions. Do not continue to use GrowSquadz if you do not agree to take all of the terms and conditions stated on this page."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-2",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Intellectual Property Rights"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-3",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Other than the content you own, under these Terms, GrowSquadz Ventures Private Limited and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-4",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Restrictions"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-5",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "You are specifically restricted from all of the following:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "block-6",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "publishing any Website material in any other media without prior consent;"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-7",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "selling, sublicensing and/or otherwise commercializing any Website material;"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-8",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "publicly performing and/or showing any Website material;"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-9",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "using this Website in any way that is or may be damaging to this Website;"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-10",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "using this Website in any way that impacts user access to this Website;"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-11",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_key": "block-12",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Your Content"
          }
        ],
        "markDefs": [],
        "style": "h2"
      },
      {
        "_key": "block-13",
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "In these Website Standard Terms and Conditions, \"Your Content\" shall mean any audio, video text, images or other material you choose to display on this Website or submit to us for design tasks. By displaying or submitting Your Content, you grant GrowSquadz Ventures Private Limited a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "lastUpdated": "2026-06-29",
    "seoDescription": "Terms and Conditions for GrowSquadz Ventures Private Limited.",
    "slug": {
      "_type": "slug",
      "current": "terms-conditions"
    },
    "title": "Terms & Conditions"
  }
];

async function seed() {
  console.log("⏳ Starting Sanity seed process for all website pages...");
  try {
    console.log("➡️ Seeding site settings...");
    await client.createOrReplace(siteSettingsDoc);
    console.log("✅ Site settings seeded successfully!");

    console.log("➡️ Seeding homepage content...");
    await client.createOrReplace(homepageDoc);
    console.log("✅ Homepage content seeded successfully!");

    console.log("➡️ Seeding services (${servicesDocs.length} documents)...");
    for (const service of servicesDocs) {
      await client.createOrReplace(service);
      console.log(`   - Seeded service: "${service.title}"`);
    }
    console.log("✅ Individual service documents seeded successfully!");

    console.log("➡️ Seeding pricing page...");
    await client.createOrReplace(pricingPageDoc);
    console.log("✅ Pricing page seeded successfully!");

    console.log("➡️ Seeding services page...");
    await client.createOrReplace(servicesPageDoc);
    console.log("✅ Services page seeded successfully!");

    console.log("➡️ Seeding about page...");
    await client.createOrReplace(aboutPageDoc);
    console.log("✅ About page seeded successfully!");

    console.log("➡️ Seeding contact page...");
    await client.createOrReplace(contactPageDoc);
    console.log("✅ Contact page seeded successfully!");

    console.log("➡️ Seeding become-a-partner page...");
    await client.createOrReplace(partnerPageDoc);
    console.log("✅ Become a partner page seeded successfully!");

    console.log("➡️ Seeding portfolio page...");
    await client.createOrReplace(portfolioPageDoc);
    console.log("✅ Portfolio page seeded successfully!");

    console.log("➡️ Seeding legal pages (${legalPagesDocs.length} documents)...");
    for (const legal of legalPagesDocs) {
      await client.createOrReplace(legal);
      console.log(`   - Seeded legal page: "${legal.title}"`);
    }
    console.log("✅ Legal pages seeded successfully!");

    console.log("\n✨ Seeding completed successfully for ALL pages! Refresh your Sanity Studio browser window to see the details.");
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
  }
}

seed();
