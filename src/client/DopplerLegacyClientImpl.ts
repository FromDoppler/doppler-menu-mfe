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
      mapMaxSubscribersQuestion(question)
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
  maxSubscribersData: MaxSubscribersData
): any => {
  return {
    IsSentSuccessEmail: maxSubscribersData.isSentSuccessEmail,
    QuestionsList: maxSubscribersData.questionsList.map((question: any) =>
      mapMaxSubscribersQuestionData(question)
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
      "/sendmaxsubscribersemail/getmaxsubscribersdata"
    );
    return mapMaxSubscribersData(response.data);
  }

  public async sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData
  ): Promise<boolean> {
    const response = await this.axios.post(
      "/sendmaxsubscribersemail/sendemailpopup",
      mapMaxSubscribersDataToJson(maxSubscribersData),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  }

  public async sendAcceptButtonAction(): Promise<boolean> {
    const response = await this.axios.post(
      "accountpreferences/acceptbuttonaction"
    );
    return response.data;
  }
}
