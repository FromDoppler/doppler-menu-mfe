import { DopplerLegacyClient } from "./dopplerLegacyClient";
import {
  AnswerType,
  MaxSubscribersData,
} from "../components/ValidateSubscriber/types";

export class DopplerLegacyClientDummy implements DopplerLegacyClient {
  public async getMaxSubscribersData(): Promise<MaxSubscribersData> {
    await setTimeout(() => {}, 1500);
    return maxSubscribersData;
  }

  public async sendAcceptButtonAction(): Promise<boolean> {
    await setTimeout(() => {}, 1500);
    return true;
  }

  public async sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData
  ): Promise<boolean> {
    await setTimeout(() => {}, 1500);
    return true;
  }
}

const maxSubscribersData: MaxSubscribersData = {
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
