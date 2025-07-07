import React from 'react'
import { useState } from 'react';
import axios from 'axios';


const RegisterTestingSpace = () => {
    const [form, setForm] = useState({ user_email: '', user_password: '', user_full_name: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerAcc = () => {
        axios.post("http://localhost/im-2-project/api/user/register", {
          user_email: form.user_email,
          user_password: form.user_password,
          user_full_name: form.user_full_name,
          user_type: 'Client'
        })
        .then((response) => {
        console.log(response);
        })
        .catch((error) => {
        console.log(error);
        });
    };


    return (
    <>
    <label htmlFor="user_email">User Email</label>
      <input type="text" name="user_email" onChange={handleChange} />
      <br></br>
      <label htmlFor="user_password">User Password</label>
      <input type="text" name="user_password" onChange={handleChange} />
      <br></br>
      <label htmlFor="user_full_name">User Full Name</label>
      <input type="text" name="user_full_name" onChange={handleChange} />
      <button onClick={registerAcc}>Register</button>
      <br></br>    
      <br></br>
    </>
  )
}

export default RegisterTestingSpace;