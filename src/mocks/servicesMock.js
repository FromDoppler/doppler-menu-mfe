import upgradePlanData from "../mocks/upgradePlanDataMock.json";

export const getUpgradePlanData = (isSubscriber) => {
  const response = upgradePlanData.data.ClientTypePlans.map((plan) => ({
    IdUserTypePlan: plan.IdUserTypePlan,
    Description: plan.Description,
    SubscribersQty: plan.SubscribersQty,
    EmailQty: plan.EmailQty,
  }));

  return new Promise((res) => setTimeout(() => res(response), 900));
};

export const upgradePlan = async (planModel) => {
  await new Promise((res) =>
    setTimeout(() => res(console.log("Plan upgrated...", planModel)), 900)
  );
};
