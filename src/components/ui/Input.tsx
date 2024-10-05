import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
    error?: FieldError
    label?: string
    name: string
    placeholder?: string
    register: UseFormRegisterReturn
    title?: string
    type?:
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'hidden'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'search'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week'
}

export default function Input({
    error,
    label,
    name,
    placeholder,
    register,
    title,
    type = 'text',
}: InputProps) {
    return (
        <li>
            {label && (
                <label className="block mb-1" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                className="bg-gray-800 p-3 rounded-md w-full"
                id={name}
                placeholder={placeholder}
                title={title}
                type={type}
                {...register}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </li>
    )
}
