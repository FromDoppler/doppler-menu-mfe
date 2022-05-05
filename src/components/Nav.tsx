import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";
import { NavItem as INavItem, User } from "../headerData";

interface SubNavItemsProp {
  item: INavItem;
  isInactiveSection: boolean;
}

interface NavItemProp {
  item: INavItem;
  isInactiveSection: boolean;
  openMenuHeader: () => void;
  closeMenuHeader: () => void;
}

interface NavProp {
  nav: INavItem[];
  user: User;
  notifications: string[];
  isInactiveSection: boolean;
  emptyNotificationText: string;
  openMenuHeader: () => void;
  closeMenuHeader: () => void;
}

const SubNavItems = ({ item, isInactiveSection }: SubNavItemsProp) => {
  const { subNav } = item;
  return (
    <>
      {subNav?.map(({ title, url, isSelected }) => {
        return (
          <li key={title}>
            <a
              className={isSelected && !isInactiveSection ? "active" : ""}
              href={url}
            >
              {title}
            </a>
          </li>
        );
      })}
    </>
  );
};

const NavItem = ({
  item,
  isInactiveSection,
  openMenuHeader,
  closeMenuHeader,
}: NavItemProp) => {
  const { title, url, subNav = [], isSelected } = item;
  const isActive = isSelected && !isInactiveSection;
  const hasSubmenuItems = !!subNav.length;

  return (
    <li
      key={title}
      className={`${hasSubmenuItems ? "submenu-item" : ""}`}
      onMouseEnter={() => hasSubmenuItems && openMenuHeader()}
      onMouseLeave={() => hasSubmenuItems && closeMenuHeader()}
    >
      <a className={isActive ? "active" : ""} href={url}>
        {title}
      </a>
      {
        <ul className={`sub-menu ${isActive ? "open" : ""}`}>
          <SubNavItems item={item} isInactiveSection={isInactiveSection} />
        </ul>
      }
    </li>
  );
};

export const Nav = ({
  nav,
  user,
  notifications,
  isInactiveSection,
  emptyNotificationText,
  openMenuHeader,
  closeMenuHeader,
}: NavProp) => {
  return (
    <>
      <nav className="nav-left-main" aria-label="main nav">
        <div className="menu-main--container">
          <ul className="menu-main">
            {nav &&
              nav.map((item) => {
                return (
                  <NavItem
                    key={`${item.idHTML}${item.title}`}
                    item={item}
                    isInactiveSection={isInactiveSection}
                    openMenuHeader={openMenuHeader}
                    closeMenuHeader={closeMenuHeader}
                  />
                );
              })}
          </ul>
        </div>
      </nav>
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
    </>
  );
};
