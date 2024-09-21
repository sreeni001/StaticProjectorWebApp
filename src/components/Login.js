import {React,useState} from 'react';
import './cssfiles/login.css'
import LoginButton from './assets/LoginButton.png'
import logo from './assets/login.png';
function Login(){
        //const [userName,getUsername] = useState('');
        const printVal=()=> console.log("Hi");
        return(
            <>
                <div className='Container'>
                <img src={logo} alt="image" className='login-logo'/>
                <div className='Form' >
                    
                    <input type='email' name='usrname' className='usrname' placeholder='Email'/>
                    <br/>
                    
                    <input type='password' name='pass' className='pass' placeholder='Password'/>
                    <img src={LoginButton} onClick={printVal} className='LoginButton'/>
                </div>
                </div>
            </>
        )
}
export default Login;
