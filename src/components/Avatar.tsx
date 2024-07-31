import { useMemo } from "react";

interface AvatarProps {
  text: string;
  backgroundColor?: string;
  onClick?: () => void;
  size?: "md" | "lg";
}

export const Avatar = ({
  text,
  onClick,
  backgroundColor,
  size = "md",
}: AvatarProps) => {
  const onClickHandler = () => {
    onClick && onClick();
  };

  const styleProps = useMemo(() => {
    let className = "user-avatar";
    switch (size) {
      case "lg":
        className += " user-avatar--menu";
        break;
      case "md":
        className += " dp-img-account";
        break;
      default:
        break;
    }

    return {
      className,
      style: {
        background: backgroundColor,
      },
    };
  }, [backgroundColor, size]);

  return (
    <div onClick={onClickHandler} {...styleProps}>
      {text}
    </div>
  );
};
