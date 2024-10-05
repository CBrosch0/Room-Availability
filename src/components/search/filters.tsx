// Filters.tsx
import React, { useState } from 'react'

interface FiltersProps {
    onFilterChange: (filters: string[]) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleCheckboxChange = (filter: string) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]

            onFilterChange(newFilters)
            return newFilters
        })
    }

    const filters = [
        'Projector',
        'White Boards',
        'Audio Accommodations',
        'Video Recordings',
        'Busy Now',
    ]

    return (
        <ul className="space-y-4">
            <li>
                <label
                    htmlFor="filters"
                    className="block mb-2 font-bold text-lg"
                >
                    Filters
                </label>
                {filters.map((filter, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            className="bg-gray-800 text-blue-600 rounded-md"
                            id={filter}
                            title={filter}
                            type="checkbox"
                            checked={selectedFilters.includes(filter)}
                            onChange={() => handleCheckboxChange(filter)}
                        />
                        <label htmlFor={filter} className="text-gray-100">
                            {filter}
                        </label>
                    </div>
                ))}
            </li>
        </ul>
    )
}

export default Filters
