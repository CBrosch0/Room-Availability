import { useState } from 'react'

export default function Room() {
    const [id, setId] = useState("Id")
    const [name, setName] = useState("Room name")

    const [droppedDown, setDroppedDown] = useState(false)

    function getId() {
        return id;
    }

    function getName() {
        return name;
    }

    function getDroppedDown() {
        return droppedDown;
    }


    function getDropdown() {
        if(getDroppedDown()){
            return (
                <>
                    <div>
                        Trait 1
                        Trait 2
                    </div>
                </>
            )
        }else{
            return(null)
        }
    }

    return (
        <>
            <h1>{getName() + " " + getId()}</h1>
            {getDropdown()}
        </>
    )
}