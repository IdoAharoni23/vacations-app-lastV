import React, { useEffect, useState } from 'react'
import Login from './comp/Login'
import Register from './comp/Register'
import VacationsList from './comp/VacationsList'

import {BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom"
import Vacation from './comp/Vacation'
import AddVacation from './comp/AddVacation'
import Edit from './comp/Edit'
import store from "./store"
import {Provider,useSelector} from "react-redux"
import Chart from './comp/Chart'



export default  function App() {




  useEffect(() => {
    const userLogin = async()=>{
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:1000/auth/check",{
        method : "GET",
        headers:{"content-type":"application/json", "authorization" : `${token}`}
      })
       const data = await res.json()
       if (data.username && data.role) {
        let usernameToStore = data.username
        let roleToStore = data.role
        store.dispatch({type: "SET_USERNAME", payload: usernameToStore})
        store.dispatch({type: "SET_ROLE", payload: roleToStore})
        userChange(data.username)
        roleChange(data.role)
        myVacationsFun()
        getVacations()
       }else{
         localStorage.removeItem("token")
       }
      
  }
        


  userLogin()
  }, [])



  const history = useHistory()
  const [vacations, setVacations] = useState([])
  const [myVacations, setMyVacations] = useState([])
  const [user, setUser] = useState("guest")
  const userChange = (name)=>{
    setUser(name)
  }

  const [role, setRole] = useState("guest")
  const roleChange = (role)=>{
    setRole(role)
  }

  const myVacationsFun = async()=>{

    const res = await fetch("http://localhost:1000/vacations/myvacations",{
      method : "GET",
      headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
    })
    const data =await res.json()
    setMyVacations(data)
}

  const getVacations = async()=>{

      const res = await fetch("http://localhost:1000/vacations",{
        method : "GET",
        headers:{"content-type":"application/json", "authorization" : `${localStorage.getItem("token")}`}
      })
      const data = await res.json()
      await setVacations(data)
      myVacationsFun()
    }




    const [data, setData] = useState({
      chartData:{
          labels: [],
          datasets:[
              {
                  label: "Followers",
                  data: [],
                  backgroundColor: []
              }
          ]
      }
  })


    useEffect(() => {
        
      const updateChart = ()=>{
          let updateChart = {
            chartData:{
                labels: [],
                datasets:[
                    {
                        label: "Followers",
                        data: [],
                        backgroundColor: []
                    }
                ]
            }
        }
          vacations.map(vac=>{
            if (vac.follower != 0 ) {
              updateChart.chartData.labels.push(vac.destination)
              updateChart.chartData.datasets[0].data.push(vac.follower)
              function colorRandom() {
                  const r = Math.floor(Math.random() * 256);
                  const g = Math.floor(Math.random() * 256);
                  const b = Math.floor(Math.random() * 256);
                    return (`rgba(${r},${g},${b},0.6)`)}
              let color = colorRandom()
              updateChart.chartData.datasets[0].backgroundColor.push(color)
            }
          })
          setData(updateChart)
      }
      updateChart()

  }, [vacations])





  return (
    
    <Provider store ={store}>
      
    <div className="app ">
      <Router>
        
    
      <div className="navbar">
        <nav>
            <div className="logo">
              <u>InstaVac</u>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/vacations">Vacations</Link>
            </div>
            {role == "admin" && <div>
              <Link to="/chart">Chart</Link>
            </div> }
            <div>
              <Link to="/login">
               {user !== "guest" &&  <button onClick={()=>{localStorage.removeItem("token")
                                                        store.dispatch({type: "SET_USERNAME", payload: "guest"})
                                                        store.dispatch({type: "SET_ROLE", payload: "guest"})
                                                        setRole("guest")
                                                        setUser("guest")}}>Logout</button> }
              </Link>
            </div> 
        </nav>
      </div>
      <div className="main">
      <Switch>
          <Route exact path="/login">
            <Login roleChange={roleChange} myVacationsFun = {myVacationsFun} userChange={userChange} getVacations={getVacations}/>
          </Route>
          <Route path="/vacations">
            <VacationsList  getVacations={getVacations} vacations={vacations} myVacations = {myVacations} myVacationsFun={myVacationsFun}  />
          </Route> 
          <Route path="/register">
            <Register  />
          </Route>
          <Route path="/newVacation">
            <AddVacation getVacations={getVacations}   />
          </Route>
          {role == "admin" && <Route path="/chart">
            <Chart data={data} />
          </Route> }
      <Redirect from="/" to="/login" />
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
  )
}


