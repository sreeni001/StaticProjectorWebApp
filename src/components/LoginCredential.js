import {React,useEffect,useState} from 'react';
import login from './assets/login.png';
import './cssfiles/LoginCred.css';
import LoginButtonImg from './assets/LoginButton.png';

function LoginCredential(props){
    const [userName,setUserName] = useState('No UserName');
    const [userRole,setUserRole] = useState('Role');
    
    useEffect(() => {
        const { name, role } =props;
        if (name) setUserName(name);
        if (role) setUserRole(role);
    }, [userName,userRole]);
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