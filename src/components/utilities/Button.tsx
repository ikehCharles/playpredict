import { GetCSSVariables } from "@constants";
import { Button, ButtonProps, ConfigProvider } from "antd";

type ButtonUIProps = ButtonProps & {
  bgColor?: "primary" | "secondary" | "tertiary" | "transparent";
  textColor?: "primary" | "secondary" | "tertiary";
  borderColor?: "primary" | "secondary" | "tertiary";
  bgColorOpacity?: number; // Only values from 0.0 to 1.0
  textColorOpacity?: number; // Only values from 0.0 to 1.0
  borderColorOpacity?: number; // Only values from 0.0 to 1.0
};

const ButtonUI: React.FC<ButtonUIProps> = (props) => {
  const colors = GetCSSVariables()
  const {
    bgColor = "primary",
    textColor = "secondary",
    borderColor = "primary",
    bgColorOpacity = 1,
    textColorOpacity = 1,
    borderColorOpacity = 1,
    ...rest
  } = props;

  const colorBgContainer = bgColor === "transparent" ? "transparent" : `rgb(${colors[bgColor]}, ${bgColorOpacity ?? 1})`;
  const colorText = `rgb(${colors[textColor]}, ${textColorOpacity ?? 1})`;
  const colorBorder = `rgb(${colors[borderColor]}, ${borderColorOpacity ?? 1})`;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorBgContainer: colorBgContainer,
            controlHeight: 40,
            controlHeightXS: 30,
            controlHeightLG: 45,
            controlHeightSM: 35,
            colorBorder: colorBorder,
            paddingContentHorizontal: 14,
            fontWeight: 500,
            borderRadius: 10,
            borderRadiusSM: 10,
            borderRadiusLG: 10,
            borderRadiusXS: 10,
            colorText: colorText,
            fontSize: 14,
            fontSizeSM: 14,
            fontSizeLG: 14,
            fontSizeXL: 14,
          

          },
        },
      }}
    >
      <Button {...rest}>{props.children}</Button>
    </ConfigProvider>
  )
}

export default ButtonUI;