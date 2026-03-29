"use client";

import { cssRgbVar } from "@constants";
import { ConfigProvider } from "antd";

const ThemeConfigProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontSize: 14,
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    colorPrimary: cssRgbVar("primary"),
                    
                    colorPrimaryHover: cssRgbVar("primary"),
                    colorIcon: cssRgbVar("primary"),
                    colorText: cssRgbVar("primary"),
                    colorLink: cssRgbVar("primary"),
                    colorBgContainer: cssRgbVar("secondary"),
                    
                    colorBorderBg: cssRgbVar("primary", 0.1),
                    colorPrimaryBorder: cssRgbVar("tertiary", 0.1),
                    colorBorderSecondary: cssRgbVar("primary", 0.1),
                    colorInfoBorder: cssRgbVar("primary", 0.1),
                    colorBorderDisabled: cssRgbVar("primary", 0.1),
                    colorBgLayout: cssRgbVar("primary", 0.1),
                    

                    colorTextDisabled: cssRgbVar("primary", 0.2),
                    colorBorder: cssRgbVar("primary"),
                    colorTextPlaceholder: cssRgbVar("primary", 0.5),
                    colorBgBase: cssRgbVar("secondary"),
                    colorBgTextActive: cssRgbVar("primary"),
                    colorBgSpotlight: cssRgbVar("primary"),
                    colorHighlight: cssRgbVar("primary"),
                    colorLinkActive: cssRgbVar("primary"),
                    colorPrimaryActive: cssRgbVar("primary"),
                    colorBgTextHover: cssRgbVar("primary"),
                },
                components: {
                    Table: {
                        rowSelectedBg: cssRgbVar("primary"),
                        rowHoverBg: cssRgbVar("primary"),
                    },
                    Tabs: {
                        colorPrimary: cssRgbVar("primary"),
                        cardBg: cssRgbVar("secondary"),
                        colorBgContainer: cssRgbVar("secondary"),
                    },
                    Segmented: {
                        colorText: cssRgbVar("primary"),
                        colorTextLabel: cssRgbVar("primary"),
                    },
                    Select: {
                        colorBorder: cssRgbVar("primary"),
                        colorBgContainerDisabled: cssRgbVar("accent", 0.1),
                        optionActiveBg: cssRgbVar("primary", 0.2),
                        optionSelectedBg: cssRgbVar("primary", 0.2),
                    },
                    Checkbox: {
                        colorBorder: cssRgbVar("primary"),
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