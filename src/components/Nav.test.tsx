import { render, screen } from "@testing-library/react";
import { PrimaryNavItemState } from "../navbar-state/navbar-state-abstractions";
import { Nav } from "./Nav";

const mainNav = "main nav";
const nav: PrimaryNavItemState[] = [
  {
    title: "Home",
    url: "/Dashboard/",
    idHTML: "dashboard",
    isActive: false,
    isOpen: false,
    isSelected: false,
    subNavItems: undefined,
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    idHTML: "campaignMenu",
    isActive: false,
    isOpen: false,
    isSelected: false,
    subNavItems: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
        idHTML: "dashboard",
        isActive: false,
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
        idHTML: "dashboard",
        isActive: false,
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
        idHTML: "dashboard",
        isActive: false,
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
        idHTML: "dashboard",
        isActive: false,
      },
    ],
  },
];

describe(Nav.name, () => {
  it("should not break if props are missing", () => {
    render(
      <Nav
        selectNavItem={() => {}}
        unselectNavItem={() => {}}
        navBar={{
          currentUrl: "/",
          selectedItemId: null,
          defaultActiveItemId: null,
          forcedActiveItemId: null,
          items: [],
          isExpanded: false,
        }}
      />
    );

    expect(screen.getAllByRole("navigation").length).toEqual(1);
    expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
  });

  it("should render Navs properly", () => {
    render(
      <Nav
        selectNavItem={() => {}}
        unselectNavItem={() => {}}
        navBar={{
          currentUrl: "/",
          selectedItemId: null,
          defaultActiveItemId: null,
          forcedActiveItemId: null,
          items: nav,
          isExpanded: false,
        }}
      />
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
