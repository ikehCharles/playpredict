import { GetCSSVariables } from "@constants";
import { Input, ConfigProvider } from "antd";
import type { TextAreaProps } from "antd/es/input";

const { TextArea } = Input;

const TextAreaUI: React.FC<TextAreaProps> = (props) => {
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
      <TextArea {...props} />
    </ConfigProvider>
  );
};

export default TextAreaUI;
