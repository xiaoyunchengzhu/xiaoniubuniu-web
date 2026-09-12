import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  description:
    "Terms of service for XiaoNiuBuNiu apps: licenses, beta terms, disclaimers, and limitation of liability.",
};

const CONTACT_EMAIL = "xiaoniubuniu@gmail.com";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-400 mb-8">Effective date: 2026-09-12</p>

      <div className="prose-gray space-y-8 text-gray-600 leading-relaxed">
        <p className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
          <strong className="text-gray-900">Plain-language summary:</strong>{" "}
          all my apps are free to use. ActionSense is open source under the MIT
          license — do almost anything with it. BrowserDrop is free closed-source
          software currently in beta — use it at your own risk of it being
          buggy, which is exactly what the beta is for. Nothing here overrides
          your statutory consumer rights.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            1. Scope
          </h2>
          <p>
            These terms apply to the software products provided by{" "}
            <strong className="text-gray-900">XiaoNiuBuNiu</strong>
            {" "}(individual developer) — currently ActionSense (macOS),
            BrowserDrop (Android), and this website. Using an app or the site
            means you accept these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            2. Licenses
          </h2>
          <h3 className="font-semibold text-gray-900 mt-3 mb-1">
            ActionSense — MIT License
          </h3>
          <p>
            ActionSense is released under the{" "}
            <a
              href="https://github.com/xiaoyunchengzhu/ActionSense/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:underline"
            >
              MIT License
            </a>
            . You may use, copy, modify, and redistribute it, including in
            commercial products, as long as the copyright notice is preserved.
            It is provided &quot;as is&quot; even within that license — see
            section 5.
          </p>
          <h3 className="font-semibold text-gray-900 mt-4 mb-1">
            BrowserDrop — Free proprietary license (beta)
          </h3>
          <p>
            You may install and use BrowserDrop free of charge for personal and
            internal business purposes during the beta period. You may{" "}
            <strong className="text-gray-900">not</strong> sell, sublicense,
            reverse-engineer for competitive purposes, or redistribute modified
            builds. Participation in the Google Play beta is also governed by
            Google&apos;s own beta testing terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            3. Beta terms (BrowserDrop)
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Beta versions are provided for testing. Features may be incomplete
              or unstable, and the beta may end at any time.
            </li>
            <li>
              <strong className="text-gray-900">
                Keep backups of any files you transfer.
              </strong>{" "}
              A file-transfer tool operating on real storage can, in theory,
              fail mid-operation. Beta builds carry higher risk than a polished
              release.
            </li>
            <li>
              Feedback posted to me or to the beta group is voluntary; I may use
              it without obligation. Please don&apos;t include personal data in
              feedback.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            4. Acceptable use
          </h2>
          <p>
            Don&apos;t use my apps to transfer, store, or distribute unlawful
            content, or to interfere with networks you aren&apos;th authorized
            to use. Beyond that, what you do on your own devices with local-first
            tools is your business, not mine — I have no visibility into it and
            no ability to police it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            5. Disclaimer (&quot;as is&quot;)
          </h2>
          <p>
            To the maximum extent permitted by applicable law, the apps and this
            website are provided &quot;as is&quot; and &quot;as
            available&quot;, without warranties of any kind, express or implied,
            including merchantability, fitness for a particular purpose, and
            non-infringement. I do not warrant that apps will be error-free or
            uninterrupted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            6. Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, I will not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages — including{" "}
            <strong className="text-gray-900">
              loss of data or files
            </strong>{" "}
            — arising from use of the apps or inability to use them. If you are
            a consumer in the EU, UK, or another jurisdiction that caps or
            excludes such disclaimers, liability is limited to the extent your
            local law allows, and mandatory rights (e.g. for gross negligence or
            personal injury) are unaffected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            7. Intellectual property
          </h2>
          <p>
            Except where a product is explicitly open source (ActionSense), all
            software, branding, and site content are owned by XiaoNiuBuNiu. The
            ox logo and &quot;XiaoNiuBuNiu&quot; name are not licensed for
            third-party use without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            8. Third-party links &amp; affiliate disclosure
          </h2>
          <p>
            The site links to third-party products and some links are affiliate
            links — if you purchase through them I may earn a commission at no
            extra cost to you. Recommendations reflect real usage, but the
            third parties&apos; terms govern your transactions with them, and I
            am not responsible for their products or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            9. Changes to these terms
          </h2>
          <p>
            Terms may be updated as products evolve (for example, if a paid tier
            launches, payment terms will be added here). The effective date at
            the top will change. Material changes to app licensing will be
            announced on the product page and blog.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            10. Contact
          </h2>
          <p>
            Questions about these terms:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-orange hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . See also the{" "}
            <Link href="/privacy" className="text-brand-orange hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
