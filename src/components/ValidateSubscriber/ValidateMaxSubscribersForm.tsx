import React, { useState } from "react";
import { Field, Form, Formik, FormikState } from "formik";
import { FormattedMessage } from "react-intl";
import { CheckboxFieldItem, FieldGroup, InputFieldItem } from "./form-helpers";
import {
  MaxSubscribersQuestion,
  SubscriberValidationAnswer,
  ValidateMaxSubscribersFormProp,
} from "./types";

export const ValidateMaxSubscribersForm = ({
  validationFormData,
  handleClose,
  handleSubmit,
}: ValidateMaxSubscribersFormProp) => {
  // TODO: validate and onSubmit implementation
  const validate = (values: {}) => {};
  const onSubmit = async (values: {}) => {};

  const [show, setShow] = useState(false);
  const toggleOthers = () => {
    console.log("test toggle");
    setShow((prev) => !prev);
  };

  const isCheckbox = (answer: SubscriberValidationAnswer) => {
    return ["CHECKBOX_WITH_TEXTAREA", "CHECKBOX"].includes(answer.answerType);
  };

  const isCheckboxWithTextArea = (answer: SubscriberValidationAnswer) => {
    return "CHECKBOX_WITH_TEXTAREA" === answer.answerType;
  };

  const initialValues = validationFormData.questionsList?.reduce(
    (accumulator, question, index) => {
      const answer = {
        [`answer${index}`]: isCheckbox(question.answer) ? [] : "",
        ...(isCheckboxWithTextArea(question.answer) && {
          [`answer${index}_text`]: "",
        }),
      };

      return { ...accumulator, ...answer };
    },
    {}
  );

  const renderQuestions = (
    questionItem: MaxSubscribersQuestion,
    questionIndex: number,
    formikProps: FormikState<any>
  ) => {
    const { touched, errors, submitCount } = formikProps;
    if (
      questionItem.answer?.answerType === "TEXTFIELD" ||
      questionItem.answer?.answerType === "URL"
    ) {
      return (
        <InputFieldItem
          type="text"
          label={questionItem.question}
          fieldName={`answer${questionIndex}`}
          required
          className={`${
            questionItem.answer?.answerType === "TEXTFIELD"
              ? "field-item--50"
              : ""
          }`}
        />
      );
    }

    if (isCheckbox(questionItem.answer)) {
      const fieldName = `answer${questionIndex}`;
      return (
        <li className="m-t-6">
          <fieldset>
            <label htmlFor={questionItem.question}>
              {questionItem.question}
            </label>
            <FieldGroup>
              {questionItem.answer.answerOptions.map((option, optionIndex) => {
                // TODO: fix text area not diplaying when "others" is checked
                const lastCheckboxItem =
                  isCheckboxWithTextArea(questionItem.answer) &&
                  questionItem.answer?.answerOptions.length - 1 === optionIndex;

                return (
                  <React.Fragment key={`checkbox${optionIndex}`}>
                    <CheckboxFieldItem
                      className={"field-item--50"}
                      label={`${option} ${show}`}
                      fieldName={fieldName}
                      id={`${fieldName}-${optionIndex}`}
                      value={option}
                      onClick={lastCheckboxItem ? toggleOthers : undefined}
                      withErrors={false}
                    />
                    {lastCheckboxItem ? (
                      <div
                        className={`${show ? "dp-show" : "dp-hide"}`}
                        data-testid="last-textarea"
                      >
                        <Field
                          as="textarea"
                          name={`answer${questionIndex}_text`}
                          className={"field-item"}
                        />
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
              {submitCount && touched[fieldName] && errors[fieldName] ? (
                <li className="field-item error">
                  <div className="dp-message dp-error-form">
                    <p>
                      <FormattedMessage id={`${errors[fieldName]}`} />
                    </p>
                  </div>
                </li>
              ) : null}
            </FieldGroup>
          </fieldset>
        </li>
      );
    }
  };

  return (
    <section className="dp-container">
      <div className="dp-wrapper-form-plans">
        <h2 className="modal-title">
          <FormattedMessage id="validate_max_subscribers_form.title" />
        </h2>
        <p>
          <FormattedMessage id="validate_max_subscribers_form.subtitle" />
        </p>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form className="dp-validate-max-subscribers">
              <fieldset>
                <legend>
                  <FormattedMessage id="validate_max_subscribers_form.title" />
                </legend>
                <FieldGroup>
                  {validationFormData.questionsList?.map(
                    (questionItem, questionIndex) => (
                      <React.Fragment key={`question${questionIndex}`}>
                        {renderQuestions(
                          questionItem,
                          questionIndex,
                          formikProps
                        )}
                      </React.Fragment>
                    )
                  )}
                </FieldGroup>
                <p>
                  <i>
                    <FormattedMessage id="validate_max_subscribers_form.form_help" />{" "}
                    <a target="_BLANK" href={"/"} rel="noreferrer">
                      <FormattedMessage id="validate_max_subscribers_form.form_help_link_text" />
                      <br />
                    </a>
                    <FormattedMessage id="validate_max_subscribers_form.info_text" />
                  </i>
                </p>
                <div className="dp-container">
                  <div className="dp-rowflex">
                    <div className="dp-footer-form">
                      <button
                        type="button"
                        className="dp-button button-medium primary-grey m-r-6"
                        onClick={handleClose}
                      >
                        <FormattedMessage id="common.cancel" />
                      </button>
                      {/* RODO: implement SubmitButton
                      <SubmitButton
                        intl={undefined}
                        formik={formikProps}
                        className={"dp-button button-medium primary-green"}
                      >
                        <FormattedMessage id="common.save" />
                      </SubmitButton> */}
                    </div>
                  </div>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
