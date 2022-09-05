import { render, screen } from "@testing-library/react";
import { PrimaryNavItemState } from "../navbar-state/navbar-state-abstractions";
import { Nav } from "./Nav";

const mainNav = "main nav";
const nav: PrimaryNavItemState[] = [
  {
    title: "Home",
    url: "/Dashboard/",
    idHTML: "dashboard",
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    idHTML: "campaignMenu",
    subNavItems: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
        idHTML: "dashboard",
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
        idHTML: "dashboard",
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
        idHTML: "dashboard",
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
        idHTML: "dashboard",
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
