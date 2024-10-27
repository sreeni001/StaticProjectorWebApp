const express = require('express');
const app = express();
const  cors = require('cors');
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000",
};

app.post('/submit',cors(corsOptions),(req,res)=>{
    const {usrname,pass} = req.body;
    if(usrname=='deansoc@sastra.edu' && pass=='Sriram'){
        res.status(200).json({Name:'DR.SHANKAR SRIRAM',role:'Dean SoC'});
    }
    else{
        res.status(400).json({message:'Error proper Username and Password required'});
    }
})

/* Api for taking care of connection to db and realtime connection */






app.listen(5000,()=>{
    console.log("Server Started Listening..");
})