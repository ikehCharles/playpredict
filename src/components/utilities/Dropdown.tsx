import { GetCSSVariables } from "@constants";
import { Dropdown, DropdownProps, ConfigProvider } from "antd";

const DropdownUI: React.FC<DropdownProps> = (props) => {
  const { secondary, tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorBgElevated: `rgb(${secondary})`,
            colorText: `rgb(${tertiary})`,
            borderRadiusLG: 10,
            controlItemBgHover: `rgb(${tertiary}, 0.05)`,
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
