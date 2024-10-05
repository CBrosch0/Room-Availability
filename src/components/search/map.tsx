import { useState } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva';

type CanvasSize = {
    w: number
    h: number
}

export default function Map(props: CanvasSize) {
    const [width, setWidth] = useState(props.w)
    const [height, setHeight] = useState(props.h)

    function getWidth(){
        return width;
    }

    function getHeight(){
        return height;
    }

    return (
        <>
            <Stage width={getWidth()} height={getHeight()}>
                <Layer>
                    <Rect width={getWidth()} height={getHeight()} fill="white" />
                </Layer>
                <Layer>
                    <Rect width={50} height={50} fill="red" />
                    <Circle x={200} y={200} stroke="black" radius={50} />
                </Layer>
            </Stage>
        </>
    )
}