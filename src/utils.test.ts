import { IsActiveUrl } from "./utils";

describe(IsActiveUrl.name, () => {
  it.each([
    {
      currentUrl: "https://www.TEST.com/watch?v=dQw4w9WgXcQ",
      itemUrl: "https://www.test.com/watch?sdsdsds",
    },
    {
      currentUrl: "https://www.test.com/watch?v=dQw4w9WgXcQ",
      itemUrl: "https://www.test.com/watch",
    },
    {
      currentUrl: "http://www.test.com/watch#123",
      itemUrl: "https://www.test.com/watch?sdsdsds",
    },
    { currentUrl: "//www.test.com", itemUrl: "//www.test.com/" },
    {
      currentUrl: "https://www.test.com/#123?222",
      itemUrl: "https://www.test.com",
    },
  ])(
    "returns true when urls are equal $currentUrl $itemUrl",
    ({ currentUrl, itemUrl }) => {
      expect(IsActiveUrl(currentUrl, itemUrl)).toBe(true);
    }
  );

  it.each([
    {
      currentUrl: "https://www.test.com/watch?v=dQw4w9WgXcQ",
      itemUrl: "https://www.test.com/watch/sdsdsds",
    },
    {
      currentUrl: "www.test.com/watch",
      itemUrl: "https://www.test.com/watch",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/SubscriberHistory.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*5156cx*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/SentCampaigns.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?redirect=subHistory&_gl=1*wrn1kb*_ga",
    },
  ])("returns false when urls are not equal", ({ currentUrl, itemUrl }) => {
    expect(IsActiveUrl(currentUrl, itemUrl)).toBe(false);
  });
});
