import React, { useEffect, useState } from 'react'
import AddVacation from './AddVacation'
import Vacation from './Vacation'
import {Link} from "react-router-dom"
import { useSelector} from "react-redux"



export default function VacationsList({getVacations, vacations, myVacationsFun, myVacations}) {
    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)



    const delVacation = async(id)=>{
        try {
            const res = await fetch("http://localhost:1000/vacations",{
                method : "DELETE",
                body: JSON.stringify({vacation_id : Number(id)}),
                headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
              })
              getVacations()
        } catch (error) {
            console.log(error);
        }

      }



    
    return (
        <div className="xa">

            <h1 className="vacationsTopic"><u>Vacations</u></h1>
            {/* guest page */}
            {roleInStore == "guest" && <div className="info">
                                        <h2 >Hello guest, if you want to watch our vacations you need to register and login first.</h2>
                                        <br />
                                        <br />
                                        <h3>
                                        <Link to="/login"><button >To login</button> </Link>
                                        <br />
                                        <br />
                                        <Link to="/register"><button>To register</button> </Link>
                                        </h3>

                                        </div> }
            {/* admin page */}
            {roleInStore == "admin" &&
                <>
            <Link to="/newVacation"><button className="newVac">To Add New Vacation</button></Link>
            <br />
            <div className="vacationsCon">
                {vacations.map(vac=> <Vacation key={vac.vacation_id} myVacationsFun={myVacationsFun} vacation={vac} delVacation={delVacation} getVacations={getVacations} myVacations={myVacations} ></Vacation>)}
            </div>
            </> }
            {/* user page */}
            {roleInStore == "user" &&
                <>
           
            <div className="vacationsCon">
                {vacations.map(vac=> <Vacation key={vac.vacation_id} myVacationsFun={myVacationsFun} vacation={vac} delVacation={delVacation} getVacations={getVacations} myVacations={myVacations} ></Vacation>)}
            </div>
            </> }


        </div>
    )
}
