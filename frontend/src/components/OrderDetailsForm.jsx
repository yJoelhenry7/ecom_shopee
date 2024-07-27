// import React, { useState } from 'react';
// import axios from 'axios';
// import "./OrderDetailsForm.css";

// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../fb';

// const OrderDetailsForm = () => {

//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState(null);

//   const handleUpload =  () => {
//     if (!image) return;

//     const storageRef = ref(storage, `images/${image.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, image);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//       },
//       (error) => {
//         console.error(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//         });
//       }
//     );
//   };

//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     contactNumber: '',
//     packs: 0,
//     utrRef: '',
//     utrImg:''
//   });

//   const [totalPayment, setTotalPayment] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     setFormData({ ...formData, [name]: value });

//     if (name === 'packs') {
//       const packs = +value;
//       setTotalPayment(packs * 120); // Assuming each set costs 120 rupees
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleUpload();
//     setFormData({ ...formData, utrImg: url });
//     // const newFormData = { ...formData, utrImg: url };
//     console.log(formData);
//     const dataSubmit = async () => {
//       try {
//         const res = await axios.post('http://localhost:1001/api/order/neworder', formData);
//         console.log("res : ", res);
//       }
//       catch (err) {
//         console.log(err);
//       }
//     };

//     // const dataSubmit = async () => {
//     //   try {
//     //     const res = await axios.post('http://localhost:1001/api/order/neworder', formData);
//     //     console.log("res : ", res);
//     //   }
//     //   catch (err) {
//     //     console.log(err);
//     //   }
//     // };
//     await dataSubmit();
//     alert('Order placed successfully');

//     setFormData({
//       name: '',
//       address: '',
//       contactNumber: '',
//       packs: 0,
//       utrRef: ''
//     });
//     setTotalPayment(0);
//   };

//   return (
//     // <Container className="mt-5">
//     //   <Row className="justify-content-md-center">
//     //     <Col md="6">
//     //       <Card className="shadow-sm">
//     //         <Card.Body>
//     //           <h2 className="text-center my-4">Order Details Form</h2>
//     //           <Form onSubmit={handleSubmit}>
//     //             <Form.Group controlId="formName" className='my-3' >
//     //               <Form.Label>Name</Form.Label>
//     //               <Form.Control
//     //                 type="text"
//     //                 name="name"
//     //                 value={formData.name}
//     //                 onChange={handleChange}
//     //                 placeholder="Enter your name"
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Form.Group controlId="formAddress" className='my-3'>
//     //               <Form.Label>Address</Form.Label>
//     //               <Form.Control
//     //                 type="text"
//     //                 name="address"
//     //                 value={formData.address}
//     //                 onChange={handleChange}
//     //                 placeholder="Enter your address"
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Form.Group controlId="formContactNumber" className='my-3'>
//     //               <Form.Label>Contact Number</Form.Label>
//     //               <Form.Control
//     //                 type="text"
//     //                 name="contactNumber"
//     //                 value={formData.contactNumber}
//     //                 onChange={handleChange}
//     //                 placeholder="Enter your contact number"
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Form.Group controlId="formpacks" className='my-3'>
//     //               <Form.Label>Number of packs</Form.Label>
//     //               <Form.Control
//     //                 type="number"
//     //                 name="packs"
//     //                 value={formData.packs}
//     //                 onChange={handleChange}
//     //                 placeholder="Enter number of packs"
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Form.Group controlId="formUtrRef" className='my-3'>
//     //               <Form.Label>Payment Details</Form.Label>
//     //               <Form.Control
//     //                 type="text"
//     //                 name="utrRef"
//     //                 value={formData.utrRef}
//     //                 onChange={handleChange}
//     //                 placeholder="Enter payment details"
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <div className="my-3">
//     //               <strong>Total Payment: {totalPayment} units</strong>
//     //             </div>

//     //             <Button variant="primary" type="submit" className="w-100">
//     //               Submit
//     //             </Button>
//     //           </Form>
//     //         </Card.Body>
//     //       </Card>
//     //     </Col>

//     //   </Row>
//     // </Container>
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="text-center">Order Details Form</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="formName">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="formName"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="formAddress">Address</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="formAddress"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Enter your address"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="formContactNumber">Contact Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="formContactNumber"
//                     name="contactNumber"
//                     value={formData.contactNumber}
//                     onChange={handleChange}
//                     placeholder="Enter your contact number"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="formpacks">Number of packs</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="formpacks"
//                     name="packs"
//                     value={formData.packs}
//                     onChange={handleChange}
//                     placeholder="Enter number of packs"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="formUtrRef">Payment Details</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="formUtrRef"
//                     name="utrRef"
//                     value={formData.utrRef}
//                     onChange={handleChange}
//                     placeholder="Enter Utr number"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="formUtrImg">Upload the payment details Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     id="formUtrImg"
//                     name="utrimg"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     required
//                   />
//                 </div>
//                 <div className="total-payment">
//                   <strong>Total Payment: {totalPayment} units</strong>
//                 </div>
//                 <button type="submit" className="btn-submit">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./OrderDetailsForm.css";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../fb';

const OrderDetailsForm = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    packs: 0,
    utrRef: '',
    utrImg: '',
  });

  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    if (url) {
      const updatedFormData = { ...formData, utrImg: url };
      const dataSubmit = async () => {
        try {
          const res = await axios.post('http://localhost:1001/api/order/neworder', updatedFormData);
          console.log('res:', res);
          alert('Order placed successfully');
          setFormData({
            name: '',
            address: '',
            contactNumber: '',
            packs: 0,
            utrRef: '',
            utrImg: '',
          });
          setTotalPayment(0);
        } catch (err) {
          console.error(err);
        }
      };
      dataSubmit();
    }
  }, [url]);

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'packs') {
      const packs = +value;
      setTotalPayment(packs * 120); // Assuming each set costs 120 units
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Order Details Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formContactNumber">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formContactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formpacks">Number of packs</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formpacks"
                    name="packs"
                    value={formData.packs}
                    onChange={handleChange}
                    placeholder="Enter number of packs"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formUtrRef">Payment Details</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUtrRef"
                    name="utrRef"
                    value={formData.utrRef}
                    onChange={handleChange}
                    placeholder="Enter UTR number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formUtrImg">Upload the payment details image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="formUtrImg"
                    name="utrImg"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="total-payment">
                  <strong>Total Payment: ₹ {totalPayment} </strong>
                </div>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForm;

