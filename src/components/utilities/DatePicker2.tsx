import { useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker as AntDatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Icon from "./Icon";
import Button from "./Button";

const DatePicker2 = ({ value, onChange }: DatePickerProps) => {
    const [open, setOpen] = useState(false);
    const selectedDate = value ? dayjs(value as Dayjs) : dayjs();

    return (
        <div className="relative flex items-center justify-center  bg-secondary p-3 gap-3 text-sm font-semibold text-tertiary/75">
            <div className="absolute">
                <AntDatePicker
                    open={open}
                    onOpenChange={setOpen}
                    value={value as Dayjs | null}
                    onChange={onChange}
                    rootClassName=""
                    className="absolute top-0 inset-0 h-full w-full opacity-0"
                />
            </div>

            <Button
                type="text"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 p-0! h-auto!"
                aria-label="Select date"
                bgColor="transparent"
                textColor="tertiary"
            >
                <Icon icon="fi fi-rr-calendar" className="text-sm text-tertiary/70" />
                <span>
                    {selectedDate.isSame(dayjs(), "day")
                        ? "Today"
                        : selectedDate.isSame(dayjs().subtract(1, "day"), "day")
                            ? "Yesterday"
                            : selectedDate.format("ddd, DD MMM YYYY")}
                </span>
            </Button>
        </div>
    );
};

export default DatePicker2;
