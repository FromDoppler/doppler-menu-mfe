import { User } from "../headerData";
import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";

interface MenuRightProp {
  user: User;
  notifications: string[];
  emptyNotificationText: string;
}

export const MenuRight = ({
  user,
  notifications,
  emptyNotificationText,
}: MenuRightProp) => {
  return (
    <nav className="nav-right-main" aria-label="secondary nav">
      <ul className="nav-right-main--list">
        <li>
          <Notifications
            notifications={notifications}
            emptyNotificationText={emptyNotificationText}
          />
        </li>
        <li>
          <a href="https://help.fromdoppler.com/en">
            <span className="ms-icon icon-header-help"></span>
          </a>
        </li>
        <li>
          <UserMenu user={user} />
        </li>
      </ul>
    </nav>
  );
};
