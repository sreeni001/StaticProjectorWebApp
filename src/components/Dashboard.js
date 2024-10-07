import {React,useState,useEffect} from 'react';
import './cssfiles/Dashboard.css';



function Dashboard(props){
    const [ProjectStatus,setProjectStatus]=useState({status:"ON",Id:"LTC218",Name:"Dr.Ezhiarasi"});
    console.log(props.isvalidate);

    const [scrollTop, setScrollTop] = useState(0);

      const handleScroll = event => {
    setScrollTop(event.currentTarget.scrollTop);
    };

    /* Dashboard List (will be used to get Data from Db and set)*/
    const [Date,selectDate] = useState(['Yesterday','Today'])
    const [StaffList,selectStaff]= useState(['Prof.Ezhilarasi','Prof.Rajilal']);
    const [ClassAccessed,getClassAccessed] = useState([{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'}])

    /*selectedDate and Staff List used for showing the selected data */
    const [selectedStaff,getSelectedStaff] = useState('');
    const [selectedDay,getSelectedDay] = useState('');
    const staffSelected =(e)=>{
        getSelectedStaff(e.target.value);
    }
     const DaySelected =(e)=>{
        getSelectedDay(e.target.value);
    }    

    /*Classroom*/
    const [classRoom,AvailableClassRoom] = useState([{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},{Type:"LTC",No:"214"},])

       return(
     <>

     {(props.isvalidate==true)? <div className='ContentHolder'>

                <div className='ProjectorCondition'>
                                <h1 className='StatusBanner'>Projector Status: </h1>
                                <h1 className='Status'>{ProjectStatus.status}</h1>
                                <p className='ID'>ID: {ProjectStatus.Id}</p>
                                <p className='Name'>ID: {ProjectStatus.Name}</p>
                </div>
                <div className='StaffOperations'>
                        <div className='DaySelect'>
                        <select value={selectedDay} onChange={DaySelected}className='DayList'>
                                {Date.map((day) =>(<option id={day} key={day} value={day}>{day}</option>))}
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
                            <div className="Classes">
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