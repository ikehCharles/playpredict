import { cssRgbVar } from "@constants";
import { Input, ConfigProvider } from "antd";
import type { TextAreaProps } from "antd/es/input";

const { TextArea } = Input;

const TextAreaUI: React.FC<TextAreaProps> = (props) => {
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

            // Text
            colorText: cssRgbVar("tertiary"),
            colorTextPlaceholder: cssRgbVar("tertiary", 0.4),

            // Size
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
      <TextArea {...props} />
    </ConfigProvider>
  );
};

export default TextAreaUI;
