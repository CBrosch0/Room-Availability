import { useState } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';

import floorplan from '../../assets/floorplans/layout1.json'

type CanvasSize = {
    w: number
    /*h: number*/
}

export default function Map(props: CanvasSize) {
    const [width, setWidth] = useState(props.w)
    const [height, setHeight] = useState(props.w * (6 / 10))


    function getWidth() {
        return width;
    }

    function getHeight() {
        return height;
    }

    return (
        <>
            <Stage width={getWidth()} height={getHeight()}>
                <Layer name="background">
                    <Rect width={getWidth()} height={getHeight()} fill="#7d7d7d" />
                </Layer>
                <Layer name="building">
                    {
                        floorplan.building.map((section) => {

                            return (<Rect width={section.width / 100 * getWidth()} height={section.height / 100 * getHeight()} x={section.x / 100 * getWidth()} y={section.y / 100 * getHeight()} fill="#87abe6" />)
                        }
                        )
                    }
                </Layer>
                <Layer name="rooms">
                    {
                        floorplan.rooms.map((room) => {

                            return (
                                <>
                                    <Rect width={room.width / 100 * getWidth()} height={room.height / 100 * getHeight()} x={room.x / 100 * getWidth()} y={room.y / 100 * getHeight()} fill="#2a7a1d" />
                                    <Text text={room.roomName} x={room.x / 100 * getWidth()} y={room.y / 100 * getHeight()} fill="#black" />
                                </>
                            )
                        }
                        )
                    }
                </Layer>
            </Stage>
        </>
    )
}