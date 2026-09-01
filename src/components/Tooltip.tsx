import "./Tooltip.css";

export const Tooltip = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <span className="dp-tooltip-container">
      {children}
      <span className="dp-tooltip" role="tooltip">
        {label}
      </span>
    </span>
  );
};
