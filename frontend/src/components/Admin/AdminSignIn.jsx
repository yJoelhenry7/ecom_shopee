import React, { useState } from 'react'
import "./AdminSignIn.css"
import { useNavigate } from 'react-router-dom';

const AdminSignIn = ({setIsAuthenticated}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password:'',
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        console.log("Signin : ",formData);

        if(formData.email === "admin@gmail.com" && formData.password === "admin!1234"){
            alert("Successfull Login");
            setIsAuthenticated(true);
            setFormData({
                email: '',
                password: ''
            });
            navigate("/admin-dashboard");
        }
        else{
            alert("Invalid Credentials");
            setFormData({
                email: '',
                password: ''
            });
        }
    }

    return (
        <div className='admin-container-box'>
            <div className='admin-container'>
                <h1>Admin SignIn</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='admin-form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={handleChange} name='email' value={formData.email} className='form-control' placeholder='email' id='email' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'onChange={handleChange} name='password' value={formData.password} placeholder='password' className='form-control' id='password' required />
                    </div>
                    <button type='submit' className='admin-btn '>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default AdminSignIn