import React, { useState } from 'react'
import Benefits from '../../components/Benefits';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const BenefitsPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              <Benefits />
            </div>
        </section>
    </>
  )
}

export default BenefitsPage