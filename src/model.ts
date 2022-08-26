export interface NavItem {
  title: string;
  url: string;
  idHTML: string;
  subNav?: NavItem[];
}

export interface Plan {
  planType: string;
  description: string;
  itemDescription: string;
  planName: string;
  isSubscribers: boolean;
  maxSubscribers: number;
  remainingCredits: number;
  buttonText: string;
  buttonUrl: string;
  pendingFreeUpgrade: boolean;
  isMonthlyByEmail: boolean;
}

export type User = {
  email: string;
  fullname: string;
  plan: Plan;
  avatar: { text: string; color: string };
  nav: NavItem[];
  sms: {
    smsEnabled: boolean;
    remainingCredits: number;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  isLastPlanRequested: boolean;
} & (
  | {
      hasClientManager: true;
      clientManager: { profileName: string };
    }
  | {
      hasClientManager: false;
      clientManager?: undefined;
    }
);

export interface Alert {
  type: string;
  message: string;
  button:
    | {
        text: string;
        url: string;
        action?: undefined;
      }
    | {
        text: string;
        action: string;
        url?: undefined;
      }
    | undefined;
}

export interface UserData {
  nav: NavItem[];
  user: User;
  alert?: Alert;
  notifications: string[];
  emptyNotificationText: string;
}
