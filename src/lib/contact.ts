export function getWhatsAppBaseHref(siteSettings: any): string {
  const whatsappSocial = siteSettings?.socialLinks?.find(
    (link: any) => link?.label?.toLowerCase() === "whatsapp"
  )?.href;

  const configured = siteSettings?.defaultOrderCtaHref || whatsappSocial;

  if (!configured) {
    return "https://wa.me/917488316199";
  }

  return configured.split("?")[0];
}

export function buildWhatsAppHref(baseHref: string, text: string): string {
  const cleanBase = (baseHref || "https://wa.me/917488316199").split("?")[0];
  return `${cleanBase}?text=${encodeURIComponent(text)}`;
}
