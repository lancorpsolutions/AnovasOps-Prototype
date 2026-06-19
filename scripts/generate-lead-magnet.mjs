// Generates the "5 Hidden Revenue Leaks" lead magnet PDF served from /public/lead-magnets.
// Run with: npm run generate:lead-magnet
import { mkdir } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Link, renderToFile } from "@react-pdf/renderer";

const e = React.createElement;

const PHOENIX_ICON = path.join(process.cwd(), "public", "branding", "anovas-phoenix-icon.png");

const COLORS = {
  navy: "#0f1b2d",
  navyLight: "#1c2d47",
  charcoal: "#232730",
  orange: "#c9622d",
  orangeLight: "#e07b3f",
  background: "#f4f5f7",
  border: "#e2e4e9",
  gray: "#5b6472",
};

const styles = StyleSheet.create({
  coverPage: {
    backgroundColor: COLORS.navy,
    padding: 56,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  coverEyebrow: {
    color: COLORS.orangeLight,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  coverIcon: {
    width: 44,
    height: 44,
    marginBottom: 18,
  },
  coverTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    marginTop: 18,
    lineHeight: 1.25,
  },
  coverAccentBar: {
    width: 64,
    height: 4,
    backgroundColor: COLORS.orange,
    marginTop: 20,
    marginBottom: 20,
  },
  coverSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12.5,
    lineHeight: 1.5,
    maxWidth: 420,
  },
  coverFooterBrand: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  coverFooterTagline: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 9.5,
    marginTop: 3,
  },
  page: {
    backgroundColor: "#ffffff",
    padding: "40 48",
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: 8,
    marginBottom: 22,
  },
  headerBrand: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.navy,
  },
  headerBrandAccent: {
    color: COLORS.orange,
  },
  headerDoc: {
    fontSize: 8.5,
    color: COLORS.gray,
  },
  leakBadge: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    backgroundColor: COLORS.orange,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  leakTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.navy,
    marginTop: 10,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.orange,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 10.5,
    color: COLORS.charcoal,
    lineHeight: 1.55,
    marginBottom: 16,
  },
  fixBox: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    padding: 16,
    border: `1px solid ${COLORS.border}`,
  },
  fixBoxTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.navy,
    marginBottom: 8,
  },
  checklistRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 9,
    height: 9,
    border: `1.2px solid ${COLORS.orange}`,
    borderRadius: 2,
    marginRight: 8,
    marginTop: 1.5,
  },
  checklistText: {
    fontSize: 10,
    color: COLORS.charcoal,
    lineHeight: 1.4,
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLORS.gray,
    borderTop: `0.5px solid ${COLORS.border}`,
    paddingTop: 8,
  },
  ctaPage: {
    backgroundColor: COLORS.navy,
    padding: 56,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  ctaTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.3,
    marginBottom: 16,
  },
  ctaBody: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 11.5,
    lineHeight: 1.6,
    marginBottom: 26,
    maxWidth: 440,
  },
  ctaLink: {
    color: "#ffffff",
    backgroundColor: COLORS.orange,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    textDecoration: "none",
  },
});

const LEAKS = [
  {
    number: "01",
    title: "The Cold Estimate",
    looks: "A lead asks for a quote, you send it, and then... nothing. No reminder gets set, no one follows up at day 3 or day 7, and the homeowner books a competitor who happened to call back first.",
    costs: "Estimate follow-up is the single easiest revenue leak to plug, and the most common one to ignore. Every estimate sitting untouched for more than a few days is money quietly walking out the door.",
    fixes: [
      "Flag any estimate with no follow-up activity after 48 hours.",
      "Assign a named owner to every open estimate — never leave one unowned.",
      "Review your open estimate list daily, not at month-end.",
    ],
  },
  {
    number: "02",
    title: "The Schedule Slip",
    looks: "A job falls behind because it's waiting on a customer callback, a material delivery, or a crew that never showed — and nobody notices until the customer calls asking where their crew is.",
    costs: "Every day a job sits blocked is a day of payroll and overhead with no revenue to show for it, plus a customer getting more frustrated and more likely to leave a bad review.",
    fixes: [
      "Track every job's status against its committed schedule, not just its calendar date.",
      "Flag blocked jobs (waiting on materials, customer, or crew) the moment they stall, not after they're late.",
      "Give one person ownership of unblocking each stalled job.",
    ],
  },
  {
    number: "03",
    title: "The Capacity Blind Spot",
    looks: "Sales books more work than the crews can absorb. Jobs sit unassigned, or the crews that are assigned get stacked so tight that quality — and morale — start to slip.",
    costs: "Overloaded crews cut corners, miss appointment windows, and burn out. Unassigned jobs slip past their promised dates before anyone in the office even knows there's a problem.",
    fixes: [
      "Track crew capacity in real time, not from memory or a whiteboard.",
      "Flag any job sitting without a crew assignment past a set threshold.",
      "Flag overloaded crews before they're double- or triple-booked.",
    ],
  },
  {
    number: "04",
    title: "The Finished-But-Unbilled Job",
    looks: "The crew wraps the job, marks it complete, and moves on — but the invoice doesn't go out for days or weeks because no one's job is to generate it.",
    costs: "Completed work that hasn't been billed is interest-free credit you're extending to your own business. It's also the easiest revenue leak to fix, because the work is already done.",
    fixes: [
      "Auto-flag every job marked complete that hasn't been invoiced within 24–48 hours.",
      "Make invoicing a required step in closing out a job, not an afterthought.",
      "Review completed-but-unbilled jobs at the end of every day.",
    ],
  },
  {
    number: "05",
    title: "The Quiet Collections Gap",
    looks: "Invoices go out, then sit unpaid because no one owns following up. Meanwhile, a customer complaint goes unresolved for a week and quietly turns into a cancellation and a one-star review.",
    costs: "Cash you've already earned is the most expensive cash to chase later. And an unresolved escalation doesn't just cost the invoice — it costs the next five referrals that customer would have sent you.",
    fixes: [
      "Assign a clear owner to every overdue invoice the moment it crosses term.",
      "Escalate customer issues automatically based on severity, not whoever happens to notice first.",
      "Track revenue at risk from overdue invoices and escalations as one number leadership reviews weekly.",
    ],
  },
];

