import React, { useState } from 'react'
import { useSelector} from "react-redux"

import Edit from './Edit'

export default function Vacation({vacation, delVacation, getVacations, myVacationsFun, myVacations}) {
      const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)
    const [v_description, setDescription] = useState(vacation.v_description)
    const [destination, setDestination] = useState(vacation.destination)
    const [img_url, setImg_url] = useState(vacation.img_url)
    const [date_start, setDate_Start] = useState(vacation.date_start)
    const [date_end, setDate_End] = useState(vacation.date_end)
    const [price, setPrice] = useState(vacation.price)


    const editVacation = async()=>{
        try {
          const res = await fetch("http://localhost:1000/vacations",{
            method : "PUT",
            body: JSON.stringify({vacation_id: vacation.vacation_id, v_description, destination, img_url, date_start, date_end, price}),
            headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
          })
          getVacations()
        } catch (error) {
          console.log(error);
        }

      }


      const followerFun = async()=>{
        try {
          const res = await fetch("http://localhost:1000/follower",{
            method : "PUT",
            body: JSON.stringify({vacation_id: vacation.vacation_id}),
            headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
          })
          getVacations()
          myVacationsFun()
        } catch (error) {
          console.log(error);
        }

      }


      const [show, setShow] = useState(false)


      const char = vacation.date_start.indexOf("T")
      const char2 = vacation.date_end.indexOf("T")
    return (
        <div className="vacation"> 
          {roleInStore== "admin" && <>
          <img src={vacation.img_url} alt="" />
           <div className="topVac">
           <span className="vacMain">{vacation.destination}</span>
            <span className="vacPrice">{vacation.price}$</span>
           </div>
           <div className="midlleVac">
           <span className="vacDes"> {vacation.v_description}</span>
            <span className="vacDate">{vacation.date_start.slice(0,char).replaceAll("-",".")} - {vacation.date_end.slice(0,char2).replaceAll("-",".")}</span>
           </div>
           
            <div className="vacFoll">follower: {vacation.follower}</div>
            <div className="adminControl">
            <div className="adminBtnEdit"  title="Edit" onClick={()=> setShow(!show)}></div>
            <div  className="adminBtnDel" title="Delete" onClick={()=>{delVacation(Number(vacation.vacation_id))}}></div>
            </div>


            <div className="edit" style={{ display: (show ? 'block' : 'none') }}>
              <br />
              <br />
            Description- <input type="text"   defaultValue={vacation.v_description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <br />
            Destination- <input type="text" defaultValue={vacation.destination} onChange={(e)=>{setDestination(e.target.value)}}/>
            <br />
            Img_url- <input type="text" defaultValue={vacation.img_url} onChange={(e)=>{setImg_url(e.target.value)}}/>
            <br />
            Date Start-
            <br />
            <input type="date" defaultValue={vacation.date_start} onChange={(e)=>{setDate_Start(e.target.value)}}/>
            <br />
            Date End-
            <br />
            <input type="date" defaultValue={vacation.date_end} onChange={(e)=>{setDate_End(e.target.value)}}/>
            <br />
            price- <input type="number" defaultValue={vacation.price} onChange={(e)=>{setPrice(e.target.valueAsNumber)}}/>$
          <br />
            <button onClick={()=>{editVacation()
                                    setShow(!show)}}>Edit</button>            
            </div>
          </>}
            
           {roleInStore== "user" && <>
           <img src={vacation.img_url} alt="" />
           <div className="topVac">
           <span className="vacMain">{vacation.destination}</span>
            <span className="vacPrice">{vacation.price}$</span>
           </div>
           <div className="midlleVac">
           <span className="vacDes"> {vacation.v_description}</span>
            <span className="vacDate">{vacation.date_start.slice(0,char).replaceAll("-",".")} - {vacation.date_end.slice(0,char2).replaceAll("-",".")}</span>
           </div>
           
            <div className="vacFoll">follower: {vacation.follower}</div>
            <div className="toglleBtn">
            <div className={myVacations.includes(vacation.vacation_id)? "follow" : "unfollow"} onClick={()=>followerFun()}></div>
            </div>
           </> }
                

        </div>
    )
}
