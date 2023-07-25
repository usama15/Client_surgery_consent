import React, { useState } from 'react'
import Risks from '../../components/Risks';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const RisksPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              <Risks />
            </div>
        </section>
    </>
  )
}

export default RisksPage