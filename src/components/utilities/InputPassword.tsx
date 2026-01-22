import { GetCSSVariables } from "@constants";
import { Input, InputProps, ConfigProvider } from "antd";

const { Password } = Input;

const InputPasswordUI: React.FC<InputProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            // Border and colors
            colorBorder: `rgb(${tertiary}, 0.2)`,
            colorPrimaryHover: `rgb(${primary})`,
            colorPrimary: `rgb(${primary})`,
            
            // Background
            colorBgContainer: `rgb(${secondary})`,
            
            // Text
            colorText: `rgb(${tertiary})`,
            colorTextPlaceholder: `rgb(${tertiary}, 0.4)`,
            
            // Size
            controlHeight: 45,
            fontSize: 15,
            borderRadius: 12,
            paddingInline: 16,
            
            // Focus state
            activeBorderColor: `rgb(${primary})`,
            hoverBorderColor: `rgb(${primary}, 0.6)`,
            
            // Shadow
            activeShadow: `0 0 0 2px rgba(${primary}, 0.1)`,
          },
        },
      }}
    >
      <Password {...props} />
    </ConfigProvider>
  );
};

export default InputPasswordUI;
