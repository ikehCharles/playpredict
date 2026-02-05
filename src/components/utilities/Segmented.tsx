import { GetCSSVariables } from "@constants";
import { Segmented, SegmentedProps, ConfigProvider } from "antd";

const SegmentedUI: React.FC<SegmentedProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorBgContainer: `rgb(${secondary})`,
            colorBgBase: `rgb(${secondary})`,
            colorBgBlur: `rgb(${secondary})`,
            colorBgElevated: `rgb(${secondary})`,
            colorBgContainerDisabled: `rgb(${secondary})`,
            colorBgMask: `rgb(${secondary})`,
            colorBgSolid: `rgb(${secondary})`,
            colorBgSpotlight: `rgb(${secondary})`,
            colorFillSecondary: `rgb(${secondary})`,
            cardBg: `rgb(${secondary})`,
            borderRadius:0,
            colorHighlight: `rgb(${secondary})`,
            itemColor: `rgb(${secondary})`,
            itemActiveColor: `rgb(${secondary})`,
            colorFill: `rgb(${secondary})`,
            colorPrimaryBg: `rgb(${secondary})`,
            colorWhite: `rgb(${secondary})`,
            colorInfoBg: `rgb(${secondary})`,
            colorInfoText: `rgb(${secondary})`,
            colorInfoBorder: `rgb(${secondary})`,
            colorInfo: `rgb(${secondary})`,
            itemSelectedColor: `rgb(${secondary})`,
            colorFillContent: `rgb(${secondary})`,
            colorBgSolidActive: `rgb(${secondary})`,
            // colorBgContainer: `rgb(${secondary})`,
            colorBgLayout: `rgb(${secondary})`,
            colorText: `rgb(${tertiary})`,
            colorTextLabel: `rgb(${tertiary})`,
            colorPrimary: `rgb(${primary})`,
            colorPrimaryHover: `rgb(${primary})`,
            colorPrimaryActive: `rgb(${primary})`,
            inkBarColor: `rgb(${primary})`,
          },
          Segmented: {
            // Colors
            colorBgContainer: `rgb(${secondary})`,
            borderRadius:0,
            colorBgLayout: `rgb(${secondary})`,
            colorText: `rgb(${tertiary})`,
            colorTextLabel: `rgb(${tertiary})`,
            colorBgBase: `rgb(${secondary})`,
            // Active/Selected state
            itemSelectedBg: `rgb(${primary}, 0.1)`,
            itemSelectedColor: `rgb(${primary})`,
            itemHoverBg: `rgb(${primary}, 0.05)`,
            itemHoverColor: `rgb(${primary})`,
            itemActiveBg: `rgb(${primary}, 0.15)`,
            
            // Size
            controlHeight: 45,
            fontSize: 15,

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
