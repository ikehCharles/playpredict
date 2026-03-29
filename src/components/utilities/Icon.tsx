import React from "react";

type IconProps = {
  className?: string;
  srcHost?: "font" | "local";
  icon?: string;
};

const Icon: React.FC<IconProps> = ({ className = "", srcHost = "font", icon }) => {
  if (srcHost === "local" && icon) {
    return (
      <span
        aria-hidden
        className={`inline-block bg-current ${className}`}
        style={{
          width: "1em",
          height: "1em",
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }

  return <i className={`fi flex text-base ${icon ?? ""} ${className}`} />;
};

export default Icon;
