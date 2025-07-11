import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import DayMemes from "@/components/DayMemes";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameWeek, eachDayOfInterval } from "date-fns";

const Memes = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [viewingDay, setViewingDay] = useState(false);
  
  // Get current year and set July as the default month
  const currentYear = new Date().getFullYear();
  const julyDate = new Date(currentYear, 6, 15); // July is month 6 (0-indexed), use middle of month for better view
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date(currentYear, 6, 1)); // Start with first week of July

  // Create a special day 0 date (June 30th of current year)
  const dayZeroDate = new Date(currentYear, 5, 30); // June 30th (month 5, day 30)

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Allow both day 0 (June 30th) and July dates of current year
      const isDayZero = date.getTime() === dayZeroDate.getTime();
      const isJulyDate = date.getMonth() === 6 && date.getFullYear() === currentYear;
      
      if (isDayZero || isJulyDate) {
        setSelectedDate(date);
        setViewingDay(true);
      }
    }
  };

  const handleBackToCalendar = () => {
    setViewingDay(false);
    setSelectedDate(undefined);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = direction === 'prev' ? subWeeks(currentWeek, 1) : addWeeks(currentWeek, 1);
    // Only allow navigation within July of current year
    if (newWeek.getMonth() === 6 && newWeek.getFullYear() === currentYear) {
      setCurrentWeek(newWeek);
    }
  };

  const getWeekDays = (weekStart: Date) => {
    const start = startOfWeek(weekStart, { weekStartsOn: 0 }); // Start week on Sunday
    const end = endOfWeek(weekStart, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  };

  const WeekView = () => {
    const weekDays = getWeekDays(currentWeek);
    
    return (
      <div className="w-full">
        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigateWeek('prev')}
            className="h-12 w-12 rounded-full bg-purple-500 hover:bg-purple-600 text-white border-0 font-semibold p-0"
            disabled={currentWeek.getTime() <= new Date(currentYear, 6, 1).getTime()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigateWeek('next')}
            className="h-12 w-12 rounded-full bg-purple-500 hover:bg-purple-600 text-white border-0 font-semibold p-0"
            disabled={currentWeek.getTime() >= new Date(currentYear, 6, 25).getTime()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Day 0 Button for Mobile */}
        <div className="mb-4">
          <button
            onClick={() => handleDateSelect(dayZeroDate)}
            className={`
              w-full h-20 rounded-2xl font-semibold text-xl transition-all duration-200 flex items-center justify-between px-8
              cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white text-gray-700 border-2 border-gray-200 hover:border-transparent bg-white
              ${selectedDate && selectedDate.getTime() === dayZeroDate.getTime() ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg' : ''}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">
                0
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">
                  Julio se acerca
                </div>
                <div className="text-sm opacity-75">
                  {format(dayZeroDate, 'MMMM d, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="text-2xl">
              🎯
            </div>
          </button>
        </div>


        {/* Vertical Day List */}
        <div className="space-y-4">
          {weekDays.map((day) => {
            const isJulyDate = day.getMonth() === 6 && day.getFullYear() === currentYear;
            const isSelected = selectedDate && day.getTime() === selectedDate.getTime();
            const isToday = day.getTime() === new Date().getTime();
            
            return (
              <button
                key={day.getTime()}
                onClick={() => isJulyDate ? handleDateSelect(day) : null}
                disabled={!isJulyDate}
                className={`
                  w-full h-20 rounded-2xl font-semibold text-xl transition-all duration-200 flex items-center justify-between px-8
                  ${isJulyDate 
                    ? `cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white text-gray-700 border-2 border-gray-200 hover:border-transparent
                       ${isSelected ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg' : ''}
                       ${isToday ? 'bg-yellow-400 text-gray-900 border-yellow-500' : ''}` 
                    : 'text-gray-300 opacity-50 cursor-not-allowed border-2 border-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">
                    {format(day, 'd')}
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-semibold">
                      {format(day, 'EEEE')}
                    </div>
                    <div className="text-sm opacity-75">
                      {format(day, 'MMMM d, yyyy')}
                    </div>
                  </div>
                </div>
                
                {isJulyDate && (
                  <div className="text-2xl">
                    📅
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (viewingDay && selectedDate) {
    return (
      <DayMemes 
        date={selectedDate} 
        onBack={handleBackToCalendar}
        onDateChange={(newDate) => setSelectedDate(newDate)}
      />
    );
  }

  return (
          <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Memes de Julio
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20 overflow-hidden w-full max-w-6xl">
            <div className="flex justify-center items-center">
              {/* Mobile Week View */}
              <div className="block md:hidden w-full">
                <WeekView />
              </div>
              
              {/* Desktop Month View */}
              <div className="hidden md:block">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={julyDate}
                  showOutsideDays={true}
                  numberOfMonths={1}
                  fixedWeeks={true}
                  className="scale-150 md:scale-200 origin-center"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-6",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-3xl font-bold text-gray-800",
                    nav: "hidden", // Hide navigation buttons
                    table: "w-full border-collapse space-y-2",
                    head_row: "flex mb-0",
                    head_cell: "text-gray-600 rounded-md w-16 h-0 font-semibold text-xl flex items-center justify-center invisible",
                    row: "flex w-full mt-3",
                    cell: "relative p-1 text-center text-xl focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gradient-to-r [&:has([aria-selected])]:from-purple-500 [&:has([aria-selected])]:to-pink-500 [&:has([aria-selected])]:text-white [&:has([aria-selected])]:rounded-xl",
                    day: "h-16 w-16 p-0 font-semibold aria-selected:opacity-100 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white rounded-xl transition-all duration-200 cursor-pointer text-gray-700 text-xl",
                    day_selected: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
                    day_today: "bg-yellow-400 text-gray-900 font-bold",
                    day_outside: "invisible",
                    day_disabled: "invisible",
                    day_hidden: "invisible",
                  }}
                  disabled={(date) => {
                    const isJulyDate = date.getMonth() === 6 && date.getFullYear() === currentYear;
                    return !isJulyDate
                  }}
                />
                
                {/* Day 0 Button for Desktop */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleDateSelect(dayZeroDate)}
                    className={`
                      h-16 px-8 rounded-2xl font-semibold text-xl transition-all duration-200 flex items-center justify-between
                      cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white text-gray-700 border-2 border-gray-200 hover:border-transparent bg-white
                      ${selectedDate && selectedDate.getTime() === dayZeroDate.getTime() ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg' : ''}
                    `}
                    style={{ zIndex: 1000 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <div className="text-xl font-semibold">
                          Julio se acerca
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memes;
