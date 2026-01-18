import { GetCSSVariables } from "@/src/constants/helperFunc";
import { Button, ButtonProps, ConfigProvider } from "antd";


const ButtonUI: React.FC<ButtonProps> = (props) => {

    const { primary } = GetCSSVariables()

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorBgContainer: `rgb(${primary}, 0.1)`,
                        controlHeight: 40
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