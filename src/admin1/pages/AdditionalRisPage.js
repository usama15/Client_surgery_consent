import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import AdditionalRis from '../../components/AdditionalRis';


const AdditionalRisPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              <AdditionalRis />
            </div>
        </section>
    </>
  )
}

export default AdditionalRisPage