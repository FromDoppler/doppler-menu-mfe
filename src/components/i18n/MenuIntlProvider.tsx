import { IntlProvider } from "react-intl";
import { messages_es } from "./es";
import { flattenMessages, defaultLanguage } from "./utils";

const messages = {
  es: messages_es,
};

interface MenuIntlProviderProps {
  children: React.ReactNode;
}

export const MenuIntlProvider = ({ children }: MenuIntlProviderProps) => {
  return (
    <IntlProvider
      locale={defaultLanguage}
      messages={flattenMessages(messages[defaultLanguage])}
    >
      {children}
    </IntlProvider>
  );
};
