import { Collapse, CollapseProps, ConfigProvider } from "antd";
import Icon from "./Icon";
import { ThemeColorName, toColor } from "@/src/constants";

type CollapsibleProps = CollapseProps & {
    headerBgColor?: ThemeColorName
    headerTextColor?: ThemeColorName;
    headerBorderColor?: ThemeColorName;
    headerBgColorOpacity?: number; // Only values from 0.0 to 1.0
    headerTextColorOpacity?: number; // Only values from 0.0 to 1.0
    headerBorderColorOpacity?: number; // Only values from 0.0 to 1.0
    contentBgColor?: ThemeColorName
    contentTextColor?: ThemeColorName;
    contentBorderColor?: ThemeColorName;
    contentBgColorOpacity?: number; // Only values from 0.0 to 1.0
    contentTextColorOpacity?: number; // Only values from 0.0 to 1.0
    contentBorderColorOpacity?: number; // Only values from 0.0 to 1.0
}

export default function Collapsible(props: CollapsibleProps) {


    const headerBg = toColor(props.headerBgColor || 'secondary', props.headerBgColorOpacity ?? 1);
    const headerColorText = toColor(props.headerTextColor || 'tertiary', props.headerTextColorOpacity ?? 1);
    const headerColorBorder = toColor(props.headerBorderColor || 'tertiary', props.headerBorderColorOpacity ?? 1);
    const contentBg = toColor(props.contentBgColor || 'secondary', props.contentBgColorOpacity ?? 1);
    const contentColorText = toColor(props.contentTextColor || 'tertiary', props.contentTextColorOpacity ?? 1);
    const contentColorBorder = toColor(props.contentBorderColor || 'tertiary', props.contentBorderColorOpacity ?? 1);


    return (
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        borderlessContentBg: contentBg,
                        contentBg,
                        headerBg,
                        colorText: contentColorText,
                        colorTextHeading: headerColorText,
                        colorBorder: contentColorBorder,
                        borderlessContentPadding: '0 15px',
                        
                    }
                }
            }}>
            <Collapse
                {...props}
                // activeKey={props.isOpen ? ["panel"] : []}
                bordered={false}
                expandIconPlacement="end"
                styles={{
                    header: {
                        display: 'flex',
                        alignItems: 'center',
                    }
                }}
                expandIcon={({ isActive }) => (
                    <div className="text-lg flex items-center ">
                        <Icon icon={`fi fi-ss-angle-small-down`} className={`text-tertiary/60 transition-transform ${isActive ? "rotate-180" : "rotate-0"}`} />

                    </div>
                )}
            />
        </ConfigProvider>
    );
}
