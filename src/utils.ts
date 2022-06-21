const stringToBoolean = (value: string) => {
  const stringBooleans = ["true", "false"];
  if (value && stringBooleans.includes(value)) {
    return value === "true" ? true : false;
  }
  return value;
};

const stringToNumber = (value: string) => {
  const number = Number(value);
  if (isNaN(number)) return value;
  return number;
};

export const parseUserData = (data: any) => {
  // Booleans
  const isSubscribers = data?.user?.plan?.isSubscribers;
  if (isSubscribers && typeof isSubscribers === "string") {
    data.user.plan.isSubscribers = stringToBoolean(isSubscribers);
  }

  // Numbers
  const maxSubscribers = data?.user?.plan?.maxSubscribers;
  if (maxSubscribers && typeof maxSubscribers === "string") {
    data.user.plan.maxSubscribers = stringToNumber(maxSubscribers);
  }

  const remainingCredits = data?.user?.plan?.remainingCredits;
  if (remainingCredits && typeof remainingCredits === "string") {
    data.user.plan.remainingCredits = stringToNumber(remainingCredits);
  }

  return data;
};
