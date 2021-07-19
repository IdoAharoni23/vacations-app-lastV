import React from 'react'
import { useSelector} from "react-redux"



export default function Edit({vacation}) {
    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)
    return (
        <div>
            <h1>Edit Vacation </h1>
            {vacation.destination}
        </div>
    )
}
