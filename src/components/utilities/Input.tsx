import { cssRgbVar } from "@constants";
import { Input, InputProps, ConfigProvider } from "antd";

const InputUI: React.FC<InputProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            // Border and colors
            colorBorder: cssRgbVar("tertiary", 0.2),
            colorPrimaryHover: cssRgbVar("primary"),
            colorPrimary: cssRgbVar("primary"),
            
            // Background
            colorBgContainer: cssRgbVar("secondary"),
            colorTextDisabled: cssRgbVar("tertiary", 0.8),
            
            // Text
            colorText: cssRgbVar("tertiary"),
            colorTextPlaceholder: cssRgbVar("tertiary", 0.4),
            
            // Size
            controlHeight: 45,
            borderRadius: 12,
            paddingInline: 16,
            
            // Focus state
            activeBorderColor: cssRgbVar("primary"),
            hoverBorderColor: cssRgbVar("primary", 0.6),
            
            // Shadow
            activeShadow: `0 0 0 2px ${cssRgbVar("primary", 0.1)}`,
          },
        },
      }}
    >
      <Input {...props} />
    </ConfigProvider>
  );
};

export default InputUI;
