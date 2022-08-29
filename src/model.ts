export type NavItem = Readonly<{
  title: string;
  url: string;
  idHTML: string;
  subNavItems?: ReadonlyArray<NavItem>;
}>;

export type Plan = Readonly<{
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
}>;

export type User = Readonly<
  {
    email: string;
    fullname: string;
    plan: Plan;
    avatar: Readonly<{ text: string; color: string }>;
    navItems: ReadonlyArray<NavItem>;
    sms: Readonly<
      | {
          smsEnabled: true;
          remainingCredits: number;
          description: string;
          buttonText: string;
          buttonUrl: string;
        }
      | {
          smsEnabled: false;
          remainingCredits?: undefined;
          description?: undefined;
          buttonText?: undefined;
          buttonUrl?: undefined;
        }
    >;
    isLastPlanRequested: boolean;
  } & (
    | {
        hasClientManager: true;
        clientManager: Readonly<{ profileName: string }>;
      }
    | {
        hasClientManager: false;
        clientManager?: undefined;
      }
  )
>;

export type Alert = Readonly<{
  type: string;
  message: string;
  button:
    | Readonly<
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
      >
    | undefined;
}>;

export type UserData = Readonly<{
  navItems: ReadonlyArray<NavItem>;
  user: User;
  alert?: Alert;
  notifications: ReadonlyArray<string>;
  emptyNotificationText: string;
}>;
