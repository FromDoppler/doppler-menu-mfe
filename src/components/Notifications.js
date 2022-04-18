import { useRef, useState } from "react";
import useClickOutsideHandler from "../hooks/useClickOutsideHandler";

const Notifications = ({
  notifications = [],
  emptyNotificationText = null,
}) => {
  const count = notifications.length;
  const dataCount = count && { "data-count": count };
  const notificationsRef = useRef();
  const [openNotification, setOpenNotification] = useState(false);
  useClickOutsideHandler(notificationsRef, () => setOpenNotification(false));

  const handleToggleNotification = () => {
    setOpenNotification((prev) => !prev);
  };

  return (
    <div ref={notificationsRef}>
      <span
        className="user-menu--open active"
        {...dataCount}
        onClick={handleToggleNotification}
      >
        <span className="ms-icon icon-notification"></span>
      </span>
      {!count && emptyNotificationText}
      {count &&
        notifications.map((notification, index) => {
          return (
            <div
              key={index}
              className={`user-menu helper--right dp-notifications ${
                openNotification ? "open" : ""
              }`}
            >
              <div className="dp-msj-notif">
                <div dangerouslySetInnerHTML={{ __html: notification }} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Notifications;
