import "@testing-library/jest-dom/extend-expect";
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { IntlProviderDouble } from "../i18n/DopplerIntlProvider.double-with-ids-as-values";
import { ValidateSubscribers } from "./ValidateSubscribers";
import * as dopplerLegacyClient from "../../client/dopplerLegacyClient";
import userEvent from "@testing-library/user-event";
import { AnswerType, MaxSubscribersData } from "./types";
import { AppConfigurationProvider } from "../../AppConfiguration";

export const maxSubscribersData: MaxSubscribersData = {
  questionsList: [
    {
      answer: {
        answerType: AnswerType[1],
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Nombre",
    },
    {
      answer: {
        answerType: AnswerType[1],
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Apellido",
    },
    {
      answer: {
        answerType: AnswerType[1],
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Email",
    },
    {
      answer: {
        answerType: AnswerType[1],
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "Teléfono",
    },
    {
      answer: {
        answerType: AnswerType[3],
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
        answerType: AnswerType[2],
        answerOptions: ["Opt-in", "Doble Opt-in", "Manual"],
        value: "",
        optionsSelected: [],
      },
      question: "¿Cómo fue el método de recolección de datos?",
    },
    {
      answer: {
        answerType: AnswerType[6],
        answerOptions: [],
        value: "",
        optionsSelected: [],
      },
      question: "URL de registración:",
    },
  ],
  isSentSuccessEmail: false,
  urlReferrer: "",
  urlHelp:
    "http://help.fromdoppler.com/por-que-debo-completar-un-formulario-al-cargar-mis-listas/",
};

describe("ValidateSubscribersComponent", () => {
  it("should render Loading when there is no data", async () => {
    // Act
    render(
      <IntlProviderDouble>
        <ValidateSubscribers handleClose={jest.fn} setNextAlert={jest.fn} />
      </IntlProviderDouble>
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

    // Act
    render(
      <IntlProviderDouble>
        <ValidateSubscribers handleClose={jest.fn} setNextAlert={jest.fn} />
      </IntlProviderDouble>
    );

    // Assert
    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);
    screen.getByText("common.unexpected_error");
  });

  it("should render ValidateMaxSubscribersForm when there is form data", async () => {
    jest
      .spyOn(dopplerLegacyClient, "useDopplerLegacyClient")
      .mockImplementationOnce(() => ({
        getMaxSubscribersData: jest.fn(async () => maxSubscribersData),
        sendAcceptButtonAction: jest.fn(),
        sendMaxSubscribersData: jest.fn(async (data) => true),
      }));

    // Act
    render(
      <AppConfigurationProvider configuration={{ useDummies: true }}>
        <IntlProviderDouble>
          <ValidateSubscribers handleClose={jest.fn} setNextAlert={jest.fn} />
        </IntlProviderDouble>
      </AppConfigurationProvider>
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
      urlHelp:
        "http://help.fromdoppler.com/por-que-debo-completar-un-formulario-al-cargar-mis-listas/",
    };

    jest
      .spyOn(dopplerLegacyClient, "useDopplerLegacyClient")
      .mockImplementation(() => ({
        getMaxSubscribersData: jest.fn(async () => formData),
        sendAcceptButtonAction: jest.fn(),
        sendMaxSubscribersData: jest.fn(async (data) => true),
      }));

    // Act
    render(
      <IntlProviderDouble>
        <ValidateSubscribers handleClose={jest.fn} setNextAlert={jest.fn} />
      </IntlProviderDouble>
    );

    const loader = screen.getByTestId("loading-box");
    await waitForElementToBeRemoved(loader);

    await act(async () => {
      const input = await screen.getByRole("textbox", { name: "Nombre" });
      await userEvent.type(input, "value");
      const submitButton = await screen.getByRole("button", {
        name: "common.save",
      });
      await userEvent.click(submitButton);
    });

    // Assert
    await waitFor(async () => {
      //TODO: corregir, tarda mucho tiempo en renderizar, test fragil
      const validateMaxSubscribersConfirm = await screen.getByTestId(
        "validate-subscribers-confirm"
      );
      expect(validateMaxSubscribersConfirm).toBeInTheDocument();
    });
  });
});
