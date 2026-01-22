import { GetCSSVariables } from "@constants";
import { Segmented, SegmentedProps, ConfigProvider } from "antd";

const SegmentedUI: React.FC<SegmentedProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            // Colors
            colorBgLayout: `rgb(${secondary})`,
            colorText: `rgb(${tertiary})`,
            colorTextLabel: `rgb(${tertiary})`,
            
            // Active/Selected state
            itemSelectedBg: `rgb(${primary}, 0.1)`,
            itemSelectedColor: `rgb(${primary})`,
            itemHoverBg: `rgb(${primary}, 0.05)`,
            itemHoverColor: `rgb(${primary})`,
            itemActiveBg: `rgb(${primary}, 0.15)`,
            
            // Size
            controlHeight: 45,
            fontSize: 15,
            borderRadius: 12,
            borderRadiusSM: 10,
            
            // Border
            trackBg: `rgb(${tertiary}, 0.05)`,
            trackPadding: 4,
          },
        },
      }}
    >
      <Segmented {...props} />
    </ConfigProvider>
  );
};

export default SegmentedUI;
