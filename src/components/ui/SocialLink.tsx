import { Link } from 'react-router-dom'
import { IconType } from 'react-icons'

interface SocialLinkProps {
    className?: string
    href: string
    icon: IconType
    platform: string
    rel?: string
    target?: string
    title?: string
}

export default function SocialLink({
    className = 'justify-center text-gray-400 hover:text-white transition duration-200 ease-in-out',
    href,
    icon: Icon,
    platform,
    rel = 'noopener noreferrer',
    target = '_blank',
    title = `Visit ${platform}.com`,
}: SocialLinkProps) {
    return (
        <Link
            className={className}
            to={href}
            rel={rel}
            target={target}
            title={title}
        >
            <Icon aria-hidden={true} />
        </Link>
    )
}
