import React from "react";
import { IntlProvider } from "react-intl";
import { messages_es } from "./es";
import { flattenMessages } from "./utils";

const messages = Object.keys(flattenMessages(messages_es)).reduce(
  (accumulator, currentValue) => ({
    ...accumulator,
    [currentValue]: currentValue,
  }),
  {},
);

export const IntlProviderDouble = ({ children }: any) => (
  <IntlProvider locale="es" messages={messages}>
    {children}
  </IntlProvider>
);
