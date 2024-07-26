import { render, screen } from "@testing-library/react";
import { RelatedUsersData, User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { UserSelection } from "./UserSelection";
import { DopplerLegacyClientImpl } from "../client/DopplerLegacyClientImpl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
jest.mock("../client/DopplerLegacyClientImpl");

const relatedUsers: RelatedUsersData[] = [
  {
    IdUser: 123,
    IdUserAccount: 123,
    UTCLastAccessDate: new Date(),
    AccountName: "test@makingsense.com",
    FirstName: "TEST",
    LastName: "LastName",
    Type: "COLLABORATOR",
  },
];

describe("<UserSelection />", () => {
  var dopplerLegacyClientPrototypeMock =
    DopplerLegacyClientImpl.prototype as jest.Mocked<DopplerLegacyClientImpl>;

  beforeEach(() => {
    (DopplerLegacyClientImpl as any).mockClear();
  });

  it("renders user selection", () => {
    // Arrange
    dopplerLegacyClientPrototypeMock.changeUserSession.mockRejectedValue(true);
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MenuIntlProvider>
          <UserSelection
            data={relatedUsers}
            currentUser="test@makingsense.com"
          />
        </MenuIntlProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Todas las cuentas")).toBeInTheDocument();
    expect(screen.getByText("Busca cuentas:")).toBeInTheDocument();
  });
});
