import { GetCSSVariables } from "@constants";
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
                        controlHeight: 45,
                        buttonCheckedBgDisabled: `rgb(${tertiary})`,
                        colorBorder: `rgb(${tertiary}, 0.3)`,
                        buttonCheckedColorDisabled: `rgb(${secondary})`,
                        colorBgContainerDisabled: `rgb(${secondary})`,
                        fontSize: 15,
                        controlPaddingHorizontal: 1,
                        paddingContentHorizontal: 1,
                        padding:12
                    },
                    
                    

                }
            }}>
            <Radio.Group {...props}>
                {props.children}
            </Radio.Group>
        </ConfigProvider>
    )
}

export default RadioGroupUI