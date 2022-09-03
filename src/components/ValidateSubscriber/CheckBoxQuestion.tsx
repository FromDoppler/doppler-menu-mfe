import { CheckboxFieldItem, FieldGroup } from "./form-helpers";
import React, { useState } from "react";
import { Field } from "formik";
import { FormattedMessage } from "react-intl";

export const CheckBoxQuestion = ({
  fieldName,
  question,
  options,
  enableOtherOption,
  error,
}: CheckBoxQuestionProps) => {
  const [isCheckOtherOption, setCheckOthersOption] = useState(false);

  const optionsToRender = options.map((option, index) => {
    const isLastOption = options.length - 1 === index;
    return (
      <React.Fragment key={`checkbox${index}`}>
        <CheckBoxOption
          option={option}
          fieldName={fieldName}
          index={`${fieldName}-${index}`}
          onClick={
            enableOtherOption
              ? () => isLastOption && setCheckOthersOption(!isCheckOtherOption)
              : undefined
          }
        />
        {isCheckOtherOption && isLastOption ? (
          <div
            className={`${isCheckOtherOption ? "dp-show" : "dp-hide"}`}
            data-testid="last-textarea"
          >
            <Field
              as="textarea"
              name={`answer${index}_text`}
              className={"field-item"}
            />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  });

  return (
    <li className="m-t-6">
      <fieldset>
        <label htmlFor={question}> {question} </label>
        <FieldGroup>
          {optionsToRender}
          {error ? (
            <li className="field-item error">
              <div className="dp-message dp-error-form">
                <p>
                  <FormattedMessage id={error} />
                </p>
              </div>
            </li>
          ) : (
            ""
          )}
        </FieldGroup>
      </fieldset>
    </li>
  );
};

const CheckBoxOption = ({
  option,
  fieldName,
  index,
  onClick,
}: CheckBoxOptionProp) => {
  return (
    <CheckboxFieldItem
      className={"field-item--50"}
      label={option}
      fieldName={fieldName}
      id={index}
      value={option}
      onClick={() => onClick && onClick()}
      withErrors={false}
    />
  );
};

interface CheckBoxQuestionProps {
  question: string;
  fieldName: string;
  options: string[];
  enableOtherOption?: boolean;
  error?: string;
}

interface CheckBoxOptionProp {
  option: string;
  fieldName: string;
  index: string;
  onClick?: () => void;
}
