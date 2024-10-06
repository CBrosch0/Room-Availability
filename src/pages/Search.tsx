import '@/styles/search.css'
import Map from '@/components/search/map'
import Room from '@/components/search/room'
import roomsJson from '@/assets/roomLists/roomList1.json'
import RoomAvailability from './RoomAvailability'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Calendar from '@/components/ui/Calendar'
// Define the schema for form validation using Zod
const roomAvailabilitySchema = z.object({
    seatingCapacity: z.number().min(1, 'Seating capacity must be at least 1'),
    projector: z.boolean().optional(),
    whiteBoard: z.boolean().optional(),
    audio: z.boolean().optional(),
    video: z.boolean().optional(),
    busyNow: z.boolean().optional(),
    date: z.string().nonempty('Please select a date'),
    startTime: z.string().nonempty('Please select a start time'),
    endTime: z.string().nonempty('Please select an end time'),
})
type FormData = z.infer<typeof roomAvailabilitySchema>

export type roomList = {
    name: string
    id: string
    seats: number
    projector: boolean
    whiteboard: boolean
    audio: boolean
    video: boolean
    available: string
    occupied: string
}

export default function Search() {
    let allRooms = roomsJson.rooms
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [roomsList, setRoomsList] = useState(roomsJson.rooms)


    async function getRooms() {
        //event.preventDefault();
        try {
            // Jacob suggested hardcoding that when it wasn't working before
            const response = await fetch("http://129.153.169.171/api/layout?facilityId=6701f103b5890dddc48b6774",
                { method: 'GET', headers: { 'Content-Type': 'application/json' } });

            const res = await response.json();
            //console.log(res);
            setRoomsList(res.rooms)
            console.log(res.rooms)
            console.log(allRooms)

        } catch (e) {
            console.log("error");
            console.log(e);
            console.error(e);
            return ("");
        }
    };

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
        console.log('Room availability data:', data)
        reset()
    }

    // Handle date selection
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
        setValue('date', date ? date.toISOString() : '')
    }

    return (
        <>
            <br />
            <br />
            <br />

            <div className="pagebody">
                <div className="searchAndMap">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-max min-w-96 mx-auto bg-gray-500 p-6 text-white grid grid-cols-2 gap-y-4 gap-x-8"
                    >
                        <ul className="grid grid-cols-1 gap-y-4">
                            <li>
                                <label htmlFor="seatingCapacity" className="block mb-1">
                                    Seating Capacity
                                </label>
                                <input
                                    className="bg-gray-800 outline-none p-3 rounded-md w-full"
                                    id="seatingCapacity"
                                    type="number"
                                    placeholder="Enter seating capacity"
                                    min={1}
                                    {...register('seatingCapacity', {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.seatingCapacity && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.seatingCapacity.message}
                                    </p>
                                )}
                            </li>

                            <li>
                                <label className="block mb-1">Additional Filters</label>
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('projector')}
                                            className="mr-2"
                                        />
                                        Projector
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('whiteBoard')}
                                            className="mr-2"
                                        />
                                        White Board
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('audio')}
                                            className="mr-2"
                                        />
                                        Audio Accommodations
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('video')}
                                            className="mr-2"
                                        />
                                        Video Recordings
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('busyNow')}
                                            className="mr-2"
                                        />
                                        Busy Now
                                    </label>
                                </div>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <label htmlFor="date" className="block mb-1">
                                    Date
                                </label>
                                <Calendar
                                    selectedDate={selectedDate}
                                    onChange={handleDateChange}
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
                            Check Availability
                        </button>
                    </form>
                    <br/>
                    <Map w={window.innerWidth * 0.55} />
                </div>
                <div className="Results">
                    {allRooms.map((theRoom: any) => {
                        return (
                            <>
                                <Room
                                    name={theRoom.name}
                                    id={theRoom.id}
                                    seats={theRoom.seats}
                                    projector={theRoom.projector}
                                    whiteboard={theRoom.whiteboard}
                                    audio={theRoom.audio}
                                    video={theRoom.video}
                                    available={theRoom.isAvailable}
                                    occupied={theRoom.isOccupied}
                                />
                                <br />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
