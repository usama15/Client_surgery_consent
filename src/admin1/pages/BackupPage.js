import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Backup from '../../components/Backup';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const BackupPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');
    const location = useLocation();

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              {/* {location.pathname === '/admin/benefits/add' ? (
                <BenefitForm />
              ) : (
                <EditBenefit />
              )} */}
              <Backup />
            </div>
        </section>
    </>
  )
}

export default BackupPage