import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import EditUser from '../../components/EditUser';


const EditUserPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              <EditUser />
            </div>
        </section>
    </>
  )
}

export default EditUserPage