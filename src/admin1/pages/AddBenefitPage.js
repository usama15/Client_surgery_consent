import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import BenefitForm from '../../components/BenefitForm';
import EditBenefit from '../../components/EditBenefit';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';


const AddBenefitPage = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [icon, setIcon] = useState('bx bx-menu sidebarBtn');
    const location = useLocation();

  return (
    <>
        <Sidebar sidebar={sidebar} />
        <section className='home-section'>
            <Topbar icon={icon} setIcon={setIcon} setSidebar={setSidebar} />
            <div className='home-content'>
              {location.pathname === '/admin/benefits/add' ? (
                <BenefitForm />
              ) : (
                <EditBenefit />
              )}
            </div>
        </section>
    </>
  )
}

export default AddBenefitPage