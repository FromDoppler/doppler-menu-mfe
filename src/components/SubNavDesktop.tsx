import {
  PrimaryNavItemState,
  SecondaryNavItemState,
} from "../navbar-state/navbar-state-abstractions";

interface SubNavProp {
  item: PrimaryNavItemState;
}

interface SubNavItemProp {
  subItem: SecondaryNavItemState;
}

export const SubNavDesktop = ({ item }: SubNavProp) => {
  return (
    <div className="dp-submenu-desktop">
      <ul>
        {item.subNavItems?.map((subItem) => (
          <SubNavItemDesktop key={subItem.title} subItem={subItem} />
        ))}
      </ul>
    </div>
  );
};

const SubNavItemDesktop = ({ subItem }: SubNavItemProp) => {
  return (
    <li>
      <a className={subItem.isActive ? "dp-active" : ""} href={subItem.url}>
        {subItem.title}
      </a>
    </li>
  );
};
