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
    const [ClassAccessed,getClassAccessed] = useState([{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'},{Class:'LTC214',Time:'11 am'}])

    /*selectedDate and Staff List used for showing the selected data */
    const [selectedStaff,getSelectedStaff] = useState('');
    const [selectedDay,getSelectedDay] = useState('');
    const staffSelected =(e)=>{
        getSelectedStaff(e.target.value);
    }
     const DaySelected =(e)=>{
        getSelectedDay(e.target.value);
    }    



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
                                <span className="classNames">{classData.Class}</span>
                                <span className="Time">{classData.Time}</span>
                                </div>
                                 ))}
                                </div>

                        </div>

                <div className='Clasrooms'>

                </div>

      </div> 
      : <p>Data Loading...</p>
      }
     </>   
    )
}

export default Dashboard;