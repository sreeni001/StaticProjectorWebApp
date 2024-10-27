const express = require('express');
const app = express();
const  cors = require('cors');
app.use(express.json());
app.use(cors());
const http = require('http');
const {Server} = require('socket.io');
const connectToMongo = require('./mongodbCon');

const server = http.createServer(app);
const corsOptions = {
    origin: "http://localhost:3000",
};
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
let db;
//getting realtime Update
async function setupChangeStream(){
     db = await connectToMongo();
    console.log("Db connected...");

    const collection1 = db.collection('Classrooms');
    const collection2 = db.collection('AccessLog');
    const collection3 = db.collection('Staffs');
    const changeStream1 = collection1.watch();
    const changeStream2 = collection2.watch();
    const changeStream3 = collection3.watch();
    changeStream1.on("change",(change)=>{
        io.emit("collection1Change", change.fullDocument);
        console.log("change in Classrooms");
    });

    changeStream2.on("change",(change)=>{
        io.emit("collection2Change", change.fullDocument);
        console.log("change in AccessLog");
        
    });
    changeStream3.on("change",(change)=>{
        io.emit("collection3Change", change.fullDocument);
        console.log("change in Staffs");
        
    });
}
setupChangeStream().catch(console.error);

//connecting mongodb Atlas to required database & the required collection

//finding all the data will be going with getrequest 

//Condition-1 getting all the classroom details from db --> not needed to be realtime
app.get('/fetchClassrooms',cors(corsOptions),async(req,res)=>{
    try{
        // const db = await connectToMongo();
        const collection =db.collection('Classrooms');
        const dataArray =await collection.find({}).toArray();
        res.status(200).json(dataArray);
    }
    catch(error){
        console.log("Error in fectching classroom details");
        res.status(500).json({message:'Error in fectching classroom details'});
    }


})
//Condition-2 getting the details of the accessing from accessing log when teacher name is given
app.post('/fetchTeacherLogs', cors(corsOptions), async (req, res) => {
    try {
        const { Name, Date } = req.body;
        
        const reqParam = {
            Name: Name,
            Date: Date,
        };
        const collection = db.collection('AccessLog');

        const dataArray = await collection
            .find(reqParam, { projection: { ClassId: 1, accessTime: 1, _id: 0 } }) .toArray();
        
        const formattedData = dataArray.map(item => ({
                Class: item.ClassId, 
                Time: item.accessTime
            }));
    
        res.status(200).json(formattedData);
             // Send back only the required data in an array
    } catch (error) {
        console.log("Cannot fetch staff details:", error);
        res.status(404).json({ message: "Error in fetching staff details..." });
    }
});
//Condition 3 getting the status of projector when class id given
app.post('/fetchClassLogs',cors(corsOptions),async (req,res)=>{
    try{
        // const db = await connectToMongo();
        const {ClassId,date,exitTime} = req.body;
        const reqParam = {
            ClassId : ClassId,
            Date : date,
            exitTime:exitTime,
        }
        const collection =db.collection('AccessLog');
        const document = await collection.findOne(reqParam);
        console.log("Fetched classLog details");
        let dataArray;
        if (document) {
            dataArray = {
                status: document.status,
                ClassId: document.ClassId,
                Name: document.Name,
            }
        console.log(dataArray);
        res.status(200).json(dataArray);}
        else {
            res.status(404).json({ message: "No matching document found" });
        }
    }
    catch(error){
        console.log("Cannot fetch Classroom Details...");
        res.status(404).json({message:"Error in fetching Classroom details..."});
    }
});

//get staffName;
app.get('/StaffList' ,cors(corsOptions), async(req,res)=>{
    try{
        // const db = await connectToMongo();
        console.log("Connected inside StaffList");
        const collection = db.collection('Staffs');
        console.log("Successfully collected data");
        const staffList = await collection.find({}).project({ Name: 1, _id: 0 }).toArray();
        res.status(200).json(staffList.map(staff => staff.Name));
    }
    catch(error){
        console.log("Error in fectching staffList available details");
        res.status(500).json({message:'Error in fectching fectching staffList details'});
    }
})


server.listen(4000, () => console.log("Server is running on port 4000"));
//checking class id with exit time null and currentdate whic is the current accessing staff