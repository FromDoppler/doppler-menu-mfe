import axios from "axios";
import { DopplerLegacyClientImpl } from "./DopplerLegacyClientImpl";
import { DopplerLegacyClientDummy } from "./DopplerLegacyClientDummy";
import { MaxSubscribersData } from "../components/ValidateSubscriber/types";

export const useDopplerLegacyClient = (baseURL?: string) => {
  const dopplerLegacyClient: DopplerLegacyClient = baseURL
    ? new DopplerLegacyClientImpl(
        axios.create({ baseURL, withCredentials: true })
      )
    : new DopplerLegacyClientDummy();
  return dopplerLegacyClient;
};

export interface DopplerLegacyClient {
  getMaxSubscribersData(): Promise<MaxSubscribersData>;

  sendMaxSubscribersData(
    maxSubscribersData: MaxSubscribersData
  ): Promise<boolean>;

  sendAcceptButtonAction(): Promise<boolean>;
}
