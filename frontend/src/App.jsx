import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashBoard'
import OrderDetailsForm from './components/OrderDetailsForm'
import CustomNavbar from './components/CustomNavbar';
import Order from './components/Order';
import Footer from './components/Footer';


function App() {


  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<OrderDetailsForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
