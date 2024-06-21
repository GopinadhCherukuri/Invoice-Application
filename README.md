**Invoice Management API**
==========================

**Overview**
------------

This is a Node.js API server using Express for managing invoices and interacting with the Harvest API.

**Dependencies**
---------------

* `express`: Framework for building web applications.
* `path`: Module for working with file paths.
* `passport`: Authentication middleware for handling user authentication.
* `express-session`: Middleware for managing user sessions.
* `axios`: Promise-based HTTP client for making requests to external APIs.
* `dotenv`: Module for loading environment variables from a `.env` file.
* `mongoose`: Object-document mapper for MongoDB.
* `jsonwebtoken`: Library for creating and verifying JSON Web Tokens (JWTs).

**Setup**
--------

### 1. Install Dependencies

Run the following command to install the required dependencies:


### 2. Create a `.env` file

Create a `.env` file with the following variables:


Replace `YOUR_HARVEST_ACCESS_TOKEN` and `YOUR_HARVEST_ACCOUNT_ID` with your actual Harvest API credentials.

### 3. Connect to MongoDB

Configure your MongoDB connection details in `connectDB.js`.

### 4. Initialize Authentication

Configure Google OAuth settings in `auth.js`.

**API Endpoints**
----------------

### Authentication

* `/auth/google`: Initiates Google OAuth authentication flow.
* `/auth/google/callback`: Handles the Google OAuth callback and redirects to `/auth/google/success` or `/auth/google/failure`.
* `/auth/google/failure`: Handles authentication failure and sends a message.
* `/auth/google/success`: Redirects to the Dashboard upon successful authentication.
* `/auth/protected`: Verifies user authentication and returns user information.
* `/auth/logout`: Logs out the user and destroys the session.

### Invoice Management

* `/fetch-invoices`: Fetches a list of invoices from Harvest API.
* `/invoices/:id`: Retrieves a specific invoice by ID.
* `/api/invoices`: Creates a new invoice and pushes the data to Harvest API.
* `/invoices/:invoice_id/estimates`: Retrieves estimates associated with a specific invoice.
* `/invoices/check-past-due`: Checks for past-due invoices and sends a message to the client.

**Usage**
---------

This API can be used to:

* Authenticate users using Google OAuth.
* Fetch and manage invoices.
* Send messages to clients regarding past-due invoices.
* Integrate with external services like Zapier.

**Example Requests**
-------------------

### Fetch invoices

```bash
curl -X GET 'http://localhost:7007/fetch-invoices'

curl -X POST -H 'Content-Type: application/json' \
-d '{"client_id": 123, "subject": "Invoice for Project A", "due_date": "2024-03-15", "amount": 1000, "estimate_id": 456}' \
'http://localhost:7007/api/invoices'



# Invoice Application Frontend
=============================

## Components
### 1. Dashboard
#### Description
The Dashboard component serves as the main entry point for the application. It provides a sidebar with navigation links to various features, including creating a new invoice, displaying invoices, profile management, and logout.

### 2. DisplayInvoices
#### Description
The DisplayInvoices component retrieves a list of invoices from the server and displays them in a card-based layout. Each card contains essential information about the invoice, such as the subject, client ID, due date, and buttons for sending reminders and editing the invoice.

### 3. InvoiceForm
#### Description
The InvoiceForm component is a form-based interface for creating new invoices. It allows users to input essential information, including client ID, subject, due date, description, unit price, and quantity. Upon submission, the form data is sent to the server for processing.

### 4. Login
#### Description
The Login component provides a simple interface for users to log in using Google OAuth 2.0 with Passport.js.

### 5. Logout
#### Description
The Logout component is a button that, when clicked, sends a request to the server to log out the user and redirect them to the login page.

## Functionality
### Creating a New Invoice
#### Description
The InvoiceForm component allows users to create new invoices by inputting essential information. Upon submission, the form data is sent to the server for processing.

### Displaying Invoices
#### Description
The DisplayInvoices component retrieves a list of invoices from the server and displays them in a card-based layout. Each card contains essential information about the invoice, such as the subject, client ID, due date, and buttons for sending reminders and editing the invoice.

### Sending Reminders
#### Description
The DisplayInvoices component provides a button for sending reminders to clients. When clicked, the button sends a request to the server to send an email reminder to the client.

### Editing Invoices
#### Description
The DisplayInvoices component provides a button for editing invoices. When clicked, the button redirects the user to an edit interface where they can modify the invoice details.

### Logging In and Out
#### Description
The Login component provides a simple interface for users to log in using Google OAuth 2.0 with Passport.js. The Logout component is a button that, when clicked, sends a request to the server to log out the user and redirect them to the login page.

## Technical Details
### Server API
#### Endpoints
* `/fetch-invoices`: Retrieves a list of invoices from the database.
* `/api/invoices`: Creates a new invoice in the database.
* `/invoices/:invoiceId/estimates`: Retrieves a list of estimates for a specific invoice.
* `/invoices/check-past-due`: Sends an email reminder to the client for a specific invoice.

### Frontend Framework
#### Description
The application uses React as the frontend framework, along with React Router for client-side routing.

### State Management
#### Description
The application uses React Hooks for state management, specifically the `useState` and `useEffect` hooks.

### HTTP Requests
#### Description
The application uses Axios for making HTTP requests to the server API.

### Authentication
#### Description
The application uses Google OAuth 2.0 with Passport.js for authentication.