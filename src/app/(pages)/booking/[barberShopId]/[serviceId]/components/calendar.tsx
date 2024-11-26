'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { isToday, isBefore, subDays, isSameDay, getDay } from 'date-fns';
import '@/app/CSS/calendar.css';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarBooking = ({ onDateChange }: { onDateChange: (date: Date | null) => void }) => {
   const [value, onChange] = useState<Value>(new Date());

   const yesterday = subDays(new Date(), 1);
   const disableDate = new Date(2024, 10, 12);

   const tileClassName = ({ date }: { date: Date }) => {
      if (isToday(date)) return 'react-calendar__tile--today';
      if (isSameDay(date, disableDate)) return 'react-calendar__tile--disabled';
      if (isBefore(date, yesterday)) return 'react-calendar__tile--disabled';
      if (getDay(date) === 0) return 'react-calendar__tile--disabled';
      return '';
   };

   const tileDisabled = ({ date }: { date: Date }) =>
      isBefore(date, yesterday) || isSameDay(date, disableDate) || getDay(date) === 0;

   const handleDateChange = (newValue: Value) => {
      onChange(newValue);
      if (newValue instanceof Date) {
         onDateChange(newValue);
      } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
         onDateChange(newValue[0]);
      }
   };

   return (
      <div className="calendar-container">
         <Calendar
            onChange={handleDateChange}
            value={value}
            className="react-calendar"
            tileClassName={tileClassName}
            tileDisabled={tileDisabled}
         />
      </div>
   );
};

export default CalendarBooking;
