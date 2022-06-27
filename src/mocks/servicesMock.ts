import upgradePlanData from "./upgradePlanData.json";

export interface ClientTypePlans {
  IdUserTypePlan: number;
  Description: string;
  EmailQty: number | null;
  Fee: number | null;
  ExtraEmailCost: number | null;
  IdUserType: number;
  SubscribersQty: number;
}

export const getUpgradePlanData = (
  isSubscriber: boolean
): Promise<ClientTypePlans[]> => {
  const response = upgradePlanData.data.ClientTypePlans.map(
    ({
      IdUserTypePlan,
      Description,
      EmailQty,
      Fee,
      ExtraEmailCost,
      IdUserType,
      SubscribersQty,
    }) => ({
      IdUserTypePlan,
      Description,
      EmailQty,
      Fee,
      ExtraEmailCost,
      IdUserType,
      SubscribersQty,
    })
  );

  return new Promise<ClientTypePlans[]>((res) =>
    setTimeout(() => res(response), 900)
  );
};

export const upgradePlan = async (planModel: object) => {
  await new Promise((res) => setTimeout(() => res(planModel), 900));
};
