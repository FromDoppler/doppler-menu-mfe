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
    {
      currentUrl: "https://reports2.fromdoppler.com/SubscriberHistory.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?redirect=subHistory&_gl=1*wrn1kb*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/SentCampaigns.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl:
        "https://reports2.fromdoppler.com/Dashboard.aspx?idCampaign=18315986",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl:
        "https://reports2.fromdoppler.com/Dashboard.aspx?idCampaign=18315986",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/Dashboard.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/ViralActivity.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/OpensAndClicks.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/GeolocationByCountry.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/LinkTracking.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/DeliveryRate.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/Unsubscribe.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/ROI.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/UserMailAgents.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/SocialNetworks.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
    },
    {
      currentUrl: "https://reports2.fromdoppler.com/LinkTagging.aspx",
      itemUrl:
        "https://app2.fromdoppler.com/Campaigns/Reports/?_gl=1*1kw4fce*_ga",
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
