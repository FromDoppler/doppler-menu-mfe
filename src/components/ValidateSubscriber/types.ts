export interface MaxSubscribersData {
  isSentSuccessEmail: boolean;
  questionsList: MaxSubscribersQuestion[];
  urlHelp: string;
  urlReferrer: string;
}

export interface MaxSubscribersQuestion {
  question: string;
  answer: SubscriberValidationAnswer;
}

export interface SubscriberValidationAnswer {
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

export interface ValidateMaxSubscribersFormProp {
  validationFormData: MaxSubscribersData;
  handleClose: () => void;
  handleSubmit: () => Promise<boolean>;
}
