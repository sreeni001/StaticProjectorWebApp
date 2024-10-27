import {React,useState,useEffect} from 'react';
import './cssfiles/Dashboard.css';
import io from 'socket.io-client'; 

const socket = io("http://localhost:4000");
function Dashboard(props){
    const [ProjectStatus,setProjectStatus]=useState({status:"ON",ClassId:"LTC218",Name:"Dr.Ezhiarasi"});
    console.log(props.isvalidate);

    const [scrollTop, setScrollTop] = useState(0);

      const handleScroll = event => {
    setScrollTop(event.currentTarget.scrollTop);
    };

    /* Dashboard List (will be used to get Data from Db and set)*/
    const [DateList,selectDate] = useState(['24/10/2024','25/10/2024','26/10/2024'])
    const [StaffList,selectStaff]= useState([]);
    const [ClassAccessed,getClassAccessed] = useState([{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'}])

    /*selectedDate and Staff List used for showing the selected data */
    const [selectedStaff,getSelectedStaff] = useState('');
    const [selectedDay,getSelectedDay] = useState('');

     /*Classroom*/
     const [classRoom,AvailableClassRoom] = useState([{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},])

    /* Starting of Fetching Application details */
    var classInfo;
    var formattedDate;

    const fetchData = async(staff,day)=>{
        console.log("Fetch Data called");
        try{

            const response = await fetch("http://localhost:4000/fetchTeacherLogs",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"Name" : staff,
                    "Date" : day}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                getClassAccessed(result);
            } else {
                console.error("Failed to access  staff data");
              }

        }
        
        catch(error){
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        ClassinDb();
        const handleClassChange = () => {
            console.log("Collection1 changed");
            ClassinDb();
        };
        socket.on("collection1Change", handleClassChange);
        
        return () => {
            socket.off("collection1Change", handleClassChange);
        };
    }, []);
    
    useEffect(() => {
        fetchData(selectedStaff, selectedDay);
        const handleDataChange = () => {
            console.log(selectedStaff,selectedDay);
            fetchData(selectedStaff, selectedDay);
            console.log("AccessLogChanged..");
            fetchClassDetails(classInfo, formattedDate);
        };
        socket.on("collection2Change", handleDataChange);
    
        return () => {
            socket.off("collection2Change", handleDataChange);
        };
    }, []);

    useEffect(() => {
        StaffinDb();
        const handleStaffChange = () => {
            StaffinDb();
        };
        socket.on("collection3Change",handleStaffChange);
    
        return () => {
            socket.off("collection3Change",handleStaffChange);
        };
    }, []);
    


    //sub2 

        const fetchClassDetails = async(Class,date)=>{
            console.log(Class);
            console.log(date);
            try{
    
                const response = await fetch("http://localhost:4000/fetchClassLogs",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "ClassId" : Class,
                        "Date" :date,
                        "exitTime":null,
                    }),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    setProjectStatus(result);
                } else {
                    console.error("Failed to access  staff data");
                  }
    
            }
            
            catch(error){
                console.error("Error fetching data:", error);
            }
        }
    


        const handleClassClick = (Type,No)=>{
            const class_Name = Type;
            const class_Id = No;
            // ClassId : ClassId,
            // Date : date,
            // exitTime:exitTime,
            classInfo = Type+No;
            const currentDate = new Date();
            console.log("Data collected...");
            const day = String(currentDate.getDate()).padStart(2, '0'); // Ensures two digits
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = currentDate.getFullYear();

             formattedDate = `${day}/${month}/${year}`;
            fetchClassDetails(classInfo,formattedDate);

        }


    //end of sub2

    //ClassRoomsAvailable

    const ClassinDb = async ()=>{
        try{

            const response = await fetch("http://localhost:4000/fetchClassrooms");

            if (response.ok) {
                const result = await response.json();
                AvailableClassRoom(result);
            } else {
                console.error("Failed to access  classroom available data");
              }

        }
        
        catch(error){
            console.error("Error classroom availablr data:", error);
        }
    }

    const StaffinDb = async ()=>{
        try{

            const response = await fetch("http://localhost:4000/StaffList");

            if (response.ok) {
                const result = await response.json();
                selectStaff(result);
            } else {
                console.error("Failed to staff available data");
              }

        }
        
        catch(error){
            console.error("Error classroom staff data:", error);
        }
    }
    

    /* Ending of Fetching Application Details*/

    const staffSelected =(e)=>{
        const staff = e.target.value;
        getSelectedStaff(e.target.value);
        console.log(staff);
        fetchData(staff,selectedDay);
    }
     const DaySelected =(e)=>{
        const day = e.target.value;
        getSelectedDay(e.target.value);
        console.log(day);
        fetchData(selectedStaff,day);
    }    



   

    

       return(
     <>

     {(props.isvalidate==true)? <div className='ContentHolder'>

                <div className='ProjectorCondition'>
                                <h1 className='StatusBanner'>Projector Status: </h1>
                                <h1 className='Status'>{ProjectStatus.status}</h1>
                                <p className='ID'>ID: {ProjectStatus.ClassId}</p>
                                <p className='Name'>ID: {ProjectStatus.Name}</p>
                </div>
                <div className='StaffOperations'>
                        <div className='DaySelect'>
                        <select value={selectedDay} onChange={DaySelected}className='DayList'>
                                {DateList.map((day) =>(<option id={day} key={day} value={day}>{day}</option>))}
                            </select>
                        </div>
                        <div className='StaffSearch'>
                            <select value={selectedStaff} onChange={staffSelected} className='StaffList'>
                                {StaffList.map((staff) =>(<option id={staff} key={staff} value={staff}>{staff}</option>))}
                            </select>
                        </div>
                        {/* <div className='AccessedClassList'>

                        {ClassAccessed.map((classData) =>(
                            <div className='ListofClass' ><span className='classNames'>{classData.Class}</span><span className='Time'>{classData.Time}</span></div>
                        ))}

                        </div> */}
                        <div className="AccessedClassList"
                                 style={{
                                 maxHeight: '200px', // Set the desired max height to control the vertical scroll area
                                 overflowY: 'auto',  // Enable vertical scrolling
                                 overflowX: 'hidden', // Hide horizontal scrollbar
                                }}>
                                {ClassAccessed.map((classData) => (
                                <div className="ListofClass" key={classData.id}>
                                <span className="classNames" key={classData.Class}>{classData.Class}</span>
                               
                                <span className="Time">
                                    <img src='https://cdn2.iconfinder.com/data/icons/inverticons-stroke-vol-4/32/connection_signal_full_internet_phone-512.png' height='15px' width='15px'/>
                                    <img src='https://www.pngarts.com/files/4/Black-Wifi-Logo-Transparent-Images-279x279.png' height='15px' width='15px'/>
                                    {classData.Time}</span>
                                </div>
                                 ))}
                                </div>

                        </div>
                {/* Classroom Data */}
                <div className='Classrooms' style={{
                                 maxHeight: '400px', 
                               // Set the desired max height to control the vertical scroll area
                                 overflowY: 'hidden',  // Enable vertical scrolling
                                 overflowX: 'auto', // Hide horizontal scrollbar
                                }} >
                        <p className='Sampletext'>Classrooms</p>
                        <p className='SampleQuote'>“Learning is not limited to the classroom.”</p>
                        <div className='classContainer' style={{
                                 maxHeight: '400px',
                                 maxWidth:'100%', 
                               // Set the desired max height to control the vertical scroll area
                               
                                 overflowY: 'hidden',  // Disable vertical scrolling
                                 overflowX: 'auto',    // Enable horizontal scrolling
                                 display: 'flex',
                                 flexDirection: 'row',
                                }}>
                        {classRoom.map((classes) => (
                            <div className="Classes" onClick={()=>handleClassClick(classes.Type, classes.No)}>
                                <img src='https://www.svgrepo.com/download/109705/open-book.svg' className="bookimg"/>
                                <div className='Type' key={classes.Type}>{classes.Type}</div>
                                <div className='No'key={classes.No}>{classes.No}</div>
                            </div>
                        ))}
                        </div>
                </div>

      </div> 
      : <p>Data Loading...</p>
      }
     </>   
    )
}

export default Dashboard;