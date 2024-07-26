import { AxiosInstance } from "axios";
import { DopplerLegacyClient } from "./dopplerLegacyClient";
import {
  AnswerType,
  MaxSubscribersData,
  QuestionModel,
} from "../components/ValidateSubscriber/types";

const mapMaxSubscribersData = (json: any): MaxSubscribersData => {
  return {
    isSentSuccessEmail: json.data?.IsSentSuccessEmail,
    questionsList: json.data?.QuestionsList.map((question: any) =>
      mapMaxSubscribersQuestion(question),
    ),
    urlHelp: json.data?.UrlHelp,
    urlReferrer: json.data?.UrlReferrer,
  };
};

const mapMaxSubscribersQuestion = (json: any): QuestionModel => {
  return {
    question: json.Question,
    answer: {
      answerType: AnswerType[json.Answer?.AnswerType],
      answerOptions: json.Answer?.AnswerOptions,
      optionsSelected: json.Answer?.OptionsSelected ?? [],
      value: json.Answer?.Value ?? "",
    },
  };
};

const mapMaxSubscribersQuestionData = (question: QuestionModel): any => {
  return {
    Question: question.question,
    Answer: {
      AnswerType: AnswerType[question.answer?.answerType as any],
      AnswerOptions: question.answer?.answerOptions,
      OptionsSelected:
        question.answer?.optionsSelected.length === 0 ? null : [],
      Value: question.answer?.value,
    },
  };
};

const mapMaxSubscribersDataToJson = (
  maxSubscribersData: MaxSubscribersData,
): any => {
  return {
    IsSentSuccessEmail: maxSubscribersData.isSentSuccessEmail,
    QuestionsList: maxSubscribersData.questionsList.map((question: any) =>
      mapMaxSubscribersQuestionData(question),
    ),
    UrlHelp: maxSubscribersData.urlHelp,
    UrlReferrer: maxSubscribersData.urlReferrer,
  };
};

export class DopplerLegacyClientImpl implements DopplerLegacyClient {
  private readonly axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  public async getMaxSubscribersData(): Promise<MaxSubscribersData> {
    const response = await this.axios.get(
      "/sendmaxsubscribersemail/getmaxsubscribersdata",
    );
    return mapMaxSubscribersData(response.data);
  }

  public async sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData,
  ): Promise<boolean> {
    const response = await this.axios({
      method: "post",
      url: "/sendmaxsubscribersemail/sendemailpopup",
      // Hack: it is to avoid Axios automatic serialization as x-www-form-urlencoded
      data: JSON.stringify(mapMaxSubscribersDataToJson(maxSubscribersData)),
      // Hack: It is to avoid CORS Preflight
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  }

  public async sendAcceptButtonAction(): Promise<boolean> {
    const response = await this.axios.post(
      "accountpreferences/acceptbuttonaction",
    );
    return response.data;
  }

  public async changeUserSession(idUser: number): Promise<boolean> {
    const response = await this.axios({
      method: "post",
      url: `/WebAppPublic/ChangeUserSession?idUser=${idUser}`,
      // Hack: It is to avoid CORS Preflight
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data?.success ?? false;
  }
}
