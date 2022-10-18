import { User } from "../model";
import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";

interface MenuRightProp {
  user: User;
  notifications: ReadonlyArray<string>;
  emptyNotificationText: string;
  setOpenMenuMobile: (param: any) => void;
}

export const MenuRight = ({
  user,
  notifications,
  emptyNotificationText,
  setOpenMenuMobile,
}: MenuRightProp) => {
  const toggleMenuMobile = () => setOpenMenuMobile((prev: boolean) => !prev);
  return (
    <nav className="nav-right-main" aria-label="secondary nav">
      <ul className="nav-right-main--list">
        <Notifications
          notifications={notifications}
          emptyNotificationText={emptyNotificationText}
        />
        <li>
          <a
            href={`https://help.fromdoppler.com/${user.lang}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="ms-icon icon-header-help">help</span>
          </a>
        </li>
        <li>
          <UserMenu user={user} />
        </li>
      </ul>
      <span
        id="open-menu"
        data-testid="open-menu"
        className="ms-icon icon-menu desktop-hd-hidden"
        onClick={toggleMenuMobile}
      />
      <span
        id="close-menu"
        data-testid="close-menu"
        className="ms-icon icon-close desktop-hd-hidden"
        onClick={toggleMenuMobile}
      />
    </nav>
  );
};
