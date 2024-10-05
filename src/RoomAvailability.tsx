import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DatePicker from "react-datepicker"; // For date picking, you'll need to install react-datepicker

import "react-datepicker/dist/react-datepicker.css"; // Import the styles for DatePicker

// Define the schema for form validation using Zod
const roomAvailabilitySchema = z.object({
  seatingCapacity: z.number().min(1, "Seating capacity must be at least 1"),
  projector: z.boolean().optional(),
  whiteBoard: z.boolean().optional(),
  audio: z.boolean().optional(),
  video: z.boolean().optional(),
  busyNow: z.boolean().optional(),
  date: z.string().nonempty("Please select a date"),
  startTime: z.string().nonempty("Please select a start time"),
  endTime: z.string().nonempty("Please select an end time"),
});

type FormData = z.infer<typeof roomAvailabilitySchema>;

export default function RoomAvailabilityForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(roomAvailabilitySchema),
  });

  // Handler for submitting form data
  const onSubmit = (data: FormData) => {
    console.log("Room availability data:", data);
    reset();
  };

  // Handle date selection
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setValue("date", date ? date.toISOString() : "");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white grid grid-cols-1 gap-y-4"
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
    {...register("seatingCapacity", { valueAsNumber: true })}
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
                {...register("projector")}
                className="mr-2"
              />
              Projector
            </label>
            <label>
              <input
                type="checkbox"
                {...register("whiteBoard")}
                className="mr-2"
              />
              White Board
            </label>
            <label>
              <input type="checkbox" {...register("audio")} className="mr-2" />
              Audio Accommodations
            </label>
            <label>
              <input type="checkbox" {...register("video")} className="mr-2" />
              Video Recordings
            </label>
            <label>
              <input type="checkbox" {...register("busyNow")} className="mr-2" />
              Busy Now
            </label>
          </div>
        </li>

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
            <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
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
            {...register("startTime")}
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
            {...register("endTime")}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-500">{errors.endTime.message}</p>
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
  );
}
