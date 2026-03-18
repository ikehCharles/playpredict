import { Badge, BadgeProps, ConfigProvider } from "antd";

const BadgeUI: React.FC<BadgeProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Badge: {
            colorBorderBg: "transparent",
            statusSize: 10,
          },
        },
      }}
    >
      <Badge
        {...props}
        style={{ boxShadow: "none", ...props.style }}
      />
    </ConfigProvider>
  );
};

export default BadgeUI;
