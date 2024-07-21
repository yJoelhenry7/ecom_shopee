import React from 'react';
import { Table, Button, Container, Row, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  const orders = [
    {
      serialNumber: 1,
      name: 'vishnu',
      address: 'bhimavaram',
      packsBooked: 3,
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered'
    },
    {
      serialNumber: 2,
      name: 'saikiran',
      address: 'bhimavaram',
      packsBooked: 5,
      paymentStatus: 'Pending',
      deliveryStatus: 'Not Delivered'
    }
    
  ];

  return (
    <Container  className="mt-5">
      <Row className="justify-content-md-center">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center my-4">Admin Dashboard</h2>
              <Table striped bordered hover responsive>
                <thead className="thead-dark">
                  <tr>
                    <th>Serial Number</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Packs Booked</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.serialNumber}</td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.packsBooked}</td>
                      <td>{order.paymentStatus}</td>
                      <td>{order.deliveryStatus}</td>
                      <td>
                        <Button variant="success" size="sm" className="mx-2 my-md-2">
                          Generate Receipt
                        </Button>
                        <Button variant="primary" size="sm" className="mx-2 my-md-2">
                          Print Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
