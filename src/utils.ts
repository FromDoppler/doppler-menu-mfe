import { UserData } from "./model";

const sanitizeUrlToCompare = (url: string): string =>
  url
    .replace(/^https?:\/\//, "//")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

export const IsActiveUrl = (currentUrl: string, itemUrl: string): boolean =>
  sanitizeUrlToCompare(currentUrl) === sanitizeUrlToCompare(itemUrl);

const deepCopy = (source: any): UserData => {
  return Array.isArray(source)
    ? source.map((item) => deepCopy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : typeof source === "object"
    ? Object.getOwnPropertyNames(source).reduce(
        (object, prop) => {
          object[prop] = deepCopy((source as { [key: string]: any })[prop]);
          return object;
        },
        { ...source }
      )
    : source;
};

const stringToBoolean = (value: string): boolean => {
  const stringBooleans = ["true", "false"];
  if (!stringBooleans.includes(value))
    throw new Error(`String value expected to be "true" or "false"`);
  return value === "true" ? true : false;
};

const stringToNumber = (value: string): number => {
  const number = Number(value);
  if (isNaN(number)) throw new Error(`Can't convert String value to Number`);
  return number;
};

export const parseUserData = (data: any): UserData => {
  const userData: UserData = deepCopy(data);

  // Booleans
  const isSubscribers = data?.user?.plan?.isSubscribers;
  if (isSubscribers && typeof isSubscribers === "string") {
    userData.user.plan.isSubscribers = stringToBoolean(isSubscribers);
  }

  // Numbers
  const maxSubscribers = data?.user?.plan?.maxSubscribers;
  if (maxSubscribers && typeof maxSubscribers === "string") {
    userData.user.plan.maxSubscribers = stringToNumber(maxSubscribers);
  }

  const remainingCredits = data?.user?.plan?.remainingCredits;
  if (remainingCredits && typeof remainingCredits === "string") {
    userData.user.plan.remainingCredits = stringToNumber(remainingCredits);
  }

  return userData;
};
