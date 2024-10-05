import '@/assets/styles/search.css'
import Map from '@/components/search/map'
import Room from '@/components/search/room'
import roomsJson from '@/assets/roomLists/roomList1.json'

export type roomList = {
    name: string
    id: string
    seats: number
    projector: boolean
    whiteboard: boolean
    audio: boolean
    video: boolean
    reserved: string
    occupied: string
}

export default function Search() {
    let allRooms = roomsJson.rooms

    return (
        <>
            <br />
            <br />
            <br />

            <div className="pagebody">
                <div className="searchAndMap">
                    <Map w={window.innerWidth * 0.55} />
                </div>
                <div className="Results">
                    {allRooms.map((theRoom: any) => {
                        return (
                            <>
                                <Room
                                    name={theRoom.name}
                                    id={theRoom.id}
                                    seats={theRoom.seats}
                                    projector={theRoom.projector}
                                    whiteboard={theRoom.whiteboard}
                                    audio={theRoom.audio}
                                    video={theRoom.video}
                                    reserved={theRoom.reserved}
                                    occupied={theRoom.occupied}
                                />
                                <br />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
