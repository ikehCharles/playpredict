import { toColor } from "@constants";
import { Drawer, DrawerProps, ConfigProvider } from "antd";

const DrawerUI: React.FC<DrawerProps> = (props) => {
  const colorBg = toColor("background", 1);
  const colorText = toColor("tertiary", 1);
  const colorBorder = toColor("tertiary", 0.1);

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgElevated: colorBg,
            colorText,
            colorBorder,
            colorSplit: colorBorder,
            colorIcon: colorText,
            colorIconHover: colorText,
            borderRadiusLG: 0,
            padding: 0,
            paddingLG: 0,
          },
        },
      }}
    >
      <Drawer {...props} />
    </ConfigProvider>
  );
};

export default DrawerUI;
