'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, contactFormSchema } from '@/lib/contact-form.schema'
import { sendEmail } from '@/utils/send-email'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(contactFormSchema),
    })

    const [characterCount, setCharacterCount] = useState(0)
    const maxLength = 1000

    function onSubmit(data: FormData) {
        sendEmail(data)
        reset()
        setCharacterCount(0)
    }

    // Update message length state when message field changes
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setCharacterCount(event.target.value.length)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white grid grid-cols-1 gap-y-4"
        >
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold">Contact Us</h1>
                <p>Have any questions? Shoot us a message!</p>
            </header>
            <ul className="grid grid-cols-1 gap-y-4">
                <li>
                    <label htmlFor="name" className="block mb-1">
                        Name
                    </label>
                    <input
                        className="bg-gray-800 outline-none p-3 rounded-md w-full"
                        id="name"
                        title="Enter your name"
                        type="text"
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </li>
                <li>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        className="bg-gray-800 outline-none p-3 rounded-md w-full"
                        id="email"
                        title="Enter your email address"
                        type="email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </li>

                <li>
                    <label htmlFor="Subject" className="block mb-1">
                        Subject
                    </label>
                    <input
                        className="bg-gray-800 outline-none p-3 rounded-md w-full"
                        id="subject"
                        title="Enter the subject of your message"
                        type="text"
                        {...register('subject')}
                    />
                    {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.subject.message}
                        </p>
                    )}
                </li>
                <li>
                    <label htmlFor="message" className="block mb-1">
                        Message
                    </label>
                    <textarea
                        className="bg-gray-800 outline-none p-3 rounded-md w-full"
                        id="message"
                        rows={4}
                        title="Enter your message"
                        {...register('message', {
                            onChange: handleInputChange,
                        })}
                    ></textarea>
                    <span
                        className={`text-sm ${
                            characterCount > maxLength
                                ? 'text-red-500'
                                : 'text-gray-400'
                        }`}
                    >
                        {characterCount}/{maxLength} characters
                    </span>
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.message.message}
                        </p>
                    )}
                </li>
            </ul>
            <button
                className="bg-purple-500 font-semibold hover:shadow-form outline-none p-3 rounded-md text-base text-white w-full"
                title="Submit the form"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}
