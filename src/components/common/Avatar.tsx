"use client";

import { Avatar as AntAvatar, Badge } from "antd";
import { AvatarProps as AntAvatarProps } from "antd";

interface AvatarProps extends AntAvatarProps {
  countryFlag?: string;
  flagOffset?: [number, number];
  showCountryBadge?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  countryFlag,
  flagOffset = [-5, 30],
  showCountryBadge = false,
  ...props
}) => {
  if (showCountryBadge && countryFlag) {
    return (
      <Badge
        color="none"
        style={{ boxShadow: "none" }}
        count={countryFlag}
        offset={flagOffset}
      >
        <AntAvatar {...props} />
      </Badge>
    );
  }

  return <AntAvatar {...props} />;
};

export default Avatar;
