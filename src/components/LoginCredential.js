import {React,useEffect,useState} from 'react';
import login from './assets/login.png';
import './cssfiles/LoginCred.css';
import LoginButtonImg from './assets/LoginButton.png'
function LoginCredential(){
    const [userName,setUserName] = useState('DR. SHANKAR SRIRAM');
    const [userRole,setUserRole] = useState('Dean Soc');
    return(
        <>
            <div id="Container">
            <img src={login} className='UserImg'/>
            <h4 id="Name">{userName}</h4>
            <p id="Role">{userRole}</p>
            <img src={LoginButtonImg} className='LoginButton-1'/>
            </div>
        </>
    )

}
export default LoginCredential;