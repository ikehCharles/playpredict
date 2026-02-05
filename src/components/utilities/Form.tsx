import { GetCSSVariables } from "@constants";
import { Form, FormProps, ConfigProvider } from "antd";

function FormUI<Values = unknown>(props: FormProps<Values>) {
  const { tertiary } = GetCSSVariables();

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: `rgb(${tertiary})`,
            labelFontSize: 14,
            verticalLabelPadding: "0 0 6px",
          },
          
        },
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Form {...(props as any)} />
    </ConfigProvider>
  );
}

// Attach static methods from Ant Design Form
FormUI.Item = Form.Item;
FormUI.useForm = Form.useForm;
FormUI.useWatch = Form.useWatch;
FormUI.List = Form.List;
FormUI.Provider = Form.Provider;

export default FormUI;
