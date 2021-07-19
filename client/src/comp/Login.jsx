import React, { useState } from 'react'
import {Link, useHistory} from "react-router-dom"
import { useSelector} from "react-redux"
import store from '../store'
import { useEffect } from 'react'



export default function Login({myVacationsFun, userChange, getVacations, roleChange}) {
    const history = useHistory()
    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
  







    const loginFun = async(username, password)=>{
        if (username == "" || password == "") {
            return (alert("missing some info"))
        }

        try {
          const res = await fetch("http://localhost:1000/auth/login",{
            method : "POST",
            body: JSON.stringify({username, password}),
            headers:{"content-type":"application/json"}
          })
          const data = await res.json()
          let tok = `${data.token}`
          let usernameToStore = `${data.username}`
          let roleToStore = `${data.role}`
          store.dispatch({type: "SET_USERNAME", payload: usernameToStore})
          store.dispatch({type: "SET_ROLE", payload: roleToStore})
          localStorage.setItem("token", tok)
          const expToken = ()=>{
            localStorage.removeItem("token")
          }
          setTimeout(expToken, 1200000)
          history.push("/vacations")
          userChange(data.username)
          roleChange(data.role)
          myVacationsFun()
          getVacations()
        } catch (error) {
          console.log(error);
          setMessage("Login failed, please try again")
          setTimeout(()=>{
            setMessage("")
          }, 2000)
        }
      }

    return (
        <div className="loginDiv">       
            {roleInStore == "guest"? <> 
            <h1 className="loginLogo">Login Page</h1>
            <div className="con">
            <div className="imgSec"></div>
            </div>
            <div className="loginForm">
            <h3> please Sign in</h3>
            <div className="con">
            <input className="loginInputUsr " onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username"  />
            <input className="loginInputPas" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
            </div>
            <Link to="/register"><div className="loginReg">not registerd? click here to register</div></Link>

            <div className="loginButton">
            <button  onClick={()=>{loginFun(username, password)}}>Sign in</button>
            </div>
            {message == "Login failed, please try again" && <span><br/> <h5 className="errLog" style={{color: "red"}}>{message}</h5></span> }
            </div>
            

            </> :<div className="center">
             <div className="logginon"><h1>You are already loggin, if you want to logout please click on the Logout button</h1> 
                                                                      <button className="blahbtn" onClick={()=>{localStorage.removeItem("token")
                                                                      store.dispatch({type: "SET_USERNAME", payload: "guest"})
                                                                      roleChange("guest")
                                                                      store.dispatch({type: "SET_ROLE", payload: "guest"})}}>Logout</button> </div>
                                                                      </div>}
            
        </div>
    )
}
