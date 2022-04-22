import { render, screen } from "@testing-library/react";

import UserMenu from "./UserMenu";

const user = {
  email: "user@makingsense.com",
  fullname: "test full name",
  lastName: "test lastname",
  avatar: { text: "BS", color: "#EE9C70" },
  nav: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      isEnabled: false,
      isSelected: false,
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false, remainingCredits: 0.0 },
  isLastPlanRequested: false,
  hasCampaignSent: false,
};

describe("<UserMenu />", () => {
  it("renders user menu", () => {
    render(<UserMenu user={user} />);

    expect(screen.getByText(user.fullname)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.nav[0].title)).toBeInTheDocument();
    expect(screen.getAllByText(user.avatar.text)).toHaveLength(2);
  });
});
