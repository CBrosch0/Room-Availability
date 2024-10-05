interface AnchorProps {
    children: React.ReactNode
    className?: string
    href: string
    rel?: string
    target?: string
    title?: string
}

const defaultRel = 'noopener noreferrer'
const defaultTarget = '_blank'

export default function Anchor({
    children,
    className,
    href,
    rel = defaultRel,
    target = defaultTarget,
    title,
}: AnchorProps) {
    return (
        <a
            className={className}
            href={href}
            rel={rel}
            target={target}
            title={title}
        >
            {children}
        </a>
    )
}
