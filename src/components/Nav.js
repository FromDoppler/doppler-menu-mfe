import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";

const SubNavItems = ({ item, isInactiveSection }) => {
  const { subNav = [] } = item;

  return subNav.map(({ title, url, isSelected }) => {
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
  });
};

const NavItem = ({
  item,
  isInactiveSection,
  openMenuHeader,
  closeMenuHeader,
}) => {
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

const Nav = ({
  nav = [],
  user = {},
  notifications = [],
  isInactiveSection,
  emptyNotificationText,
  openMenuHeader,
  closeMenuHeader,
}) => {
  return (
    <>
      <nav className="nav-left-main" aria-label="main nav">
        <div className="menu-main--container">
          <ul className="menu-main">
            {nav.map((item) => {
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
      <nav className="nav-right-main" aria-label="secundary nav">
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

export default Nav;
