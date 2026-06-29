// ─── GROQ Queries for Sanity CMS ───

// ── Site Settings (Navbar, Footer, Global) ──
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  description,
  phone,
  email,
  address,
  socialLinks[]{label, href, iconSvg},
  navLinks[]{label, href},
  footerColumns[]{
    heading,
    links[]{label, href}
  }
}`;

// ── Homepage ──
export const homepageQuery = `*[_type == "homepage"][0]{
  seoTitle,
  seoDescription,
  heroEyebrow,
  heroHeadline,
  heroBody,
  heroFootnote,
  heroImage,
  heroPrimaryCta{label, href},
  heroSecondaryCta{label, href},
  stats[]{value, label},
  services[]{
    icon,
    image,
    title,
    description,
    price,
    gradient,
    href
  },
  pricingTiers[]{
    name,
    price,
    originalPrice,
    description,
    features,
    ctaLabel,
    ctaHref,
    featured
  },
  testimonials[]{
    name,
    role,
    quote,
    avatar,
    avatarImage,
    rating
  },
  steps[]{
    number,
    title,
    description,
    image
  },
  faqItems[]{
    question,
    answer
  },
  seoContentHeading,
  seoContentBody,
  seoImage
}`;

// ── Services Page ──
export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  serviceId,
  title,
  icon,
  description,
  features,
  pricing[]{label, price, original},
  gradient
}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  ctaHeading,
  ctaBody
}`;

// ── Pricing Page ──
export const pricingPageQuery = `*[_type == "pricingPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  individualDesigns[]{
    icon,
    title,
    description,
    features,
    originalPrice,
    price,
    ctaLabel,
    ctaHref
  },
  thumbnailPacks[]{
    name,
    designs,
    price,
    originalPrice,
    savings,
    featured,
    ctaId
  },
  socialMediaPacks[]{
    name,
    designs,
    price,
    originalPrice,
    savings,
    featured,
    ctaId
  },
  faqItems[]{question, answer}
}`;

// ── About Page ──
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  storyParagraphs,
  companyInfo[]{label, value},
  values[]{icon, title, description},
  ctaHeading,
  ctaBody
}`;

// ── Contact Page ──
export const contactPageQuery = `*[_type == "contactPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  channels[]{
    platform,
    label,
    value,
    tag,
    href,
    iconBg,
    iconColor,
    borderColor
  },
  businessDetails[]{label, value},
  quickOrderHeading,
  quickOrderBody
}`;

// ── Become a Partner Page ──
export const partnerPageQuery = `*[_type == "partnerPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  heroBadge,
  benefits[]{icon, title, description},
  eligibilityHeading,
  eligibilityDescription,
  roleTags,
  processSteps[]{number, title, description},
  ctaHeading,
  ctaBody
}`;

// ── Portfolio Page ──
export const portfolioPageQuery = `*[_type == "portfolioPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading,
  filterCategories,
  portfolioItems[]{
    title,
    client,
    category,
    image,
    bgColor,
    lineColor,
    dotColor
  },
  ctaHeading,
  ctaBody
}`;

// ── Legal Pages (Privacy, Terms, Disclaimer) ──
export const legalPageQuery = `*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  seoDescription,
  lastUpdated,
  body
}`;
