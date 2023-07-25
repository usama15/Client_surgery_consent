import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import FormComponent from '../../components/FormComponent';


const AddUserPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content' style={{width: '100%'}}>
              <FormComponent />
            </div>
        </section>
    </>
  )
}

export default AddUserPage