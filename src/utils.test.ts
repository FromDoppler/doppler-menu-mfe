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
  ])("returns true when urls are equal", ({ currentUrl, itemUrl }) => {
    expect(IsActiveUrl(currentUrl, itemUrl)).toBe(true);
  });

  it.each([
    {
      currentUrl: "https://www.test.com/watch?v=dQw4w9WgXcQ",
      itemUrl: "https://www.test.com/watch/sdsdsds",
    },
    {
      currentUrl: "www.test.com/watch",
      itemUrl: "https://www.test.com/watch",
    },
  ])("returns false when urls are not equal", ({ currentUrl, itemUrl }) => {
    expect(IsActiveUrl(currentUrl, itemUrl)).toBe(false);
  });
});
