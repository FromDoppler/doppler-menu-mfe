import React, { ReactNode } from "react";
import { Form, Formik, FormikState } from "formik";
import { FormattedMessage } from "react-intl";
import { FieldGroup, SubmitButton } from "./form-helpers";
import { QuestionModel, AnswerModel } from "./types";
import { Question } from "./Question";
import { Loading } from "../Loading";

export interface QuestionsFormProps {
  questions: QuestionModel[];
  onSubmit: () => void;
  customSubmit?: ReactNode;
  className?: string;
}

export const QuestionsForm = ({
  questions,
  onSubmit,
  customSubmit,
  ...otherProps
}: QuestionsFormProps) => {
  const isCheckbox = (answer: AnswerModel) => {
    return ["CHECKBOX_WITH_TEXTAREA", "CHECKBOX"].includes(answer.answerType);
  };

  const normalizeQuestions = (questionsList: QuestionModel[]) => {
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

  const answers: any = normalizeQuestions(questions);

  const handlerSubmit = async (values: any) => {
    questions.forEach((questionItem, index) => {
      if (isCheckbox(questionItem.answer)) {
        questionItem.answer.value = values[`answer${index}`].join("-");
        questionItem.answer.text = values[`answer${index}_text`];
      } else {
        questionItem.answer.value = values[`answer${index}`];
      }
    });
    await onSubmit();
  };

  const validate = (values: any) => {
    const errors: any = {};
    for (let attr in values) {
      if (
        values.hasOwnProperty(attr) &&
        Array.isArray(values[attr]) &&
        values[attr].length === 0
      ) {
        errors[attr] = "validate_max_subscribers_form.checkbox_empty";
      }
    }
    return errors;
  };

  const renderQuestions = (
    questionItem: QuestionModel,
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
    return <Loading />;
  }

  return (
    <Formik
      initialValues={answers}
      validate={validate}
      onSubmit={handlerSubmit}
    >
      {(formikProps) => (
        <Form {...otherProps}>
          <fieldset>
            <legend>
              <FormattedMessage id="validate_max_subscribers_form.title" />
            </legend>
            <FieldGroup>
              {questions?.map((questionItem, questionIndex) => (
                <React.Fragment key={`question${questionIndex}`}>
                  {renderQuestions(questionItem, questionIndex, formikProps)}
                </React.Fragment>
              ))}
            </FieldGroup>
            {customSubmit ? (
              customSubmit
            ) : (
              <SubmitButton className="dp-button button-medium primary-green">
                <FormattedMessage id="common.save" />
              </SubmitButton>
            )}
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};
