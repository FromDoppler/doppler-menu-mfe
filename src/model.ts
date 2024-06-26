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

export type UserType =
  | "Free"
  | "Monthly"
  | "Individual"
  | "Subscribers"
  | "CM-Free"
  | "CM-Monthly"
  | "CM-Subscribers";

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
  isFreeAccount: boolean;
  userTypePlan: string;
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
    userType: UserType;
    idIndustry: Number;
    industryCode: string;
    country: string;
    billingCountry: string;
    integrations: Array<string>;
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
    chat: Readonly<
      | {
          active: true;
          planName: string;
          chatDescription: string;
          wppDescription: string;
          conversationsQtyBalance: number | undefined;
          whatsAppCreditBalance: number | undefined;
        }
      | {
          active: false;
          planName?: undefined;
          chatDescription?: undefined;
          wppDescription?: undefined;
          conversationsQtyBalance?: undefined;
          whatsAppCreditBalance?: undefined;
        }
    >;
    landings: Readonly<
      | {
          planName: string;
          buttonText: string;
          buttonUrl: string;
          landingPacks: any;
          landingsEditorEnabled: Boolean;
        }
      | {
          planName: undefined;
          buttonText: undefined;
          buttonUrl: undefined;
          landingPacks: [];
          landingsEditorEnabled: true;
        }
    >;
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
