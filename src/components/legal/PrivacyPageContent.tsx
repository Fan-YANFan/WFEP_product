"use client";

import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY } from "@/lib/product";

export function PrivacyPageContent() {
  const { locale, t } = useLanguage();
  const updated = locale === "zh" ? "2026年5月25日" : "May 25, 2026";

  if (locale === "zh") {
    return (
      <LegalLayout title={t.footer.privacy} updated={updated}>
        <p>
          {COMPANY.name}（「我們」）重視您的私隱。本政策說明我們如何收集、使用、披露及保護您使用本網站或預約服務時的個人資料。
        </p>
        <h2>1. 資料控制者</h2>
        <p>
          資料控制者：{COMPANY.name}，{COMPANY.address}。聯絡：{COMPANY.email}，{COMPANY.phone}。
        </p>
        <h2>2. 我們收集的資料</h2>
        <h3>您提供的資料</h3>
        <ul>
          <li>姓名、電郵、電話、地址及預約詳情；</li>
          <li>會員帳戶憑證（如適用）；</li>
          <li>與客戶支援的通訊；</li>
          <li>您收藏的回收點及活動提醒。</li>
        </ul>
        <h3>自動收集的資料</h3>
        <ul>
          <li>裝置、瀏覽器、IP 及大致位置；</li>
          <li>瀏覽頁面及互動資料；</li>
          <li>Cookie 及類似技術（見 <Link href="/cookies">Cookie 政策</Link>）。</li>
        </ul>
        <h2>3. 使用目的</h2>
        <ul>
          <li>提供回收點搜尋及上門預約服務；</li>
          <li>管理會員帳戶、訂單及收藏；</li>
          <li>改善網站及客戶體驗；</li>
          <li>遵守法律義務及防止欺詐。</li>
        </ul>
        <h2>4. 資料共享</h2>
        <p>
          我們可能與物流合作夥伴、支付處理商、分析服務供應商及法律要求下的主管機關共享必要資料。我們不會出售您的個人資料。
        </p>
        <h2>5. 保留期限</h2>
        <p>我們在提供服務所需期間及法律要求下保留資料，之後安全刪除或匿名化。</p>
        <h2>6. 您的權利</h2>
        <p>
          您可要求查閱、更正或刪除個人資料，或反對某些處理。請電郵 {COMPANY.email}，標題註明「私隱要求」。
        </p>
        <h2>7. 安全</h2>
        <p>我們採取合理技術及組織措施保護資料，但互聯網傳輸無法保證絕對安全。</p>
        <h2>8. 聯絡我們</h2>
        <p>
          私隱查詢：{COMPANY.email}。郵寄：{COMPANY.name}，{COMPANY.address}。
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={t.footer.privacy} updated={updated}>
      <p>
        {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This
        Privacy Policy explains how we collect, use, disclose, and protect personal information when
        you use our website or book pickup services.
      </p>
      <h2>1. Who we are</h2>
      <p>
        Data controller: {COMPANY.name}, {COMPANY.address}. Contact: {COMPANY.email}, {COMPANY.phone}.
      </p>
      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>Name, email, phone, address, and booking details;</li>
        <li>Account credentials if you register;</li>
        <li>Support communications;</li>
        <li>Saved recycling points and event reminders.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Device, browser, IP, and general location;</li>
        <li>Pages viewed and interaction data;</li>
        <li>Cookies and similar technologies (see our <Link href="/cookies">Cookie Policy</Link>).</li>
      </ul>
      <h2>3. How we use your information</h2>
      <ul>
        <li>To provide recycling search and pickup booking;</li>
        <li>To manage accounts, orders, and bookmarks;</li>
        <li>To improve the site and customer experience;</li>
        <li>To comply with law and prevent fraud.</li>
      </ul>
      <h2>4. Sharing</h2>
      <p>
        We may share necessary data with logistics partners, payment processors, analytics providers,
        and authorities when required by law. We do not sell your personal data.
      </p>
      <h2>5. Retention</h2>
      <p>We retain data as long as needed to provide services and as required by law, then delete or anonymize it.</p>
      <h2>6. Your rights</h2>
      <p>
        You may request access, correction, or deletion, or object to certain processing. Email{" "}
        {COMPANY.email} with &quot;Privacy Request&quot; in the subject line.
      </p>
      <h2>7. Security</h2>
      <p>We use reasonable safeguards, but no internet transmission is completely secure.</p>
      <h2>8. Contact</h2>
      <p>
        Privacy inquiries: {COMPANY.email}. Postal: {COMPANY.name}, {COMPANY.address}.
      </p>
    </LegalLayout>
  );
}
