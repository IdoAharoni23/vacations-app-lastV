import produce from "immer";
import {createStore} from "redux"

const initialState = {
    role : "guest",
    username : "guest"
}


const reducer = produce((state, action)=>{
    switch (action.type) {
        case "SET_USERNAME":
            state.username = action.payload
            break;
        case "SET_ROLE":
            state.role = action.payload
            break;
    }
}, initialState);

const store = createStore(reducer)
window.store = store
export default store;