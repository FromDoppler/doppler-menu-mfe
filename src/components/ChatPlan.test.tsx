import { render, screen } from "@testing-library/react";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { IntlProviderDouble } from "./i18n/DopplerIntlProvider.double-with-ids-as-values";
import { ChatPlan } from "./ChatPlan";
import { userData } from "../mocks/userMock";
import { User } from "../model";

const defaultUser: User = {
  ...userData,
  chat: {
    active: true,
    planName: "Premium Plan Conversations",
    chatDescription: "Available conversations",
    wppDescription: "Available for WhatsApp",
    conversationsQtyBalance: 100,
    whatsAppCreditBalance: 25.2,
    buttonText: "BUY NOW",
    buttonUrl: "https://webappint.fromdoppler.net"
  },
};

describe(ChatPlan.name, () => {
  it("should render chat plan details", () => {
    // Act
    if (defaultUser.chat.active) {
      render(
        <MenuIntlProvider>
          <ChatPlan
            planName={defaultUser.chat.planName}
            chatDescription={defaultUser.chat.chatDescription}
            chatQty={defaultUser.chat.conversationsQtyBalance}
            wppDescription={defaultUser.chat.wppDescription}
            wppBalance={defaultUser.chat.whatsAppCreditBalance}
            buttonText={defaultUser.chat.buttonText}
            buttonUrl={defaultUser.chat.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    screen.getByText("Premium Plan Conversations");
    screen.getByText("Available conversations");
    screen.getByText("Available for WhatsApp");
    expect(screen.getByText(defaultUser.chat.buttonText ?? "").closest('a'))
    .toHaveAttribute('href', defaultUser.chat.buttonUrl ?? "");
  });

  it("should not render chat plan details when conversationsQtyBalance isn't defined", () => {
    //Arrenge
    const chatUser: User = {
      ...defaultUser,
      chat: {
        active: true,
        planName: "Premium Plan Conversations",
        chatDescription: "Available conversations",
        wppDescription: "Available for WhatsApp",
        conversationsQtyBalance: undefined,
        whatsAppCreditBalance: 25.2,
        buttonText: "BUY NOW",
        buttonUrl: "https://webappint.fromdoppler.net",
      },
    };

    // Act
    if (chatUser.chat.active) {
      render(
        <MenuIntlProvider>
          <ChatPlan
            planName={chatUser.chat.planName}
            chatDescription={chatUser.chat.chatDescription}
            chatQty={chatUser.chat.conversationsQtyBalance}
            wppDescription={chatUser.chat.wppDescription}
            wppBalance={chatUser.chat.whatsAppCreditBalance}
            buttonText={chatUser.chat.buttonText}
            buttonUrl={chatUser.chat.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    const description = screen.queryByTestId("chat-plan-description-test-id");
    expect(description).not.toBeInTheDocument();
  });

  it("should not render chat plan details when whatsAppCreditBalance isn't defined", () => {
    //Arrenge
    const chatUser: User = {
      ...defaultUser,
      chat: {
        active: true,
        planName: "Premium Plan Conversations",
        chatDescription: "Available conversations",
        wppDescription: "Available for WhatsApp",
        conversationsQtyBalance: 100,
        whatsAppCreditBalance: undefined,
        buttonText: "BUY NOW",
        buttonUrl: "https://webappint.fromdoppler.net",
      },
    };

    // Act
    if (chatUser.chat.active) {
      render(
        <MenuIntlProvider>
          <ChatPlan
            planName={chatUser.chat.planName}
            chatDescription={chatUser.chat.chatDescription}
            chatQty={chatUser.chat.conversationsQtyBalance}
            wppDescription={chatUser.chat.wppDescription}
            wppBalance={chatUser.chat.whatsAppCreditBalance}
            buttonText={chatUser.chat.buttonText}
            buttonUrl={chatUser.chat.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    const description = screen.queryByTestId("chat-plan-description-test-id");
    expect(description).not.toBeInTheDocument();
  });
});
