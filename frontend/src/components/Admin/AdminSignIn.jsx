import React from 'react'
import "./AdminSignIn.css"

const AdminSignIn = () => {
    return (
        <div className='admin-container-box'>
            <div className='admin-container'>
                <h1>Admin SignIn</h1>
                <form>
                    <div className='admin-form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' className='form-control' placeholder='email' id='email' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='password' className='form-control' id='password' />
                    </div>
                    <button type='submit' className='admin-btn '>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default AdminSignIn