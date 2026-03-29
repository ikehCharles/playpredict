import { ThemeColorName, toColor } from "@constants";
import { Button, ButtonProps, ConfigProvider } from "antd";

type ButtonUIProps = ButtonProps & {
  bgColor?: Exclude<ThemeColorName, "background" | "error" | "success"> | "transparent";
  textColor?: Exclude<ThemeColorName, "background" | "error" | "success">;
  borderColor?: Exclude<ThemeColorName, "background" | "error" | "success">;
  bgColorOpacity?: number; // Only values from 0.0 to 1.0
  textColorOpacity?: number; // Only values from 0.0 to 1.0
  borderColorOpacity?: number; // Only values from 0.0 to 1.0
  borderradius?: number; // In pixels
  ctrlheight?: number; // In pixels or any valid CSS height value
  defaultShadow?: string;
};

const ButtonUI: React.FC<ButtonUIProps> = (props) => {
  const {
    bgColor = "primary",
    textColor = "secondary",
    borderColor = "primary",
    bgColorOpacity = 1,
    textColorOpacity = 1,
    borderColorOpacity = 1,
    defaultShadow,
    ...rest
  } = props;


  const colorBgContainer =
    bgColor === "transparent"
      ? "transparent"
      : toColor(bgColor, bgColorOpacity ?? 1);
  const colorText = toColor(textColor, textColorOpacity ?? 1);
  const colorBorder = toColor(borderColor, borderColorOpacity ?? 1);
  const borderradius = props.borderradius || 10; // Default to 10px if not provided


  return (
    <ConfigProvider
      theme={{

        components: {
          Button: {
            colorBgContainer,
            colorBgBase: colorBgContainer,
            colorPrimary: colorBgContainer,
            controlHeight: Math.max(props.ctrlheight ?? 40, 1),
            controlHeightXS: Math.max((props.ctrlheight ?? 40) - 10, 1),
            controlHeightLG: Math.max((props.ctrlheight ?? 40) + 5, 1),
            controlHeightSM: Math.max((props.ctrlheight ?? 40) - 5, 1),
            colorBorder,
            fontWeight: 500,
            borderRadius: borderradius,
            borderRadiusSM: borderradius,
            borderRadiusLG: borderradius,
            borderRadiusXS: borderradius,
            colorText,
            fontSize: 14,
            fontSizeSM: 14,
            fontSizeLG: 14,
            fontSizeXL: 14,
            defaultShadow: defaultShadow,
          },
        },
      }}
    >
      <Button
        {...rest}
      >{props.children}</Button>
    </ConfigProvider>
  )
}

export default ButtonUI;