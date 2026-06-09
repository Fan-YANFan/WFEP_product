"use client";

import { LegalLayout } from "@/components/LegalLayout";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY } from "@/lib/product";

export function TermsPageContent() {
  const { locale, t } = useLanguage();
  const updated = locale === "zh" ? "2026年5月25日" : "May 25, 2026";

  if (locale === "zh") {
    return (
      <LegalLayout title={t.footer.terms} updated={updated}>
        <p>
          本條款及細則（「條款」）規管您使用由 {COMPANY.name}（「我們」）營運的網站，以及透過本網站預約上門回收及使用回收點搜尋服務。使用本網站即表示您同意受本條款約束。
        </p>
        <h2>1. 使用資格</h2>
        <p>您須年滿 18 歲（或您所在司法管轄區的法定成年年齡）方可使用預約服務。提交預約即表示您符合此要求。</p>
        <h2>2. 服務說明</h2>
        <p>
          本網站提供香港回收點搜尋（開放數據）及上門回收預約（示範功能）。回收點資料來自第三方，我們不保證其完整或即時準確。上門回收價格按估計重量計算，實際回贈以現場磅重為準。
        </p>
        <h2>3. 預約、定價及付款</h2>
        <p>
          顯示價格以港元計算。我們保留更正錯誤、限制數量、拒絕或取消預約的權利。回贈方式及時間將於確認短訊中說明。
        </p>
        <h2>4. 上門回收</h2>
        <p>預計到達時間僅供參考。您須提供準確地址及聯絡方式；因資料錯誤導致的延誤，我們不承擔責任。</p>
        <h2>5. 取消及更改</h2>
        <p>如需取消或更改預約，請於回收日前透過 {COMPANY.email} 聯絡我們。</p>
        <h2>6. 知識產權</h2>
        <p>本網站內容（文字、圖像、商標等）受版權及商標法保護，未經書面同意不得複製或分發。</p>
        <h2>7. 可接受使用</h2>
        <p>您不得將本網站用於非法目的、提交虛假預約資料，或試圖未經授權存取我們的系統。</p>
        <h2>8. 責任限制</h2>
        <p>在法律允許的最大範圍內，我們對間接或相應損害不承擔責任。就特定預約的總責任不超過該次服務已付或應付金額。</p>
        <h2>9. 適用法律</h2>
        <p>本條款受香港特別行政區法律管轄。爭議由香港法院專屬管轄。</p>
        <h2>10. 條款更改</h2>
        <p>我們可能不時更新本條款。重大更改將於本頁公布。繼續使用即表示接受修訂後的條款。</p>
        <h2>11. 聯絡我們</h2>
        <p>
          如有疑問，請聯絡 {COMPANY.name}，{COMPANY.address}，或電郵{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>。
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={t.footer.terms} updated={updated}>
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of the website operated by{" "}
        {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including recycling point
        search and door-to-door pickup bookings. By using our site, you agree to these Terms.
      </p>
      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years of age (or the age of majority in your jurisdiction) to book
        pickup services. By submitting a booking, you confirm that you meet this requirement.
      </p>
      <h2>2. Services</h2>
      <p>
        We provide Hong Kong recycling point search (open data) and door-to-door pickup booking (demo).
        Map data is sourced from third parties; we do not guarantee completeness or real-time accuracy.
        Pickup payouts are estimated by weight; final amounts are based on on-site weighing.
      </p>
      <h2>3. Bookings, pricing, and payment</h2>
      <p>
        Prices are shown in HKD unless stated otherwise. We may correct errors, limit quantities, or
        refuse or cancel bookings. Payout method and timing will be confirmed by message.
      </p>
      <h2>4. Pickup and delivery</h2>
      <p>
        Estimated arrival times are indicative only. You must provide accurate address and contact
        details; we are not liable for delays due to incorrect information.
      </p>
      <h2>5. Cancellations</h2>
      <p>
        To cancel or reschedule, contact us at {COMPANY.email} before your pickup date.
      </p>
      <h2>6. Intellectual property</h2>
      <p>
        Site content—including text, graphics, and logos—is protected by copyright and trademark
        laws. You may not reproduce or distribute it without our written consent.
      </p>
      <h2>7. Acceptable use</h2>
      <p>
        You agree not to use the site unlawfully, submit false booking information, or attempt
        unauthorized access to our systems.
      </p>
      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for indirect or consequential
        damages. Our total liability for any booking claim shall not exceed the amount paid or
        payable for that service.
      </p>
      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Hong Kong SAR. Disputes shall be subject to the
        exclusive jurisdiction of Hong Kong courts.
      </p>
      <h2>10. Changes</h2>
      <p>
        We may update these Terms from time to time. Material changes will be posted on this page.
        Continued use constitutes acceptance.
      </p>
      <h2>11. Contact</h2>
      <p>
        Questions may be directed to {COMPANY.name}, {COMPANY.address}, or{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalLayout>
  );
}
