import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashBoard'
import OrderDetailsForm from './components/OrderDetailsForm'
import AdminSignIn from './components/Admin/AdminSignIn'
import GenerateReceipt from './components/Receipts/GenerateReceipt'
import { useContext, useEffect } from 'react'
import { UserContext } from './components/context/UserContext'
import ProtectedRoute from './components/utils/ProtectedRoute'
import OrderConfirmed from './components/Order/OrderConfirmed'



function App() {

  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OrderDetailsForm />} />
        {/* {isAuthenticated ? <Route path="/admin-dashboard" element={<AdminDashboard />} /> : navigate("/admin-signin")} */}
        <Route path="/admin-signin" element={<AdminSignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/generate-receipt' element={<GenerateReceipt />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
