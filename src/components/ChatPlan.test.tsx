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
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    screen.getByText("Premium Plan Conversations");
    screen.getByText("Available conversations");
    screen.getByText("Available for WhatsApp");
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
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    const description = screen.queryByTestId("chat-plan-description-test-id");
    expect(description).not.toBeInTheDocument();
  });
});
