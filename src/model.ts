export type TerminalNavItem = Readonly<{
  title: string;
  url: string;
  idHTML: string;
}>;

export type PrimaryNavItem = Readonly<{
  title: string;
  url: string;
  idHTML: string;
  subNavItems: undefined | Readonly<[TerminalNavItem, ...TerminalNavItem[]]>;
}>;

export type PlanType =
  | "monthly-deliveries"
  | "prepaid"
  | "contacts"
  | "agencies"
  | "free";

export type Plan = Readonly<{
  planType?: PlanType;
  description: string;
  itemDescription: string;
  planName: string;
  isSubscribers: boolean;
  maxSubscribers: number;
  remainingCredits: number;
  buttonText: string;
  buttonUrl: string;
  pendingFreeUpgrade?: boolean;
  isMonthlyByEmail: boolean;
}>;

export type User = Readonly<
  {
    idUser: Number;
    email: string;
    fullname: string;
    plan: Plan;
    lang: "es" | "en";
    avatar: Readonly<{ text: string; color: string }>;
    navItems: ReadonlyArray<TerminalNavItem>;
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
        clientManager: ClientManager;
      }
    | {
        hasClientManager: false;
        clientManager?: undefined;
      }
  )
>;

export type ClientManager = Readonly<{
  profileName: string;
  logo?: string;
  companyName: string;
}>;

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
  nextAlert?: Alert;
}>;

export type UserData = Readonly<{
  navItems: ReadonlyArray<PrimaryNavItem>;
  user: User;
  alert?: Alert;
}>;
