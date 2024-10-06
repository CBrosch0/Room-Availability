import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface CalendarProps {
    selectedDate: Date | null
    onChange: (date: Date | null) => void
}

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="yyyy/MM/dd"
            className="bg-gray-800 outline-none p-3 rounded-md w-full"
        />
    )
}
