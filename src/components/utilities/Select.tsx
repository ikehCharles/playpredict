import { GetCSSVariables } from "@constants";
import { Select, SelectProps, ConfigProvider } from "antd";

// Shared filter logic that safely handles string, number and ReactNode labels/values
const defaultFilterOption: NonNullable<
  Exclude<SelectProps["showSearch"], boolean>
>["filterOption"] = (input, option) => {
  const label = option?.label as unknown;
  const value = option?.value as unknown;
  const inputLower = (input ?? "").toLowerCase();

  // Handle string label directly
  if (typeof label === "string") {
    return label.toLowerCase().includes(inputLower);
  }

  // Fallback to value (string/number/etc.)
  if (value !== undefined && value !== null) {
    const valueStr = String(value).toLowerCase();
    if (valueStr.includes(inputLower)) return true;
  }

  // Last resort: try to stringify label (may be ReactNode)
  if (label !== undefined && label !== null) {
    try {
      const labelStr =
        typeof label === "string" ? label : String(label as unknown as string);
      return labelStr.toLowerCase().includes(inputLower);
    } catch {
      return false;
    }
  }

  return false;
};

const SelectUI: React.FC<SelectProps> = (props) => {
  const { primary, secondary, tertiary } = GetCSSVariables();

  const { showSearch, ...restProps } = props;

  // Merge caller's showSearch with our default filterOption.
  // - If showSearch is boolean or undefined, we enable search with our filter.
  // - If it's an object, we preserve their settings but inject filterOption when missing.
  let mergedShowSearch: SelectProps["showSearch"];

  if (typeof showSearch === "object" && showSearch !== null) {
    mergedShowSearch = {
      ...showSearch,
      filterOption: showSearch.filterOption ?? defaultFilterOption,
    };
  } else if (showSearch === false) {
    mergedShowSearch = false;
  } else {
    // true or undefined → enable search with our default filter
    mergedShowSearch = {
      filterOption: defaultFilterOption,
    };
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            // Border and colors
            colorBorder: `rgb(${tertiary}, 0.2)`,
            colorPrimaryHover: `rgb(${primary})`,
            colorPrimary: `rgb(${primary})`,

            // Background
            colorBgContainer: `rgb(${secondary})`,
            colorBgElevated: `rgb(${secondary})`,

            // Text
            colorText: `rgb(${tertiary})`,
            colorTextPlaceholder: `rgb(${tertiary}, 0.4)`,

            // Size
            controlHeight: 45,
            fontSize: 13,
            borderRadius: 12,

            // Dropdown
            optionActiveBg: `rgb(${primary}, 0.1)`,
            optionSelectedBg: `rgb(${primary}, 0.15)`,

            // Focus state
            colorPrimaryBorder: `rgb(${primary})`,
            controlOutline: `rgba(${primary}, 0.1)`,
          },
        },
      }}
    >
      <Select {...restProps} showSearch={mergedShowSearch} />
    </ConfigProvider>
  );
};

export default SelectUI;
