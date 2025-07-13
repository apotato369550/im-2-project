# CBVT Web-Based Service Management System
This project is a web-based service platform developed for Cebu Best Value Trading (CBVT), a Cebu-based HVAC provider specializing in air-conditioning installation, maintenance, and retail. The system aims to streamline CBVT’s operations by transitioning from manual workflows to a digitized platform that improves client engagement, service management, and internal coordination.

## 🔧 Features
### 🌐 Landing Page
Home – Overview of services and company profile
About Us – Company background and mission
Services – Detailed list of HVAC services offered
Catalog – Display of available air-conditioning units and parts
Contact Us – Contact form and company information
Login System
    - Login / Signup with email verification
    - Forgot/Remember password (via email)
    - Optional "Remember Me" session

## 👥 User Pages
### ✅ Client Pages
- Create new service requests
- View orders, service status, and transaction history

## 🛠️ Worker Pages
- View and accept assigned service orders
- Update progress/status of ongoing tasks

## 🧾 Admin Pages
- Create and send service quotations
- Convert quotations into confirmed orders

## ⚙️ General Features
- Profile Management
    - Edit name, email, and password (requires password for changes)
    - Reset password via email
- Notifications System
    - View notifications and service updates
    - Toggle email notifications
    - Mark notifications as read

## 📌 Notes
- The system is intended for use within Cebu Province
- Emphasis on secure email-based verification for login, signup, and password recovery
- Responsive design for mobile and desktop compatibility

## Tech Stack

Frontend: HTML, CSS, JS, React
Backend: PHP, SQL


---
<br>
<br>

# 🚀 **CEBU VALUE TRADING API GUIDE**
- A PHP api designed to meet the needs of our project website in compliance to our course information management.
## 🤓 General format for calling the API

```
domain-name/im-2-project/api/{resource}/{method}/{id?}
```

- `{resource}`: The model or entity, e.g., `user`, `order`, `item`, etc.
- `{id?}`: (Optional) The specific resource ID for GET/PUT/DELETE operations.
- `{method}`: The action to be executed.

**HTTP Methods:**

- `POST`   `/api/{resource}/{method}`         — Create a new resource
- `GET`    `/api/{resource}/{method}`         — Get all resources
- `GET`    `/api/{resource}/{method}/{id}`    — Get a specific resource
- `PUT`    `/api/{resource}/{method}/{id}`    — Update a specific resource
- `DELETE` `/api/{resource}/{method}/{id}`    — Delete a specific resource


## 📃List of Resources Available
 - `  👶 User` : Handles the log-in, registration and distribution of tokens for authentication. 
    - `/im-2-project/api/user/{method}`

 - `📱 Assignment`: Handles creating, updating, and retreiving assignments.
    - `/im-2-project/api/assignments/{method}`

 - `💵 Order`: Handles creating, updating, and retreiving orders.
    - `/im-2-project/api/orders/{method}`

 - `🛒 Quotation` : Handles creating, updating, and retreiving quotations.
    - `/im-2-project/api/quotations/{method}`

 - `🗂 Item` : Handles creating, updating, and retreiving items.
    - `/im-2-project/api/items/{method}`

##  User Methods  👶 

### LOGIN
**Endpoint:** `/im-2-project/api/user/login`  
**Method:** `POST`  
**Body:**

```json
{
  "user_email": "your_username",
  "user_password": "your_password"
}
```
**Response:**

*successful*

```json
{
  "message": "Login successful",
  "user_name": "{username of the corresponding account}",
  "token": "<JWT token>",
}
```
> **NOTE** : Store the JWT token in your local storage this is ur access point  to other endpoints

*Invalid credentials*
```json
{
  "error": "Invalid email or password"
}
```

### REGISTER
**Endpoint:** `/im-2-project/api/user/register`  
**Method:** `POST`  
**Body:**
```json
{
  "user_email": "your_email",
  "user_password": "your_password",
  "user_name": "your_username",
  "user_type": "{Client, Manager, Worker}"
}
```

**Response:**

*successful*
```json
{
  "message": "Registered account successfully"
}
```
*missing fields*
```json
{
  "message": "Missing some required fields"
}
```

### PROFILE (Get current user info)
**Endpoint:** `/im-2-project/api/user/profile`  
**Method:** `GET`  
**Headers:**
```
Authorization: Bearer <JWT token>
```
**Response:**
```json
{
    "user_id": 5,
    "user_name": "John Doe",
    "user_email": "John@example.com",
    "user_type": "Client"
}
```
##### EXAMPLE API CALL FROM FRONT END
```

```
##  Order Methods  🛒 

