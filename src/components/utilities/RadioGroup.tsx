import { cssRgbVar } from "@constants";
import { ConfigProvider, Radio, RadioGroupProps } from "antd";



const RadioGroupUI: React.FC<RadioGroupProps> = (props) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Radio: {
                        buttonBg: cssRgbVar("tertiary"),
                        buttonColor: cssRgbVar("tertiary"),
                        colorTextDisabled: cssRgbVar("tertiary"),
                        controlHeight: 45,
                        buttonCheckedBgDisabled: cssRgbVar("tertiary"),
                        colorBorder: cssRgbVar("tertiary", 0.3),
                        buttonCheckedColorDisabled: cssRgbVar("secondary"),
                        colorBgContainerDisabled: cssRgbVar("secondary"),
                        controlPaddingHorizontal: 1,
                        paddingContentHorizontal: 1,
                        padding:8
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