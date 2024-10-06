import Anchor from '@/components/ui/Anchor'
import React from 'react'

interface LinkItemProps {
    href: string
    individualClassName?: string
    label: string
}

interface LinkListProps {
    commonClassName?: string
    links: LinkItemProps[]
    WrapperElement?: React.ElementType
    wrapperProps?: React.HTMLAttributes<HTMLElement> & Record<string, any>
}

export default function LinkList({
    commonClassName,
    links,
    WrapperElement = React.Fragment,
    wrapperProps = {},
}: LinkListProps) {
    return (
        <WrapperElement {...wrapperProps}>
            {links.map((link, index) => (
                <li key={index}>
                    <Anchor
                        className={link.individualClassName || commonClassName}
                        href={link.href}
                    >
                        {link.label}
                    </Anchor>
                </li>
            ))}
        </WrapperElement>
    )
}
