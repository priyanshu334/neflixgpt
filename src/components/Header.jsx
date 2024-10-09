import { signOut } from "firebase/auth";

import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = ()=>{
    const user = useSelector((store)=>store.user)
    const navigate = useNavigate()
    const handleSignOut = ()=>[
        signOut(auth).then(()=>{
            navigate("/")

        }).catch((error)=>{
            navigate("/error")

        })
    ]
    return (
        <div className="flex justify-between absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10">
            <img className="w-44 " alt="netflix logo" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"/>
         { user&&  <div className="flex p-2">
                <img className="h-12 w-12  mt-2" alt="usericon"
                src={user?.photoURL}/>
                <button  onClick={handleSignOut} className="mx-4 cursor-pointer bg-red-700 rounded-lg text-white font-bold">Sign Out</button>
            </div>}
        </div>
    )
}

export default Header;