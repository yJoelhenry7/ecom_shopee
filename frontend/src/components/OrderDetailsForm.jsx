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

