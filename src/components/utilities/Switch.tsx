import { GetCSSVariables } from "@constants";
import { Switch, SwitchProps, ConfigProvider } from "antd";

const DEFAULT_PRIMARY = "94, 23, 235";

const SwitchUI: React.FC<SwitchProps> = (props) => {
  const { primary } = GetCSSVariables();
  const primaryRgb = primary ? `rgb(${primary})` : `rgb(${DEFAULT_PRIMARY})`;

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: primaryRgb,
            colorPrimaryHover: primaryRgb,
          },
        },
      }}
    >
      <Switch {...props} />
    </ConfigProvider>
  );
};

export default SwitchUI;
