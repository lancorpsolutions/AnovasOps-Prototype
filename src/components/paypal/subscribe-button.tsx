"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

interface PaypalSubscriptionActions {
  subscription: { create: (options: { plan_id: string }) => Promise<string> };
}

interface PaypalButtonsInstance {
  render: (container: HTMLElement) => void;
  close: () => void;
}

interface PaypalNamespace {
  Buttons: (options: {
    style?: Record<string, string>;
    createSubscription: (data: unknown, actions: PaypalSubscriptionActions) => Promise<string>;
    onApprove: (data: { subscriptionID: string }) => void;
    onError?: (err: unknown) => void;
  }) => PaypalButtonsInstance;
}

declare global {
  interface Window {
    paypal?: PaypalNamespace;
  }
}

let sdkPromise: Promise<void> | null = null;

function loadPaypalSdk(clientId: string): Promise<void> {
  if (window.paypal) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the PayPal SDK"));
    document.body.appendChild(script);
  });
  return sdkPromise;
}

interface PaypalSubscribeButtonProps {
  planId: string;
  onSubscribed: (subscriptionId: string) => void;
  onError?: (message: string) => void;
}

export function PaypalSubscribeButton({ planId, onSubscribed, onError }: PaypalSubscribeButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const handleApprove = useEffectEvent((subscriptionId: string) => onSubscribed(subscriptionId));
  const handleError = useEffectEvent((message: string) => onError?.(message));

  useEffect(() => {
    if (!clientId) {
      handleError("PayPal is not configured (missing NEXT_PUBLIC_PAYPAL_CLIENT_ID)");
      return;
    }

    let buttons: PaypalButtonsInstance | null = null;
    let cancelled = false;

    loadPaypalSdk(clientId)
      .then(() => {
        if (cancelled || !containerRef.current || !window.paypal) return;
        buttons = window.paypal.Buttons({
          style: { shape: "pill", color: "gold", label: "subscribe" },
          createSubscription: (_data, actions) => actions.subscription.create({ plan_id: planId }),
          onApprove: (data) => handleApprove(data.subscriptionID),
          onError: (err) => handleError(err instanceof Error ? err.message : "PayPal checkout error"),
        });
        buttons.render(containerRef.current);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err instanceof Error ? err.message : "Failed to load PayPal");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      buttons?.close();
    };
  }, [planId, clientId]);

  if (!clientId) {
    return <p className="text-xs text-red-600 text-center">PayPal is not configured.</p>;
  }

  return (
    <div>
      {loading && <p className="text-xs text-gray-400 text-center mb-2">Loading PayPal…</p>}
      <div ref={containerRef} />
    </div>
  );
}
