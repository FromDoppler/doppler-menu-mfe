import { MaxSubscribersQuestion } from "./types";
import { InputFieldItem } from "./form-helpers";
import React from "react";

interface InputQuestionProp {
  questionItem: MaxSubscribersQuestion;
  fieldName: string;
  className: string;
}

export const InputQuestion = ({
  questionItem,
  fieldName,
  ...otherProps
}: InputQuestionProp) => {
  return (
    <InputFieldItem
      type="text"
      label={questionItem.question}
      fieldName={fieldName}
      required
      {...otherProps}
    />
  );
};
