import {React,useState,useEffect} from 'react';
import './cssfiles/IndexPage.css';
import LoginCred from './LoginCredential.js';
import {useLocation} from 'react-router-dom';
function IndexPage(props){
    const locate = useLocation();
    const {Name,role} = locate.state;
    return(
        <>
        
        <div className="ParentContainer">
        <div className='split loginContainer'>
        <LoginCred name={Name} role={role} />
        </div>
        <div className='split ContentContainer'>

        </div>
        
        
        </div>
        </>
    )

}

export default IndexPage;