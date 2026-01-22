"use client";

import { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, DatePicker } from "@utilities";
import { Badge, ConfigProvider } from "antd";
import { IoFilterOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
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
          <Badge dot={hasNotifications} color="red" offset={[-5, 5]}>
            <Button
            size="large"
              icon={<IoNotificationsOutline />}
              onClick={onNotificationClick}
              aria-label="Notifications"
            />
          </Badge>
          <Button
size="large"
            icon={<IoSearchOutline />}

            onClick={onSearchClick}
            aria-label="Search"
          />
          <Button
size="large"
            icon={<IoFilterOutline />}

            onClick={onFilterClick}
            aria-label="Filter"
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
