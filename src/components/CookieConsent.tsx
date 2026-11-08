"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// 同意状态键：存 localStorage，仅本机生效（granted/denied）
export const CONSENT_KEY = "xiaoniubuniu-analytics-consent";

// GEO/GDPR：Consent Mode 弹窗。默认值已在 layout 的内联脚本里置为 denied，
// 这里只负责采集选择并调用 gtag('consent','update') 通知 GTM/GA4。
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true); // 隐私模式读不到 storage 时照常询问
    }
  }, []);

  if (!visible) return null;

  const choose = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      // 存不下也无妨：本次会话内 gtag update 已生效
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("consent", "update", { analytics_storage: v });
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1">
          I use Google Analytics to see which pages actually get read —
          anonymous, aggregate, no ads, no cross-site profiling. Your choice is
          stored on this device only.{" "}
          <Link href="/privacy" className="text-brand-orange hover:underline">
            Details
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose("denied")}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            No thanks
          </button>
          <button
            onClick={() => choose("granted")}
            className="px-4 py-2 text-sm rounded-lg bg-brand-orange text-white hover:bg-brand-orange-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
