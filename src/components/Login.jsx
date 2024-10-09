import { useRef, useState } from "react";
import Header from "./Header";
import {checkValidData} from "../utils/validate"
const Login = ()=>{
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState("")
    const email = useRef(null);
    const password = useRef(null);
    const toogleSignInForm =()=>{
      setIsSignInForm(!isSignInForm);
    }
    const handleOnClick = ()=>{
        //validate the form data
        //   checkValidData(email,password)
        console.log(email.current.value)
        console.log(password.current.value);
        const message = checkValidData(email.current.value,password.current.value)
        setErrorMessage(message)
        console.log(message)
        
    }
    return (
        <div>
            <Header/>
            <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg"/>



            <form onSubmit={(e)=>e.preventDefault()} className="p-12 w-3/12 absolute bg-black my-36 mx-auto right-0 left-0 text-white opacity-85 ">
            <h1 className="font-bold text-3xl m-2 py-4"> {isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 m-2 w-full bg-gray-900 rounded-lg"/>}

                <input
                 ref={email}
                 type="text" placeholder="Email Address" className="p-4 m-2 my-3 w-full bg-gray-900 text-white rounded-lg"/>
           
                <input
                ref={password}
                 type="password" placeholder="Enter password" className="p-4 m-2 w-full bg-gray-900 rounded-lg"/>
                 <p className="text-red-600 font-bold mx-4 text-lg p-2">{errorMessage}</p>

                <button className="p-4 m-2 mt-10 bg-red-700 w-full rounded-lg" onClick={handleOnClick}> {isSignInForm?"Sign In":"Sign Up"}</button>

                <p className="py-6 cursor-pointer "onClick={toogleSignInForm}> {isSignInForm?"New to netflix Sign Up now":"already a member Log IN "} </p>
            </form>
        </div>
    )
}

export default Login;