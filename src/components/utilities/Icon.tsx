import React from "react";

type IconProps = {
  className?: string;
};

const Icon: React.FC<IconProps> = ({ className = "" }) => {
  return <i className={`fi flex text-base ${className}`} />;
};

export default Icon;
