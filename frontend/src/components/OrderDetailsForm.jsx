import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const OrderDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    packs: 0,
    utrRef: ''
  });

  const [totalPayment, setTotalPayment] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });

    if (name === 'packs') {
      const packs = +value;
      setTotalPayment(packs * 120); // Assuming each set costs 120 rupees
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataSubmit = async () => {
      try{
        const res = await axios.post('http://localhost:1001/api/order/neworder', formData);
        console.log("res : ", res);
      }
      catch(err){
        console.log(err);
      }
    };
    dataSubmit();
    
    setFormData({
      name: '',
      address: '',
      contactNumber: '',
      packs: 0,
      utrRef: ''
    });
    setTotalPayment(0);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center my-4">Order Details Form</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className='my-3' >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className='my-3'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formContactNumber" className='my-3'>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formpacks" className='my-3'>
                  <Form.Label>Number of packs</Form.Label>
                  <Form.Control
                    type="number"
                    name="packs"
                    value={formData.packs}
                    onChange={handleChange}
                    placeholder="Enter number of packs"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formUtrRef" className='my-3'>
                  <Form.Label>Payment Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="utrRef"
                    value={formData.utrRef}
                    onChange={handleChange}
                    placeholder="Enter payment details"
                    required
                  />
                </Form.Group>

                <div className="my-3">
                  <strong>Total Payment: {totalPayment} units</strong>
                </div>

                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
};

export default OrderDetailsForm;
