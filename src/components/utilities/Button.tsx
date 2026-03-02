import { GetCSSVariables } from "@constants";
import { Button, ButtonProps, ConfigProvider } from "antd";

type ButtonUIProps = ButtonProps & {
  transparent?: boolean;
};

const ButtonUI: React.FC<ButtonUIProps> = (props) => {
  const { primary } = GetCSSVariables()
  const { transparent, ...rest } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorBgContainer: transparent ? "transparent" : `rgb(${primary}, 0.05)`,
            controlHeight: 40,
            controlHeightXS: 30,
            controlHeightLG: 45,
            controlHeightSM: 35,
            colorBorder: `rgb(${primary}, 0.1)`,
            paddingContentHorizontal: 12,
            fontWeight: 400,
          },
        },
      }}
    >
      <Button {...rest}>{props.children}</Button>
    </ConfigProvider>
  )
}

export default ButtonUI;