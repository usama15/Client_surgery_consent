import React from 'react'
import avatar from '../images/avatar.png';
import avatar1 from '../images/1.png';
import avatar2 from '../images/12.png';


const Topbar = (props) => {
    const {icon, setIcon, setSidebar} = props;
    const btnStyle = {outline: 'none', border: 'none', backgroundColor: 'white'}
  const responsive = () => {
    // alert('sdfjdjf');
    // alert(icon);
    if(icon === 'bx bx-menu sidebarBtn'){
      setIcon('bx bx-menu-alt-right sidebarBtn');
      setSidebar('sidebar active');
      // alert(icon);
    }
    else if(icon === 'bx bx-menu-alt-right sidebarBtn'){
      setIcon('bx bx-menu sidebarBtn');
      setSidebar('sidebar');
      // alert(icon);
    }
  }

  return (
    <nav>
      <div className="sidebar-button">
       <button style={btnStyle} onClick={responsive} className={icon}><i className='icon'></i></button>
       {/* {icon === 'bx bx-menu sidebarBtn' ? (
        <button onClick={() => {setIcon('bx bx-menu-alt-right sidebarBtn'); setSidebar('sidebar active');} } style={btnStyle}> <i className={icon}></i></button>) : (
          <button onClick={() => {setIcon('bx bx-menu sidebarBtn'); setSidebar('sidebar');}}  style={btnStyle}> <i className={icon}></i></button>
        ) } */}
        {/* <i className='bx bx-menu sidebarBtn'></i> */}
        <span className="dashboard">Dashboard</span>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <i className='bx bx-search' ></i>
      </div>
      <div className="profile-details">
        <img src={avatar1} alt="" />
        <span className="admin_name">Admin</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
    </nav>
  )
}

export default Topbar