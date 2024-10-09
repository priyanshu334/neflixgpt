import { useRef, useState } from "react";
import Header from "./Header";
import {checkValidData} from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import  {useDispatch} from "react-redux"
import { addUser } from "../utils/userSliice";

const Login = ()=>{
    const navigate = useNavigate()
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState("")
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();
    const toogleSignInForm =()=>{
      setIsSignInForm(!isSignInForm);
    }
    const handleOnClick = ()=>{
        //validate the form data
        //   checkValidData(email,password)
      
     
        const message = checkValidData(email.current.value,password.current.value)
        setErrorMessage(message)
        if(message) return ;

        ///Sign in , Sign up login 
        if(!isSignInForm){
            createUserWithEmailAndPassword(auth,email.current.value,password.current.value).then((userCreadential)=>{
                const user = userCreadential.user;
                updateProfile(user,{
                    displayName: name.current.value,
                    photoURL:"https://i.pinimg.com/236x/c7/58/7e/c7587eec8e58a3eb06f5931d51f6e436.jpg"

                }).then(()=>{
                    const [uid,email,displayName,photoURL]=auth.currentUser;
                    dispatch(
                        addUser({
                            uid:uid,
                            email:email,
                            displayName:displayName,
                            photoURL:photoURL

                        })
                    )
                    navigate("/browse")
                }).catch((error)=>{
                   setErrorMessage(error.message)
                })
              
            }).catch((error)=>{
                const errorCode = error.code;
                const errorMessage =error.message;
                setErrorMessage(errorCode + errorMessage)

            })

            //signUp form login
        }else{
           //sign in form logic
           signInWithEmailAndPassword(auth,email.current.value,password.current.value).then((userCreadential)=>{
            const user=userCreadential.user;
            navigate("/browse")
            
           }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+errorMessage);
           })
        }
        
    }
    return (
        <div>
            <Header/>
            <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg"/>



            <form onSubmit={(e)=>e.preventDefault()} className="p-12 w-3/12 absolute bg-black my-36 mx-auto right-0 left-0 text-white opacity-85 ">
            <h1 className="font-bold text-3xl m-2 py-4"> {isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 m-2 w-full bg-gray-900 rounded-lg"/>}

                <input
                 ref={email}
                 type="text" placeholder="Email Address" className="p-4 m-2 my-3 w-full bg-gray-900 text-white rounded-lg"/>
           
                <input
                ref={password}
                 type="password" placeholder="Enter password" className="p-4 m-2 w-full bg-gray-900 rounded-lg"/>
                 <p className="text-red-600 font-bold mx-4  text-lg p-2">{errorMessage}</p>

                <button className="p-4 m-2 mt-10 font-bold text-2xl bg-red-700 w-full rounded-lg" onClick={handleOnClick}> {isSignInForm?"Sign In":"Sign Up"}</button>

                <p className="py-6 cursor-pointer "onClick={toogleSignInForm}> {isSignInForm?"New to netflix Sign Up now":"already a member Log IN "} </p>
            </form>
        </div>
    )
}

export default Login;