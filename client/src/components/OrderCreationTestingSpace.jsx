import React, { useState } from 'react'
import axios from 'axios'

const OrderCreationTestingSpace = () => {
    const [form, setForm] = useState({
        concern: '',
        phone_number: '', 
        address: '',
        service_id: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitRequest = (e) => {
        e.preventDefault();
        axios.post("http://localhost/im-2-project/api/orders/create", form, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX2VtYWlsIjoiamhhbmVsbEBnbWFpbC5jb20iLCJ1c2VyX2Z1bGxfbmFtZSI6IkpoYW5lbGwgTWluZ28iLCJleHAiOjE3NTE4OTE1NjN9.rGeXQkUNPlnm0JayL1r9Qrdh0nV1ewQQNwEz4JlCKOc`
            }
        })
        .then(res => {
            alert('Order created!');
        })
        .catch(err => {
            alert('Error creating order!');
            console.error(err);
        });
    };

    return (
        <form onSubmit={submitRequest}>
            <label htmlFor='concern'>Concern </label>
            <input type="text" name='concern' value={form.concern} onChange={handleChange} />
            <br /><br />
            <label htmlFor='phone_number'>Phone Number </label>
            <input type="text" name='phone_number' value={form.phone_number} onChange={handleChange} />
            <br /><br />
            <label htmlFor='address'>Address </label>
            <input type="text" name='address' value={form.address} onChange={handleChange} />
            <br /><br />
            <label htmlFor='service_id'>Service Id </label>
            <input type="number" name='service_id' value={form.service_id} onChange={handleChange} />
            <br /><br />
            <button type="submit" onClick = {submitRequest}>Submit</button>
        </form>
    )
}

export default OrderCreationTestingSpace