import { IconType } from 'react-icons'

interface SocialMediaLinkProps {
    className?: string
    href: string
    icon: IconType
    platform: string
    rel?: string
    target?: string
    title?: string
}

const defaultRel = 'noopener noreferrer'
const defaultTarget = '_blank'

export default function SocialMediaLink({
    className = 'justify-center text-gray-400 hover:text-white transition duration-200 ease-in-out',
    href,
    icon: Icon,
    platform,
    rel = defaultRel,
    target = defaultTarget,
    title = `Visit ${platform}.com`,
}: SocialMediaLinkProps) {
    return (
        <a
            className={className}
            href={href}
            rel={rel}
            target={target}
            title={title}
        >
            <Icon aria-hidden={true} />
        </a>
    )
}
