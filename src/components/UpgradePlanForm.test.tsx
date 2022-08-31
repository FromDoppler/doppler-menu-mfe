import {
  screen,
  render,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import { UpgradePlanForm } from "./UpgradePlanForm";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { User } from "../model";

const toggleModal = jest.fn();

const userData: User = {
  plan: {
    planType: "1",
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: true,
    maxSubscribers: 500,
    remainingCredits: 500,
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    pendingFreeUpgrade: false,
    isMonthlyByEmail: false,
  },
  email: "",
  fullname: "",
  avatar: {
    text: "",
    color: "",
  },
  navItems: [],
  sms: {
    smsEnabled: false,
  },
  isLastPlanRequested: false,
  hasClientManager: false,
};

describe("<UpgradePlanForm />", () => {
  it("should render loading component", () => {
    render(
      <MenuIntlProvider>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </MenuIntlProvider>
    );

    const loadingBox = screen.getByTestId("loading-box");
    expect(loadingBox).toHaveClass("loading-box");
  });

  it("should render Form component", async () => {
    const modalTitle = "Solicita una actualización de tu Plan";
    const modalTitleClass = "modal-title";
    const formRole = "form";
    const formClass = "form-request";
    const selectRole = "combobox";
    const selectLabel = "Selecciona el Plan";

    render(
      <MenuIntlProvider>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </MenuIntlProvider>
    );

    const form = await screen.findByRole(formRole);
    const select = await screen.findByRole(selectRole);

    const title = await screen.findByText(modalTitle);
    expect(title).toHaveClass(modalTitleClass);
    expect(form).toHaveClass(formClass);
    expect(select).toHaveAccessibleName(selectLabel);
  });

  it("should submit form correctly", async () => {
    render(
      <MenuIntlProvider>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </MenuIntlProvider>
    );

    const select = await screen.findByRole("combobox");
    const submitButton = await screen.findByRole("button", {
      name: "Actualizar Plan",
    });
    await user.selectOptions(
      select,
      within(select).getByRole("option", { name: "501-1500" })
    );
    await user.click(submitButton);
    await waitForElementToBeRemoved(submitButton);
    expect(submitButton).toHaveClass("button--loading");
  });

  it("should close when click on cancel button", async () => {
    const cancelText = "Cancelar";
    const toggleModal = jest.fn();

    render(
      <MenuIntlProvider>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </MenuIntlProvider>
    );

    const cancelButton = await screen.findByText(cancelText);
    await user.click(cancelButton);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
