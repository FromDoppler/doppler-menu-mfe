import { useIntl } from "react-intl";

export const UnexpectedError = () => {
  const intl = useIntl();

  // TODO: Move inline styles to style guide (originally these were defined on a styled component)
  return (
    <div
      data-testid="unexpected-error"
      className="p-t-54 p-b-54"
      style={{ backgroundColor: "#f6f6f6", flex: "1" }}
    >
      <section className="dp-container">
        <div className="dp-rowflex">
          <div className="col-sm-12" style={{ textAlign: "center" }}>
            <span>{intl.formatMessage({ id: "common.unexpected_error" })}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
