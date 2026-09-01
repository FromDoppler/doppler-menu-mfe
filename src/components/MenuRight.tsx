import { useIntl } from "react-intl";
import { User } from "../model";
import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";
import { Tooltip } from "./Tooltip";

interface MenuRightProp {
  user: User;
  setOpenMenuMobile: (param: any) => void;
}

export const MenuRight = ({ user, setOpenMenuMobile }: MenuRightProp) => {
  const toggleMenuMobile = () => setOpenMenuMobile((prev: boolean) => !prev);
  const intl = useIntl();
  const helpLabel = intl.formatMessage({ id: "common.help" });

  return (
    <nav className="nav-right-main" aria-label="secondary nav">
      <ul className="nav-right-main--list">
        <Notifications user={user} />
        <li>
          <Tooltip label={helpLabel}>
            <a
              href={`https://help.fromdoppler.com/${user.lang}`}
              target="_blank"
              rel="noreferrer"
              aria-label={helpLabel}
              className="dp-link-help"
            >
              <span className="dp-tooltip-screen-reader-only">{helpLabel}</span>
            </a>
          </Tooltip>
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
