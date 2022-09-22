import React, { createContext, useContext } from "react";

export interface AppConfiguration {
  dopplerMenuElementId?: string;
  useDummies?: boolean;
  dopplerLegacyBaseUrl?: string;
  onStatusUpdate?: (status: string) => void;
}

const DopplerLegacyContext = createContext<AppConfiguration>({
  useDummies: true,
});

export const AppConfigurationProvider = ({
  configuration,
  children,
}: {
  configuration: AppConfiguration;
  children: React.ReactNode;
}) => {
  return (
    <DopplerLegacyContext.Provider value={configuration}>
      {children}
    </DopplerLegacyContext.Provider>
  );
};

export function useAppConfiguration() {
  return useContext(DopplerLegacyContext);
}
