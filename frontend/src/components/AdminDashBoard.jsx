

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./AdminDashboard.css";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all orders from the database
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:1001/api/order/getallorders');
        console.log("res data : ", res.data.arr);
        setOrders(res?.data.arr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

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
              <button onClick={exportToExcel} className="admin-dashboard-btn btn-success">
                Export to Excel
              </button>
            </div>
            <table cellPadding={15} border={2} cellSpacing={0} className="admin-dashboard-table">
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
                    <td>{order.paymentStatus === null ? "Paid" : "Not Paid"}</td>
                    <td>{order.deliveryStatus === null ? "Delivered" : "Pending"}</td>
                    <td className='admin-dashboard-tbody-btn'>
                      <button onClick={() => generateReceiptHandler(order.id)} className="admin-dashboard-btn btn-success">
                        Generate Receipt
                      </button>
                      <button className="admin-dashboard-btn btn-primary">
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

