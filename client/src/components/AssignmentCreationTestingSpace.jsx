import React, { useEffect, useState } from 'react'
import axios from 'axios'


const AssignmentCreationTestingSpace = () => {
    const [items, setItems] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost/im-2-project/api/orders", {
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VyX2VtYWlsIjoiamhhbmVsbEBleGFtcGxlLmNvbSIsInVzZXJfZnVsbF9uYW1lIjoiSmhhbmVsbCBNaW5nbyIsImV4cCI6MTc1MTk1NzI2OH0.oj84sE1lz5d6BgkDnJ5GeqqJF_xSHTPL-I94ZKzpswY"
            }
        })
        .then((response) => {
            console.log(response);
            setItems(response.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const makeAssignment = (item) => {
        axios.post("http://localhost/im-2-project/api/assignments/create", {
            service_id: item.service_id,
            order_id: item.order_id,
            assignment_details: "A lot has happened lately",
            assignment_due: "2026-01-23"
        },{
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VyX2VtYWlsIjoiamhhbmVsbEBleGFtcGxlLmNvbSIsInVzZXJfZnVsbF9uYW1lIjoiSmhhbmVsbCBNaW5nbyIsImV4cCI6MTc1MTk1NzI2OH0.oj84sE1lz5d6BgkDnJ5GeqqJF_xSHTPL-I94ZKzpswY"
            }
        }

        )
    }

    return (
    <>
            {items.map((item) => (
                <div key={item.order_id} style={{ marginBottom: "2rem" }}>
                    <p>Concern: {item.concern}</p>
                    <p>Phone Number: {item.phone_number}</p>
                    <p>Service Id: {item.service_id}</p>
                    <button type="button" onClick={()=>makeAssignment(item)} >Make Assignment</button>
                </div>
            ))}
    </>
  )
}

export default AssignmentCreationTestingSpace;