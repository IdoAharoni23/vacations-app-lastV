import React, { useEffect, useState } from 'react'
import {Link, useHistory} from "react-router-dom"
import { useSelector} from "react-redux"




export default function Register() {
    const history = useHistory()
    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [f_name, setF_name] = useState("")
    const [l_name, setL_name] = useState("")
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")


    useEffect(() => {
        const getUsers = async()=>{
            const res = await fetch("http://localhost:1000/auth/users",{
              method : "GET",
            })
            const data = await res.json()
            setUsers(data)
          }
          getUsers()
    },[] )


    const registerFun = async(username, password, f_name, l_name)=>{
        if (username == "" || password == "" || f_name == "" || l_name == "") {
          return (alert("missing some info"))
        }
        if (username.length < 5 || password.length < 5) {
          return (alert("Username and password must contain at least 5 characters"))

        }
        try {
          const index = users.findIndex(user => user.username === username);
          if (index != -1) {
              return (alert("username is taken"))
            }
  
            const res = await fetch("http://localhost:1000/auth/register",{
              method : "POST",
              body: JSON.stringify({username, password, f_name, l_name}),
              headers:{"content-type":"application/json"}
            })
            history.push("/login")
            const getUsers = async()=>{
              const res = await fetch("http://localhost:1000/auth/users",{
                method : "GET",
              })
              const data = await res.json()
              setUsers(data)
            }
            getUsers()
        } catch (error) {
          console.log(error);
          setMessage("Login failed, please try again")
        }


      }
    return (
        <div className="registerDiv">
            <h1 className="registerLogo">Register Page</h1>
            <div className="con">
            <div className="imgSec1"></div>
            </div>
            <div className="registerForm">
            <h3> please Register</h3>
              <div className="con">
            <input placeholder="Username" className="registerInput1"  onChange={(e)=>{setUsername(e.target.value)}} type="text"/>
            <input placeholder="Password" className="registerInput2"   onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
            <input placeholder="First name" className="registerInput3"  onChange={(e)=>{setF_name(e.target.value)}} type="text"/>
            <input placeholder="Last name" className="registerInput4" onChange={(e)=>{setL_name(e.target.value)}} type="text"/>
              </div>

            <div className="registerButton">
            <button  onClick={()=>{registerFun(username, password, f_name, l_name)}}>Register</button>
            </div>
                {message == "Login failed, please try again" && <span><br/> <h5 style={{color: "red"}}>{message}</h5></span> }
            </div>
        </div>
    )
}
