# VacQ – Software Development Practice

This is a **backend project** built for learning and practice purposes.  
It mainly focuses on **user authentication**, **reservation management**, and basic **API structuring** using modern Node.js and Express.

---

##  Overview

- **Framework:** Node.js + Express  
- **Database:** MongoDB (via Mongoose)  
- **Environment Config:** Handled with `dotenv`  
- **Main Routes:**  
  - `/api/v1/auth/` → handles user registration, login, and token verification  
  - `/api/v1/reservation/` → manages reservation CRUD operations   

Common middleware used:
- Input sanitization (`express-mongo-sanitize`)
- Rate limiting and security headers (`helmet`, `express-rate-limit`)
- CORS support
- Basic error handling middleware

---
##  Project Structure

```
VacQ/
├── config/
│   ├── db.js                           # Database connection configuration
│   └── config.env                      # Environment variables
├── controllers/
│   ├── authController.js               # Handles user registration, login, logout, OTP verification
│   ├── massageshopController.js        # Handles CRUD operations for massageshop 
│   └── reservationsController.js       # Handles CRUD operations for reservations
├── middleware/
│   ├── authauthMiddleware.js           # Protect routes, check JWT authentication
│   ├── rateLimiter.js                  # Limit number of requests per time window
│   └── sanitizeMiddleware.js           # Clean request data to prevent injection attacks
├── models/
│   ├── User.js                         # User schema and model
│   ├── UserUnverified.js               # Stores unverified users before OTP confirmation
│   ├── Reservation.js                  # Reservation schema and model
│   └── MassageShop.js                  # Massage shop schema and model
├── routes/
│   ├── authRoutes.js                   # Defines authentication API endpoints
│   ├── massageshopRoutes.js            # Defines massageshop API endpoints
│   └── reservationRoutes.js            # Defines reservation API endpoints
├── utils/
│   ├── dateCheck.js                    # Utility functions to validate dates
│   ├── emailQueue.js                   # Utility for send email as a queue
│   ├── sendEmail.js                    # Utility to send emails (e.g., OTP)
│   ├── timeCheck.js                    # Utility to check time-related conditions
│   └── validateTime.js                 # Validate reservation times and cancellation rules
```
---

##  Main Features

1. Users can register with their name, telephone number, email, and password.
2. Registered users can log in and log out using their email and password.
3. Logged-in users can:
   - Reserve up to 3 queues by specifying the date and preferred massage shop.
   - View, edit, or delete their reservations.
4. Admins can:
   - View, edit, or delete any reservation.
5. The system provides a list of massage shops, including their name, address, telephone number, and open-close time.

---

##  Additional Requirements

- **Security:** Protect against common vulnerabilities (e.g., XSS, SQL injection).
- **Two-Step Verification:**  
  When a new user registers, the system sends a **One-Time Password (OTP)** to their registered email address.  
  The user must verify the OTP before the registration process is completed.
- **Reservation Cancellation Policy:**  
  Users are allowed to cancel their reservations **only before X hours** of the reserved time.  
  After that time window has passed, the system will **not allow cancellations**.
---

##  How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set up environment variables**  
   Create a `.env` file in the `config` folder and define the required variables (e.g., `PORT`, `DB_URI`, etc.).

   Example `.env` file:
   ```env
    PORT=<YOUR_PORT_NUMBER>
    NODE_ENV=development
    MONGO_URI=<DB_URL>
    
    JWT_SECRET=<your_jwt_secret>
    JWT_EXPIRE=30d
    
    JWT_COOKIE_EXPIRE=30
    
    SMTP_EMAIL=<your_email@example.com>
    SMTP_PASSWORD=<your_email_password>
    FROM_NAME=VacQ
    FROM_EMAIL=<your_email@example.com>
   ```

3. **Run the server**  
   Start the server in development mode:
   ```bash
   npm run dev
   ```

4. **Test the API**  
   Use tools like Postman or cURL to interact with the API endpoints.

---
