import { useState } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva';

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
                <Layer>
                    <Rect width={getWidth()} height={getHeight()} fill="white" />
                </Layer>
                <Layer>
                    <Rect width={floorplan.building[0].width / 100 * getWidth()} height={floorplan.building[0].height / 100 * getHeight()} x={floorplan.building[0].x / 100 * getWidth()} y={floorplan.building[0].y / 100 * getHeight()} fill="#87abe6" />
                </Layer>
                <Layer>
                    <Rect width={floorplan.rooms[0].width / 100 * getWidth()} height={floorplan.rooms[0].height / 100 * getHeight()} x={floorplan.rooms[0].x / 100 * getWidth()} y={floorplan.rooms[0].y / 100 * getHeight()} fill="#2a7a1d" />
                </Layer>
            </Stage>
        </>
    )
}