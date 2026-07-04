// ─── GROQ Queries for Sanity CMS ───

// ── Site Settings (Navbar, Footer, Global) ──
export const siteConfigQuery = `*[_type == "siteSettings"][0]{
  siteName,
  legalName,
  appTitle,
  tagline,
  description,
  phone,
  email,
  address,
  defaultOrderCtaLabel,
  defaultOrderCtaHref,
  defaultHelpCtaHref,
  socialLinks[]{label, href, iconSvg},
  navLinks[]{label, href},
  footerColumns[]{heading, links[]{label, href}}
}`;

// ── Homepage ──
export const homepageQuery = `*[_type == "homepage"][0]{
  seoTitle,
  seoDescription,
  announcementBadge,
  announcementText,
  announcementHref,
  heroEyebrow,
  heroHeadline,
  heroBody,
  heroFootnote,
  heroHighlights[]{
    text,
    dotColor,
    showCheck
  },
  heroImage,
  heroPrimaryCta{label, href},
  heroSecondaryCta{label, href},
  stats[]{value, label},
  services[]{
    icon,
    image,
    title,
    description,
    gradient,
    href
  },
  servicesSections[]{
    eyebrow,
    heading,
    subheading,
    services[]{
      icon,
      image,
      title,
      description,
      gradient,
      href
    }
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
  gradient
}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  seoTitle,
  seoDescription,
  heroHeading,
  heroSubheading
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
  profiles[]{
    avatar,
    name,
    title,
    bio,
    links[]{label, href}
  },
  values[]{icon, title, description}
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
    _key,
    title,
    client,
    category,
    image,
    bgColor,
    lineColor,
    dotColor,
    youtubeUrl
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
