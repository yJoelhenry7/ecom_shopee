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
    <div className="container ">
      <div className="row ">
        <div className="card ">
          <div className="card-body">
            <h2 className="text-center">Admin Dashboard</h2>
            <table border={2} cellSpacing={0}  className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Packs</th>
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
                    <td>{order.address}</td>
                    <td>{order.packs}</td>
                    <td>{order.paymentStatus === null ? "paid" : "Not paid"}</td>
                    <td>{order.deliveryStatus === null ? "Delivered" : "Pending"}</td>
                    <td className='tbody-btn'>
                      <button className="btn btn-success btn-sm mx-2 my-2">
                        Generate Receipt
                      </button>
                      <button className="btn btn-primary btn-sm mx-2 my-2">
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
