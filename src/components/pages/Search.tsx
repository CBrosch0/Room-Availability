import { useState } from 'react'
import './Search.css'
import Map from '../search/Map.tsx'
import Room from '../search/Room.tsx'


export default function Search() {
    const [width, setWidth] = useState()


    return (
        <>
            <br />
            <br />
            <br />

            <div className="pagebody">
                <div className="searchAndMap"><Map w={window.innerWidth * .55} /></div>
                <div className="Results"><Room /></div>
            </div>
        </>
    )
}