import React from 'react'

interface MapperProps<T> {
    data: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    WrapperElement?: React.ElementType
    wrapperProps?: React.HTMLAttributes<HTMLElement> & Record<string, any>
}

export default function Mapper<T>({
    data,
    renderItem,
    WrapperElement = React.Fragment,
    wrapperProps = {},
}: MapperProps<T>) {
    return (
        <WrapperElement {...wrapperProps}>
            {data.map((item, index) => (
                <React.Fragment key={index}>
                    {renderItem(item, index)}
                </React.Fragment>
            ))}
        </WrapperElement>
    )
}
