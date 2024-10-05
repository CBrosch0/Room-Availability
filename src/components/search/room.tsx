import { useState } from 'react'

export default function Room() {
    const [id, setId] = useState("Id")
    const [name, setName] = useState("Room name")
    const [seats, setSeats] = useState(15)
    const [projector, setProjector] = useState(true)
    const [whiteboard, setWhiteboard] = useState(true)
    const [audio, setAudio] = useState(false)
    const [video, setVideo] = useState(false)
    const [occupied, setOccupied] = useState(true)
    const [reserved, setReserved] = useState(false)

    const [droppedDown, setDroppedDown] = useState(true)

    function getId() {
        return id;
    }

    function getName() {
        return name;
    }

    function getSeats() {
        return seats;
    }

    function getProjector() {
        return projector;
    }

    function getWhiteboard() {
        return whiteboard;
    }

    function getAudio() {
        return audio;
    }

    function getVideo() {
        return video;
    }

    function getStatus() {
        if (reserved && !occupied) {
            return (<p>Available</p>)
        } else if (!reserved) {
            return (<p>Reserved</p>)
        } else {
            return (<p>Busy</p>)
        }
    }

    function getDroppedDown() {
        return droppedDown;
    }


    function getDropdown() {
        if (getDroppedDown()) {
            return (
                <>
                    <div>
                        <p>Seats: {getSeats()}</p>
                        {getProjector() ? <p>Projector</p> : <></>}
                        {getWhiteboard() ? <p>Whiteboard</p> : <></>}
                        {getAudio() ? <p>Audio</p> : <></>}
                        {getVideo() ? <p>Video</p> : <></>}
                        {getStatus()}
                    </div>
                </>
            )
        } else {
            return (null)
        }
    }

    return (
        <>
            <h1>{getName() + " " + getId()}</h1>
            <br />
            {getDropdown()}
        </>
    )
}