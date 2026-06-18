export const LEAD_MAGNETS = {
  "revenue-leaks-guide": {
    title: "5 Hidden Revenue Leaks in Home Service Businesses",
    pdfPath: "/lead-magnets/anovas-revenue-leaks-guide.pdf",
  },
} as const;

export type LeadMagnetSlug = keyof typeof LEAD_MAGNETS;
