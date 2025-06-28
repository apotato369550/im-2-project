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
  "user_name": "{username of the corresponding account}"
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


