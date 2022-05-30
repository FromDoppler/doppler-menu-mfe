import { NavItem as INavItem } from "../headerData";
import { useEffect, useState } from "react";

interface NavProp {
  currentPath: string;
  nav: INavItem[];
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
  item: INavItem;
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
  const { title, url, subNav = [] } = item;
  const hasSubmenuItems = !!subNav.length;
  const [isNavItemActive, setNavItemActive] = useState(
    currentPath === item.url
  );

  useEffect(() => {
    if (isNavItemActive && hasSubmenuItems) openMenuHeader();
  }, [hasSubmenuItems, isNavItemActive, openMenuHeader]);

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
          isNavItemActive={isNavItemActive}
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
  item,
  setNavItemActive,
}: SubNavProp) => {
  return (
    <ul className={`sub-menu ${isNavItemActive ? "open" : ""}`}>
      {item.subNav?.map(({ title, url }) => (
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
  const isActive = url === currentPath;

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
