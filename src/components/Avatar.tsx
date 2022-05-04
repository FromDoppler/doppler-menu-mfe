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
    if (size === "lg") {
      className += " user-avatar--menu";
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
