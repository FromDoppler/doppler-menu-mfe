import {
  Alert,
  PrimaryNavItem,
  Plan,
  TerminalNavItem,
  User,
  UserData,
  PlanType,
} from "./model";
import { patchWebAppUrlIfNeed } from "./temporalPatchingUtils";
import jwt_decode from "jwt-decode";

const sanitizeUrlToCompare = (url: string): string =>
  url
    .replace(/^https?:\/\//, "//")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

const mapIdUserToken = (jwtToken: string) => {
  try {
    if (jwtToken) {
      var tokenDecoded = jwt_decode<any>(jwtToken);
      return tokenDecoded.nameid || 0;
    }
  } catch (error) {
    console.error(error);
  }

  return 0;
};

export const IsActiveUrl = (currentUrl: string, itemUrl: string): boolean =>
  sanitizeUrlToCompare(currentUrl) === sanitizeUrlToCompare(itemUrl);

const safeBoolean = (data: unknown): boolean =>
  data === true
    ? true
    : data === false
      ? false
      : typeof data === "string" && data.toLowerCase() === "true";

const safeString = (data: unknown): string =>
  typeof data === "string" ? data : !data ? "" : `${data}`;

const safeNumber = (data: unknown): number => Number(data) || 0;

const safeUrl = (data: unknown) => patchWebAppUrlIfNeed(safeString(data));

const safeLang: (data: unknown) => User["lang"] = (data: unknown) => {
  const str = safeString(data).toLowerCase();
  return str === "en" ? "en" : "es";
};

const safeNavItem = (data: any): PrimaryNavItem => ({
  title: safeString(data?.title),
  url: safeUrl(data?.url),
  idHTML: safeString(data?.idHTML),
  subNavItems: safeSubNavItems(data?.subNav),
});

const safeSubNavItems = (
  data: any,
): undefined | Readonly<[TerminalNavItem, ...TerminalNavItem[]]> => {
  return data && data.length > 0 ? data.map(safeTerminalNavItem) : undefined;
};

const safeTerminalNavItem = (data: any): TerminalNavItem => ({
  title: safeString(data?.title),
  url: safeUrl(data?.url),
  idHTML: safeString(data?.idHTML),
});

const safePlan = (data: any): Plan => {
  const planTypes: { [idUserType: number]: PlanType } = {
    1: "free",
    2: "monthly-deliveries",
    3: "prepaid",
    4: "contacts",
    5: "agencies",
    6: "agencies",
    7: "free",
    8: "agencies",
  };

  return {
    planType: planTypes[data.planType],
    description: safeString(data?.description),
    itemDescription: safeString(data?.itemDescription),
    planName: safeString(data?.planName),
    isSubscribers: safeBoolean(data?.isSubscribers),
    maxSubscribers: safeNumber(data?.maxSubscribers),
    remainingCredits: safeNumber(data?.remainingCredits),
    buttonText: safeString(data?.buttonText),
    buttonUrl: safeString(data?.buttonUrl),
    pendingFreeUpgrade: safeBoolean(data?.pendingFreeUpgrade),
    isMonthlyByEmail: safeBoolean(data?.isMonthlyByEmail),
    isFreeAccount: safeBoolean([1, 7, "1", "7"].includes(data.planType)),
    userTypePlan: safeString(data?.userTypePlan),
  };
};

const safeSms = (data: any) =>
  safeBoolean(data?.smsEnabled)
    ? {
        smsEnabled: true as const,
        remainingCredits: safeNumber(data?.remainingCredits),
        description: safeString(data?.description),
        buttonText: safeString(data?.buttonText),
        buttonUrl: safeString(data?.buttonUrl),
      }
    : { smsEnabled: false as const };

const safeChat = (data: any) =>
  safeBoolean(data?.active)
    ? {
        active: true as const,
        planName: safeString(data?.planName),
        chatDescription: safeString(data?.chatDescription),
        conversationsQtyBalance: data?.conversationsQtyBalance,
        whatsAppCreditBalance: data?.whatsAppCreditBalance,
        wppDescription: safeString(data?.wppDescription),
      }
    : { active: false as const };

const safeLandings = (data: any) => ({
  planName: safeString(data?.landings?.planName),
  buttonText: safeString(data?.landings?.buttonText),
  buttonUrl: safeString(data?.landings?.buttonUrl),
  landingPacks: data?.landings.landingPacks || [],
  landingsEditorEnabled: data.landings.landingsEditorEnabled,
});

const safeUser = (data: any): User => ({
  idUser: mapIdUserToken(data?.jwtToken),
  email: safeString(data?.email),
  fullname: safeString(data?.fullname),
  plan: safePlan(data?.plan),
  lang: safeLang(data?.lang),
  avatar: {
    text: safeString(data?.avatar?.text),
    color: safeString(data?.avatar?.color),
  },
  navItems: (data?.nav as any[])?.map(safeTerminalNavItem) ?? [],
  userType: data?.userType,
  idIndustry: safeNumber(data?.idIndustry),
  industryCode: safeString(data?.industryCode),
  country: safeString(data?.country),
  billingCountry: safeString(data?.billingCountry),
  integrations: data?.integrations || [],
  sms: safeSms(data?.sms),
  isLastPlanRequested: safeBoolean(data?.isLastPlanRequested),
  chat: safeChat(data?.chat),
  landings: safeLandings(data),
  ...(data?.clientManager
    ? {
        hasClientManager: true,
        clientManager: {
          profileName: safeString(data.clientManager.profileName),
          companyName: safeString(data.clientManager.companyName),
          logo: data.clientManager.logo
            ? safeString(data.clientManager.logo)
            : undefined,
        },
      }
    : { hasClientManager: false }),
  userAccount: data.userAccount,
});

const safeAlert = (data: any): Alert => ({
  type: safeString(data?.type),
  message: safeString(data?.message),
  button: data?.button?.url
    ? {
        text: safeString(data.button.text),
        url: safeUrl(data.button.url),
      }
    : data?.button?.action
      ? {
          text: safeString(data.button.text),
          action: safeString(data.button.action),
        }
      : undefined,
  nextAlert: data.nextAlert ? safeAlert(data.nextAlert) : undefined,
});

export const safeUserData = (data: any): UserData => {
  console.log("data safeUserData", data);

  return {
    navItems: data.nav?.map(safeNavItem) ?? [],
    user: safeUser(
      data?.user
        ? {
            ...data.user,
            landings: {
              ...data.user.landings,
              landingsEditorEnabled: !!(
                data.features && data.features.landingsEditorEnabled
              ),
            },
            jwtToken: data.jwtToken,
            userAccount: data.userAccount,
          }
        : {},
    ),
    alert: data?.alert ? safeAlert(data?.alert) : undefined,
  };
};

export const getProccessUrlWithAccountType = (
  url: string,
  isFreeAccount: boolean,
) => {
  let newUrl = url;
  const useAccountType = url.includes("/plan-selection");
  const accountType = "accountType";
  if (!isFreeAccount && useAccountType) {
    const urlParts = url.split("?");
    const hasQueryParams = urlParts.length > 1;
    if (hasQueryParams) {
      const accountTypeIsAlreadyExistsInUrl = url.includes(`${accountType}=`);
      if (!accountTypeIsAlreadyExistsInUrl) {
        newUrl = `${url}&${accountType}=PAID`;
      }
    } else {
      newUrl = `${url}?${accountType}=PAID`;
    }
  }

  return newUrl;
};
