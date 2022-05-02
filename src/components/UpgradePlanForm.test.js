import {
  screen,
  render,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import UpgradePlanForm from "./UpgradePlanForm";
import { IntlProvider } from "react-intl";
import messages_es from "../i18n/es";

const toggleModal = jest.fn();

const userData = {
  plan: {
    planType: "1",
    idUserTypePlan: 0,
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: "true",
    maxSubscribers: "500",
    remainingCredits: "500",
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    planDiscount: 0,
    monthPlan: 0,
    subscribersCount: 0,
    trialActive: true,
    trialExpired: false,
    trialExpirationDate: "2022-07-08T00:00:00",
    trialExpirationDays: 87,
    planFee: 0.0,
  },
};

describe("<UpgradePlanForm />", () => {
  it("renders loading component", () => {
    render(
      <IntlProvider locale="es">
        <UpgradePlanForm />
      </IntlProvider>
    );

    const loadingBox = screen.getByTestId("loading-box");
    expect(loadingBox).toHaveClass("loading-box");
  });

  it("renders Form component", async () => {
    const modalTitle = "Solicita una actualización de tu Plan";
    const modalTitleClass = "modal-title";
    const formRole = "form";
    const formClass = "form-request";
    const selectRole = "combobox";
    const selectLabel = "Selecciona el Plan";

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </IntlProvider>
    );

    const form = await screen.findByRole(formRole);
    const select = await screen.findByRole(selectRole, {
      id: /selectedPlanId/i,
    });

    const title = await screen.findByText(modalTitle);
    expect(title).toHaveClass(modalTitleClass);
    expect(form).toHaveClass(formClass);
    expect(select).toHaveAccessibleName(selectLabel);
  });

  it("submits form correctly", async () => {
    render(
      <IntlProvider locale="es" messages={messages_es}>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </IntlProvider>
    );

    const form = await screen.findByRole("form");
    const select = await screen.findByRole("combobox", {
      id: /selectedPlanId/i,
    });
    const submitButton = await screen.findByRole("button", {
      name: "Actualizar Plan",
    });

    await user.selectOptions(
      select,
      within(select).getByRole("option", { name: "501-1500" })
    );
    await user.click(submitButton);
    await waitForElementToBeRemoved(form);
    expect(submitButton).toHaveClass("button--loading");
  });

  it("closes when click on cancel button", async () => {
    const cancelText = "Cancelar";
    const toggleModal = jest.fn();

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <UpgradePlanForm
          isSubscriber={userData.plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={userData}
        />
      </IntlProvider>
    );

    const cancelButton = await screen.findByText(cancelText);
    await user.click(cancelButton);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
