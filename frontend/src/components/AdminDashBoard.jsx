import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import "./AdminDashboard.css";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useAuth } from './context/UserContext';

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterArea, setFilterArea] = useState('');
  const navigate = useNavigate();
  const {url} = useAuth();

  // Fetch all orders from the database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(url+'api/order/getallorders');
        setOrders(res?.data.arr);
        setFilteredOrders(res?.data.arr); // Initialize filteredOrders with all orders
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on address and area
  const filterOrders = () => {
    const filtered = orders.filter(order => {
      return (
        (filterArea ? order.area.toLowerCase().includes(filterArea.toLowerCase()) : true)
      );
    });
    setFilteredOrders(filtered);
  };


  const handleAreaChange = (e) => {
    setFilterArea(e.target.value);
  };

  const handleSearch = () => {
    filterOrders();
  };

  const handleClearSearch = () => {
    setFilterArea('');
    setFilteredOrders(orders); // Reset to show all orders
  };

  const generateReceiptHandler = (id) => {
    navigate('/generate-receipt', { state: { id } });
  };

  const exportToExcel = () => {
    // Map orders to match the header order
    const formattedOrders = orders.map(order => ({
      Id: order.id,
      Name: order.name,
      ContactNumber: order.contactNumber,
      DoorNumber: order.dNo,
      Street: order.street,
      Area: order.area,
      Packs: order.packs,
      Price: order.price,
      PaymentStatus: order.paymentStatus === null ? "Paid" : "Not Paid",
      DeliveryStatus: order.deliveryStatus === null ? "Delivered" : "Pending",
      UtrRef: order.utrRef,
      UtrImg: order.utrImg
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Add headers to the first row
    const headers = [
      "Id",
      "Name",
      "Contact Number",
      "Door Number",
      "Street",
      "Area",
      "Packs",
      "Price",
      "Payment Status",
      "Delivery Status",
      "Utr Ref",
      "Utr Img"
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-container-overlay"></div>
      <div className="admin-dashboard-row ">
        <div className="admin-dashboard-card ">
          <div className="admin-dashboard-card-body">
            <div className="admin-dashboard-header">
              <h2 className="admin-dashboard-text-center">Admin Dashboard</h2>
              <div className="admin-dashboard-filter-container">
                <input
                  type="text"
                  placeholder="Filter by Area"
                  value={filterArea}
                  onChange={handleAreaChange}
                  className="admin-dashboard-input"
                />
                <button onClick={handleSearch} className="admin-dashboard-btn btn-primary">
                  Search
                </button>
                <button onClick={handleClearSearch} className="admin-dashboard-btn btn-secondary">
                  Clear
                </button>
              </div>
              <button onClick={exportToExcel} className="admin-dashboard-btn btn-success">
                Export to Excel
              </button>
            </div>
            <table cellPadding={15} border={2} cellSpacing={0} className="admin-dashboard-table">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Packs</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Delivery Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.dNo},{order.street},{order.area}</td>
                    <td>{order.contactNumber}</td>
                    <td>{order.packs}</td>
                    <td>{order.price}</td>
                    <td>{order.paymentStatus === null ? "Paid" : "Not Paid"}</td>
                    <td>{order.deliveryStatus === null ? "Delivered" : "Pending"}</td>
                    <td className='admin-dashboard-tbody-btn'>
                      <button onClick={() => generateReceiptHandler(order.id)} className="admin-dashboard-btn btn-success">
                        Generate Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
