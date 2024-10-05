import { useState } from 'react'
import type { roomList } from '../../pages/Search.tsx'
import '../../assets/styles/search.css'

export default function Room(room: roomList) {
    const [droppedDown, setDroppedDown] = useState(true)

    function getStatus() {
        if (room.reserved && !room.occupied) {
            return <p>Available</p>
        } else if (!room.reserved) {
            return <p>Reserved</p>
        } else {
            return <p>Busy</p>
        }
    }

    function getDroppedDown() {
        return droppedDown
    }

    function swapDropDown() {
        setDroppedDown(!droppedDown)
    }

    function roomReserveArea() {
        return (
            <>
                <p>Time1</p>
                <p>Time2</p>
                <button onSubmit={reserveRoom}>Submit</button>
            </>
        )
    }

    function reserveRoom() {

    }



    function getDropdown() {
        if (getDroppedDown()) {
            return (
                <>
                    <div>
                        <br />
                        <p>Seats: {room.seats}</p>
                        {room.projector ? <p>Projector</p> : <></>}
                        {room.whiteboard ? <p>Whiteboard</p> : <></>}
                        {room.audio ? <p>Audio</p> : <></>}
                        {room.video ? <p>Video</p> : <></>}
                        {getStatus()}
                        <br />
                        {roomReserveArea()}
                        <br />
                        <br />
                    </div>
                </>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <div className="roomHeader"><h1 onClick={swapDropDown}>{room.name + ' ' + room.id}</h1></div>
            <div className="dropDown">{getDropdown()}</div>
        </>
    )
}
