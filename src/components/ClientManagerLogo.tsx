import { ClientManager } from "../model";

export const ClientManagerLogo = ({
  clientManager,
}: {
  clientManager: ClientManager;
}) => {
  return (
    <div className="dp-logo--cm">
      {clientManager.logo ? (
        <img alt={clientManager.companyName} src={clientManager.logo} />
      ) : (
        <span>{clientManager.companyName}</span>
      )}
    </div>
  );
};
