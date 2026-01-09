import { useEffect, useState } from "react";
import { useAppConfiguration } from "../AppConfiguration";
import { Userpilot } from "userpilot";
import { useAppSessionState } from "../session/AppSessionStateContext";
import { getActiveAddons, getTotalLandingPages } from "../utils";
import { useLocationHref } from "./useLocationHref";

export const useUserpilot = () => {
  const AppConfiguration = useAppConfiguration();
  const appSessionState = useAppSessionState();
  const [userpilotInitialized, setUserpilotInitialized] = useState(false);
  const href = useLocationHref(window);

  useEffect(() => {
    if (AppConfiguration?.userpilotToken) {
      Userpilot.initialize(AppConfiguration.userpilotToken);
      setUserpilotInitialized(true);
    }
  }, [AppConfiguration.userpilotToken]);

  useEffect(() => {
    if (userpilotInitialized && appSessionState?.status === "authenticated") {
      const {
        userData: { user },
      } = appSessionState;

      const userFullName = user.userAccount
        ? `${user.userAccount.firstName} ${user.userAccount.lastName}`
        : user.fullname;

      const userIntegrations = user.integrations
        ?.toString()
        .replaceAll(",", ";");

      Userpilot.identify(user.userAccount?.idUserAccount ?? user.idUser, {
        name: userFullName,
        fullname: userFullName,
        firstname: user.userAccount
          ? user.userAccount.firstName
          : user.firstname,
        email: user.userAccount ? user.userAccount.email : user.email,
        phone: user.userAccount ? user.userAccount.phone : null,
        language: user.lang,
        locale_code: user.lang === "es" ? "default" : "en",
        billingCountry: user.billingCountry,
        integrations: userIntegrations,
        planType: user.plan?.userTypePlan,
        userType: user.userType,
        industry: user.industry !== "" ? user.industry : user.industryCode,
        created_at: user.userAccount?.utcRegisterDate
          ? new Date(Date.parse(user.userAccount.utcRegisterDate))
          : new Date(Date.parse(user.utcRegisterDate)),
        company: {
          id: user.idUser,
          name: user.companyName,
          created_at: new Date(Date.parse(user.utcRegisterDate)),
          locale_code: user.lang === "es" ? "default" : "en",
          userType: user.userType,
          planType: user.plan?.userTypePlan,
          industry: user.industry !== "" ? user.industry : user.industryCode,
          country: user.country,
          billingCountry: user.billingCountry,
          integrations: userIntegrations,
          dkimOk: user.domainStatus.isDKIMEnabled,
          spfOk: user.domainStatus.isSPFEnabled,
          dmarcOk: user.domainStatus.isDMARCEnabled,
          trialends: user.plan.trialExpirationDate,
          addons: getActiveAddons(user),
          conversationsQty: user.chat.active ? user.chat.planData.quantity : 0,
          landingsQty: getTotalLandingPages(user.landings?.landingPacks),
          onsiteQty:
            user.onsite.active && user.onsite.qty ? user.onsite.qty : 0,
          pushNotificationQty:
            user.pushNotificationPlan.active && user.pushNotificationPlan.qty
              ? user.pushNotificationPlan.qty
              : 0,
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
        },
      });
    }
  }, [appSessionState, userpilotInitialized]);

  useEffect(() => {
    if (userpilotInitialized && appSessionState?.status === "authenticated") {
      Userpilot.reload();
    }
  }, [appSessionState.status, userpilotInitialized, href]);
};
