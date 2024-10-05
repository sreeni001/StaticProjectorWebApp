import {React,useState} from 'react';
import './cssfiles/login.css'
import LoginButton from './assets/LoginButton.png'
import logo from './assets/login.png';
function Login(){
        //const [userName,getUsername] = useState('');
        const Validation=async ()=>{
            try{
            
            const result = await fetch("http://localhost:5000/submit",{
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json', // Specify content type
                },
                body: JSON.stringify({usrname: document.getElementsByClassName('usrname')[0].value ,pass: document.getElementsByClassName('pass')[0].value}),
            });
            if(!result.ok) throw new Error('problem in fetching');
            const data = await result.json();
            console.log(data);}
            catch(err){
                console.error('Error fetching data:', err);
            }
        }
        return(
            <>
                <div className='Container'>
                <img src={logo} alt="image" className='login-logo'/>
                <div className='Form' >
                    
                    <input type='email' name='usrname' className='usrname' placeholder='Email'/>
                    <br/>
                    
                    <input type='password' name='pass' className='pass' placeholder='Password'/>
                    <img src={LoginButton} onClick={Validation} className='LoginButton'/>
                </div>
                </div>
            </>
        )
}
export default Login;
