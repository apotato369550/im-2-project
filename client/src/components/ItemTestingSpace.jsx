import React, { useState } from 'react'

const ItemTestingSpace = () => {
  const [form, setForm] = useState({
    supplier_id: '',
    model: '',
    type: '',
    horsepower: '',
    brand: '',
    price: '',
    inverter: ''
  });
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });
    if (file) {
      formData.append('image', file);
    }
    try {
      const res = await fetch('http://localhost/im-2-project/api/items/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9mdWxsX25hbWUiOiJhZG1pbiIsImV4cCI6MTc1MTg4NDI0MH0.LQemsF5F4yX4rPalx2ZcoIfn9zlr0StwBWdehP9w6bI'
        }
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="supplier_id">Supplier</label>
      <input type="text" name="supplier_id" value={form.supplier_id} onChange={handleChange} />
      <br />
      <label htmlFor="model">Model</label>
      <input type="text" name="model" value={form.model} onChange={handleChange} />
      <br />
      <label htmlFor="type">Type</label>
      <input type="text" name="type" value={form.type} onChange={handleChange} />
      <br />
      <label htmlFor="horsepower">Horsepower</label>
      <input type="text" name="horsepower" value={form.horsepower} onChange={handleChange} />
      <br />
      <label htmlFor="brand">Brand</label>
      <input type="text" name="brand" value={form.brand} onChange={handleChange} />
      <br />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" value={form.price} onChange={handleChange} />
      <br />
      <label htmlFor="inverter">Inverter</label>
      <input type="text" name="inverter" value={form.inverter} onChange={handleChange} />
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />
      <button type="submit">Submit</button>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </form>
  );
};

export default ItemTestingSpace