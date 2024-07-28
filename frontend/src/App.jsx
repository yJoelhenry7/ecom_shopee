import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashBoard'
import OrderDetailsForm from './components/OrderDetailsForm'
import CustomNavbar from './components/Navbar/CustomNavbar'
import AdminSignIn from './components/Admin/AdminSignIn'



function App() {


  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<OrderDetailsForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />

      </Routes>
    </div>
  )
}

export default App
