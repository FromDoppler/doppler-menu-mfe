const urlsWebApp = [
  {
    url: "/Dashboard/",
    menu: "dashboard",
    subMenu: "",
  },
  {
    url: "/Campaigns/Draft/",
    menu: "campaignMenu",
    subMenu: "campaignDraftMenu",
  },
  {
    url: "/Campaigns/Scheduled/",
    menu: "campaignMenu",
    subMenu: "campaignScheduledMenu",
  },
  {
    url: "/Campaigns/Sent/",
    menu: "campaignMenu",
    subMenu: "campaignSentMenu",
  },
  {
    url: "/Campaigns/TestAB/",
    menu: "campaignMenu",
    subMenu: "campaignTestABMenu",
  },
  {
    url: "/Lists/SubscribersList/",
    menu: "listMenu",
    subMenu: "listMainMenu",
  },
  {
    url: "/Lists/Segment/",
    menu: "listMenu",
    subMenu: "listSegmentMenu",
  },
  {
    url: "/Lists/MasterSubscriber/",
    menu: "listMenu",
    subMenu: "listMasterSubscriberMenu",
  },
  {
    url: "/Lists/MasterCustomFields/",
    menu: "listMenu",
    subMenu: "listCustomFieldMenu",
  },
  {
    url: "/Lists/Form/",
    menu: "listMenu",
    subMenu: "listFormMenu",
  },
  {
    url: "/Campaigns/Reports/",
    menu: "reportMenu",
    subMenu: "reportsSentCampaign",
  },
  {
    url: "/Campaigns/Reports/?redirect=subHistory",
    menu: "reportMenu",
    subMenu: "reportsSubsHistory",
  },
  {
    url: "/reports",
    menu: "reportMenu",
    subMenu: "webapp",
  },
  {
    url: "/Automation/Automation/AutomationApp/",
    menu: "automationMenu",
    subMenu: "",
  },
  {
    url: "/Templates/Main/",
    menu: "templateMenu",
    subMenu: "",
  },
];

// Match pathname with a set of predefined urls "urlsWebApp"
export const getCurrentPageForUrl = (currentUrl) => {
  return urlsWebApp.find((item) => item.url === currentUrl);
};

export const getUpdatedSubNav = (currentSubNav = [], subMenuItem) => {
  return currentSubNav.map((item) => {
    return {
      title: item.title,
      url: item.url,
      isSelected: item.idHTML === subMenuItem,
    };
  });
};

// Recursively set isSelected property in menu items
export const getUpdatedMenu = (currentUrl, nav) => {
  const currentPage = getCurrentPageForUrl(currentUrl);
  if (currentPage && currentPage.menu) {
    return nav.map((item) => {
      return {
        title: item.title,
        url: item.url,
        isSelected: item.idHTML === currentPage.menu,
        subNav: !currentPage.subMenu
          ? item.subNav
          : getUpdatedSubNav(item.subNav, currentPage.subMenu),
      };
    });
  }
  return nav;
};

// Return false if current path match an item in urlsWebApp object
export const isInactiveSection = (path) => {
  const currentPage = getCurrentPageForUrl(path);
  return !currentPage || !currentPage.menu;
};
