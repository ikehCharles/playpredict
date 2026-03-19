import { GetCSSVariables } from "@constants";
import { Segmented, SegmentedProps, ConfigProvider } from "antd";

const SegmentedUI: React.FC<SegmentedProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          
          Segmented: {
           
            itemSelectedBg: `rgb(${primary})`,
            itemSelectedColor: `rgb(${secondary})`,
            itemHoverBg: `rgb(${primary}, 0.05)`,
            itemHoverColor: `rgb(${tertiary})`,
            itemActiveBg: `rgb(${primary})`,
            itemColor: `rgb(${tertiary})`,
            // Size
            controlHeight: 45,

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
