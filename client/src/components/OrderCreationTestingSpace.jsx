import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const OrderCreationTestingSpace = () => {
    const [form, setForm] = ({
        concern: "",
        phone_number: "", 
        address: "",
        service_id: ""
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
    <>
        <label for='concern'>Concern </label>
        <input type="text" name='concern'></input>
        <br></br>
        <br></br>
        <label for='phone_number'>Phone Number </label>
        <input type="number" name='phone_number'></input>
        <br></br>
        <br></br>
        <label for='address'>Address </label>
        <input type="text" name='address'></input>
        <br></br>
        <br></br>
        <label for='service_id'>Service Id </label>
        <input type="number" name='service_id'></input>
        <br></br>
        <br></br>
        <button>Submit</button>
    </>
  )
}

export default OrderCreationTestingSpace