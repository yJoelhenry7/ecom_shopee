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

  // return (
  //   <Container  className="mt-5">
  //     <Row className="justify-content-md-center">
  //         <Card className="shadow-sm">
  //           <Card.Body>
  //             <h2 className="text-center my-4">Admin Dashboard</h2>
  //             <Table striped bordered hover responsive>
  //               <thead className="thead-dark">
  //                 <tr>
  //                   <th>Id</th>
  //                   <th>Name</th>
  //                   <th>Address</th>
  //                   <th>Packs</th>
  //                   <th>Payment Status</th>
  //                   <th>Delivery Status</th>
  //                   <th>Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {orders.map((order, index) => (
  //                   <tr key={index}>
  //                     <td>{order.id}</td>
  //                     <td>{order.name}</td>
  //                     <td>{order.address}</td>
  //                     <td>{order.packs}</td>
  //                     <td>{order?.paymentStatus}</td>
  //                     <td>{order?.deliveryStatus}</td>
  //                     <td>
  //                       <Button variant="success" size="sm" className="mx-2 my-md-2">
  //                         Generate Receipt
  //                       </Button>
  //                       <Button variant="primary" size="sm" className="mx-2 my-md-2">
  //                         Print Receipt
  //                       </Button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </Table>
  //           </Card.Body>
  //         </Card>
  //     </Row>
  //   </Container>
  // );


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center my-4">Admin Dashboard</h2>
            <table className="table table-striped table-bordered table-hover table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Packs</th>
                  <th>Payment Status</th>
                  <th>Delivery Status</th>
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
                    <td>{order.paymentStatus}</td>
                    <td>{order.deliveryStatus}</td>
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
