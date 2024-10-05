import Anchor from '@/components/ui/Anchor'

interface LinkListProps {
    className?: string
    links: {
        label: string
        href: string
    }[]
}
export default function LinkList({ className, links }: LinkListProps) {
    return (
        <ul className={className}>
            {links.map((link, index) => (
                <li key={index}>
                    <Anchor href={link.href}>{link.label}</Anchor>
                </li>
            ))}
        </ul>
    )
}
