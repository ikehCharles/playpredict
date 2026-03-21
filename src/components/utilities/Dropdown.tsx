import { cssRgbVar } from "@constants";
import { Dropdown, DropdownProps, ConfigProvider } from "antd";

const DropdownUI: React.FC<DropdownProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorBgElevated: cssRgbVar("secondary"),
            colorText: cssRgbVar("tertiary"),
            borderRadiusLG: 10,
            controlItemBgHover: cssRgbVar("tertiary", 0.05),
            colorError: "rgb(228, 25, 85)",
            paddingBlock: 8,
          },
        },
      }}
    >
      <Dropdown {...props} />
    </ConfigProvider>
  );
};

export default DropdownUI;
