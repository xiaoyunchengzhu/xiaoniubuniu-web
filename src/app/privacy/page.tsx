import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description:
    "Privacy policy for XiaoNiuBuNiu products and this website. Short version: the apps collect nothing, and the website doesn't either.",
};

const CONTACT_EMAIL = "xiaoniubuniu@gmail.com";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400 mb-8">Effective date: 2026-09-12</p>

      <div className="prose-gray space-y-8 text-gray-600 leading-relaxed">
        <p className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
          <strong className="text-gray-900">The short version:</strong> my apps
          are built to work locally and process no personal data on any server.
          This website runs no ads, no analytics, and sets no cookies. If that
          ever changes, this page gets updated before it takes effect.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            1. Data controller
          </h2>
          <p>
            This site and the apps described below are developed and operated by{" "}
            <strong className="text-gray-900">XiaoNiuBuNiu</strong>, an
            individual developer, acting as data controller for the limited
            processing described in this policy. Contact:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-orange hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            2. What data is processed, and on what legal basis
          </h2>
          <p className="mb-3 text-sm">
            Legal bases are stated per the EU/UK GDPR; equivalent rights for
            California residents are covered in section 8.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">Activity</th>
                  <th className="text-left px-3 py-2 font-semibold">Data</th>
                  <th className="text-left px-3 py-2 font-semibold">Legal basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-3 py-2">Visiting this website</td>
                  <td className="px-3 py-2">
                    Server logs (IP address, user agent, requested URL) kept by
                    my hosting provider, Cloudflare
                  </td>
                  <td className="px-3 py-2">
                    Legitimate interest — operating and securing the service
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Emailing me</td>
                  <td className="px-3 py-2">Your email address and message content</td>
                  <td className="px-3 py-2">Consent — you contact me first</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Using ActionSense</td>
                  <td className="px-3 py-2">
                    None. All processing happens on your Mac; the app makes no
                    network calls.
                  </td>
                  <td className="px-3 py-2">Not applicable</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Using BrowserDrop</td>
                  <td className="px-3 py-2">
                    File metadata moves only within your own LAN. The only data
                    leaving your phone during beta is the anonymous crash report
                    in section 4.
                  </td>
                  <td className="px-3 py-2">
                    Legitimate interest — crash investigation during beta
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            3. ActionSense (macOS)
          </h2>
          <p>
            ActionSense is free, open-source software. It{" "}
            <strong className="text-gray-900">
              does not collect, transmit, or store any data outside your Mac
            </strong>
            :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>No backend, no accounts, no analytics SDKs, no network calls.</li>
            <li>
              Clipboard content, detection results, and history stay in local
              storage on your machine and are never uploaded.
            </li>
            <li>
              The source code is public at{" "}
              <a
                href="https://github.com/xiaoyunchengzhu/ActionSense"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:underline"
              >
                github.com/xiaoyunchengzhu/ActionSense
              </a>{" "}
              and can be independently audited.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            4. BrowserDrop (Android)
          </h2>
          <p>
            BrowserDrop turns your phone into a file server inside your own
            Wi-Fi network:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong className="text-gray-900">No account or sign-in.</strong>{" "}
              The app never asks you to identify yourself.
            </li>
            <li>
              <strong className="text-gray-900">
                Files transfer only over your local network (LAN).
              </strong>{" "}
              They are never uploaded to any server owned by me or anyone else.
            </li>
            <li>
              Only the folder you explicitly pick is shared; the app cannot
              access the rest of your storage.
            </li>
            <li>
              During the beta period, the app sends{" "}
              <strong className="text-gray-900">
                anonymous crash reports
              </strong>{" "}
              (stack trace, device model, OS version) so I can fix crashes. No
              file content, no advertising or device identifiers, no location.
              You can stop this simply by uninstalling the app; there is no
              account to delete.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            5. This website &amp; cookies
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              The site is statically hosted and sets no first-party cookies or
              local storage of your activity. Because nothing requires storage
              consent, the site deliberately shows{" "}
              <strong className="text-gray-900">no cookie banner</strong>.
            </li>
            <li>
              No advertising or behavioral analytics scripts are loaded, from me
              or any third party.
            </li>
            <li>
              Some outbound links to third-party services are affiliate links.
              Clicking them means those third parties (e.g. Namecheap, Vultr)
              may set their own cookies — their privacy policies apply from the
              moment you leave this site.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            6. International data transfers
          </h2>
          <p>
            Website hosting (including Cloudflare&apos;s server logs in section
            2) and crash-report collection may involve processing outside your
            country. I rely on the hosting provider&apos;s standard safeguards
            (Cloudflare&apos;s data-processing terms and EU model clauses).
            App data itself is never transferred anywhere — that&apos;s the
            point of local-first.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            7. Retention
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Hosting logs: retained per Cloudflare&apos;s default policy
              (typically 24 hours to 30 days for security logs); I do not
              receive or archive them separately.
            </li>
            <li>
              Email correspondence: kept only as long as needed to resolve the
              conversation, then deleted on request.
            </li>
            <li>
              Crash reports: raw reports are deleted once the underlying bug is
              fixed or after 90 days, whichever comes first.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            8. Your rights
          </h2>
          <p>
            Where any of the limited processing above applies to you, you have
            the right to access, rectify, erase, restrict, or object to
            processing, and to data portability (GDPR Art. 15–21); California
            residents have equivalent rights under the CCPA/CPRA to know,
            delete, and opt out of &quot;sharing&quot; (I do not share personal
            data, so there is nothing to opt out of). Just email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-orange hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            — because I don&apos;t build profiles, requests like these are
            usually settled in one reply.
          </p>
          <p className="mt-2 text-sm">
            You also have the right to lodge a complaint with your local data
            protection supervisory authority (EU/UK), or with the FTC/State
            Attorney General (US). I&apos;d genuinely prefer you email me first.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            9. Children&apos;s privacy
          </h2>
          <p>
            My apps are general-purpose utility software, not directed at
            children, and they collect no personal data from anyone of any age —
            consistent with COPPA (US), the UK Age Appropriateness Code, and
            Google Play&apos;s Families policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            10. Security &amp; changes
          </h2>
          <p>
            The architecture is the security story: apps hold nothing
            server-side, so there is no app database to breach. Hosting is
            behind Cloudflare with automatic HTTPS.
          </p>
          <p className="mt-2">
            If any future product or version starts collecting data, this page
            will be updated (with a new effective date){" "}
            <strong className="text-gray-900">before</strong> that version
            ships.
          </p>
        </section>

        <p className="text-sm text-gray-500 border-t border-gray-100 pt-6">
          See also the{" "}
          <Link href="/terms" className="text-brand-orange hover:underline">
            Terms of Service
          </Link>{" "}
          covering app licenses, beta participation, and disclaimers.
        </p>
      </div>
    </div>
  );
}
