# Hotel Booking System API

This is a Node/Express/MySql REST API for hotel booking system.

## Getting Started

```bash
  create MySql database from file mysql-db.sql
  
  npm install
  npm run server # Runs on http://localhost:5000
```

# API Usage & Endpoints

## Register a Customer User [POST /api/customer/register]

- Request: Add user

  - Headers

        Content-type: application/json

  - Body

            {
              "cusName": "",
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
              "msg": "User created...",
              "cusName": "",
              "email": ""
          }

## Login with a User [POST /api/auth/login]

- Request: Login with credentials

  - Headers

        Content-type: application/json

  - Body

            {
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
            "msg": "Login success..."
          }

## Admin Get information of all rooms type  [GET /api/admin/getallrooms]

- Request: Admin get all rooms details

  - Headers

        Content-type: application/json

* Response: 200 (application/json)

  - Body
        
          [ {
              "roomId": ,
              "description": "",
              "roomType": "",
              "image": "",
              "quantity": ,
              "price": 
           } ]
           
         
## Admin Get details information of one room type  [GET /api/admin/getroom/:id]

- Request: Admin get room details by id

  - Parameters

    - id: 1 (number) - An unique identifier of the room type.

  - Headers

        Content-type: application/json

* Response: 200 (application/json)

  - Body
        
          {
              "roomId": ,
              "description": "",
              "roomType": "",
              "image": "",
              "quantity": ,
              "price": 
          }
           
         
## Admin Create new room type  [POST /api/admin/addroom]

- Request: Admin create new room type

   - Headers

        Content-type: application/json

  - Body

           {
              "description": "",
              "roomType": "",
              "image": "",
              "quantity": ,
              "price": 
           }
           
     
* Response: 200 (application/json)

  - Body
        
          {
              "msg": "Room type created...",
              "roomType": "",
              "description": "",
              "image": "",
              "quantity": "",
              "price": ""
          }
          
          
## Admin Get all reservation data  [GET /api/admin/getallrsv]

- Request: Admin get all reservation details

  - Headers

        Content-type: application/json

* Response: 200 (application/json)

  - Body
        
          [ {
                "rsvId": ,
                "cusName": "",
                "description": "",
                "roomQty": ,
                "dateCheckIn": "",
                "dateCheckOut": ""
            } ]
      
      
## Get available rooms on date range given  [GET /api/customer/getavailrooms]

- Request: Customer get all avaiable rooms info on date range given

  - Headers

        Content-type: application/json

  - Body

           {
              "checkIn": "",
              "checkOut": ""
           }

* Response: 200 (application/json)

  - Body
        
          [ {
                "date": "",
                "description": "",
                "available": 
            } ]
   
  
## Customer make reservation booking  [POST /api/customer/addrsv]

- Request: Customer get all avaiable rooms info on date range given

  - Headers

        Content-type: application/json

  - Body

           {
              "cusId": ,
              "roomId": ,
              "dateCheckIn": "",
              "dateCheckOut": "",
              "roomQty": 
            }

* Response: 200 (application/json)

  - Body
        
          {
              "msg": "Reservation created...",
              "cusId": ,
              "roomId": ,
              "dateCheckIn": "",
              "dateCheckOut": "",
              "roomQty": 
          }


## Customer DELETE their reservation booking by id  [POST /api/customer/deletersv/:id]

- Request: Customer Cancel their reservation booking by id

  - Parameters

    - id: 1 (number) - An unique identifier of one booking.

  - Headers

        Content-type: application/json

* Response: 200 (application/json)

  - Body
        
          {
              "msg": "Reservation Id: has been cancelled..."
          }
          
 
