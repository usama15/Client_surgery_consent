import React, { useState } from 'react'
import EditProName from '../../components/EditProName';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const AddProName = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
                <EditProName />
            </div>
        </section>
    </>
  )
}

export default AddProName