import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import EditRisk from '../../components/EditRisk';
import RiskForm from '../../components/RiskForm';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const AddRiskPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');
    const location = useLocation();

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              {location.pathname === '/admin/risks/add' ? (
                <RiskForm />
              ) : (
                <EditRisk />
              )}
            </div>
        </section>
    </>
  )
}

export default AddRiskPage