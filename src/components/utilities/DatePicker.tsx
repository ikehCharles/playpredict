import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Icon } from '@utilities';


const DatePickerUI: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)

  return (


    <Space className='relative bg-secondary/5 py-0.5 rounded-xl w-45 ' vertical>

      <DatePicker
        open={open}
        onOpenChange={setOpen}
        className='opacity-0 top-0 absolute w-full h-full'
        onChange={onChange}
        value={value as Dayjs | null} />
      <p className='absolute border border-tertiary/10 rounded-xl flex left-0 w-full h-full justify-between p-1 items-center text-sm text-primary top-0' >
        <span
          onClick={() => {
            if (onChange) {
              const selectedDate = value ? dayjs(value as Dayjs) : dayjs();
              const prevDate = selectedDate.subtract(1, 'day');
              onChange(prevDate, prevDate.format('YYYY-MM-DD'));
            }
          }}
          className='cursor-pointer border border-primary/5 bg-primary/5 p-2 rounded-lg'>

          <Icon className="fi-rr-angle-small-left" />

        </span>
        <span className='cursor-pointer font-semibold' onClick={() => setOpen(open => !open)}>
          {(() => {
            const selectedDate = value ? dayjs(value as Dayjs) : dayjs();
            if (selectedDate.isSame(dayjs(), 'day')) return 'Today';
            if (selectedDate.isSame(dayjs().subtract(1, 'day'), 'day')) return 'Yesterday';
            return (
              <>
                {selectedDate.format('ddd')} {selectedDate.format('MMM. DD')}
              </>
            );
          })()}
        </span>
        <span
          className='cursor-pointer border border-primary/5 bg-primary/5 p-2 rounded-lg'
          onClick={() => {
            if (onChange) {
              const selectedDate = value ? dayjs(value as Dayjs) : dayjs();
              const nextDate = selectedDate.add(1, 'day');
              onChange(nextDate, nextDate.format('YYYY-MM-DD'));
            }
          }}
        >
          <Icon className="fi-rr-angle-small-right" />
        </span>
      </p>

    </Space>
  )
};

export default DatePickerUI;