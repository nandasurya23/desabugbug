import React, { useState, useMemo, useCallback } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, addDays, parseISO, isWithinInterval
} from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

const DigitalCalendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day) => setSelectedDate(day);

  // Helper to check if an event falls on a specific day
  const isEventOnDay = useCallback((event, day) => {
    try {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate || event.startDate); // Use start if no end
      
      // If it's a single day event
      if (!event.endDate || event.startDate === event.endDate) {
        return isSameDay(start, day);
      }
      
      // If it spans multiple days
      return isWithinInterval(day, { start, end }) || isSameDay(start, day) || isSameDay(end, day);
    } catch(e) {
      return false;
    }
  }, []);

  const eventsOnSelectedDate = useMemo(() => events.filter(e => isEventOnDay(e, selectedDate)), [events, selectedDate, isEventOnDay]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: id })}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold text-xs md:text-sm text-gray-500 py-2 uppercase tracking-wider">
          {format(addDays(startDate, i), 'EEE', { locale: id })}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 bg-gray-50/50 rounded-t-xl">{days}</div>;
  };

  const renderCells = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        // Find events for this specific day
        const dayEvents = events.filter(e => isEventOnDay(e, cloneDay));
        
        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`min-h-[60px] md:min-h-[100px] border-b border-r border-gray-100 p-1 md:p-2 cursor-pointer transition-all flex flex-col items-center md:items-end ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-50 text-gray-300'
                : isSameDay(day, selectedDate)
                ? 'bg-primary-50'
                : 'bg-white hover:bg-gray-50 text-gray-800'
            }`}
          >
            <div className={`${isSameDay(day, new Date()) ? 'font-bold text-primary-600' : ''} mb-1 md:mb-0`}>
              <span className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-xs md:text-sm rounded-full ${isSameDay(day, selectedDate) ? 'bg-primary-600 text-white font-bold shadow-sm' : ''}`}>
                {formattedDate}
              </span>
            </div>
            
            {/* Event Indicators */}
            <div className="flex flex-row md:flex-col gap-1 md:gap-1 overflow-hidden w-full justify-center md:justify-end mt-auto md:mt-1">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <React.Fragment key={idx}>
                  {/* Mobile Dot */}
                  <div className="w-1.5 h-1.5 md:hidden bg-purple-500 rounded-full"></div>
                  {/* Desktop Text */}
                  <div className="hidden md:block text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded truncate font-medium w-full text-left">
                    {event.title}
                  </div>
                </React.Fragment>
              ))}
              {dayEvents.length > 3 && (
                <React.Fragment>
                  <div className="w-1.5 h-1.5 md:hidden bg-gray-400 rounded-full"></div>
                  <div className="hidden md:block text-[10px] text-gray-500 font-medium pl-1 text-left w-full">
                    +{dayEvents.length - 3} lagi
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  }, [currentDate, selectedDate, events, isEventOnDay]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calendar Grid */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
        {renderHeader()}
        {renderDays()}
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-inner bg-gray-50">
          {renderCells}
        </div>
      </div>

      {/* Event Details Sidebar */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Jadwal Acara</h3>
            <p className="text-primary-600 font-medium">
              {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: id })}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {eventsOnSelectedDate.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-300 mb-4">
                <CalendarIcon size={32} />
              </div>
              <p className="text-gray-500 font-medium">Tidak ada acara pada tanggal ini.</p>
            </div>
          ) : (
            eventsOnSelectedDate.map((event, idx) => (
              <div key={idx} className="group">
                {event.image_url ? (
                  <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover rounded-2xl mb-4 shadow-sm" loading="lazy" decoding="async" />
                ) : (
                  <img 
                    src="/default.jpeg" 
                    alt="Acara Komunitas" 
                    className="w-full h-40 object-cover rounded-2xl mb-4 shadow-sm opacity-90" 
                    loading="lazy" 
                    decoding="async"
                  />
                )}
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h4>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Clock size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                    <span>
                      {event.startTime || '-'} s/d {event.endTime || '-'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <span>{event.location}</span>
                      {event.map_iframe && (
                        <div className="mt-1.5">
                          <a 
                            href={event.map_iframe.startsWith('<iframe') ? (event.map_iframe.match(/src="([^"]+)"/) || [])[1] || '#' : event.map_iframe} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg text-xs font-semibold transition-colors w-fit"
                          >
                            <MapPin size={14} /> Buka di Google Maps
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {event.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalCalendar;
