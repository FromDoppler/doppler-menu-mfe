import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { IntlProviderDouble } from "../i18n/DopplerIntlProvider.double-with-ids-as-values";
import { ValidateSubscribersForm } from "./ValidateSubscribersForm";
import userEvent from "@testing-library/user-event";
import { AnswerType, MaxSubscribersData } from "./types";
import { AppConfigurationProvider } from "../../AppConfiguration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DopplerLegacyClientImpl } from "../../client/DopplerLegacyClientImpl";
jest.mock("../../client/DopplerLegacyClientImpl");

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
  var dopplerLegacyClientPrototypeMock =
    DopplerLegacyClientImpl.prototype as jest.Mocked<DopplerLegacyClientImpl>;

  beforeEach(() => {
    (DopplerLegacyClientImpl as any).mockClear();
  });

  it("should render Loading when while there is no data", async () => {
    // Arrange
    dopplerLegacyClientPrototypeMock.getMaxSubscribersData.mockRejectedValue(
      new Error("Empty Doppler response"),
    );
    const queryClient = new QueryClient();

    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <IntlProviderDouble>
          <ValidateSubscribersForm onClose={jest.fn} />
        </IntlProviderDouble>
      </QueryClientProvider>,
    );

    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
  });

  it("should render UnexpectedError when has an error", async () => {
    // Arrange
    dopplerLegacyClientPrototypeMock.getMaxSubscribersData.mockRejectedValue(
      new Error("Empty Doppler response"),
    );
    const queryClient = new QueryClient();

    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <AppConfigurationProvider configuration={{ useDummies: false }}>
          <IntlProviderDouble>
            <ValidateSubscribersForm onClose={jest.fn} />
          </IntlProviderDouble>
        </AppConfigurationProvider>
      </QueryClientProvider>,
    );

    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
    screen.getByText("common.unexpected_error");
  });

  it("should render ValidateMaxSubscribersForm when there is form data", async () => {
    // Arrange
    dopplerLegacyClientPrototypeMock.getMaxSubscribersData.mockResolvedValue(
      maxSubscribersData,
    );
    const queryClient = new QueryClient();

    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <AppConfigurationProvider configuration={{ useDummies: false }}>
          <IntlProviderDouble>
            <ValidateSubscribersForm onClose={jest.fn} />
          </IntlProviderDouble>
        </AppConfigurationProvider>
      </QueryClientProvider>,
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
    dopplerLegacyClientPrototypeMock.getMaxSubscribersData.mockResolvedValue(
      formData,
    );
    const queryClient = new QueryClient();

    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <IntlProviderDouble>
          <ValidateSubscribersForm onClose={jest.fn} />
        </IntlProviderDouble>
      </QueryClientProvider>,
    );

    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);

    const input = screen.getByRole("textbox", { name: "Nombre" });
    await userEvent.type(input, "value");
    const submitButton = screen.getByRole("button", {
      name: "common.save",
    });
    await userEvent.click(submitButton);

    // Assert
    waitFor(() => {
      const validateMaxSubscribersConfirm = screen.getByTestId(
        "validate-subscribers-confirm",
      );
      expect(validateMaxSubscribersConfirm).toBeInTheDocument();
    });
  });
});
