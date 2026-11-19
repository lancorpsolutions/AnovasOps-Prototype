// Client Intake Form (Jotform). New submissions fire an n8n webhook
// ("Sundiata — Intake Welcome Email") that sends the welcome email.
export const INTAKE_FORM_ID = "91266475184161";
export const INTAKE_FORM_URL = "https://form.jotform.com/lancorpsolutions/Intake";

/** On-site intake page, tagged with the page/button that sent the visitor. */
export function intakeHref(source: string) {
  return `/intake?utm_source=website&utm_medium=cta&utm_content=${encodeURIComponent(source)}`;
}
