"use client";

import { cssRgbVar, ThemeColorName, toColor } from "@constants";
import { Tag, TagProps, ConfigProvider } from "antd";
import { useMemo } from "react";


interface TagUIProps extends TagProps {
  bgcolor?: ThemeColorName;
  bgopacity?: number;
  textcolor?: ThemeColorName;
  textopacity?: number;
  colorbycount?: number;
};


const TagUI: React.FC<TagUIProps> = (props) => {
  const bgColor = useMemo(
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
      return props.bgcolor ? toColor(props.bgcolor, props.bgopacity || 1) : undefined;
    },
    [props.bgcolor, props.colorbycount, props.bgopacity],
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: 'black',
            // colorText: props.textcolor ? toColor(props.textcolor, props.textopacity || 1) : toColor("tertiary"),
            borderRadiusSM: 9999,
            fontSizeSM: 12,
          },
        },
      }}
    >
      <Tag {...props} color={bgColor} />
    </ConfigProvider>
  );
};

export default TagUI;
