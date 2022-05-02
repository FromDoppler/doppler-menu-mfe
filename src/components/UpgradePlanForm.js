import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import ConfirmationMessage from "./ConfirmationMessage";
import Loading from "./Loading";
import useTimeout from "../hooks/useTimeout";

// TODO: Remove mocks
import { getUpgradePlanData, upgradePlan } from "../mocks/servicesMock";

const fieldNames = {
  selectedPlanId: "selectedPlanId",
  message: "message",
};

const getAvailablePlans = (userPlan, availablePlans) =>
  availablePlans.filter((plan) =>
    userPlan.isSubscribers
      ? plan.SubscribersQty > userPlan.maxSubscribers
      : plan.EmailQty > userPlan.maxSubscribers
  );

const getAmmountSubscribers = (availablePlans, selectedPlanId, isSubscriber) =>
  isSubscriber
    ? availablePlans.find((plan) => plan.IdUserTypePlan === selectedPlanId)
        .SubscribersQty
    : availablePlans.find((plan) => plan.IdUserTypePlan === selectedPlanId)
        .EmailQty;

const UpgradePlanForm = ({ handleClose, isSubscriber, user = {} }) => {
  const { plan = {} } = user;
  const [availablePlans, setAvailablePlans] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPlan, setIsLastPlan] = useState(false);
  const [firstPlanId, setFirstPlanId] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [amountSubscribers, setAmountSubscribers] = useState(0);

  const intl = useIntl();
  const createTimeout = useTimeout();

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

  const onSubmit = async (values, { setSubmitting }) => {
    await upgradePlan({
      IdClientTypePlanSelected: values[fieldNames.selectedPlanId],
      Detail: values[fieldNames.message],
    });
    setSubmitting(true);
    if (values[fieldNames.selectedPlanId] > 0) {
      setConfirmationMessage(true);
      setAmountSubscribers(
        getAmmountSubscribers(
          availablePlans,
          parseInt(values[fieldNames.selectedPlanId]),
          isSubscriber
        )
      );
    } else {
      setSentEmail(true);
      // TODO: should we remove appSessionRef
      // appSessionRef.current.userData.user.isLastPlanRequested = true;
      createTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (
      !values[fieldNames.message] &&
      values[fieldNames.selectedPlanId] === null
    ) {
      errors[fieldNames.message] = "validation_messages.error_required_field";
    }
    return errors;
  };

  return isLoading ? (
    <Loading />
  ) : confirmationMessage ? (
    <ConfirmationMessage
      isSubscriber={isSubscriber}
      amountSubscribers={amountSubscribers}
    ></ConfirmationMessage>
  ) : (
    <>
      <h2 className="modal-title">
        <FormattedMessage id="upgradePlanForm.title" />
      </h2>
      <Formik
        initialValues={{
          [fieldNames.selectedPlanId]: firstPlanId,
          [fieldNames.message]: "",
        }}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ errors, touched, submitCount, isSubmitting }) => (
          <Form className="form-request" role="form">
            <fieldset>
              <ul className="field-group">
                {!isLastPlan ? (
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
                ) : null}
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
                ) : null}
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

export default UpgradePlanForm;
