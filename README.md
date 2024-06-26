
### Backend
- **Node.js**: Used for building the backend server.
- **Express.js**: Used as the web application framework for Node.js.
- **MongoDB**: Used as the database for storing bug data.
- **Mongoose**: Used as the MongoDB object modeling tool.
- **EventEmitter**: Used for emitting and handling events for performance tracking.

## Setup Instructions

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the frontend directory and run `npm install` to install frontend dependencies.
3. Navigate to the backend directory and run `npm install` to install backend dependencies.
4. Start the MongoDB server.
5. In the backend directory, create a `.env` file with the following environment variable:
   - `MONGODB_URI=<your_mongodb_uri>`
6. Run `npm run dev` in backend directories to start backend servers, respectively.
7. Access the application in your web browser at `http://localhost:8000`.

## API Endpoints

- **POST /add-user**: Endpoint for adding a new user and update.
- **GET /get-all-user**: Endpoint for retrieving all users.
