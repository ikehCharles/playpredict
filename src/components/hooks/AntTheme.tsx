"use client";

import { GetCSSVariables } from "@constants";
import { ConfigProvider } from "antd";

const ThemeConfigProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const { primary, secondary, tertiary, accent } = GetCSSVariables();



    return (
        <ConfigProvider
            theme={{
                token: {
                    fontSize: 16,
                    colorPrimary: `rgb(${primary})`,
                    colorPrimaryHover: `rgb(${primary})`,
                    colorIcon: `rgb(${primary})`,
                    colorText: `rgb(${primary})`,

                    colorBgContainer: `rgb(${secondary})`,
                    
                    colorBorderBg:`rgb(${primary}, 0.1)`,
                    colorPrimaryBorder:`rgb(${tertiary}, 0.1)`,
                    colorBorderSecondary:`rgb(${primary}, 0.1)`,
                    colorInfoBorder:`rgb(${primary}, 0.1)`,
                    colorBorderDisabled:`rgb(${primary}, 0.1)`,
                    colorBgLayout:`rgb(${primary}, 0.1)`,
                    

                    colorTextDisabled: `rgb(${primary}, 0.2)`,
                    colorBorder: `rgb(${primary})`,
                    colorTextPlaceholder: `rgb(${primary}, 0.5)`,
                    colorBgBase: `rgb(${secondary})`,
                    colorBgTextActive: `rgb(${primary})`,
                    colorBgSpotlight: `rgb(${primary})`,
                    colorHighlight: `rgb(${primary})`,
                    colorLinkActive: `rgb(${primary})`,
                    colorPrimaryActive: `rgb(${primary})`,
                    colorBgTextHover: `rgb(${primary})`,
                },
                components: {
                    Table: {
                        rowSelectedBg: `rgb(${primary})`,
                        rowHoverBg: `rgb(${primary})`,
                    },
                    Tabs: {
                        colorPrimary: `rgb(${primary})`,
                        cardBg: `rgb(${secondary})`,
                        colorBgContainer: `rgb(${secondary})`,
                    },
                    Segmented: {
                        colorText: `rgb(${primary})`,
                        colorTextLabel: `rgb(${primary})`,
                    },
                    Select: {
                        colorBorder: `rgb(${primary})`,
                        colorBgContainerDisabled: `rgb(${accent},0.1)`,
                        optionActiveBg: `rgb(${primary}, 0.2)`,
                        optionSelectedBg: `rgb(${primary}, 0.2)`,
                    },
                    Checkbox: {
                        colorBorder: `rgb(${primary})`,
                    },
                   
                    Steps: {
                        colorPrimary: "rgb(42, 227, 63)",
                        colorSplit: "rgb(240, 240, 240, 0.5)",
                        descriptionMaxWidth: 220,
                        // colorPrimaryBorder: "rgb(240, 240, 240, 1)",
                        colorTextDisabled: "rgb(240, 240, 240, 0.5)",

                        colorTextDescription: "rgb(240, 240, 240, 0.5)",

                        colorText: "rgb(42, 227, 63)",
                    },
                    

                },

            }}
        >{props.children}</ConfigProvider>
    )
}

export default ThemeConfigProvider;