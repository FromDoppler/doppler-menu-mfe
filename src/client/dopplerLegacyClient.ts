import axios from "axios";
import { DopplerLegacyClientImpl } from "./DopplerLegacyClientImpl";
import { DopplerLegacyClientDummy } from "./DopplerLegacyClientDummy";
import { MaxSubscribersData } from "../components/ValidateSubscriber/types";
import { useAppConfiguration } from "../AppConfiguration";

export const useDopplerLegacyClient = () => {
  const appConfiguration = useAppConfiguration();
  const dopplerLegacyClient: DopplerLegacyClient = appConfiguration.useDummies
    ? new DopplerLegacyClientDummy()
    : new DopplerLegacyClientImpl(
        axios.create({
          baseURL: appConfiguration.dopplerLegacyBaseUrl,
          withCredentials: true,
        })
      );
  return dopplerLegacyClient;
};

export interface DopplerLegacyClient {
  getMaxSubscribersData(): Promise<MaxSubscribersData>;

  sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData
  ): Promise<boolean>;

  sendAcceptButtonAction(): Promise<boolean>;
}