function Brand() {
  return e(
    Text,
    { style: styles.headerBrand },
    "Anovas",
    e(Text, { style: styles.headerBrandAccent }, "OS")
  );
}

function CoverPage() {
  return e(
    Page,
    { size: "LETTER", style: styles.coverPage },
    e(
      View,
      null,
      e(Image, { style: styles.coverIcon, src: PHOENIX_ICON }),
      e(Text, { style: styles.coverEyebrow }, "A Field Guide for Home Service Operators"),
      e(
        Text,
        { style: styles.coverTitle },
        "5 Hidden Revenue Leaks in Home Service Businesses"
      ),
      e(View, { style: styles.coverAccentBar }),
      e(
        Text,
        { style: styles.coverSubtitle },
        "And how to plug them before they cost you another job, another invoice, or another customer. Built for HVAC, plumbing, electrical, roofing, landscaping, and pest control teams."
      )
    ),
    e(
      View,
      null,
      e(
        Text,
        { style: styles.coverFooterBrand },
        "Anovas",
        e(Text, { style: { color: COLORS.orangeLight } }, "OS")
      ),
      e(
        Text,
        { style: styles.coverFooterTagline },
        "The operating system for home service businesses  ·  Anovas Integrated Systems"
      )
    )
  );
}

function LeakPage({ leak }) {
  return e(
    Page,
    { size: "LETTER", style: styles.page },
    e(
      View,
      { style: styles.headerRow },
      e(Brand, null),
      e(Text, { style: styles.headerDoc }, "5 Hidden Revenue Leaks — Leak ", leak.number)
    ),
    e(Text, { style: styles.leakBadge }, "LEAK ", leak.number),
    e(Text, { style: styles.leakTitle }, leak.title),
    e(Text, { style: styles.sectionLabel }, "What It Looks Like"),
    e(Text, { style: styles.bodyText }, leak.looks),
    e(Text, { style: styles.sectionLabel }, "Why It Costs You"),
    e(Text, { style: styles.bodyText }, leak.costs),
    e(
      View,
      { style: styles.fixBox },
      e(Text, { style: styles.fixBoxTitle }, "The Fix"),
      ...leak.fixes.map((fix, i) =>
        e(
          View,
          { key: i, style: styles.checklistRow },
          e(View, { style: styles.checkbox }),
          e(Text, { style: styles.checklistText }, fix)
        )
      )
    ),
    e(
      View,
      { style: styles.footer },
      e(Text, null, "anovasintegratedsystems.com"),
      e(Text, null, `Page ${Number(leak.number) + 1} of 7`)
    )
  );
}

function CtaPage() {
  return e(
    Page,
    { size: "LETTER", style: styles.ctaPage },
    e(Text, { style: styles.coverEyebrow }, "See It Before It Becomes A Problem"),
    e(
      Text,
      { style: styles.ctaTitle },
      "Stop finding revenue leaks after the money's gone."
    ),
    e(
      Text,
      { style: styles.ctaBody },
      "AnovasOS watches your estimates, jobs, crews, invoices, and customer issues in real time — and flags exactly where revenue is at risk, who owns it, and what to do next. See what's happening, fix what's stuck, and protect revenue before small issues become bigger problems."
    ),
    e(Link, { style: styles.ctaLink, src: "https://anovasintegratedsystems.com" }, "Talk to Anovas Integrated Systems"),
    e(
      Text,
      { style: { color: "rgba(255,255,255,0.4)", fontSize: 9, marginTop: 28 } },
      "© Anovas Integrated Systems. AnovasOS — the operating system for home service businesses."
    )
  );
}

const doc = e(
  Document,
  { title: "5 Hidden Revenue Leaks in Home Service Businesses — AnovasOS", author: "Anovas Integrated Systems" },
  e(CoverPage, null),
  ...LEAKS.map((leak) => e(LeakPage, { key: leak.number, leak })),
  e(CtaPage, null)
);

const outDir = path.join(process.cwd(), "public", "lead-magnets");
const outFile = path.join(outDir, "anovas-revenue-leaks-guide.pdf");

await mkdir(outDir, { recursive: true });
await renderToFile(doc, outFile);
console.log(`Lead magnet PDF written to ${path.relative(process.cwd(), outFile)}`);
