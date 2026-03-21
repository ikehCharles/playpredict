"use client";

import { cssRgbVar, GetActualColor } from "@constants";
import { Tag, TagProps, ConfigProvider } from "antd";
import { useMemo } from "react";

const TagUI: React.FC<TagProps> = (props) => {
  const color = useMemo(
    () => (props.color ? GetActualColor(props.color, props.color) : undefined),
    [props.color],
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: cssRgbVar("tertiary"),
            borderRadiusSM: 9999,
            fontSizeSM: 12,
          },
        },
      }}
    >
      <Tag {...props} color={color} />
    </ConfigProvider>
  );
};

export default TagUI;
