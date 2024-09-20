import {React,useState} from 'react';
import './cssfiles/login.css'
import logo from './assets/login.png';
function Login(){
        //const [userName,getUsername] = useState('');
        
        return(
            <>
                <div className='Container'>
                <img src={logo} alt="image" className='login-logo'/>
                <div className='Form' >
                    
                    <input type='email' name='usrname' className='usrname' placeholder='Email'/>
                    <br/>
                    
                    <input type='password' name='pass' className='pass' placeholder='Password'/>
                </div>
                </div>
            </>
        )
}
export default Login;
