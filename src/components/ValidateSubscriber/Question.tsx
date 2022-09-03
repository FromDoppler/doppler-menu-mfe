import React from "react";
import { MaxSubscribersQuestion } from "./types";
import { InputQuestion } from "./InputQuestion";
import { CheckBoxQuestion } from "./CheckBoxQuestion";

export const Question = ({ questionItem, fieldName, error }: QuestionProp) => {
  const answerType = questionItem.answer?.answerType;
  switch (answerType) {
    case "CHECKBOX":
      return (
        <CheckBoxQuestion
          question={questionItem.question}
          fieldName={fieldName}
          options={questionItem.answer.answerOptions}
          error={error}
        />
      );
    case "CHECKBOX_WITH_TEXTAREA":
      return (
        <CheckBoxQuestion
          question={questionItem.question}
          fieldName={fieldName}
          options={questionItem.answer.answerOptions}
          enableOtherOption={true}
          error={error}
        />
      );
    default:
      const inputClassName = `${
        answerType === "TEXTFIELD" ? "field-item--50" : ""
      }`;
      return (
        <InputQuestion
          questionItem={questionItem}
          fieldName={fieldName}
          className={inputClassName}
        />
      );
  }
};

interface QuestionProp {
  questionItem: MaxSubscribersQuestion;
  fieldName: string;
  error?: string;
}
