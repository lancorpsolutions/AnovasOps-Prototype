"use client";

import { useEffect, useRef, useState } from "react";
import { INTAKE_FORM_ID } from "@/lib/intake";

/** `query` is forwarded to Jotform so it records which button the lead came from. */
export function IntakeFormEmbed({ query = "" }: { query?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(2700);
  const src = `https://form.jotform.com/${INTAKE_FORM_ID}${query ? `?${query}` : ""}`;

  useEffect(() => {
    // Jotform posts "setHeight:<px>:<formId>" so the iframe can fit its content.
    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "string" || !e.origin.includes("jotform")) return;
      const [action, value] = e.data.split(":");
      if (action === "setHeight") {
        const h = parseInt(value, 10);
        if (h > 0) setHeight(h + 40);
      } else if (action === "scrollIntoView") {
        iframeRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id={`JotFormIFrame-${INTAKE_FORM_ID}`}
      title="Anovas Client Intake Form"
      src={src}
      allow="geolocation; microphone; camera; fullscreen"
      style={{ width: "100%", height, border: "none" }}
      scrolling="no"
    />
  );
}
