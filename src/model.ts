export interface NavItem {
  title: string;
  url: string;
  isEnabled: boolean;
  isSelected: boolean;
  idHTML: string;
  subNav?: NavItem[];
}

export interface Plan {
  planType: string;
  idUserTypePlan: number;
  description: string;
  itemDescription: string;
  planName: string;
  isSubscribers: boolean;
  maxSubscribers: number;
  remainingCredits: number;
  buttonText: string;
  buttonUrl: string;
  planDiscount: number;
  monthPlan: number;
  subscribersCount: number;
  trialActive: boolean;
  trialExpired: false;
  trialExpirationDate: string;
  trialExpirationDays: number;
  planFee: number;
  pendingFreeUpgrade: boolean;
  isMonthlyByEmail?: string;
}

export interface User {
  email: string;
  fullname: string;
  lastName: string;
  plan: Plan;
  lang: "en" | "es";
  avatar: { text: string; color: string };
  nav: NavItem[];
  sms: {
    smsEnabled: boolean;
    remainingCredits: number;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  hasCampaignSent: boolean;
  isLastPlanRequested: boolean;
  hasClientManager?: boolean;
  clientManager?: { profileName: string };
}

export interface Alert {
  type: "warning";
  message: string;
  button: {
    text: string;
    url?: string;
    action?: string;
  };
}

export interface UserData {
  nav: NavItem[];
  user: User;
  alert?: Alert;
  homeUrl: string;
  urlBase: string;
  features: {
    siteTrackingEnabled: boolean;
    siteTrackingActive: boolean;
    emailParameterEnabled: boolean;
    emailParameterActive: boolean;
  };
  notifications: string[];
  emptyNotificationText: string;
}
