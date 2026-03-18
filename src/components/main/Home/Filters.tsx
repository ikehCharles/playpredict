"use client";

import { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, DatePicker, Icon } from "@utilities";
import { Badge, ConfigProvider } from "antd";
import { GetCSSVariables } from "@constants";

export interface Filter {
  date: Dayjs | null;
}

interface HomeFiltersProps {
  onFilterChange: (filter: Filter) => void;
  onNotificationClick?: () => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  hasNotifications?: boolean;
}

export default function HomeFilters({
  onFilterChange,
  onNotificationClick,
  onSearchClick,
  onFilterClick,
  hasNotifications = true,
}: HomeFiltersProps) {
  const { primary } = GetCSSVariables();
  const [filter, setFilter] = useState<Filter>({
    date: null,
  });

  const onChange = (val: Dayjs | Dayjs[] | null) => {
    const date = val as Dayjs;
    const newFilter = { ...filter, date: date };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorBgContainer: `rgb(${primary}, 0.1)`,
          },
        },
      }}
    >
      <div className="flex justify-between items-center">
        {/* Date Picker */}
        <DatePicker value={filter.date} onChange={onChange} />

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">

          <Badge size="small" className="text-xs!" style={{ padding:' 0 3px', fontSize: 10, fontWeight: 500}} count={2} color="red" offset={[-10, 8]}>
            <Button
              size="small"
              bgColorOpacity={0.05}
              borderColorOpacity={0.05}
              textColor="primary"
              icon={
                <Icon className="fi-rr-bell" />
              }
              onClick={onNotificationClick}
              aria-label="Notifications"
            />
          </Badge>


          <Button
            size="small"
            bgColorOpacity={0.05}
            borderColorOpacity={0.05}
            textColor="primary"
            icon={
             <Icon className="fi-rr-search" />
            }
            onClick={onSearchClick}
            aria-label="Search"
          />
          <Button
            size="small"
            bgColorOpacity={0.05}
            borderColorOpacity={0.05}
            textColor="primary"
            icon={
            <Icon className="fi-rr-settings-sliders" />
            }

            onClick={onFilterClick}
            aria-label="Filter"
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
