import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  alternates: { canonical: "/support" },
  description:
    "Need help with ActionSense or BrowserDrop? Get support, report bugs, or request features. Direct contact with the developer.",
};

const CONTACT_EMAIL = "xiaoniubuniu@gmail.com";

/** 按产品分组的支持渠道（产品均为个人开发，纯邮箱 + GitHub 渠道） */
const productSupport = [
  {
    name: "ActionSense",
    platform: "macOS",
    intro:
      "Free, open-source clipboard assistant. No account, no backend — issues get fixed in code.",
    channels: [
      {
        label: "Bugs & feature requests",
        desc: "GitHub issues are the fastest path — I triage them weekly.",
        href: "https://github.com/xiaoyunchengzhu/ActionSense/issues",
        external: true,
      },
      {
        label: "Email support",
        desc: `Anything GitHub doesn't fit: mention "ActionSense" in the subject.`,
        href: `mailto:${CONTACT_EMAIL}?subject=ActionSense%20support`,
        external: false,
      },
    ],
  },
  {
    name: "BrowserDrop",
    platform: "Android",
    intro:
      "Local Wi-Fi file sharing, currently in closed beta on Google Play.",
    channels: [
      {
        label: "Beta feedback & issues",
        desc: `Email me directly — mention "BrowserDrop" and your device model.`,
        href: `mailto:${CONTACT_EMAIL}?subject=BrowserDrop%20beta%20feedback`,
        external: false,
      },
      {
        label: "Join the beta",
        desc: "Opt-in instructions, group link, and Play Store links live on the product page.",
        href: "/products/browserdrop",
        external: false,
      },
      {
        label: "Product site & docs",
        desc: "Full usage documentation for BrowserDrop.",
        href: "https://browserdrop.xiaoniubuniu.com",
        external: true,
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        Support
      </h1>
      <p className="text-gray-500 text-center mb-10">
        Every app here is built and supported by one person. You&apos;re emailing
        the developer, not a ticket queue.
      </p>

      {/* 通用联系方式 */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-10 text-center">
        <p className="text-sm text-gray-600 mb-3">
          General questions, business inquiries, or press:
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-block text-base px-6 py-2.5 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="text-xs text-gray-400 mt-3">
          I usually reply within 2 business days.
        </p>
      </div>

      {/* 按产品的支持渠道 */}
      <div className="space-y-8">
        {productSupport.map((product) => (
          <section
            key={product.name}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-gray-900">
                {product.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {product.platform}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{product.intro}</p>
            <ul className="divide-y divide-gray-100">
              {product.channels.map((channel) => (
                <li key={channel.label} className="py-3">
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-medium text-brand-orange hover:underline"
                  >
                    {channel.label} →
                  </a>
                  <p className="text-sm text-gray-500 mt-0.5">{channel.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* 底部说明 */}
      <p className="text-xs text-gray-400 mt-10 text-center">
        All current apps are free to use, so there are no payments to refund.
        If a paid version ships later, refund requests go to the same email.
      </p>
    </div>
  );
}
