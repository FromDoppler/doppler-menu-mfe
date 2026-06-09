// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { beamerInitialize } from "react-beamer";
import { useEffect, useRef } from "react";
import { User } from "../model";
import { defaultLanguage } from "./i18n/MenuIntlProvider";
import { useAppConfiguration } from "../AppConfiguration";
import { FormattedMessage } from "react-intl";

// this is a temporary beamer account with limited functions
const BEAMER_URL = null;

const BEAMER_CONFIG = {
  selector: ".beamer-icon",
  top: -8,
  right: -8,
  language: defaultLanguage,
};
interface NotificationProp {
  user: User;
}

export const Notifications = ({ user }: NotificationProp) => {
  const { beamerId } = useAppConfiguration();
  const notificationRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = notificationRef.current;
    if (!host) {
      return;
    }

    const reveal = () => {
      const badge = host.querySelector<HTMLElement>(".beamer_icon");
      const count = parseInt(badge?.textContent?.trim() ?? "", 10);
      if (badge && count > 0) {
        badge.style.display = "";
      }
    };

    reveal();
    const observer = new MutationObserver(reveal);
    observer.observe(host, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (beamerId && user?.email) {
      // Title: How to Install Beamer on your Website or App
      // Date: Apr 17, 2018 · Last updated on Nov 03, 2022
      // Availability: https://www.getbeamer.com/blog/tutorial-how-to-use-beamer-in-your-website-or-app
      beamerInitialize(beamerId, BEAMER_URL, {
        ...BEAMER_CONFIG,
        user_firstname: user.fullname,
        user_email: user.email,
        phone: user.userAccount ? user.userAccount.phone : null,
        language: user.lang,
        user_id: user.email,
        contact_info_country: user.country,
        billing_country: user.billingCountry,
        industry: user.industry !== "" ? user.industry : user.industryCode,
        id_industry: user.idIndustry,
        user_type: user.userType,
        integrations: user?.integrations?.toString().replaceAll(",", ";"),
        plan_type: user.plan?.userTypePlan,
        automation: user.hasAutomation ?? false,
        origin: user.origin,
        originCookie: user.originCookie,
        originInbound: user.originInbound,
        utmCampaign: user.utmCampaign,
        utmContent: user.utmContent,
        utmCookies: user.utmCookies,
        utmMedium: user.utmMedium,
        utmSource: user.utmSource,
        utmTerm: user.utmTerm,
        surveyFormCompleted: user.surveyFormCompleted ?? false,
        customOnboardingCompleted: user.customOnboardingCompleted ?? false,
      });
    }
  }, [user, beamerId]);

  return (
    <li>
      <span
        ref={notificationRef}
        className="user-menu--open active iconapp-notification beamer-icon"
      >
        <FormattedMessage id="header.user_notifications" />
      </span>
    </li>
  );
};
