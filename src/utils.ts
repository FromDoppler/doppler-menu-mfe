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

const sanitizeUrlToCompare = (url: string): string =>
  url
    .replace(/^https?:\/\//, "//")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

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

const safeNavItem = (data: any): PrimaryNavItem => ({
  title: safeString(data?.title),
  url: safeUrl(data?.url),
  idHTML: safeString(data?.idHTML),
  subNavItems: safeSubNavItems(data?.subNav),
});

const safeSubNavItems = (
  data: any
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

const safeUser = (data: any): User => ({
  email: safeString(data?.email),
  fullname: safeString(data?.fullname),
  plan: safePlan(data?.plan),
  avatar: {
    text: safeString(data?.avatar?.text),
    color: safeString(data?.avatar?.color),
  },
  navItems: (data?.nav as any[])?.map(safeTerminalNavItem) ?? [],
  sms: safeSms(data?.sms),
  isLastPlanRequested: safeBoolean(data?.isLastPlanRequested),
  ...(data?.clientManager
    ? {
        hasClientManager: true,
        clientManager: {
          profileName: safeString(data.clientManager.profileName),
        },
      }
    : { hasClientManager: false }),
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

export const safeUserData = (data: any): UserData => ({
  navItems: data.nav?.map(safeNavItem) ?? [],
  user: safeUser(data?.user ?? {}),
  alert: data?.alert ? safeAlert(data?.alert) : undefined,
  notifications: data?.notifications?.map(safeString) ?? [],
  emptyNotificationText: safeString(data?.emptyNotificationText),
});
