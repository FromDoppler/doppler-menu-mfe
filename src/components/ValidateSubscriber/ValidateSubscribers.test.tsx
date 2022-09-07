import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { IntlProviderDouble } from "../i18n/DopplerIntlProvider.double-with-ids-as-values";
import { ValidateSubscribersForm } from "./ValidateSubscribersForm";
import * as dopplerLegacyClient from "../../client/dopplerLegacyClient";
import userEvent from "@testing-library/user-event";
import { AnswerType, MaxSubscribersData } from "./types";
import { AppConfigurationProvider } from "../../AppConfiguration";
import { QueryClient, QueryClientProvider } from "react-query";

export const maxSubscribersData: MaxSubscribersData = {
  questionsList: [
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Nombre",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Apellido",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Email",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Teléfono",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [
          "Sitio Web",
          "Evento",
          "Landing Page",
          "CRM",
          "Agenda personal de contactos",
          "Formulario en tienda física/offline",
          "Otros",
        ],
        value: "",
        optionsSelected: [],
      },
      question: "¿Cuál es la procedencia de tus Suscriptores?",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: ["Opt-in", "Doble Opt-in", "Manual"],
        value: "",
        optionsSelected: [],
      },
      question: "¿Cómo fue el método de recolección de datos?",
    },
    {
      answer: {
        answerType: `${AnswerType.TEXTFIELD}`,
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "URL de registración:",
    },
  ],
  isSentSuccessEmail: false,
  urlReferrer: "",
  urlHelp: "https://help.fromdoppler.com/",
};

describe("ValidateSubscribersComponent", () => {
  it("should render Loading when there is no data", async () => {
    const queryClient = new QueryClient();
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <IntlProviderDouble>
          <ValidateSubscribersForm handleClose={jest.fn} />
        </IntlProviderDouble>
      </QueryClientProvider>
    );

    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
  });

  it("should render UnexpectedError when has an error", async () => {
    // Arrange
    jest
      .spyOn(dopplerLegacyClient, "useDopplerLegacyClient")
      .mockImplementationOnce(() => ({
        getMaxSubscribersData: jest.fn(async () => {
          throw new Error("Empty Doppler response");
        }),
        sendAcceptButtonAction: jest.fn(),
        sendMaxSubscribersData: jest.fn(),
      }));

    const queryClient = new QueryClient();
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <IntlProviderDouble>
          <ValidateSubscribersForm handleClose={jest.fn} />
        </IntlProviderDouble>
      </QueryClientProvider>
    );

    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
    screen.getByText("common.unexpected_error");
  });

  it("should render ValidateMaxSubscribersForm when there is form data", async () => {
    jest
      .spyOn(dopplerLegacyClient, "useDopplerLegacyClient")
      .mockImplementation(() => ({
        getMaxSubscribersData: jest.fn(async () => maxSubscribersData),
        sendAcceptButtonAction: jest.fn(),
        sendMaxSubscribersData: jest.fn(async () => true),
      }));

    const queryClient = new QueryClient();
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <AppConfigurationProvider configuration={{ useDummies: true }}>
          <IntlProviderDouble>
            <ValidateSubscribersForm handleClose={jest.fn} />
          </IntlProviderDouble>
        </AppConfigurationProvider>
      </QueryClientProvider>
    );
    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
    screen.getByText("validate_max_subscribers_form.subtitle");
  });

  it("should render ValidateMaxSubscribersConfirm when submit is successful", async () => {
    // Arrange
    const formData = {
      questionsList: [
        {
          answer: {
            answerType: "TEXTFIELD",
            answerOptions: [],
            value: "",
            optionsSelected: [],
          },
          question: "Nombre",
        },
      ],
      isSentSuccessEmail: false,
      urlReferrer: "",
      urlHelp: "https://help.fromdoppler.com/",
    };

    jest
      .spyOn(dopplerLegacyClient, "useDopplerLegacyClient")
      .mockImplementation(() => ({
        getMaxSubscribersData: jest.fn(async () => formData),
        sendAcceptButtonAction: jest.fn(),
        sendMaxSubscribersData: jest.fn(async () => true),
      }));

    const queryClient = new QueryClient();
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <IntlProviderDouble>
          <ValidateSubscribersForm handleClose={jest.fn} />
        </IntlProviderDouble>
      </QueryClientProvider>
    );

    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);

    const input = await screen.getByRole("textbox", { name: "Nombre" });
    await userEvent.type(input, "value");
    const submitButton = await screen.getByRole("button", {
      name: "common.save",
    });
    await userEvent.click(submitButton);

    // Assert
    const validateMaxSubscribersConfirm = await screen.getByTestId(
      "validate-subscribers-confirm"
    );
    expect(validateMaxSubscribersConfirm).toBeInTheDocument();
  });
});
