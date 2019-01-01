import React, {useState,useEffect} from 'react'
import Login from './Login'
import Register from './Register'
import "./indexAuth.css";

const indexAuth = (props) => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if(props.userCreation){
            setToggle(false)
        }
    },[props.userCreation])

    const onToggleToRegister = () => {
        setToggle(true)
    }
    const onToggleToLogin = () => {
        setToggle(false)
    }

    let renderView = null;

    if(!toggle){
        renderView = 
        <Login 
            onToggleToRegister = {onToggleToRegister} 
            getLoginInfo = {(values) => props.getLoginInfo(values)}
        />
    } else {
        renderView =
        <Register
            onToggleToLogin = {onToggleToLogin}
            getSignUpInfo = {(values) => props.getSignUpInfo(values)}
        />
    }
    return (
        <>
            {renderView}
        </>
    )
}

export default indexAuth