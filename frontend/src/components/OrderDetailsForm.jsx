

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./OrderDetailsForm.css";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../fb';
import Loader from './utils/Loader';
import { useNavigate } from 'react-router-dom';

const OrderDetailsForm = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [totalPayment, setTotalPayment] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    packs: 1,
    utrRef: '',
    utrImg: '',
    dNo: '',
    street: '',
    area: '',
    price: totalPayment
  });

  const isFormValid = () => {
    return formData.name && formData.contactNumber && formData.packs > 0 && formData.utrRef && image  && formData.dNo;
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (!image) {
        resolve(null);
        return;
      }

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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'packs') {
      const packs = +value;
      const total = packs * 120; // Assuming each set costs 120 units
      setTotalPayment(total);
      setFormData({ ...formData, packs: packs, price: total });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const imageUrl = await handleUpload();
      const updatedFormData = { ...formData, utrImg: imageUrl };
      const res = await axios.post('http://localhost:1001/api/order/neworder', updatedFormData);
      console.log('res:', res);
      const id = res.data.id; 
      console.log('res:', res.data.id);
      alert('Order placed successfully');
      setFormData({
        name: '',
        contactNumber: '',
        packs: 1,
        utrRef: '',
        utrImg: '',
        dNo: '',
        street: '',
        area: '',
        price: 120
      });
      setTotalPayment(0);
      setImage(null);
      setImagePreviewUrl(null);
      navigate("/order-confirmed", { state: { id: id } });
    } catch (err) {
      console.error(err);
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentHandler = async (e) => {
    const orderUrl = "http://localhost:1001/order";
    const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: 500,
            currency: "INR",
            receipt: "qwesp"
        }),
    });
    const data = await response.json();
    console.log(data);

    const options = {
        key: "rzp_test_MxNJIWJVHAPnkJ",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: "Shirt",
        description: "A blue shirt",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926",
        handler: async function (response) {
            const body = { ...response };
            const validateResponse = await fetch("http://localhost:1001/order/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await validateResponse.json();
            console.log("data : ", data);
            if(data.msg === "Success"){
                alert("Payment Successfull");
            }
        },

        prefill: {
            name: "Vishnu Vardhan",
            email: "vishnu@example.com",
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();


};

  return (
    <div className="container">
      <div className="container-overlay"></div>
      <div className="row">
        <div className="col">
          {/* <h2 className="container-text-center">Pavan Food Caters</h2> */}
          <div className="card">
          <h2 className="container-text-center">Pavan Food Caters</h2>
            <div className="card-body">
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
                  <div className="form-group-address">
                    <input
                      type="text"
                      className="form-control"
                      id="formAddress"
                      name="dNo"
                      value={formData.dNo}
                      onChange={handleChange}
                      placeholder="Enter your Door Number"
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="formStreet"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Enter your Street"
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="formArea"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Enter your Area"
                      required
                    />
                  </div>
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
                  <div className="form-group-formpacks">
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
                    <div className="total-payment">
                      <strong>Total Payment: ₹ {totalPayment} </strong>
                    </div>
                  </div>
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
                    onChange={handleImageChange}
                    required
                  />
                </div>
                {imagePreviewUrl && (
                  <div className="image-preview">
                    <img src={imagePreviewUrl} alt="Preview" style={{ width: '100px', height: 'auto' }} />
                  </div>
                )}
                <button type="submit" className={!isFormValid() ? "btn-disabled" : "btn-submit"} disabled={!isFormValid() || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {isSubmitting && (
                  <Loader />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
