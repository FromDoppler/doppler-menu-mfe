import { useCallback, useEffect } from "react";

const SubNavItems = ({ item, isInactiveSection, toggleOpenHeader }) => {
  const { isSelected, subNav = [] } = item;

  useEffect(() => {
    toggleOpenHeader(isSelected && !isInactiveSection);
  }, [isInactiveSection, isSelected, toggleOpenHeader]);

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

  const toggleOpenHeader = useCallback(
    (openMainMenu) => {
      const headerMainElement = document.querySelector(".header-main");
      !isInactiveSection && subNav.length && openMainMenu
        ? headerMainElement?.classList.add("header-open")
        : headerMainElement?.classList.remove("header-open");
    },
    [isInactiveSection, subNav.length]
  );

  return (
    <li
      key={title}
      className={`${subNav.length ? "submenu-item" : ""}`}
      onMouseEnter={() => toggleOpenHeader(true)}
      onMouseLeave={() => toggleOpenHeader(false)}
    >
      <a
        className={isSelected && !isInactiveSection ? "active" : ""}
        href={url}
      >
        {title}
      </a>
      {!!subNav.length && (
        <SubNavItems
          item={item}
          isInactiveSection={isInactiveSection}
          toggleOpenHeader={toggleOpenHeader}
        />
      )}
    </li>
  );
};

const Nav = ({ nav, isInactiveSection }) => {
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
            <span className="user-menu--open active" data-count="1">
              <span className="ms-icon icon-notification"></span>
            </span>
          </li>
          <li>
            <a href="https://help.fromdoppler.com/en">
              <span className="ms-icon icon-header-help"></span>
            </a>
          </li>
          <li>
            <div>
              <button className="user-menu--open">
                <span
                  className="user-avatar"
                  style={{ background: `rgb(238, 156, 112)` }}
                >
                  BS
                </span>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
