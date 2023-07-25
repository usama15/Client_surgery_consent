import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import EditProName from '../../components/EditProName';
import ProName from '../../components/ProNameForm';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const AddProName = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');
    const location = useLocation();
    const path = location.pathname;

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              {path === '/admin/proceduresname/add' ? (
                <ProName />
              ) : (
                <EditProName />
              )}
            </div>
        </section>
    </>
  )
}

export default AddProName