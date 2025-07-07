import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ItemViewingTesting = () => {
    const [items, setItems] = useState([]);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        axios.get("http://localhost/im-2-project/api/items")
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
    }, []);


    const catchFile = (e) => {
        setNewImage(e.target.files[0])
    }

    const uploadImage = ()=>{
        if (!newImage) return;
        const formData = new FormData();
        formData.append('item_id', 2); //make the value dynamic
        formData.append('image', newImage);
        axios.post("http://localhost/im-2-project/api/items/upload-image", formData, {
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9mdWxsX25hbWUiOiJhZG1pbiIsImV4cCI6MTc1MTg4NDI0MH0.LQemsF5F4yX4rPalx2ZcoIfn9zlr0StwBWdehP9w6bI'
            } 
        });
    }


    return (
        <>
            {items.map((item) => (
                <div key={item.item_id} style={{ marginBottom: "2rem" }}>
                    <img src={`http://localhost/im-2-project/${item.image_path}`} alt={item.model} width={200} />
                    <p>Model: {item.model}</p>
                    <p>Type: {item.type}</p>
                    <p>Brand: {item.brand}</p>
                    <p>Horsepower: {item.horsepower}</p>
                    <p>Price: {item.price}</p>
                </div>
            ))}
            <br></br>
            <br></br>

            <input type="file" onChange={catchFile}/>
            <button type="submit" onClick={uploadImage}>Submit</button>
        </>
    )
}

export default ItemViewingTesting