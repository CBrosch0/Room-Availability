import { Link } from 'react-router-dom'

interface AnchorProps {
    children: React.ReactNode
    className?: string
    href: string
    rel?: string
    target?: string
    title?: string
}

export default function Anchor({
    children,
    className,
    href,
    rel,
    target,
    title,
}: AnchorProps) {
    return (
        <Link
            className={className}
            to={href}
            rel={rel}
            target={target}
            title={title}
        >
            {children}
        </Link>
    )
}
