import {React,useState,useEffect} from 'react';
import './cssfiles/IndexPage.css';
import LoginCred from './LoginCredential.js'
function IndexPage(props){

    return(
        <>
        
        <div className=" ParentContainer">
        <div className='split loginContainer'>
        <LoginCred/>
        </div>
        <div className='split ContentContainer'>

        </div>
        
        
        </div>
        </>
    )

}

export default IndexPage;