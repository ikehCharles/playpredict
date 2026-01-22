import { GetCSSVariables } from "@constants";
import { Select, SelectProps, ConfigProvider } from "antd";

const SelectUI: React.FC<SelectProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            // Border and colors
            colorBorder: `rgb(${tertiary}, 0.2)`,
            colorPrimaryHover: `rgb(${primary})`,
            colorPrimary: `rgb(${primary})`,
            
            // Background
            colorBgContainer: `rgb(${secondary})`,
            colorBgElevated: `rgb(${secondary})`,
            
            // Text
            colorText: `rgb(${tertiary})`,
            colorTextPlaceholder: `rgb(${tertiary}, 0.4)`,
            
            // Size
            controlHeight: 45,
            fontSize: 15,
            borderRadius: 12,
            
            // Dropdown
            optionActiveBg: `rgb(${primary}, 0.1)`,
            optionSelectedBg: `rgb(${primary}, 0.15)`,
            
            // Focus state
            colorPrimaryBorder: `rgb(${primary})`,
            controlOutline: `rgba(${primary}, 0.1)`,
          },
        },
      }}
    >
      <Select {...props} />
    </ConfigProvider>
  );
};

export default SelectUI;
