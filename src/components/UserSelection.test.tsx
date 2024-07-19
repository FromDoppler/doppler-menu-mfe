import { render, screen } from "@testing-library/react";
import { RelatedUsersData, User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { UserSelection } from "./UserSelection";

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
  it("renders user selection", () => {
    render(
      <MenuIntlProvider>
        <UserSelection data={relatedUsers} currentUser="test@makingsense.com" />
      </MenuIntlProvider>,
    );

    expect(screen.getByText("Todas las cuentas")).toBeInTheDocument();
    expect(screen.getByText("Busca cuentas:")).toBeInTheDocument();
  });
});
