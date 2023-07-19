import { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikHelpers,
} from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { User, Plan } from "../model";
import { ConfirmationMessage } from "./ConfirmationMessage";
import { Loading } from "./Loading";
import { useTimeout } from "../hooks/useTimeout";
// TODO: Remove mocks
import {
  getUpgradePlanData,
  upgradePlan,
  ClientTypePlans,
} from "../mocks/servicesMock";

interface UpgradePlanFormProp {
  isSubscriber: boolean;
  handleClose: () => void;
  user: User;
}

interface InnerFormProp {
  errors: FormikErrors<{ [field: string]: string }>;
  touched: FormikTouched<{ [field: string]: any }>;
  submitCount: number;
  isSubmitting: boolean;
}

interface FormFields {
  selectedPlanId: number | null;
  message: string;
}

const fieldNames = {
  selectedPlanId: "selectedPlanId",
  message: "message",
};

const getAvailablePlans = (
  userPlan: Plan,
  availablePlans: ClientTypePlans[],
) => {
  return availablePlans.filter(({ SubscribersQty, EmailQty }) =>
    userPlan.isSubscribers
      ? SubscribersQty > userPlan.maxSubscribers
      : EmailQty && EmailQty > userPlan.maxSubscribers,
  );
};

const getAmmountSubscribers = (
  availablePlans: ClientTypePlans[],
  selectedPlanId: number,
  isSubscriber: boolean,
) => {
  const amount = isSubscriber
    ? availablePlans.find((plan) => plan.IdUserTypePlan === selectedPlanId)
        ?.SubscribersQty
    : availablePlans.find((plan) => plan.IdUserTypePlan === selectedPlanId)
        ?.EmailQty;

  return amount || 0;
};

export const UpgradePlanForm = ({
  handleClose,
  isSubscriber,
  user,
}: UpgradePlanFormProp) => {
  const { plan } = user;
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPlan, setIsLastPlan] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [amountSubscribers, setAmountSubscribers] = useState<number>(0);
  const [firstPlanId, setFirstPlanId] = useState<number | null>(null);
  const [availablePlans, setAvailablePlans] = useState<
    ClientTypePlans[] | null
  >(null);

  const intl = useIntl();
  const createTimeout = useTimeout();

  const initialValues: FormFields = {
    selectedPlanId: firstPlanId,
    message: "",
  };

  // TODO: Remove Fetch. Pass Plan Data from props instead
  useEffect(() => {
    const fetchData = async () => {
      const availablePlans = await getUpgradePlanData(isSubscriber);
      const availablePlanMajors = getAvailablePlans(plan, availablePlans);
      setAvailablePlans(availablePlanMajors);
      setIsLoading(false);
      setIsLastPlan(availablePlanMajors.length === 0);
      setFirstPlanId(availablePlanMajors[0]?.IdUserTypePlan);
    };
    fetchData();
  }, [isSubscriber, plan]);

  const onSubmit = async (
    { selectedPlanId, message }: FormFields,
    { setSubmitting }: FormikHelpers<FormFields>,
  ) => {
    await upgradePlan({
      IdClientTypePlanSelected: selectedPlanId,
      Detail: message,
    });

    setSubmitting(true);
    if (!selectedPlanId) {
      setConfirmationMessage(true);
      availablePlans &&
        selectedPlanId &&
        setAmountSubscribers(
          getAmmountSubscribers(availablePlans, selectedPlanId, isSubscriber),
        );
    } else {
      setSentEmail(true);
      // TODO: remove use of appSessionRef
      // appSessionRef.current.userData.user.isLastPlanRequested = true;
      createTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const validate = ({ selectedPlanId, message }: FormFields) => {
    const errors: FormikErrors<{ [field: string]: string }> = {};
    if (!message && selectedPlanId === null) {
      errors[message] = "validation_messages.error_required_field";
    }
    return errors;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (confirmationMessage) {
    return (
      <ConfirmationMessage
        isSubscriber={isSubscriber}
        amountSubscribers={amountSubscribers}
      />
    );
  }

  return (
    <>
      <h2 className="modal-title">
        <FormattedMessage id="upgradePlanForm.title" />
      </h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ errors, touched, submitCount, isSubmitting }: InnerFormProp) => (
          <Form className="form-request" role="form">
            <fieldset>
              <ul className="field-group">
                {isLastPlan ? (
                  <li
                    className={
                      "field-item" +
                      (submitCount &&
                      touched[fieldNames.message] &&
                      errors[fieldNames.message]
                        ? " error"
                        : "")
                    }
                  >
                    <label htmlFor={fieldNames.message}>
                      <FormattedMessage id="common.message_last_plan" />
                    </label>
                    <FormattedMessage id="upgradePlanForm.message_placeholder">
                      {(placeholderText) => (
                        <Field
                          component="textarea"
                          name={fieldNames.message}
                          id={fieldNames.message}
                          placeholder={placeholderText}
                        />
                      )}
                    </FormattedMessage>
                    <ErrorMessage name={fieldNames.message}>
                      {(err) => (
                        <div className="wrapper-errors">
                          <p className="error-message">
                            {intl.formatMessage({ id: err })}
                          </p>
                        </div>
                      )}
                    </ErrorMessage>
                  </li>
                ) : (
                  <li className="field-item">
                    <label htmlFor={fieldNames.selectedPlanId}>
                      <FormattedMessage id="upgradePlanForm.plan_select" />
                    </label>
                    <span className="dropdown-arrow" />
                    <Field
                      autoFocus
                      component="select"
                      name={fieldNames.selectedPlanId}
                      id={fieldNames.selectedPlanId}
                    >
                      {availablePlans?.map((item, index) => (
                        <option key={index} value={item.IdUserTypePlan}>
                          {item.Description}
                        </option>
                      ))}
                    </Field>
                  </li>
                )}
              </ul>
            </fieldset>
            {!sentEmail ? (
              <div className="container-buttons">
                <button
                  type="button"
                  className="dp-button button-medium primary-grey"
                  onClick={handleClose}
                >
                  <FormattedMessage id="common.cancel" />
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    "dp-button button-medium primary-green" +
                    ((isSubmitting && " button--loading") || "")
                  }
                >
                  {!isLastPlan ? (
                    <FormattedMessage id="upgradePlanForm.update" />
                  ) : (
                    <FormattedMessage id="common.send" />
                  )}
                </button>
              </div>
            ) : (
              <div className="dp-wrap-message dp-wrap-success">
                <span className="dp-message-icon"></span>
                <div className="dp-content-message">
                  <label htmlFor={fieldNames.message}>
                    <FormattedMessage id="common.message_success" />
                  </label>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
