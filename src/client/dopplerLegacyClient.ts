import axios from "axios";
import { DopplerLegacyClientImpl } from "./DopplerLegacyClientImpl";
import { DopplerLegacyClientDummy } from "./DopplerLegacyClientDummy";
import { MaxSubscribersData } from "../components/ValidateSubscriber/types";
import { useAppConfiguration } from "../AppConfiguration";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDopplerLegacyClient = () => {
  const appConfiguration = useAppConfiguration();
  const dopplerLegacyClient: DopplerLegacyClient = appConfiguration.useDummies
    ? new DopplerLegacyClientDummy()
    : new DopplerLegacyClientImpl(
        axios.create({
          baseURL: appConfiguration.dopplerLegacyBaseUrl,
          withCredentials: true,
        }),
      );
  return dopplerLegacyClient;
};

export const useSendMaxSubscribersData = () => {
  const client = useDopplerLegacyClient();

  return useMutation(
    async (maxSubscribersData: MaxSubscribersData): Promise<boolean> => {
      return await client.sendMaxSubscribersData(maxSubscribersData);
    },
  );
};

export const useGetMaxSubscribers = () => {
  const client = useDopplerLegacyClient();

  const queryFn = async () => await client.getMaxSubscribersData();
  const queryOptions = {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  };

  return useQuery<MaxSubscribersData>(
    ["getMaxSubscribersData"],
    queryFn,
    queryOptions,
  );
};

export interface DopplerLegacyClient {
  getMaxSubscribersData(): Promise<MaxSubscribersData>;

  sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData,
  ): Promise<boolean>;

  sendAcceptButtonAction(): Promise<boolean>;
}
