import { GetCSSVariables } from "@constants";
import { Button, ButtonProps, ConfigProvider } from "antd";


const ButtonUI: React.FC<ButtonProps> = (props) => {

  const { primary } = GetCSSVariables()

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorBgContainer: `rgb(${primary}, 0.05)`,
            controlHeight: 45,
            controlHeightXS: 30,
            controlHeightLG: 45,
            controlHeightSM: 35,
            fontSize: 15,
            fontSizeLG: 20,
            fontSizeXL: 25,
            fontSizeSM: 12,
            colorBorder: `rgb(${primary}, 0.1)`,
            paddingContentHorizontal: 8,
            fontWeight:500

          },
        }
      }}>
      <Button {...props}>
        {props.children}
      </Button>
    </ConfigProvider>

  )
}

export default ButtonUI;