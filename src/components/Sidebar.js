import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPatchPlus } from 'react-icons/bs';
import { GrRisk } from 'react-icons/gr';
import { SiProcessingfoundation } from 'react-icons/si';
import { BiLink } from 'react-icons/bi';
import { MdOutlineBackup } from 'react-icons/md';

const Sidebar = () => {
  const navigate = useNavigate()
  const adtoken = localStorage.getItem('bcoadmin');
  console.log("toke token token : ", adtoken)
  if(adtoken !== 'logged'){    
    navigate('/adminlogin');
  }
  const logout = () => {
    localStorage.removeItem('bcoadmin')
    navigate('/adminlogin');
  }
  
  return (
    <div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">Admin Panel</span>
    </div>
      <ul className="nav-links ps-0">
        <li>
          <a href="#" className="active">
            <i className='bx bx-grid-alt' ></i>
            <span className="links_name">Dashboard</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <i className='bx bx-box' ></i>
            <span className="links_name">Product</span>
          </a>
        </li> */}
        <li>
          <a onClick={() => navigate('/admin/proceduresname')}>
            <i className=''><SiProcessingfoundation /></i>
            <span className="links_name">Procedures</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/procedures')}>
            <i className='' ><BiLink /></i>
            <span className="links_name">Linked Procedures</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <i className='bx bx-pie-chart-alt-2' ></i>
            <span className="links_name">Analytics</span>
          </a>
        </li> */}
        {/* <li>
          <a href="#">
            <i className='bx bx-coin-stack' ></i>
            <span className="links_name">Stock</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-book-alt' ></i>
            <span className="links_name">Total order</span>
          </a>
        </li> */}
        <li>
          <a onClick={() => navigate('/admin')}>
            <i className='bx bx-user' ></i>
            <span className="links_name">Users</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/benefits')}>
            <i className='' ><BsPatchPlus /></i>
            <span className="links_name">Benefits List</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/risks')}>
            <i className=''><GrRisk style={{backgroundColor: 'white'}} /></i>
            <span className="links_name">Risks List</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/additionalprocedures')}>
            <i className=''><SiProcessingfoundation /></i>
            <span className="links_name">Additional Procedures</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/additionalbenefits')}>
            <i className='' ><BsPatchPlus /></i>
            <span className="links_name">Additional Benefits</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/additionalrisks')}>
            <i className=''><GrRisk color='white' style={{backgroundColor: 'white'}} /></i>
            <span className="links_name">Additional Risks</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/admin/backup')}>
            <i className=''><MdOutlineBackup color='white'  /></i>
            <span className="links_name">Database Backup</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <i className='bx bx-cog' ></i>
            <span className="links_name">Setting</span>
          </a>
        </li> */}
        <li className="log_out">
          <a onClick={() => logout()}>
            <i className='bx bx-log-out'></i>
            <span className="links_name">Log out</span>
          </a>
        </li>
      </ul>
  </div>
  )
}

export default Sidebar