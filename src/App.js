import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Procedures from "./admin1/pages/Procedures";
import AddProcedurePage from "./admin1/pages/AddProcedurePage";
import './admin1/style.css'
import AdminLogin from './admin1/pages/AdminLogin';
import EditUserPage from "./admin1/pages/EdituserPage";
import AddUserPage from "./admin1/pages/AddUserPage";
import ProceduresPage from "./admin1/pages/ProceduresPage";
import EditProcedurePage from "./admin1/pages/EditProcedurePage";
import AdditionalBenPage from "./admin1/pages/AdditionalBenPage";
import AdditionalRisPage from "./admin1/pages/AdditionalRisPage";
import UserLogin from "./admin1/pages/UserLogin";
import Wellcome from "./components/Wellcome";
import BenefitsPage from "./admin1/pages/BenefitsPage";
import RisksPage from "./admin1/pages/RisksPage";
import AddBenefitPage from "./admin1/pages/AddBenefitPage";
import AddRiskPage from "./admin1/pages/AddRiskPage";
import AddProName from "./admin1/pages/AddProNamePage";
import ProNameListPage from "./admin1/pages/ProNameListPage";
import AdditionalProPage from "./admin1/pages/AdditionalProPage";
import { useState } from "react";
import BackupPage from "./admin1/pages/BackupPage";
import Footer from "./components/Footer";


function App() {
  const [editData, setEditData] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<div> <UserLogin />  </div>} />
        <Route path={'/document'} element={<div> <Navbar /> <Home /></div>} />
        {/* <Route path={'/login'} element={<div> </div>} /> */}
        <Route path={"/admin"} element={<Procedures />} />
        <Route path={"/adminlogin"} element={<AdminLogin />} />
        <Route path={"/admin/user/add"} element={<AddUserPage />} />
        <Route path={"/admin/user/edit/:id"} element={<EditUserPage />} />
        <Route path={"/admin/procedure/add"} element={<AddProcedurePage />} />
        <Route path={"/admin/procedures"} element={<ProceduresPage setEditData={setEditData} />} />
        <Route path={"/admin/additionalbenefits"} element={<AdditionalBenPage />} />
        <Route path={"/admin/additionalrisks"} element={<AdditionalRisPage />} />
        <Route path={"/admin/additionalprocedures"} element={<AdditionalProPage />} />
        <Route path={"/admin/procedure/edit/:id"} element={<EditProcedurePage editData={editData} />} />
        <Route path={"/admin/benefits"} element={<BenefitsPage />} />
        <Route path={"/admin/benefits/add"} element={<AddBenefitPage />} />
        <Route path={"/admin/benefits/edit/:id"} element={<AddBenefitPage />} />
        <Route path={"/admin/risks/add"} element={<AddRiskPage />} />
        <Route path={"/admin/risks/edit/:id"} element={<AddRiskPage />} />
        <Route path={"/admin/risks"} element={<RisksPage />} />
        <Route path={"/admin/proceduresname/add"} element={<AddProName />} />
        <Route path={"/admin/proceduresname/edit/:id"} element={<AddProName />} />
        <Route path={"/admin/proceduresname"} element={<ProNameListPage />} />
        <Route path={"/admin/backup"} element={<BackupPage />} />
      </Routes>
    </BrowserRouter>
    
  ); 
}
export default App;
