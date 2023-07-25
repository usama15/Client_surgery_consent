import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import AddProcedure from '../../components/AddProcedure';


const AddProcedurePage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              <AddProcedure />
            </div>
        </section>
    </>
  )
}

export default AddProcedurePage