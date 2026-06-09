"use client";

import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY } from "@/lib/product";

export function CookiesPageContent() {
  const { locale, t } = useLanguage();
  const updated = locale === "zh" ? "2026年5月25日" : "May 25, 2026";

  if (locale === "zh") {
    return (
      <LegalLayout title={t.footer.cookies} updated={updated}>
        <p>
          本 Cookie 政策說明 {COMPANY.name} 如何使用 Cookie 及類似技術。請與我們的{" "}
          <Link href="/privacy">私隱政策</Link> 及 <Link href="/terms">條款及細則</Link> 一併閱讀。
        </p>
        <h2>1. 什麼是 Cookie？</h2>
        <p>
          Cookie 是您瀏覽網站時儲存於裝置的小型文字檔，用於記住偏好、保持登入及了解使用情況。類似技術包括本地儲存及像素標籤。
        </p>
        <h2>2. 我們如何使用 Cookie</h2>
        <h3>必要 Cookie</h3>
        <p>
          用於核心功能，如語言偏好、會員登入、預約流程及 Cookie 同意記錄。無法透過橫幅關閉而不影響運作。
        </p>
        <h3>分析 Cookie</h3>
        <p>協助我們了解流量及改善效能，通常為匯總數據，僅在您同意後啟用。</p>
        <h3>推廣 Cookie</h3>
        <p>用於個人化內容及推廣，僅在您同意後啟用。</p>
        <h2>3. 我們使用的 Cookie 示例</h2>
        <div className="overflow-x-auto">
          <table className="mt-4 w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold">名稱</th>
                <th className="px-4 py-3 text-left font-semibold">用途</th>
                <th className="px-4 py-3 text-left font-semibold">類型</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">collectiv-locale</td>
                <td className="px-4 py-3">記住語言偏好</td>
                <td className="px-4 py-3">必要</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">collectiv-cookie-preferences</td>
                <td className="px-4 py-3">儲存 Cookie 同意選擇</td>
                <td className="px-4 py-3">必要</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">_collectiv_analytics</td>
                <td className="px-4 py-3">分析（如已同意）</td>
                <td className="px-4 py-3">分析</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">_collectiv_marketing</td>
                <td className="px-4 py-3">推廣（如已同意）</td>
                <td className="px-4 py-3">推廣</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>4. 管理 Cookie</h2>
        <p>您可透過頁底 Cookie 偏好設定或瀏覽器設定管理 Cookie。停用必要 Cookie 可能影響網站功能。</p>
        <h2>5. 聯絡我們</h2>
        <p>Cookie 相關問題：{COMPANY.email}，{COMPANY.phone}。</p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={t.footer.cookies} updated={updated}>
      <p>
        This Cookie Policy explains how {COMPANY.name} uses cookies and similar technologies. Read it
        together with our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms & Conditions</Link>.
      </p>
      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help
        remember preferences, keep you signed in, and understand how pages are used.
      </p>
      <h2>2. How we use cookies</h2>
      <h3>Strictly necessary</h3>
      <p>
        Required for core functionality such as language preference, member login, booking flow, and
        remembering your cookie consent choices.
      </p>
      <h3>Analytics</h3>
      <p>Help us understand traffic and improve performance. Enabled only if you consent.</p>
      <h3>Marketing</h3>
      <p>Used for personalized content and promotions. Enabled only if you consent.</p>
      <h2>3. Examples of cookies we use</h2>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Purpose</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 font-mono text-xs">collectiv-locale</td>
              <td className="px-4 py-3">Remembers language preference</td>
              <td className="px-4 py-3">Necessary</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 font-mono text-xs">collectiv-cookie-preferences</td>
              <td className="px-4 py-3">Stores cookie consent choices</td>
              <td className="px-4 py-3">Necessary</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 font-mono text-xs">_collectiv_analytics</td>
              <td className="px-4 py-3">Analytics (if consented)</td>
              <td className="px-4 py-3">Analytics</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">_collectiv_marketing</td>
              <td className="px-4 py-3">Marketing (if consented)</td>
              <td className="px-4 py-3">Marketing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>4. Managing cookies</h2>
      <p>
        Use the cookie preferences control in the footer or your browser settings. Disabling
        necessary cookies may affect site functionality.
      </p>
      <h2>5. Contact</h2>
      <p>
        Questions about cookies: {COMPANY.email}, {COMPANY.phone}.
      </p>
    </LegalLayout>
  );
}
