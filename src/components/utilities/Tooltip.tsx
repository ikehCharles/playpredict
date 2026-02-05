import { GetCSSVariables } from "@constants";
import { Tooltip, TooltipProps, ConfigProvider } from "antd";

const TooltipUI: React.FC<TooltipProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            colorBgSpotlight: `rgb(${tertiary})`,
            colorTextLightSolid: `rgb(${secondary})`,
            borderRadius: 8,
            fontSize: 13,
          },
        },
      }}
    >
      <Tooltip {...props} />
    </ConfigProvider>
  );
};

export default TooltipUI;
