import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const ProfileTestingSpace = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');
    useEffect(()=>{
        axios.get("http://localhost/im-2-project/api/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
            setName(res.data.user_full_name);
            setEmail(res.data.user_email);
        })
        .catch((Err)=>{
            console.log(Err);
        })
    }, [])  


  return (
    <>
        <h1>PROFILE</h1>
        <ul>
            <li>Full Name: <span>{name}</span></li>
            <li>Email Address: <span>{email}</span></li>
        </ul>
    </>
  )
}

export default ProfileTestingSpace


// useEffect(() => {
//     Promise.all([
//       axios.get("http://localhost/im-2-project/api/user/profile", { headers: { Authorization: `Bearer ${token}` } }),
//       axios.get("http://localhost/im-2-project/api/other-endpoint", { headers: { Authorization: `Bearer ${token}` } })
//     ])
//     .then(([profileRes, otherRes]) => {
//       setName(profileRes.data.user_full_name);
//       setEmail(profileRes.data.user_email);
//       // handle otherRes.data as needed
//     })
//     .catch(err => console.log(err));
// }, []);