import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import {  DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { IoCalendarOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';


const DatePickerUI: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)

  return (


    <Space className='relative bg-primary/5 py-1 rounded-lg ' vertical>


      <DatePicker
        open={open}
        onOpenChange={setOpen}
        className='opacity-0 top-0 absolute w-full h-full'
        onChange={onChange}
        value={value as Dayjs | null} />
      <p className='absolute flex left-0 w-full h-full justify-center gap-2 items-center text-sm text-primary top-0' onClick={() => setOpen(open => !open)}>
        <HiOutlineChevronLeft />
        <IoCalendarOutline />
        {value ? dayjs(value as Dayjs).format('MMM. DD') : dayjs().format('MMM. DD')}
        <HiOutlineChevronRight />

      </p>
    </Space>
  )
};

export default DatePickerUI;