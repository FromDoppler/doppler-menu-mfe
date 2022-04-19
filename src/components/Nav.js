import Notifications from "./Notifications";
import UserMenu from "./UserMenu";

const headerMainElement = document.querySelector(".header-main");

const toggleHeader = () => {
  headerMainElement?.classList?.toggle("header-open");
};

const SubNavItems = ({ item, isInactiveSection }) => {
  const { isSelected, subNav = [] } = item;

  return (
    <ul
      className={`sub-menu ${isSelected && !isInactiveSection ? "open" : ""}`}
    >
      {subNav.length &&
        subNav.map(({ title, url, isSelected }) => {
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
    </ul>
  );
};

const NavItem = ({ item, isInactiveSection }) => {
  const { title, url, subNav = [], isSelected } = item;

  return (
    <li
      key={title}
      className={`${subNav.length ? "submenu-item" : ""}`}
      onMouseEnter={() => subNav.length && toggleHeader()}
      onMouseLeave={() => subNav.length && toggleHeader()}
    >
      <a
        className={isSelected && !isInactiveSection ? "active" : ""}
        href={url}
      >
        {title}
      </a>
      {!!subNav.length && (
        <SubNavItems item={item} isInactiveSection={isInactiveSection} />
      )}
    </li>
  );
};

const Nav = ({
  nav,
  notifications,
  isInactiveSection,
  emptyNotificationText,
  user,
}) => {
  return (
    <>
      <nav className="nav-left-main">
        <div className="menu-main--container">
          <ul className="menu-main">
            {nav.map((item) => {
              return (
                <NavItem
                  key={`${item.idHTML}${item.title}`}
                  item={item}
                  isInactiveSection={isInactiveSection}
                />
              );
            })}
          </ul>
        </div>
      </nav>
      <nav className="nav-right-main">
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
