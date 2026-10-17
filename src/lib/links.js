const digits = (phone) => (phone || "").replace(/[^\d]/g, "");

export function telLink(phone) {
  return `tel:${(phone || "").replace(/[^\d+]/g, "")}`;
}

export function whatsappLink(phone, text) {
  const base = `https://wa.me/${digits(phone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoReport(slug, reason = "") {
  const subject = `Report: ${slug}`;
  const body = reason || `Please describe the issue with "${slug}":`;
  return `mailto:admin@citysheba.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
