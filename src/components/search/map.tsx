import { useState } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

import floorplan from '../../assets/floorplans/layout1.json'

type CanvasSize = {
    w: number
    /*h: number*/
}

export default function Map(props: CanvasSize) {
    const [width, setWidth] = useState(props.w)
    const [height, setHeight] = useState(props.w * (6 / 10))
    const [reservedColor, setReservedColor] = useState('#bf0000')
    const [busyColor, setBusyColor] = useState('#bf8600')
    const [availableColor, setAvailableColor] = useState('#36bf00')

    function getWidth() {
        return width
    }

    function getHeight() {
        return height
    }

    function getReservedColor() {
        return reservedColor
    }

    function getBusyColor() {
        return busyColor
    }

    function getAvailableColor() {
        return availableColor
    }

    return (
        <>
            <Stage width={getWidth()} height={getHeight()}>
                <Layer name="background">
                    <Rect
                        width={getWidth()}
                        height={getHeight()}
                        fill="#7d7d7d"
                    />
                </Layer>
                <Layer name="building">
                    {floorplan.building.map((section) => {
                        return (
                            <Rect
                                key={section.facilityId}
                                width={(section.width / 100) * getWidth()}
                                height={(section.height / 100) * getHeight()}
                                x={(section.x / 100) * getWidth()}
                                y={(section.y / 100) * getHeight()}
                                fill="#87abe6"
                            />
                        )
                    })}
                </Layer>
                <Layer name="rooms">
                    {floorplan.rooms.map((room) => {
                        let color = '#000000'
                        let status = 'unknown'
                        if (room.isAvailable && !room.isOccupied) {
                            color = getAvailableColor()
                            status = 'Available'
                        } else if (!room.isAvailable) {
                            color = getReservedColor()
                            status = 'Reserved'
                        } else {
                            color = getBusyColor()
                            status = 'Busy'
                        }

                        return (
                            <>
                                <Rect
                                    key={room.roomId + "R"}
                                    width={(room.width / 100) * getWidth()}
                                    height={(room.height / 100) * getHeight()}
                                    x={(room.x / 100) * getWidth()}
                                    y={(room.y / 100) * getHeight()}
                                    fill={color}
                                />
                                <Text
                                    key={room.roomId + "T"}
                                    text={room.roomName + ' ' + status}
                                    x={(room.x / 100) * getWidth()}
                                    y={(room.y / 100) * getHeight()}
                                    fill="#black"
                                />
                            </>
                        )
                    })}
                </Layer>
            </Stage>
        </>
    )
}
