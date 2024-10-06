import { useState } from 'react'
import type { roomList } from '../../pages/Search.tsx'
import '@/styles/search.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import DatePicker from 'react-datepicker' // For date picking, you'll need to install react-datepicker

// Define the schema for form validation using Zod
const roomAvailabilitySchema = z.object({
    date: z.string().nonempty('Please select a date'),
    startTime: z.string().nonempty('Please select a start time'),
    endTime: z.string().nonempty('Please select an end time'),
})
type FormData = z.infer<typeof roomAvailabilitySchema>

export default function Room(room: roomList) {
    const [droppedDown, setDroppedDown] = useState(true)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(roomAvailabilitySchema),
    })

    // Handler for submitting form data
    const onSubmit = (data: FormData) => {
        console.log('Register for:', data)
        reset()
    }

    // Handle date selection
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
        setValue('date', date ? date.toISOString() : '')
    }

    function getStatus() {
        if (room.reserved && !room.occupied) {
            return <p>Available</p>
        } else if (!room.reserved) {
            return <p>Reserved</p>
        } else {
            return <p>Busy</p>
        }
    }

    function getDroppedDown() {
        return droppedDown
    }

    function swapDropDown() {
        setDroppedDown(!droppedDown)
    }

    function roomReserveArea() {
        return (
            <>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md p-6 rounded-lg text-white grid gap-y-4"
                >
                    <ul className="grid grid-cols-1 gap-y-4">
                        <li>
                            <label htmlFor="date" className="block mb-1">
                                Date
                            </label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-800 outline-none p-3 rounded-md w-full"
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.date.message}
                                </p>
                            )}
                        </li>

                        <li>
                            <label htmlFor="startTime" className="block mb-1">
                                Start Time
                            </label>
                            <input
                                type="time"
                                className="bg-gray-800 outline-none p-3 rounded-md w-full"
                                id="startTime"
                                {...register('startTime')}
                            />
                            {errors.startTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </li>

                        <li>
                            <label htmlFor="endTime" className="block mb-1">
                                End Time
                            </label>
                            <input
                                type="time"
                                className="bg-gray-800 outline-none p-3 rounded-md w-full"
                                id="endTime"
                                {...register('endTime')}
                            />
                            {errors.endTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.endTime.message}
                                </p>
                            )}
                        </li>
                    </ul>

                    <button
                        className="bg-purple-500 font-semibold hover:shadow-form outline-none p-3 rounded-md text-base text-white w-full"
                        title="Apply the filters"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </>
        )
    }

    function reserveRoom() {}

    function getDropdown() {
        if (getDroppedDown()) {
            return (
                <>
                    <div className="text-white text-lg">
                        <br />
                        <div className="pl-6">
                            <p>Seats: {room.seats}</p>
                            {room.projector ? <p>Projector</p> : <></>}
                            {room.whiteboard ? <p>Whiteboard</p> : <></>}
                            {room.audio ? <p>Audio</p> : <></>}
                            {room.video ? <p>Video</p> : <></>}
                            {getStatus()}
                        </div>
                        <br />
                        {roomReserveArea()}
                        <br />
                        <br />
                    </div>
                </>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <div className="roomHeader">
                <h1 onClick={swapDropDown}>{room.name + ' ' + room.id}</h1>
            </div>
            <div className="dropDown">{getDropdown()}</div>
        </>
    )
}
