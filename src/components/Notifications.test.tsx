import { render } from "@testing-library/react";
import { userData as defaultUser } from "../mocks/userMock";
import { Notifications } from "./Notifications";
import { IntlProviderDouble } from "./i18n/DopplerIntlProvider.double-with-ids-as-values";

describe("<Notifications />", () => {
  it("should display notifications", () => {
    render(
      <IntlProviderDouble>
        <Notifications user={defaultUser} />
      </IntlProviderDouble>
    );
  });
});
