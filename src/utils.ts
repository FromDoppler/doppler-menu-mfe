import { Alert, NavItem, Plan, User, UserData } from "./model";

const sanitizeUrlToCompare = (url: string): string =>
  url
    .replace(/^https?:\/\//, "//")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

const activeUrlOverridings = [
  {
    currentUrlRegex: /\/SubscriberHistory\.aspx(?:\?|$)/,
    itemUrlRegex: /\/Campaigns\/Reports\/?\?redirect=subHistory(?:&|$)/,
  },
  {
    currentUrlRegex: /\/SentCampaigns.aspx(?:\?|$)/,
    itemUrlRegex: /\/Campaigns\/Reports\/?(?:\?(?!redirect=subHistory)|$)/,
  },
  {
    currentUrlRegex:
      /\/(?:Dashboard|SocialNetworks|UserMailAgents|LinkTagging|ViralActivity|OpensAndClicks)\.aspx(?:\?|$)/,
    itemUrlRegex: /\/Campaigns\/Reports\/?(?:\?(?!redirect=subHistory)|$)/,
  },
  {
    currentUrlRegex:
      /\/(?:GeolocationByCountry|LinkTracking|DeliveryRate|Unsubscribe|ROI)\.aspx(?:\?|$)/,
    itemUrlRegex: /\/Campaigns\/Reports\/?(?:\?(?!redirect=subHistory)|$)/,
  },
];

export const IsActiveUrl = (currentUrl: string, itemUrl: string): boolean =>
  !!activeUrlOverridings.find(
    (x) => x.currentUrlRegex.test(currentUrl) && x.itemUrlRegex.test(itemUrl)
  ) || sanitizeUrlToCompare(currentUrl) === sanitizeUrlToCompare(itemUrl);

const safeBoolean = (data: unknown): boolean =>
  data === true
    ? true
    : data === false
    ? false
    : typeof data === "string" && data.toLowerCase() === "true"
    ? true
    : false;

const safeString = (data: unknown): string =>
  typeof data === "string" ? data : !data ? "" : `${data}`;

const safeNumber = (data: unknown): number => Number(data) || 0;

const safeNavItem = (data: any): NavItem => ({
  title: safeString(data?.title),
  url: safeString(data?.url),
  idHTML: safeString(data?.idHTML),
  subNav: data?.subNav?.map(safeNavItem),
});

const safePlan = (data: any): Plan => ({
  planType: safeString(data?.planType),
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
});

const safeSms = (
  data: any
): {
  smsEnabled: boolean;
  remainingCredits: number;
  description: string;
  buttonText: string;
  buttonUrl: string;
} => ({
  smsEnabled: safeBoolean(data?.smsEnabled),
  remainingCredits: safeNumber(data?.remainingCredits),
  description: safeString(data?.description),
  buttonText: safeString(data?.buttonText),
  buttonUrl: safeString(data?.buttonUrl),
});

const safeUser = (data: any): User => ({
  email: safeString(data?.email),
  fullname: safeString(data?.fullname),
  plan: safePlan(data?.plan),
  avatar: {
    text: safeString(data?.avatar?.text),
    color: safeString(data?.avatar?.color),
  },
  nav: data?.nav?.map(safeNavItem) ?? [],
  sms: safeSms(data?.sms),
  isLastPlanRequested: safeBoolean(data?.isLastPlanRequested),
  hasClientManager: safeBoolean(data?.hasClientManager),
  clientManager: data?.clientManager
    ? {
        profileName: safeString(data.clientManager.profileName),
      }
    : undefined,
});

const safeAlert = (data: any): Alert => ({
  type: safeString(data?.type),
  message: safeString(data?.message),
  button: {
    text: safeString(data?.button?.text),
    url: data?.button?.url ? safeString(data?.button?.url) : undefined,
    action: data?.button?.action ? safeString(data?.button?.action) : undefined,
  },
});

export const safeUserData = (data: any): UserData => ({
  nav: data.nav?.map(safeNavItem) ?? [],
  user: safeUser(data?.user ?? {}),
  alert: data?.alert ? safeAlert(data?.alert) : undefined,
  notifications: data?.notifications?.map(safeString) ?? [],
  emptyNotificationText: safeString(data?.emptyNotificationText),
});
