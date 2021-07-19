import React, { useState } from 'react'
import { useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

export default function AddVacation({getVacations}) {
    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)
    const history = useHistory()

    const [v_description, setDescription] = useState("")
    const [destination, setDestination] = useState("")
    const [img_url, setImg_url] = useState("")
    const [date_start, setDate_Start] = useState("")
    const [date_end, setDate_End] = useState("")
    const [price, setPrice] = useState("")


    const addNewVacation = async(v_description, destination, img_url, date_start, date_end, price)=>{
        if (v_description== "" || destination== "" || img_url== "" || date_start== "" || date_end== "" || price== "") {
            return alert("missing some info' please fill all input")
        }
        try {
            const res = await fetch("http://localhost:1000/vacations",{
                method : "POST",
                body: JSON.stringify({v_description, destination, img_url, date_start, date_end, price}),
                headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
              })
              getVacations()
              history.push("/vacations")
        } catch (error) {
            alert("The new vacation dont update")
        }

        
      }
      
    return (
        <div className="add">
            {roleInStore == "admin" ? <>
                        <div className="addback"> 
                        <button  onClick={()=>{history.goBack()}}>Go back to Vacations</button>
                        </div>
                        
            <h1 className="newVacationLogo">New Vacation Form</h1>
            
            <div className="newVacationForm">
            <div className="vacDes first">Description- <input className="addInput" type="text" onChange={(e)=>{setDescription(e.target.value)}}/></div>
            <div className="vacDes">
            Destination- <input className="addInput" type="text" onChange={(e)=>{setDestination(e.target.value)}}/>
            </div>
            <div className="vacDes">Image url- <input className="addInput" type="text" onChange={(e)=>{setImg_url(e.target.value)}}/>
            </div>
            <div className="vacDes">
            Date Start- <input className="addInput" type="date" onChange={(e)=>{setDate_Start(e.target.value)}}/>

            </div>

            <div className="vacDes">
            Date End-
            <input className="addInput" type="date" onChange={(e)=>{setDate_End(e.target.value)}}/>
            </div>
            <div className="vacDes">
            price- <input className="addInput" type="number" onChange={(e)=>{setPrice(e.target.valueAsNumber)}}/>$
            </div>
            <div className="btnAddVac">
            <div className="uploadBtn"  onClick={()=>{addNewVacation(v_description, destination, img_url, date_start, date_end, Number(price))}}></div>
            </div>
        </div>
            <div className="btnAddVac">
            <button  onClick={()=>history.push("/vacations")}>Back to Vacations page</button>
            </div>
        </> : <h1>Page for admin Only !</h1>}
        </div>
    )
}