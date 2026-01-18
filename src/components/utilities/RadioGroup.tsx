import { GetCSSVariables } from "@/src/constants/helperFunc";
import { ConfigProvider, Radio, RadioGroupProps } from "antd";



const RadioGroupUI: React.FC<RadioGroupProps> = (props) => {
    const { secondary, tertiary } = GetCSSVariables()

    return (
        <ConfigProvider
            theme={{
                components: {
                    Radio: {
                        buttonBg: `rgb(${tertiary})`,
                        buttonColor: `rgb(${tertiary})`,
                        colorTextDisabled: `rgb(${tertiary})`,
                        controlHeight: 40,
                        buttonCheckedBgDisabled: `rgb(${tertiary})`,
                        colorBorder: `rgb(${tertiary}, 0.3)`,
                        buttonCheckedColorDisabled: `rgb(${secondary})`,
                        colorBgContainerDisabled: `rgb(${secondary})`,

                    }
                }
            }}>
            <Radio.Group {...props}>
                {props.children}
            </Radio.Group>
        </ConfigProvider>
    )
}

export default RadioGroupUI