import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Table from '../../components/Table';


const Procedures = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              {/* <div className='sales-boxes' style={{width: '100%'}}> */}
                <Table />
              {/* </div> */}
            </div>
        </section>
    </>
  )
}

export default Procedures