import { GetCSSVariables } from "@constants";
import { Tag, TagProps, ConfigProvider } from "antd";

const TagUI: React.FC<TagProps> = (props) => {
  const { tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: `rgb(${tertiary})`,
            borderRadiusSM: 9999,
            fontSizeSM: 12,
          },
        },
      }}
    >
      <Tag {...props} />
    </ConfigProvider>
  );
};

export default TagUI;
