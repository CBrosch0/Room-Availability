import { useState } from 'react'
import './Search.css'
import Map from '../search/Map.tsx'


export default function Search() {
    const [width, setWidth] = useState()


    return (
        <>
            <br />
            <br />
            <br />

            <div className="wrapper">
                <div className="box1"><Map w={1000} /></div>
                <div className="box2">Two</div>
            </div>
        </>
    )
}