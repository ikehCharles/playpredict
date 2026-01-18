import { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker } from "../../utilities";
import { Button, ConfigProvider } from "antd";
import { IoFilterOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { GetCSSVariables } from "@/src/constants/helperFunc";


export interface Filter {
  date: Dayjs | null;
}

interface HomeFiltersProps {
  onFilterChange: (filter: Filter) => void;
}

export default function HomeFilters(props: HomeFiltersProps) {

  const { primary } = GetCSSVariables()
  const [filter, setFilter] = useState<Filter>({
    date: null,
  });

  const onChange = (val: Dayjs | Dayjs[] | null) => {
    const date = val as Dayjs;
    const newFilter = { ...filter, date: date };
    setFilter(newFilter);
    props.onFilterChange(newFilter);
  };

  return (
    <ConfigProvider
    theme={{
      components: {
        Button: {
          colorBgContainer: `rgb(${primary}, 0.1)`,
        }
      }
    }}>
    <div className="flex justify-between items-center">
      <DatePicker value={filter.date} onChange={onChange} />
    <div className="flex gap-3 items-center">
    <Button type="default" icon={<IoNotificationsOutline />} size={'middle'} />
    <Button type="default" icon={<IoSearchOutline />} size={'middle'} />
    <Button type="default" icon={<IoFilterOutline />} size={'middle'} />
    </div>

    </div>
    </ConfigProvider>
  );
}
