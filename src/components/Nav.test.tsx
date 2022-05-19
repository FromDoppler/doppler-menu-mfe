import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { NavItem } from "../headerData";

const mainNav = "main nav";
const nav: NavItem[] = [
  {
    title: "Home",
    url: "/Dashboard/",
    isEnabled: false,
    isSelected: false,
    idHTML: "dashboard",
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    idHTML: "campaignMenu",
    isEnabled: false,
    isSelected: false,
    subNav: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
    ],
  },
];

describe(Nav.name, () => {
  it("should not break if props are missing", () => {
    render(
      <Nav
        currentPath={"/"}
        nav={[]}
        openMenuHeader={jest.fn()}
        closeMenuHeader={jest.fn()}
      />
    );

    expect(screen.getAllByRole("navigation").length).toEqual(1);
    expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
  });

  it("should render Navs properly", () => {
    render(
      <Nav
        currentPath={"/"}
        nav={nav}
        openMenuHeader={jest.fn()}
        closeMenuHeader={jest.fn()}
      />
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
