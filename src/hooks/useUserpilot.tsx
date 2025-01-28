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

      Userpilot.identify(user.idUser, {
        name: userFullName,
        fullname: userFullName,
        firstname: user.userAccount
          ? user.userAccount.firstName
          : user.firstname,
        email: user.userAccount ? user.userAccount.email : user.email,
        language: user.userAccount ? user.userAccount.language : user.lang,
        local_code: user.userAccount
          ? user.userAccount.language === "es"
            ? "default"
            : "en"
          : user.lang === "es"
            ? "default"
            : "en",
        billingCountry: user.billingCountry,
        integrations: userIntegrations,
        planType: user.plan.planType,
        userType: user.userType,
        industry: user.industryCode,
        created_at: user.userAccount?.utcRegisterDate
          ? new Date(Date.parse(user.userAccount.utcRegisterDate))
          : new Date(Date.parse(user.utcRegisterDate)),
        company: {
          id: user.idUser,
          name: user.companyName,
          created_at: new Date(Date.parse(user.utcRegisterDate)),
          local_code: user.lang === "es" ? "default" : "en",
          userType: user.userType,
          planType: user.plan.planType,
          industry: user.industryCode,
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
