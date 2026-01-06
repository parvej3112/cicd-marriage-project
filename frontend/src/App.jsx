import React from 'react'
import MariageForm from './Component/MariageForm'
import CertificateForm from './Component/CertificateForm'
import Admin from './Component/Admin'
import Login from './Component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllCertificate from './Component/AllCertificate'
import EditCertificate from './Component/EditCertificate'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mariageForm" element={<MariageForm />} />
        <Route path="/certificateform" element={<CertificateForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/allCertificate' element={<AllCertificate />} />
         <Route path="/edit/:id" element={<EditCertificate />} />
         

      </Routes>
    </BrowserRouter>
  )
}

export default App
