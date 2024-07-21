import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const OrderDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    sets: 0,
    paymentDetails: ''
  });

  const [totalPayment, setTotalPayment] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });

    if (name === 'sets') {
      const sets = +value;
      setTotalPayment(sets * 120); // Assuming each set costs 120 rupees
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    setFormData({
      name: '',
      address: '',
      contactNumber: '',
      sets: 0,
      paymentDetails: ''
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

                <Form.Group controlId="formSets" className='my-3'>
                  <Form.Label>Number of Sets</Form.Label>
                  <Form.Control
                    type="number"
                    name="sets"
                    value={formData.sets}
                    onChange={handleChange}
                    placeholder="Enter number of sets"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPaymentDetails" className='my-3'>
                  <Form.Label>Payment Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="paymentDetails"
                    value={formData.paymentDetails}
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
