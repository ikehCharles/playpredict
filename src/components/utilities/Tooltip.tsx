import { cssRgbVar } from "@constants";
import { Tooltip, TooltipProps, ConfigProvider } from "antd";

const TooltipUI: React.FC<TooltipProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            colorBgSpotlight: cssRgbVar("tertiary"),
            colorTextLightSolid: cssRgbVar("secondary"),
            borderRadius: 8,
          },
        },
      }}
    >
      <Tooltip {...props} />
    </ConfigProvider>
  );
};

export default TooltipUI;
