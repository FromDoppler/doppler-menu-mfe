import { NavItem as INavItem } from "../model";
import { useEffect, useState } from "react";
import { IsActiveUrl } from "../utils";

interface NavProp {
  currentPath: string;
  nav: ReadonlyArray<INavItem>;
  openMenuHeader: () => void;
  closeMenuHeader: () => void;
}

interface NavItemProp {
  currentPath: string;
  item: INavItem;
  openMenuHeader: () => void;
  closeMenuHeader: () => void;
}

interface SubNavProp {
  currentPath: string;
  isNavItemActive: boolean;
  isSubNavItemActive: boolean;
  item: INavItem;
  openMenuHeader: () => void;
  setNavItemActive: (value: boolean) => void;
}

interface SubNavItemProp {
  currentPath: string;
  url: string;
  title: string;
  setNavItemActive: (value: boolean) => void;
}

export const Nav = ({
  currentPath,
  nav,
  openMenuHeader,
  closeMenuHeader,
}: NavProp) => {
  return (
    <nav className="nav-left-main" aria-label="main nav">
      <div className="menu-main--container">
        <ul className="menu-main">
          {nav.map((item, index) => {
            return (
              <NavItem
                currentPath={currentPath}
                key={index}
                item={item}
                openMenuHeader={openMenuHeader}
                closeMenuHeader={closeMenuHeader}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({
  currentPath,
  item,
  openMenuHeader,
  closeMenuHeader,
}: NavItemProp) => {
  const { title, url, subNavItems = [] } = item;
  const hasSubmenuItems = !!subNavItems.length;
  const [isNavItemActive, setNavItemActive] = useState(
    IsActiveUrl(currentPath, item.url)
  );

  const isSubNavItemActive = !!item.subNavItems?.some(({ url }) => {
    return IsActiveUrl(currentPath, url);
  });

  useEffect(() => {
    const isActive = IsActiveUrl(currentPath, item.url) || isSubNavItemActive;
    setNavItemActive(isActive);
  }, [currentPath, item.url, isSubNavItemActive]);

  return (
    <li
      key={title}
      className={`${hasSubmenuItems ? "submenu-item" : ""}`}
      onMouseEnter={() => hasSubmenuItems && openMenuHeader()}
      onMouseLeave={() => hasSubmenuItems && closeMenuHeader()}
    >
      <a className={isNavItemActive ? "active" : ""} href={url}>
        {title}
      </a>
      {hasSubmenuItems && (
        <SubNav
          openMenuHeader={openMenuHeader}
          isNavItemActive={isNavItemActive}
          isSubNavItemActive={isSubNavItemActive}
          currentPath={currentPath}
          item={item}
          setNavItemActive={setNavItemActive}
        />
      )}
    </li>
  );
};

const SubNav = ({
  currentPath,
  isNavItemActive,
  isSubNavItemActive,
  item,
  setNavItemActive,
  openMenuHeader,
}: SubNavProp) => {
  useEffect(() => {
    if (isNavItemActive && isSubNavItemActive) {
      openMenuHeader();
    }
  }, [isNavItemActive, openMenuHeader, isSubNavItemActive]);

  return (
    <ul className={`sub-menu ${isNavItemActive ? "open" : ""}`}>
      {item.subNavItems?.map(({ title, url }) => (
        <SubNavItem
          key={title}
          currentPath={currentPath}
          url={url}
          title={title}
          setNavItemActive={setNavItemActive}
        />
      ))}
    </ul>
  );
};

const SubNavItem = ({
  url,
  title,
  currentPath,
  setNavItemActive,
}: SubNavItemProp) => {
  const isActive = IsActiveUrl(currentPath, url);

  useEffect(() => {
    if (isActive) setNavItemActive(true);
  }, [isActive, setNavItemActive]);

  return (
    <li>
      <a className={isActive ? "active" : ""} href={url}>
        {title}
      </a>
    </li>
  );
};
