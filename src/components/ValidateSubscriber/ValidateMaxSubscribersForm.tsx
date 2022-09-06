import React from "react";
import { Form, Formik, FormikState } from "formik";
import { FormattedMessage } from "react-intl";
import { FieldGroup, SubmitButton } from "./form-helpers";
import {
  MaxSubscribersQuestion,
  SubscriberValidationAnswer,
  ValidateMaxSubscribersFormProp,
} from "./types";
import { Question } from "./Question";

export const ValidateMaxSubscribersForm = ({
  validationFormData,
  onClose,
  onSubmit,
}: ValidateMaxSubscribersFormProp) => {
  const isCheckbox = (answer: SubscriberValidationAnswer) => {
    return ["CHECKBOX_WITH_TEXTAREA", "CHECKBOX"].includes(answer.answerType);
  };

  const normalizeQuestions = (questionsList: MaxSubscribersQuestion[]) => {
    let normalizedAnswer: any = {};
    questionsList?.forEach((question, index) => {
      normalizedAnswer[`answer${index}`] = isCheckbox(question.answer)
        ? []
        : "";
      if (question.answer?.answerType === "CHECKBOX_WITH_TEXTAREA") {
        normalizedAnswer[`answer${index}_text`] = "";
      }
    });
    return normalizedAnswer;
  };

  const answers: any = normalizeQuestions(validationFormData.questionsList);

  const handlerSubmit = async (values: any, { setSubmitting }: any) => {
    validationFormData.questionsList.forEach((questionItem, index) => {
      if (isCheckbox(questionItem.answer)) {
        questionItem.answer.value = values[`answer${index}`].join("-");
        questionItem.answer.text = values[`answer${index}_text`];
      } else {
        questionItem.answer.value = values[`answer${index}`];
      }
    });
    const result = await onSubmit();
    if (!result) {
      setSubmitting(false);
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    for (let value in values) {
      if (Array.isArray(values[value]) && values[value].length === 0) {
        errors[value] = "validate_max_subscribers_form.checkbox_empty";
      }
    }
    return errors;
  };

  const renderQuestions = (
    questionItem: MaxSubscribersQuestion,
    questionIndex: number,
    formikProps: FormikState<any>
  ) => {
    const { touched, errors, submitCount } = formikProps;
    const fieldName = `answer${questionIndex}`;
    return (
      <Question
        questionItem={questionItem}
        fieldName={fieldName}
        error={
          submitCount && touched[fieldName] && errors[fieldName]
            ? `${errors[fieldName]}`
            : undefined
        }
      />
    );
  };

  if (Object.entries(answers).length === 0) {
    return <>Loading..</>;
  }

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
          initialValues={answers}
          validate={validate}
          onSubmit={handlerSubmit}
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
                    <a
                      target="_BLANK"
                      rel="noreferrer"
                      href={validationFormData?.urlHelp}
                    >
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
                        onClick={onClose}
                      >
                        <FormattedMessage id="common.cancel" />
                      </button>
                      <SubmitButton className="dp-button button-medium primary-green">
                        <FormattedMessage id="common.save" />
                      </SubmitButton>
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
