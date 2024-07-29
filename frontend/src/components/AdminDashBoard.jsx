import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./AdminDashboard.css"

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the database
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:1001/api/order/getallorders');
        console.log("res data : ", res.data.arr)
        setOrders(res?.data.arr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);


  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-row ">
        <div className="admin-dashboard-card ">
          <div className="admin-dashboard-card-body">
            <h2 className="admin-dashboard-text-center">Admin Dashboard</h2>
            <table cellPadding={15} border={2} cellSpacing={0}  className="admin-dashboard-table">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Packs</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Delivery Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.contactNumber}</td>
                    <td>{order.dNo} {order.street} {order.area}</td>
                    <td>{order.packs}</td>
                    <td>{order.price}</td>
                    <td>{order.paymentStatus === null ? "paid" : "Not paid"}</td>
                    <td>{order.deliveryStatus === null ? "Delivered" : "Pending"}</td>
                    <td className='admin-dashboard-tbody-btn'>
                      <button className="admin-dashboard-btn btn-success ">
                        Generate Receipt
                      </button>
                      <button className="admin-dashboard-btn btn-primary ">
                        Print Receipt
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
