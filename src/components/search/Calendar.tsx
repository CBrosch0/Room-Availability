// CalendarInput.tsx
import React from 'react'

const Calendar: React.FC<{
    selectedDate: string
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ selectedDate, handleDateChange }) => (
    <div className="mt-4">
        <label
            htmlFor="reservation-date"
            className="block mb-2 font-bold text-lg"
        >
            Reserve a Date
        </label>
        <input
            type="date"
            id="reservation-date"
            className="bg-gray-800 text-white outline-none p-3 rounded-md w-full"
            value={selectedDate}
            onChange={handleDateChange}
        />
        {selectedDate && (
            <p className="mt-2 text-gray-100">
                Selected Date: {new Date(selectedDate).toLocaleDateString()}
            </p>
        )}
    </div>
)

export default Calendar
