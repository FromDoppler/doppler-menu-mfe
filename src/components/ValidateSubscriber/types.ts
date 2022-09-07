export interface MaxSubscribersData {
  isSentSuccessEmail: boolean;
  questionsList: QuestionModel[];
  urlHelp: string;
  urlReferrer: string;
}

export interface QuestionModel {
  question: string;
  answer: AnswerModel;
}

export interface AnswerModel {
  answerType: string;
  answerOptions: string[];
  value: string;
  text?: string;
  optionsSelected: string[];
}

export enum AnswerType {
  TEXTFIELD = 1,
  CHECKBOX = 2,
  CHECKBOX_WITH_TEXTAREA = 3,
  DROPDOWN = 4,
  RADIOBUTTON = 5,
  URL = 6,
}
