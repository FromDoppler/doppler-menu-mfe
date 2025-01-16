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

export type userAccountType = Readonly<{
  email: string;
  firstName: string;
  lastName: string;
  idLanguage: number;
  userProfileType: string;
  language: string;
}>;

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
  trialExpirationDate: String;
}>;

export type RelatedUsersData = {
  IdUser: number;
  IdUserAccount: number;
  UTCLastAccessDate: Date;
  AccountName: string;
  FirstName: string;
  LastName: string;
  Type: string;
  AvatarText: string | undefined;
  AvatarColor: string | undefined;
};

export type User = Readonly<
  {
    idUser: Number;
    email: string;
    fullname: string;
    firstname: string;
    companyName: string;
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
    utcRegisterDate: string;
    domainStatus: DomainStatus;
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
          planData: {
            idChatPlan: number;
            description: string;
            quantity: number;
          };
          chatDescription: string;
          wppDescription: string;
          conversationsQtyBalance: number | undefined;
          whatsAppCreditBalance: number | undefined;
          buttonUrl: string;
          buttonText: string;
        }
      | {
          active: false;
          planName?: undefined;
          chatDescription?: undefined;
          wppDescription?: undefined;
          conversationsQtyBalance?: undefined;
          whatsAppCreditBalance?: undefined;
          buttonUrl: undefined;
          buttonText: undefined;
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
    onsite: Readonly<
      | {
          active: true;
          planName: string;
          description: string;
          qty: number | undefined;
          buttonUrl: string;
          buttonText: string;
        }
      | {
          active: false;
          planName?: undefined;
          description?: undefined;
          qty?: undefined;
          buttonUrl: undefined;
          buttonText: undefined;
        }
    >;
    userAccount: Readonly<userAccountType> | undefined;
    relatedUsers: RelatedUsersData[] | undefined;
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

export type DomainStatus = Readonly<{
  isSPFEnabled: boolean;
  isDKIMEnabled: boolean;
  isDMARCEnabled: boolean;
}>;
