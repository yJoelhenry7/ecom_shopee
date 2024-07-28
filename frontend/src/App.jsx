import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashBoard'
import OrderDetailsForm from './components/OrderDetailsForm'


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OrderDetailsForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
