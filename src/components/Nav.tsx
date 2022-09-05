import {
  NavBarState,
  PrimaryNavItemState,
  SecondaryNavItemState,
} from "../navbar-state/navbar-state-abstractions";

interface NavProp {
  navBar: NavBarState;
  selectNavItem: (idHTML: string) => void;
  unselectNavItem: () => void;
}

interface NavItemProp {
  item: PrimaryNavItemState;
  selectNavItem: (idHTML: string) => void;
  unselectNavItem: () => void;
}

interface SubNavProp {
  item: PrimaryNavItemState;
}

interface SubNavItemProp {
  subItem: SecondaryNavItemState;
}

export const Nav = ({ selectNavItem, unselectNavItem, navBar }: NavProp) => {
  return (
    <nav className="nav-left-main" aria-label="main nav">
      <div className="menu-main--container">
        <ul className="menu-main">
          {navBar.items.map((item, index) => {
            return (
              <NavItem
                key={index}
                item={item}
                selectNavItem={selectNavItem}
                unselectNavItem={unselectNavItem}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({ selectNavItem, unselectNavItem, item }: NavItemProp) => {
  const { title, url, subNavItems = [] } = item;
  const hasSubmenuItems = !!subNavItems.length;

  return (
    <li
      key={title}
      className={`${hasSubmenuItems ? "submenu-item" : ""}`}
      onMouseEnter={() => selectNavItem(item.idHTML)}
      // TODO: review it
      onMouseLeave={() => unselectNavItem()}
    >
      <a className={item.isActive ? "active" : ""} href={url}>
        {title}
      </a>
      {hasSubmenuItems && <SubNav item={item} />}
    </li>
  );
};

const SubNav = ({ item }: SubNavProp) => {
  return (
    <ul className={`sub-menu ${item.isOpen ? "open" : ""}`}>
      {item.subNavItems?.map((subItem) => (
        <SubNavItem key={subItem.title} subItem={subItem} />
      ))}
    </ul>
  );
};

const SubNavItem = ({ subItem }: SubNavItemProp) => {
  return (
    <li>
      <a className={subItem.isActive ? "active" : ""} href={subItem.url}>
        {subItem.title}
      </a>
    </li>
  );
};
