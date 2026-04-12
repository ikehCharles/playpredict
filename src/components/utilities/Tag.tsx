"use client";

import { cssRgbVar, ThemeColorName, toColor } from "@constants";
import { Tag, TagProps, ConfigProvider } from "antd";
import { useMemo } from "react";


interface TagUIProps extends TagProps {
  color?: ThemeColorName;
  colorbycount?: number;
};


const TagUI: React.FC<TagUIProps> = (props) => {
  const color = useMemo(
    () => {
      if (props.colorbycount !== undefined) {
        // if lower than 30 return error, if higher than 70 return success, else return warning
        if (props.colorbycount < 30) {
          return toColor("error");
        } else if (props.colorbycount > 70) {
          return toColor("success");
        } else {
          return toColor("warning");
        }
      }
      return props.color ? toColor(props.color) : undefined;
    },
    [props.color, props.colorbycount],
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: cssRgbVar("tertiary"),
            borderRadiusSM: 9999,
            fontSizeSM: 12
          },
        },
      }}
    >
      <Tag {...props} color={color} />
    </ConfigProvider>
  );
};

export default TagUI;
