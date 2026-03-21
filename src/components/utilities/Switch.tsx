import { cssRgbVar } from "@constants";
import { Switch, SwitchProps, ConfigProvider } from "antd";

const SwitchUI: React.FC<SwitchProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: cssRgbVar("primary"),
            colorPrimaryHover: cssRgbVar("primary"),
          },
        },
      }}
    >
      <Switch {...props} />
    </ConfigProvider>
  );
};

export default SwitchUI;
