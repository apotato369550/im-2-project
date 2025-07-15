import React, { useState } from 'react'
import axios from 'axios';

const LoginTestingSpace = () => {
    const [form, setForm] = useState({ user_email: '', user_password: ''});
    const [loginErr, setLoginErr] = useState('');
    var token;

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const logInErr = (e) =>{
        setLoginErr(e);
    }

    const login = () =>{
        axios.post("http://localhost/im-2-project/api/users/login", { 
            user_email: form.user_email,
            user_password: form.user_password
        })
        .then((data)=>{
            console.log(data);
            token = data.data.token;
            localStorage.setItem('token', token);
            setLoginErr('');
        })
        .catch((err)=>{
            console.log(err);
            setLoginErr(
                err.response.data.error
            );
        })
    }

    return (
    <div>
        <label htmlFor="user_email">User Email</label>
        <input type="text" name="user_email" onChange={handleChange}/>
        <br></br>
        <label htmlFor="user_password">User Password</label>
        <input type="text" name="user_password" onChange={handleChange} />
        <button onClick={login}>Login</button>
        {loginErr && <p style={{color: 'red'}}>{loginErr}</p>}
    </div>
    )
}

export default LoginTestingSpace