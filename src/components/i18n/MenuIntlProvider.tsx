import { IntlProvider } from "react-intl";
import { AppSessionState } from "../../session/app-session-abstractions";
import { useAppSessionState } from "../../session/AppSessionStateContext";
import { messages_es } from "./es";
import messages_en from "./en";
import { flattenMessages } from "./utils";

export const defaultLanguage = "es";

const messages = {
  es: messages_es,
  en: messages_en,
};

type AllowedLanguage = keyof typeof messages;

const determineLanguage = (sessionState: AppSessionState) =>
  sessionState.status === "authenticated" &&
  sessionState.lang &&
  Object.keys(messages).includes(sessionState.lang)
    ? (sessionState.lang as AllowedLanguage)
    : defaultLanguage;

interface MenuIntlProviderProps {
  children: React.ReactNode;
}

export const MenuIntlProvider = ({ children }: MenuIntlProviderProps) => {
  const sessionState = useAppSessionState();
  const language = determineLanguage(sessionState);
  return (
    <IntlProvider
      locale={language}
      messages={flattenMessages(messages[language])}
    >
      {children}
    </IntlProvider>
  );
};