### **DATA RETRIEVAL**

#### **ALL ORDER SPECIFIC TO USER**
**Endpoint:** `/im-2-project/api/orders`  
**Method:** `GET`  
>**GET** methods typically dont need a body parameter  

**Headers:**
```
Authorization: Bearer <JWT token>
```
---

#### **FIND SPECIFIC ORDER**
> This method is optional, you can just derive specific orders from method above

**Endpoint:** `/im-2-project/api/orders/{id}`  
**Method:** `GET`  
> replace {id} with the order-id you got from method above

**Headers:**
```
Authorization: Bearer <JWT token>
```

----

#### **ALL ORDERS (for manager)**
**Endpoint:** `/im-2-project/api/orders/fetch-list`  
**Method:** `GET`  

**Headers:**
```
Authorization: Bearer <JWT token>
```

---

### **CREATE ORDER**
**Endpoint:** `/im-2-project/api/orders/create`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <JWT token>
```
**Body:**
```json
{
    "concern": "put all concern contents here",
    "phone_number": "09235194824",
    "address": "G. Ouano St. Villamanga",
    "service_id": "3", // assign this based on what service they chose on the form, each service has its own id
    "item_id": "1" //this is for ac request based orders, besides that dont include if different service is availed
}
```

**Response:**
```json
{
  "message": "order added sucessfully"
}
```

### **EDIT ORDER STATUS (for manager (?))**
**Endpoint:** `/im-2-project/api/orders/edit/{id}`  
**Method:** `PUT`  
**Headers:**
```
Authorization: Bearer <JWT token>
```
**Body:**
```json
{
    "order_status": "Quotation Approved" // i don't know its values yet
}
```

**Response:**
```json
{
  "message": "order updated sucessfully"
}
```


##  Assignment Methods  🔎 

### **DATA RETRIEVAL**
#### **ALL ASSIGNMENT SPECIFIC TO A USER**
**Endpoint:** `/im-2-project/api/assignments`  
**Method:** `GET`  

**Headers:**
```
Authorization: Bearer <JWT token>
```
---

#### **ASSIGNMENT SPECIFIC TO USER**
**Endpoint:** `/im-2-project/api/assignments/{id}`  
**Method:** `GET`  

**Headers:**
```
Authorization: Bearer <JWT token>
```
---

#### **ALL ASSIGNMENTS**
**Endpoint:** `/im-2-project/api/assignments/fetch-list`  
**Method:** `GET`  

**Headers:**
```
Authorization: Bearer <JWT token>
```
---

### **CREATE ASSIGMENT (for manager)**
**Endpoint:** `/im-2-project/api/assignments/create`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <JWT token>
```
**Body:**
```json
{
  "service_id": 1 ,  // id of the service chosen can derive from order
  "order_id":  1, // order id must be specified 
  "assignment_details": "", //some extra notes perhaps?
  "assignment_due": "" //date
}

```

### **ACCEPT ASSIGNMENT (for workers)**
**Endpoint:** `/im-2-project/api/assignments/accept/{id}`  
**Method:** `PUT`  
**Headers:**

> replace {id} with corresponding assignment_id

```
Authorization: Bearer <JWT token>

```

### **EDIT ASSIGNMENT STATUS (for workers/manager)**
**Endpoint:** `/im-2-project/api/assignments/edit/{id}`  
**Method:** `PUT`  
**Headers:**

> replace {id} with corresponding assignment_id

```
Authorization: Bearer <JWT token>

```

**BODY**
```json
{
  "assignment_status" : ""
}

```


##  Update Methods  ⚠️
### **RETRIEVAL**

#### GET UPDATE SPECIFIC TO USER
**Endpoint:** `/im-2-project/api/updates/{client_id}` <br>
**Method:** `GET` <br>
**Headers:**
```

Authorization: Bearer <JWT token>

```

#### GET ALL UPDATES
**Endpoint:** `/im-2-project/api/updates` <br>
**Method:** `GET` <br>
**Headers:**
```

Authorization: Bearer <JWT token>

```

## **Quotations 🤰**

### RETRIEVAL <br>
#### **SPECIFIC TO AN ORDER**
**Endpoint:** `/im-2-project/api/quotations/order/{orderId}` <br>
**Method:** `GET` <br>
**Headers**
```

Authorization: Bearer <JWT token>

```

#### **All QUOTATIONS FOR A USER**
**Endpoint:** `/im-2-project/api/quotations/user` <br>
**Method:** `GET` <br>
**Headers**
```

Authorization: Bearer <JWT token>

```

