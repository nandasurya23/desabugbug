import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const DateTimePicker = ({ 
  label, 
  value, 
  onChange, 
  type = 'date', // 'date' | 'time'
  placeholder = 'Pilih...',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const popoverRef = useRef(null);

  // Parse initial value for calendar
  useEffect(() => {
    if (type === 'date' && value) {
      const parsed = parseISO(value);
      if (isValid(parsed)) {
        setCurrentMonth(parsed);
      }
    }
  }, [value, type]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // DATE PICKER LOGIC
  const nextMonth = (e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(addMonths(currentMonth, 1)); };
  const prevMonth = (e) => { e.preventDefault(); e.stopPropagation(); setCurrentMonth(subMonths(currentMonth, 1)); };
  
  const handleDateClick = (day) => {
    onChange(format(day, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    // Weekday headers
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(
        <div key={i} className="text-center text-xs font-bold text-gray-500 mb-2">
          {format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), 'EEE', { locale: id })}
        </div>
      );
    }

    const selectedDate = value && isValid(parseISO(value)) ? parseISO(value) : null;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer text-sm transition-colors ${
              !isCurrentMonth 
                ? 'text-gray-300' 
                : isSelected 
                  ? 'bg-primary-600 text-white font-bold shadow-md' 
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="p-4 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 w-[320px] absolute z-50 mt-2">
        <div className="flex justify-between items-center mb-6 px-2">
          <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} className="text-gray-600"/></button>
          <span className="font-bold text-gray-800 capitalize text-base">
            {format(currentMonth, 'MMMM yyyy', { locale: id })}
          </span>
          <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} className="text-gray-600"/></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">{weekdays}</div>
        <div className="space-y-1">{rows}</div>
      </div>
    );
  };

  // TIME PICKER LOGIC
  const handleTimeChange = (hour, minute) => {
    onChange(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);
  };

  const renderTimePicker = () => {
    const currentHour = value ? value.split(':')[0] : '09';
    const currentMin = value ? value.split(':')[1] : '00';

    const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']; 

    return (
      <div className="p-4 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 w-64 absolute z-50 mt-2 flex gap-4">
        <div className="flex-1 h-56 overflow-y-auto no-scrollbar border-r border-gray-100 pr-3 space-y-1">
          <div className="text-xs font-bold text-gray-400 mb-3 sticky top-0 bg-white/90 backdrop-blur-sm py-1">JAM</div>
          {hours.map(h => (
            <div 
              key={h}
              onClick={() => handleTimeChange(h, currentMin)}
              className={`px-4 py-2 rounded-xl cursor-pointer text-sm text-center transition-colors ${h === currentHour ? 'bg-primary-600 text-white font-bold shadow-md' : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600 font-medium'}`}
            >
              {h}
            </div>
          ))}
        </div>
        <div className="flex-1 h-56 overflow-y-auto no-scrollbar pl-1 space-y-1">
          <div className="text-xs font-bold text-gray-400 mb-3 sticky top-0 bg-white/90 backdrop-blur-sm py-1">MENIT</div>
          {minutes.map(m => (
            <div 
              key={m}
              onClick={() => { handleTimeChange(currentHour, m); setIsOpen(false); }}
              className={`px-4 py-2 rounded-xl cursor-pointer text-sm text-center transition-colors ${m === currentMin ? 'bg-primary-600 text-white font-bold shadow-md' : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600 font-medium'}`}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // DISPLAY FORMATTING
  const displayValue = () => {
    if (!value) return '';
    if (type === 'date') {
      try {
        return format(parseISO(value), 'd MMMM yyyy', { locale: id });
      } catch (e) {
        return value;
      }
    }
    return value; // Time is already HH:mm
  };

  return (
    <div className="relative" ref={popoverRef}>
      {label && (
        <label className="label-text mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`input-field flex items-center justify-between cursor-pointer ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {displayValue() || placeholder}
        </span>
        {type === 'date' ? (
          <CalendarIcon size={18} className="text-gray-400" />
        ) : (
          <Clock size={18} className="text-gray-400" />
        )}
      </div>
      {isOpen && (
        type === 'date' ? renderCalendar() : renderTimePicker()
      )}
    </div>
  );
};

export default DateTimePicker;
