import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

const mainNav = "main nav";
const secundaryNav = "secundary nav";
const nav = [
  {
    title: "Home",
    url: "/Dashboard/",
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    subNav: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
      },
    ],
    idHTML: "campaignMenu",
  },
  {
    title: "Lists",
    url: "/Lists/SubscribersList/",
    subNav: [
      {
        title: "Main Lists",
        url: "/Lists/SubscribersList/",
      },
      {
        title: "Segments",
        url: "/Lists/Segment/",
      },
      {
        title: "Contacts",
        url: "/Lists/MasterSubscriber/",
      },
      {
        title: "Custom Fields",
        url: "/Lists/MasterCustomFields/",
      },
      {
        title: "Forms",
        url: "/Lists/Form/",
      },
    ],
  },
];

describe("<Nav />", () => {
  it("should not break if props are missing", () => {
    render(<Nav />);

    expect(screen.getAllByRole("navigation").length).toEqual(2);
    expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
    expect(screen.getByLabelText(secundaryNav)).toBeInTheDocument();
  });

  it("should render Navs properly", () => {
    render(<Nav nav={nav} />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
