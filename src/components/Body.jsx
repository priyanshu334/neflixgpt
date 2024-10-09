import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSliice";
const Body = ()=>{
    const dispatch = useDispatch()

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
         if(user){
             const {uid,email,displayName,photoURL} = user
             dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
         
         }else{
            dispatch(removeUser())
          

         }
        })
     },[])
    return (
      
        <div>
 
<RouterProvider router={appRouter}/>


        </div>
    )
}

export default Body;