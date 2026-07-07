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
  "address": "Helping Ideas Educate, Inspire & Grow.",
  "appTitle": "GrowSquadz",
  "description": "GrowSquadz helps brands, EdTech companies, educators, and creators grow online through social media management, content creation, video editing, YouTube growth, branding, and SEO.",
  "email": "info@growsquadz.in",
  "footerColumns": [
    {
      "_key": "footercol1",
      "heading": "Services",
      "links": [
        {
          "_key": "flink1",
          "href": "/services#thumbnails",
          "label": "YouTube Growth & Thumbnails"
        },
        {
          "_key": "flink2",
          "href": "/services#social-media",
          "label": "Social Media Management"
        },
        {
          "_key": "flink3",
          "href": "/services#video",
          "label": "Video Editing"
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
  "legalName": "GrowSquadz",
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
      "_key": "nav5",
      "href": "/about",
      "label": "About"
    }
  ],
  "phone": "+91 9288285878",
  "siteName": "GrowSquadz",
  "socialLinks": [
    {
      "_key": "social1",
      "href": "https://youtube.com",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/></svg>",
      "label": "YouTube"
    },
    {
      "_key": "social2",
      "href": "https://www.instagram.com/growsquadz",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z\"/></svg>",
      "label": "Instagram"
    },
    {
      "_key": "social3",
      "href": "https://t.me",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z\"/></svg>",
      "label": "Telegram"
    },
    {
      "_key": "social4",
      "href": "https://wa.me/919288285878",
      "iconSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z\"/></svg>",
      "label": "WhatsApp"
    }
  ],
  "tagline": "India's Leading Social Media Agency",
  "footerCtaEyebrow": "GET STARTED TODAY",
  "footerCtaHeading": "Ready to elevate your content?",
  "footerCtaBody": "Join thousands of creators who trust GrowSquadz for premium designs.",
  "footerCtaPrimaryLabel": "Order Now →",
  "footerCtaPrimaryHref": "",
  "footerCtaSecondaryLabel": "View Services",
  "footerCtaSecondaryHref": "/services"
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
      "answer": "GrowSquadz Offers Social Media Management, Content Creation, Video Editing, YouTube Growth and Thumbnails, Brand Identity, and SEO and Content Optimization.",
      "question": "What Services does GrowSquadz Offer?"
    },
    {
      "_key": "faq2",
      "answer": "We Mainly Work With EdTech Brands, Educators, Educational Creators, Coaching Businesses, And Learning-Focused Platforms Looking To Grow Their Digital Presence.",
      "question": "Who Does GrowSquadz Work With?"
    },
    {
      "_key": "faq3",
      "answer": "Simply Contact Us And Share Your Goals, Audience, And Requirements. We’ll Understand Your Needs And Suggest The Right Strategy Or Service For Your Growth.",
      "question": "How Do I Get Started With GrowSquadz?"
    },
    {
      "_key": "faq4",
      "answer": "Yes. Every Brand And Creator Has Different Goals, So We Can Create A Custom Plan Based On Your Content Needs, Platforms, Budget, And Growth Objectives.",
      "question": "Do You Offer Custom Plans?"
    },
    {
      "_key": "faq5",
      "answer": "The Timeline Depends On The Service And Project Scope. Once We Understand Your Requirements And Finalize The Plan, We’ll Share A Clear Timeline Before Starting.",
      "question": "How Long Does It Take To Get Started?"
    },
    {
      "_key": "aa851e272ae3",
      "answer": "Yes. We Can Support Content Planning, Creation, Posting, Platform Management, Optimization, And Ongoing Strategy Based On Your Selected Plan.",
      "question": "Can GrowSquadz Manage Our Complete Social Media Presence?"
    },
    {
      "_key": "b8b594ff964e",
      "answer": "Yes. We Work With Individual Educators, Teachers, YouTube Creators, And Education-Focused Creators Who Want To Build A Stronger And More Professional Online Presence.",
      "question": "Do You Work With Individual Educators And Educational Creators?"
    },
    {
      "_key": "4c29763728d7",
      "answer": "No. We Focus On Strategy, Quality Content, Optimization, And Sustainable Growth. Results Can Vary Based On The Platform, Audience, Niche, Competition, Budget, And Other Factors.",
      "question": "Do You Guarantee Followers, Views, Or Sales?"
    }
  ],
  "heroBody": "Helping EdTech brands, Creators, and educators Grow online with Professional Content, Social Media Management, and Creative Marketing.",
  "heroEyebrow": "India's Leading Social Media Agency",
  "heroFootnote": "Built for Education · Driven by Strategy · Focused on Growth",
  "heroHeadline": "We Grow Brands. Your Vision Our Strategy",
  "heroHighlights": [
    {
      "_key": "665d3b8a2974",
      "showCheck": false,
      "text": "Think Bigger"
    },
    {
      "_key": "75b72fb0344b",
      "showCheck": false,
      "text": "Create Better"
    },
    {
      "_key": "f7529bc680fe",
      "showCheck": false,
      "text": "Grow Smarter"
    }
  ],
  "heroPrimaryCta": {
    "href": "https://wa.me/919288285878?text=Hi",
    "label": "Grow With Us →"
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
  "seoContentBody": "In today’s fast-moving digital world, creating valuable educational content is only one part of building a successful online presence. EdTech brands, educators, and educational creators also need the right content strategy, strong visual communication, consistent social media presence, and platform-focused execution to reach and connect with the right audience. GrowSquadz helps education-focused brands and creators build a stronger digital presence through professional content, social media management, creative marketing, and growth-focused digital solutions.\n\nWe understand that the education space is different from general marketing. Educational content needs to be clear, engaging, trustworthy, and easy to understand while still being strong enough to stand out across competitive digital platforms. Whether you are building an EdTech brand, growing an educational YouTube channel, teaching students online, creating content around competitive exams, or developing a learning-focused platform, GrowSquadz works to turn your ideas and expertise into a consistent digital presence.\n\n<b>Social Media Management for EdTech Brands and Educators</b>\n\nManaging social media requires more than simply posting content. A strong presence needs planning, consistency, audience understanding, creative execution, and continuous improvement. GrowSquadz provides social media management for EdTech brands, educators, and educational creators who want to build a more organized and professional presence online.\n\nOur approach can include content planning, creative direction, posting support, platform-focused content, audience engagement, and ongoing optimization based on the selected service plan. We focus on helping educational brands communicate their value clearly while creating content that feels relevant to students, learners, and their wider communities.\n\n<b>Content Creation for Educational Brands and Creators</b>\n\nEducational content should inform, engage, and build trust. GrowSquadz creates strategic content for EdTech companies, educators, and educational creators, including social media posts, carousels, stories, reels, campaign creatives, and other platform-focused content.\n\nOur goal is to make educational ideas easier to understand and more engaging to consume. From explaining a complex topic through a clear carousel to creating content around courses, learning resources, student challenges, exam preparation, or educational campaigns, we focus on content that supports both communication and long-term brand growth.\n\n<b>Professional Video Editing for Educational Content</b>\n\nVideo plays a major role in modern education and digital learning. GrowSquadz provides professional video editing for educational videos, YouTube content, Shorts, Reels, and brand campaigns. We focus on clear pacing, engaging presentation, clean visual storytelling, and platform-appropriate editing that helps maintain viewer attention.\n\nWhether you are an educator creating concept-based videos, an educational creator publishing short-form content, or an EdTech brand producing campaigns and learning-focused media, our video editing services are designed to make your content feel more polished, clear, and professional.\n\n<b>YouTube Growth and Thumbnail Design for Educational Creators</b>\n\nYouTube is one of the most powerful platforms for educators and educational creators, but quality teaching alone may not be enough to build visibility. Content presentation, thumbnails, channel positioning, optimization, and audience understanding all play an important role.\n\nGrowSquadz provides YouTube growth support with click-worthy thumbnails, content strategy, channel optimization, and visual direction designed to improve content presentation, reach, and engagement. We work with educational creators to build a stronger and more consistent YouTube presence while keeping the content aligned with their audience and teaching style.\n\n<b>Brand Identity for EdTech Companies and Educators</b>\n\nA strong brand identity helps people recognize, remember, and trust your presence. GrowSquadz creates distinct brand identities for EdTech companies, educators, and educational creators through logo design, color systems, typography, and consistent visual direction.\n\nWhether you are launching a new education brand, building a personal brand as an educator, or improving an existing digital identity, we focus on creating a professional and consistent brand experience across social media, YouTube, websites, and other digital touchpoints.\n\n<b>SEO and Content Optimization for Better Discoverability</b>\n\nGreat educational content becomes more valuable when the right audience can discover it. GrowSquadz provides SEO and content optimization services focused on improving discoverability, strengthening search visibility, and helping educational content reach relevant audiences.\n\nOur approach focuses on clearer content structure, platform-aware optimization, search-focused opportunities, and stronger alignment between content and audience intent. SEO is a long-term process, so we focus on sustainable improvements rather than unrealistic ranking or traffic guarantees.\n\n<b>Why Choose GrowSquadz as Your Creative Growth Partner?</b>\n\nGrowSquadz is built around a simple idea: strong growth comes from combining creativity with strategy. We do not want to be just another service provider that creates content without understanding the bigger picture. Our approach begins with your goals, your audience, your challenges, and the direction you want to build.\n\nThis is reflected in our process: <b>Tell Us About Your Business, We Create Your Growth Plan, and Launch & Grow Together.</b> We work to understand what your EdTech brand or educational presence needs, create a focused direction, and support execution through the right combination of content, social media, video, YouTube, branding, and optimization.\n\nEvery EdTech company, educator, and educational creator has different goals. Some want to build awareness, some want a stronger social media presence, some want to improve their YouTube content, and others need a complete digital growth partner. That is why GrowSquadz can offer custom plans based on content needs, platforms, budget, and growth objectives.\n\n<b>Helping Education-Focused Ideas Grow Online</b>\n\nGrowSquadz helps EdTech brands, creators, and educators grow online through professional content, social media management, and creative marketing. Our focus is on building digital experiences that are clear, engaging, consistent, and aligned with long-term growth.\n\nWhether you are building an EdTech company, growing as an educator, developing an educational creator brand, or creating a learning-focused platform, GrowSquadz is here to help turn your vision into a stronger digital presence through strategy, creativity, and thoughtful execution.",
  "seoContentHeading": "GrowSquadz: Digital Growth Partner for EdTech Brands, Educators & Educational Creators",
  "seoDescription": "GrowSquadz helps EdTech brands, educators, and educational creators grow through social media management, content creation, video editing, YouTube growth, branding, and SEO.",
  "seoImage": {
    "_type": "image",
    "asset": {
      "_ref": "image-28a5bafd8c330eeebfc325587b2ed5cf9ef81902-3375x3375-jpg",
      "_type": "reference"
    }
  },
  "seoTitle": "GrowSquadz - India's Leading Social Media Agency",
  "services": [
    {
      "_key": "c450d375dcf0",
      "description": "End-to-end social media management for EdTech brands and educators — from content planning and posting to audience engagement and consistent growth.",
      "gradient": "grad-a",
      "href": "/services#social-media",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"m8 21 4-4 4 4\"/><path d=\"M12 17v4\"/></svg>",
      "title": "Social Media Management"
    },
    {
      "_key": "3629610d084b",
      "description": "Strategic, engaging content created for EdTech brands and educational creators — including posts, carousels, reels, stories, and campaign creatives.",
      "gradient": "grad-b",
      "href": "/services#content",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"/></svg>",
      "title": "Content Creation"
    },
    {
      "_key": "7f0ba9735eb8",
      "description": "Professional video editing for educational content, YouTube videos, Shorts, Reels, and brand campaigns — crafted to keep viewers engaged.",
      "gradient": "grad-c",
      "href": "/services#video",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"23 7 16 12 23 17 23 7\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\"/></svg>",
      "title": "Video Editing"
    },
    {
      "_key": "a4f1641be279",
      "description": "Growth-focused YouTube support with click-worthy thumbnails, content strategy, channel optimization, and visuals designed to improve reach and engagement.",
      "gradient": "grad-a",
      "href": "/services#thumbnails",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/><polyline points=\"10 9 9 9 8 9\"/></svg>",
      "title": "YouTube Growth & Thumbnails"
    },
    {
      "_key": "7fa5796b5df8",
      "description": "Distinct brand identities for EdTech companies, educators, and creators — including logos, color systems, typography, and consistent visual direction.",
      "gradient": "grad-b",
      "href": "/services#branding",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>",
      "title": "Brand Identity"
    },
    {
      "_key": "08d4d75a75e8",
      "description": "Smart SEO and content optimization to improve discoverability, strengthen search visibility, and help educational content reach the right audience.",
      "gradient": "grad-b",
      "href": "/services#seo",
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"24\"\n     height=\"24\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\"\n     stroke=\"currentColor\"\n     stroke-width=\"2\"\n     stroke-linecap=\"round\"\n     stroke-linejoin=\"round\">\n  <path d=\"m21 21-4.34-4.34\"></path>\n  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n  <path d=\"M8 11h6\"></path>\n  <path d=\"M11 8v6\"></path>\n</svg>",
      "title": "SEO & Content Optimization"
    }
  ],
  "servicesSections": [
    {
      "_key": "35fb633eaa3d"
    },
    {
      "_key": "03cad9b4888a"
    }
  ],
  "stats": [
    {
      "_key": "stat1",
      "label": "Projects Delivered",
      "value": "6000+"
    },
    {
      "_key": "stat2",
      "label": "Brands Served",
      "value": "200+"
    },
    {
      "_key": "stat3",
      "label": "Years of Excellence",
      "value": "4+"
    },
    {
      "_key": "stat4",
      "label": "Client Satisfaction",
      "value": "99.8%"
    }
  ],
  "steps": [
    {
      "_key": "step1",
      "description": "Share your goals, audience, challenges, and what you want to achieve.",
      "number": "01",
      "title": "Tell Us About Your Business"
    },
    {
      "_key": "step2",
      "description": "We build a strategy around your content, social media, and growth goals.",
      "number": "02",
      "title": "We Create Your Growth Plan"
    },
    {
      "_key": "step3",
      "description": "We execute, optimize, and grow your digital presence together.",
      "number": "03",
      "title": "Launch & Grow Together"
    }
  ],
  "testimonials": [
    {
      "_key": "t1",
      "avatar": "PW",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-f080458348efab6f4cdf3153bea2149898417014-500x500-jpg",
          "_type": "reference"
        }
      },
      "name": "Physics Wallah",
      "quote": "GrowSquadz helped us improve our social media presence with better content and a clear strategy. The team understands the education space and knows how to make content that connects with students.",
      "rating": 5,
      "role": "14.2M Subscribers"
    },
    {
      "_key": "t2",
      "avatar": "UN",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-da89fba4754698761957773fccb00fadfc2a5214-400x400-webp",
          "_type": "reference"
        }
      },
      "name": "Unacademy NEET",
      "quote": "Working with GrowSquadz has made our content process much easier. From planning to design and execution, everything feels more organized, creative, and aligned with our brand.",
      "rating": 5,
      "role": "2.92M Subscribers"
    },
    {
      "_key": "9b392453a95a",
      "avatar": "SF",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-ed402212bf25e90efdf2049bd62109c425b324b4-512x512-jpg",
          "_type": "reference"
        }
      },
      "name": "Science and Fun",
      "quote": "GrowSquadz helped me give my educational content a more professional and consistent look. Their creative approach makes science content more engaging and easier for students to connect with.",
      "rating": 5,
      "role": "9.6M Subscribers"
    },
    {
      "_key": "e2ba56b5cd13",
      "avatar": "AS",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-429a0c146fc5083f8f2901c178b5859fd17a66d2-900x900-jpg",
          "_type": "reference"
        }
      },
      "name": "Abhishek Sahu",
      "quote": "The team understands educational content really well. They helped me improve my content presentation and make complex Physics topics look more clear, engaging, and student-friendly.",
      "rating": 5,
      "role": "978k Subscribers"
    },
    {
      "_key": "t3",
      "avatar": "NJ",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-563476174786cc9144032c59da6180d0a783c980-378x378-jpg",
          "_type": "reference"
        }
      },
      "name": "Nishant Jindal",
      "quote": "We wanted to improve our online presence and connect better with our audience. GrowSquadz understood our goals and helped us create content that feels professional, engaging, and right for our brand.",
      "rating": 5,
      "role": "850k Subscriber"
    },
    {
      "_key": "42a7bd0abc2b",
      "avatar": "SP",
      "avatarImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-0f3ff6e862b478cccb0bd6abd3c8b6622f3c35d5-240x240-webp",
          "_type": "reference"
        }
      },
      "name": "Self Padhai",
      "quote": "GrowSquadz understands what educational creators actually need. They helped me present my JEE content in a more professional and engaging way, making it easier to connect with students.",
      "rating": 5,
      "role": "463k Subscribers"
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
    "description": "We help educational creators and EdTech brands build a stronger YouTube presence through strategic content support, compelling thumbnails, and channel optimization. Our focus is on better positioning, stronger presentation, and sustainable audience growth.",
    "features": [
      "Custom YouTube Thumbnails",
      "Content Strategy & Topic Direction",
      "Channel Optimization",
      "Titles & Metadata Support",
      "Content Performance Insights",
      "Visual Consistency & Positioning"
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
    "title": "YouTube Growth & Thumbnails"
  },
  {
    "_id": "service-social-media",
    "_type": "service",
    "description": "We manage social media for EdTech brands, educators, and educational creators with a clear strategy and consistent execution. From content planning and publishing to audience engagement and optimization, we help build a stronger and more professional online presence.",
    "features": [
      "Social Media Strategy",
      "Content Planning & Calendar",
      "Publishing & Scheduling",
      "Audience Engagement",
      "Platform-Specific Optimization",
      "Performance Review & Insights"
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
    "title": "Social Media Management"
  },
  {
    "_id": "service-video",
    "_type": "service",
    "description": "We turn raw footage into clear, engaging, and professional videos for educators, educational creators, and EdTech brands. From long-form YouTube content to Reels and Shorts, every edit is crafted for better storytelling, retention, and platform fit.",
    "features": [
      "YouTube Long-Form Editing",
      "Reels & Shorts Editing",
      "Motion Graphics & Visual Elements",
      "Captions & Subtitles",
      "Audio Enhancement & SFX",
      "Platform-Optimized Delivery"
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
    "description": "Build a strong and recognizable identity for your EdTech brand, education business, or creator profile. From logos and colors to typography and visual direction, we create a consistent brand presence across every platform.",
    "features": [
      "Logo Design & Identity System",
      "Color Palette & Visual Direction",
      "Typography System",
      "Brand Guidelines",
      "Social Media Brand Kit",
      "Multi-Platform Brand Consistency"
    ],
    "gradient": "linear-gradient(135deg, #007cf0 0%, #7928ca 100%)",
    "icon": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"/></svg>",
    "order": 5,
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
    "title": "Brand Identity"
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
  "heroHeading": "Built By Creators,<br />For Creators.",
  "heroSubheading": "GrowSquadz Was Built With A Simple Mission: To Help Brands And Creators Grow Online Through Powerful Content, Smart Strategies, And Creative Solutions That Make A Real Impact.",
  "profiles": [
    {
      "_key": "cf4dcf98224f",
      "_type": "profile",
      "avatar": "SK",
      "bio": "An entrepreneur with experience in scaling successful multi-million dollar ventures, bringing strategic vision, innovation, and growth-focused leadership to every opportunity.",
      "links": [
        {
          "_key": "bd47576b02e8",
          "href": "shivam@growsquadz.in",
          "label": "Mail"
        }
      ],
      "name": "Shivam Kumar",
      "title": "Founder & CEO"
    },
    {
      "_key": "b10a116e080f",
      "_type": "profile",
      "bio": "A young entrepreneur helping startups, creators, and small businesses build powerful digital brands through creative content, smart strategy, and affordable social media solutions.",
      "links": [
        {
          "_key": "853eb5b0bd42",
          "href": "aryan@growsquadz.in",
          "label": "Mail"
        }
      ],
      "name": "Aryan Kishun",
      "title": "Co-Founder & COO"
    }
  ],
  "seoDescription": "Learn about GrowSquadz, a growth-focused agency helping EdTech brands, educators, and educational creators grow through content, social media, video, branding, and SEO.",
  "seoTitle": "About - GrowSquadz",
  "storyParagraphs": [
    "GrowSquadz Started With A Simple Idea: Great Brands And Creators Deserve More Than Just Good Content — They Need The Right Strategy To Grow. What Began With A Passion For Creativity And Digital Media Evolved Into A Growth-Focused Agency Built To Help Ideas Stand Out, Connect With The Right Audience, And Build A Stronger Online Presence.",
    "Today, GrowSquadz Brings Content, Strategy, And Creativity Together Under One Roof. From Social Media Management And Content Creation To Video Editing, YouTube Growth, Brand Identity, And SEO, We Build Solutions Around Real Goals — Not One-Size-Fits-All Packages. Every Project Starts With Understanding The Vision, The Audience, And What Growth Truly Means For The Brand.",
    "We Believe The Best Partnerships Go Beyond Delivering A Service. That’s Why We Work Closely With Every Brand And Creator, Combining Fresh Ideas, Smart Strategy, And Consistent Execution To Build Something Meaningful. Our Goal Is Simple: To Become A Creative Growth Partner You Can Trust As Your Vision Grows."
  ],
  "values": [
    {
      "_key": "v1",
      "description": "Every great result starts with a clear direction. We understand your goals, audience, and vision before creating a strategy built around what truly matters.",
      "icon": "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"strategyGradient\" x1=\"3\" y1=\"3\" x2=\"45\" y2=\"46\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#2563EB\"/>\n      <stop offset=\"0.5\" stop-color=\"#4F46E5\"/>\n      <stop offset=\"1\" stop-color=\"#7C3AED\"/>\n    </linearGradient>\n  </defs>\n\n  <rect width=\"48\" height=\"48\" rx=\"13\" fill=\"url(#strategyGradient)\"/>\n\n  <circle cx=\"23\" cy=\"25\" r=\"12\" stroke=\"white\" stroke-width=\"2.1\"/>\n  <circle cx=\"23\" cy=\"25\" r=\"6.5\" stroke=\"white\" stroke-width=\"2\"/>\n  <circle cx=\"23\" cy=\"25\" r=\"2.2\" fill=\"white\"/>\n\n  <path d=\"M26 22L36.5 11.5\"\n        stroke=\"white\" stroke-width=\"2.2\"\n        stroke-linecap=\"round\"/>\n\n  <path d=\"M31.5 11.5H36.5V16.5\"\n        stroke=\"white\" stroke-width=\"2.2\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n</svg>",
      "title": "Strategy First"
    },
    {
      "_key": "v2",
      "description": "We create with intention, not just for attention. Every idea is shaped to communicate clearly, connect with the right audience, and support meaningful growth.",
      "icon": "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"creativityGradient\" x1=\"4\" y1=\"3\" x2=\"44\" y2=\"46\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#F59E0B\"/>\n      <stop offset=\"0.5\" stop-color=\"#F97316\"/>\n      <stop offset=\"1\" stop-color=\"#EC4899\"/>\n    </linearGradient>\n  </defs>\n\n  <rect width=\"48\" height=\"48\" rx=\"13\" fill=\"url(#creativityGradient)\"/>\n\n  <path d=\"M24 11.5C17.9 11.5 13 16.2 13 22C13 26 15.2 28.8 18 31C19.5 32.2 20 33.5 20 35H28C28 33.5 28.5 32.2 30 31C32.8 28.8 35 26 35 22C35 16.2 30.1 11.5 24 11.5Z\"\n        stroke=\"white\" stroke-width=\"2.1\"\n        stroke-linejoin=\"round\"/>\n\n  <path d=\"M20 39H28M22 43H26\"\n        stroke=\"white\" stroke-width=\"2.1\"\n        stroke-linecap=\"round\"/>\n\n  <path d=\"M24 18V25M20.5 21.5H27.5\"\n        stroke=\"white\" stroke-width=\"2\"\n        stroke-linecap=\"round\"/>\n\n  <path d=\"M38 10V15M35.5 12.5H40.5\"\n        stroke=\"white\" stroke-width=\"1.8\"\n        stroke-linecap=\"round\"/>\n</svg>",
      "title": "Creativity With Purpose"
    },
    {
      "_key": "v3",
      "description": "We believe the best work comes from working together. We listen, communicate openly, and treat every brand and creator like a long-term growth partner.",
      "icon": "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\"\n     xmlns=\"http://www.w3.org/2000/svg\">\n\n  <defs>\n    <linearGradient id=\"partnershipGradient\"\n                    x1=\"3\" y1=\"3\" x2=\"46\" y2=\"46\"\n                    gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#10B981\"/>\n      <stop offset=\"48%\" stop-color=\"#06B6D4\"/>\n      <stop offset=\"100%\" stop-color=\"#3B82F6\"/>\n    </linearGradient>\n\n    <linearGradient id=\"partnershipGlow\"\n                    x1=\"8\" y1=\"4\" x2=\"40\" y2=\"44\"\n                    gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#FFFFFF\" stop-opacity=\"0.18\"/>\n      <stop offset=\"1\" stop-color=\"#FFFFFF\" stop-opacity=\"0\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Gradient Background -->\n  <rect width=\"48\" height=\"48\" rx=\"13\"\n        fill=\"url(#partnershipGradient)\"/>\n\n  <!-- Subtle Premium Glow -->\n  <rect x=\"1\" y=\"1\" width=\"46\" height=\"46\" rx=\"12\"\n        fill=\"url(#partnershipGlow)\"/>\n\n  <!-- Left Person -->\n  <circle cx=\"15.5\" cy=\"16\" r=\"4\"\n          stroke=\"white\" stroke-width=\"2.1\"/>\n\n  <!-- Right Person -->\n  <circle cx=\"32.5\" cy=\"16\" r=\"4\"\n          stroke=\"white\" stroke-width=\"2.1\"/>\n\n  <!-- Left Shoulder -->\n  <path d=\"M8.5 31C8.5 26.2 11.5 23 15.5 23\n           C18 23 20.1 24.3 21.5 26.3\"\n        stroke=\"white\"\n        stroke-width=\"2.1\"\n        stroke-linecap=\"round\"/>\n\n  <!-- Right Shoulder -->\n  <path d=\"M39.5 31C39.5 26.2 36.5 23 32.5 23\n           C30 23 27.9 24.3 26.5 26.3\"\n        stroke=\"white\"\n        stroke-width=\"2.1\"\n        stroke-linecap=\"round\"/>\n\n  <!-- Partnership Connection -->\n  <path d=\"M16.5 30L21 34.5\n           C22.7 36.2 25.3 36.2 27 34.5\n           L31.5 30\"\n        stroke=\"white\"\n        stroke-width=\"2.3\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <!-- Shared Link -->\n  <path d=\"M19.5 30L22.5 27\n           C23.3 26.2 24.7 26.2 25.5 27\n           L28.5 30\"\n        stroke=\"white\"\n        stroke-width=\"2.3\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <!-- Trust Spark -->\n  <path d=\"M24 39V42M22.5 40.5H25.5\"\n        stroke=\"white\"\n        stroke-width=\"1.7\"\n        stroke-linecap=\"round\"/>\n\n</svg>",
      "title": "Partnership Over Projects"
    },
    {
      "_key": "v4",
      "description": "Digital platforms never stand still, and neither do we. We learn, adapt, test new ideas, and continuously improve how we create, strategize, and grow.",
      "icon": "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"improvingGradient\" x1=\"3\" y1=\"4\" x2=\"45\" y2=\"45\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#8B5CF6\"/>\n      <stop offset=\"0.5\" stop-color=\"#D946EF\"/>\n      <stop offset=\"1\" stop-color=\"#F43F5E\"/>\n    </linearGradient>\n  </defs>\n\n  <rect width=\"48\" height=\"48\" rx=\"13\" fill=\"url(#improvingGradient)\"/>\n\n  <path d=\"M11 37H38\"\n        stroke=\"white\" stroke-width=\"2\"\n        stroke-linecap=\"round\"/>\n\n  <path d=\"M14 32L21 25L26 29L37 17\"\n        stroke=\"white\" stroke-width=\"2.4\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <path d=\"M31.5 17H37V22.5\"\n        stroke=\"white\" stroke-width=\"2.4\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"/>\n\n  <circle cx=\"14\" cy=\"32\" r=\"2\" fill=\"white\"/>\n  <circle cx=\"21\" cy=\"25\" r=\"2\" fill=\"white\"/>\n  <circle cx=\"26\" cy=\"29\" r=\"2\" fill=\"white\"/>\n</svg>",
      "title": "Always Improving"
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
      "value": "Growsquadz Ventures Private Limited"
    },
    {
      "_key": "bd3",
      "label": "BUSINESS HOURS",
      "value": "Monday – Saturday, 9 AM – 7 PM IST"
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
      "href": "https://wa.me/919288285878?text=Hi%2C%20I%20want%20to%20order%20a%20design",
      "iconBg": "#25d366",
      "iconColor": "white",
      "label": "WhatsApp (Fastest)",
      "platform": "whatsapp",
      "tag": "Avg. response: <1 hr",
      "value": "+91 92882 85878"
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
      "href": "https://t.me/growsquadz",
      "iconBg": "#0088cc",
      "iconColor": "white",
      "label": "Telegram",
      "platform": "telegram",
      "tag": "Join our creator community",
      "value": "@growsquadz"
    },
    {
      "_key": "ch4",
      "borderColor": "var(--color-hairline-strong)",
      "href": "https://www.instagram.com/growsquadz",
      "iconBg": "#e1306c",
      "iconColor": "white",
      "label": "Instagram",
      "platform": "instagram",
      "tag": "See our latest work",
      "value": "@growsquadz"
    }
  ],
  "heroHeading": "Let's Build Something Amazing Together.",
  "heroSubheading": "Whether you need social media management, creative content, branding, video editing, or digital marketing solutions, we're here to help. Reach out today and let's discuss how GrowSquadz can help your business grow online.",
  "quickOrderBody": "Let's discuss your goals and create a strategy that helps your business stand out, connect with the right audience, and grow online.",
  "quickOrderHeading": "Ready to Grow Your Brand?",
  "seoDescription": "Get in touch with GrowSquadz for social media management, content creation, video editing, branding, YouTube growth, SEO optimization, and digital marketing solutions. Let's discuss how we can help your brand grow online.",
  "seoTitle": "Contact — Growsquadz"
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
  "heroHeading": "Our recent work.",
  "heroSubheading": "A selection of designs created for our clients. Every pixel is intentional.",
  "portfolioItems": [
    {
      "_key": "e0c175a9b466",
      "bgColor": "#007cf0",
      "category": "thumbnail",
      "dotColor": "#007cf0",
      "lineColor": "#007cf0",
      "title": "Thumbnail"
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

    console.log("➡️ Seeding services (" + servicesDocs.length + " documents)...");
    for (const service of servicesDocs) {
      await client.createOrReplace(service);
      console.log('   - Seeded service: "' + service.title + '"');
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

    console.log("➡️ Seeding legal pages (" + legalPagesDocs.length + " documents)...");
    for (const legal of legalPagesDocs) {
      await client.createOrReplace(legal);
      console.log('   - Seeded legal page: "' + legal.title + '"');
    }
    console.log("✅ Legal pages seeded successfully!");

    console.log("\n✨ Seeding completed successfully for ALL pages! Refresh your Sanity Studio browser window to see the details.");
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
  }
}

seed();
