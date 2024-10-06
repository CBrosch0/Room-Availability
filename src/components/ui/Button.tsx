interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    title?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
}

const defaultVariant = 'primary'

const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white border-blue-500 border',
    secondary:
        'bg-gray-300 hover:bg-gray-400 text-gray-800 border-gray-300 border',
}

export default function Button({
    children,
    disabled,
    title,
    type,
    variant = defaultVariant,
}: ButtonProps) {
    return (
        <button
            className={`${variants[variant]} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
            title={title}
            type={type}
        >
            {children}
        </button>
    )
}