#### **All QUOTATIONS**
**Endpoint:** `/im-2-project/api/quotations/fetch-list` <br>
**Method:** `GET` <br>
**Headers**
```

Authorization: Bearer <JWT token>

```

### CREATE QUOTATION
**Endpoint:** `/im-2-project/api/quotations/create` <br>
**Method:** `POST` <br>
**Headers**
```

Authorization: Bearer <JWT token>

```
**Body:**

```json
{
  "total_payment": 200,
  "description": "description",
  "order_id": 1 
}
```

### DELETE ENDPOINT
**Endpoint:** `/im-2-project/api/quotations/delete/{quotationId}`<br>
**Method:** `DELETE` <br>
**Headers**
``` 

Authorization: Bearer <JWT token>

```

##  Item Methods  🍆
### **RETRIEVAL**
#### **GET ALL ITEMS**
**Endpoint:** `/im-2-project/api/items` <br>
**Method:** `GET` <br>

#### **GET SPECIFIC ITEM**
**Endpoint:** `/im-2-project/api/items/{itemId}` <br>
**Method:** `GET` <br> 

### **CREATE ITEM**
**Endpoint:** `/im-2-project/api/items/create`<br>
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <JWT token>
Content-Type: multipart/form-data
```
**Body (form-data):**
| Key         | Value Example      | Description                |
|-------------|-------------------|----------------------------|
| supplier_id | 1                 | Supplier ID (integer)      |
| model       | "Model X"         | Item model name            |
| price       | 1000              | Price of the item          |
| inverter    | YES               | Classifies if AC is such   |
| brand       | Panasonic         | Brand of the AC Unit       |
| horsepower  | 500cc             | Horsepower sa Ac           |
| image       | (file upload)     | Image file for the item    |

### **CHANGE IMAGE**
**Endpoint:** `/im-2-project/api/items/upload-image`
**Method:** `PUT`
**Headers:**
```
Authorization: Bearer <JWT token>
Content-Type: multipart/form-data
```
**Body (form-data):**
| Key      | Value Example      | Description                |
|----------|-------------------|----------------------------|
| item_id  | 1                 | ID of the item to update   |
| image    | (file upload)     | New image file for the item|

**Notes:**
- The old image will be deleted and replaced with the new one.
- Both `item_id` and `image` are required fields.
- Returns a JSON response with the new image path or an error message.

### **DELETE ITEM**
**Endpoint:** `/im-2-project/api/items/delete/{itemId}`<br>
**Method:** `DELETE`

## **SERVICES 🛠️**
### **GET LIST OF SERVICES**
**Endpoint:** `/im-2-project/api/services/get-all` <br>
**Method:** `GET`

## **SUPPLIER 👱🏿**
### **GET LIST OF SUPPLIER**
**Endpoint:** `/im-2-project/api/suppliers/fetch-list` <br>
**Method:** `GET`
### **ADD SUPPLIER**
**Endpoint:** `/im-2-project/api/suppliers/add` <br>
**Method:** `POST`<br>
**Headers**
```

Authorization: Bearer <JWT token>

```
**Body:**

```json
{
  
  "company_name": "",
  "contact_number": ""

}

```


# CBVT Web-Based Service Management System
This project is a web-based service platform developed for Cebu Best Value Trading (CBVT), a Cebu-based HVAC provider specializing in air-conditioning installation, maintenance, and retail. The system aims to streamline CBVT’s operations by transitioning from manual workflows to a digitized platform that improves client engagement, service management, and internal coordination.

## 🔧 Features
### 🌐 Landing Page
Home – Overview of services and company profile
About Us – Company background and mission
Services – Detailed list of HVAC services offered
Catalog – Display of available air-conditioning units and parts
Contact Us – Contact form and company information
Login System
    - Login / Signup with email verification
    - Forgot/Remember password (via email)
    - Optional "Remember Me" session

## 👥 User Pages
### ✅ Client Pages
- Create new service requests
- View orders, service status, and transaction history

## 🛠️ Worker Pages
- View and accept assigned service orders
- Update progress/status of ongoing tasks

## 🧾 Admin Pages
- Create and send service quotations
- Convert quotations into confirmed orders

## ⚙️ General Features
- Profile Management
    - Edit name, email, and password (requires password for changes)
    - Reset password via email
- Notifications System
    - View notifications and service updates
    - Toggle email notifications
    - Mark notifications as read

## 📌 Notes
- The system is intended for use within Cebu Province
- Emphasis on secure email-based verification for login, signup, and password recovery
- Responsive design for mobile and desktop compatibility

## Tech Stack

Frontend: HTML, CSS, JS, React
Backend: PHP, SQL
>>>>>>> main
