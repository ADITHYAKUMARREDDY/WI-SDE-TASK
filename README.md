# Railway Management System API

This is a Railway Management System API that allows users to register, login, add trains, check seat availability, book seats, and view booking details. Admins have special privileges to add new trains. The API is built using Node.js, Express, MySQL, and JWT for authentication.

## Features

1. **User Registration**: Users can register with a username, password, and role (either "user" or "admin").
2. **User Login**: Users can log in and receive a JWT token for authentication.
3. **Train Management**: Admins can add new trains to the system.
4. **Seat Availability**: Users can check seat availability for specific routes.
5. **Seat Booking**: Users can book available seats on trains.
6. **Booking Details**: Users can view details of their bookings.
7. **Role-based Access**: Admins have elevated privileges for managing trains.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ADITHYAKUMARREDDY/WI-SDE-TASK.git
   cd project-root
2. install dependencies
    ```bash
     npm install bcryptjs dotenv express jsonwebtoken mysql2
3. start command:
   ```bash
     node server.js

## APIS

/register (POST): Register a user.
/login (POST): Login a user.
/train (POST): Add a new train (Admin only).
/availability (POST): Get seat availability for a route.
/book (POST): Book a seat.
/booking-details (POST): Get booking details.


## .ENV

give local db details and own keys

## API REQUEST AND RESPONSE

1. Register a User
Endpoint: POST /api/register
Purpose: This endpoint allows users to create an account by registering with a username, password, and specifying a role (either "user" or "admin").
Request Body:

{
  "username": "user1",
  "password": "password123",
  "role": "user"
}
Response:

{
  "message": "User registered successfully"
}

2. Login User
Endpoint: POST /api/login
Purpose: This endpoint lets users log in by submitting their credentials (username and password). A JSON Web Token (JWT) is returned upon successful login, which will be used for authentication in subsequent requests.
Request Body:

{
  "username": "user1",
  "password": "password123"
}
Response:

{
  "token": "your_jwt_token"
}

3. Add a New Train (Admin Only)
Endpoint: POST /api/train
Purpose: This endpoint allows admin users to add a new train to the system. It is protected by both JWT authentication and an API key.
Headers:
Authorization: Bearer your_jwt_token
x-api-key: your_admin_api_key
Request Body:

{
  "train_name": "Express 101",
  "source": "New York",
  "destination": "Washington",
  "total_seats": 100
}
Response:

{
  "message": "Train added successfully"
}\

4. Get Seat Availability
Endpoint: POST /api/availability
Purpose: This endpoint lets users check seat availability between two stations.
Headers:
Authorization: Bearer your_jwt_token
Request Body:

{
  "source": "New York",
  "destination": "Washington"
}
Response:


  {
    "id": 123,
    "train_name": "Express 101",
    "source": "New York",
    "destination": "Washington",
    "total_seats": 100,
    "available_seats": 90
  }



5. Book a Seat
Endpoint: POST /api/book
Purpose: This endpoint allows users to book a seat on a specific train.
Headers:
Authorization: Bearer your_jwt_token
Request Body:

{
  "train_id": 1
}
Response:

{
  "message": "Seat booked successfully"
}


6. Get Specific Booking Details
Endpoint: POST /api/booking-details
Purpose: This endpoint allows users to retrieve detailed information about a specific booking they made.
Headers:
Authorization: Bearer your_jwt_token

Copy code
{
  "booking_id": 1
}
Response:

{
  "id": 1,
  "user_id": 2,
  "train_id": 1,
  "booking_date": "2024-09-23T12:00:00"
}

"# WORKINIDA_SDE-TASK" 
"# WI-SDE-TASK" 
