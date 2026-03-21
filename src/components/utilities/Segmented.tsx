import { cssRgbVar } from "@constants";
import { Segmented, SegmentedProps, ConfigProvider } from "antd";

const SegmentedUI: React.FC<SegmentedProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          
          Segmented: {
           
            itemSelectedBg: cssRgbVar("primary"),
            itemSelectedColor: cssRgbVar("secondary"),
            itemHoverBg: cssRgbVar("primary", 0.05),
            itemHoverColor: cssRgbVar("tertiary"),
            itemActiveBg: cssRgbVar("primary"),
            itemColor: cssRgbVar("tertiary"),
            // Size
            controlHeight: 45,

            // Border
            trackBg: cssRgbVar("tertiary", 0.05),
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
