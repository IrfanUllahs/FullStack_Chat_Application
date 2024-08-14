# Real-Time Chat Application
A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io. This application allows users to send and receive messages instantly, manage their profiles, and interact with other users in real time.

## Features
### Real-Time Messaging: 
  Send and receive messages instantly using Socket.io.
### User Management: 
  Block and unblock users in real time.
### Authentication:
  Secure sign-in with Google authentication.
### Profile Management: 
  Update user profiles, including profile images using Cloudinary.
### Message Management: 
  Delete individual messages or clear all messages.
### Dashboard: 
  Separate dashboards for users and admins.
Getting Started
### Prerequisites
Node.js
npm or yarn
MongoDB (running locally or use a cloud instance)
Setup Instructions
Clone the Repository
git clone https://github.com/yourusername/real-time-chat-app.git
cd real-time-chat-app
Install Dependencies

Install both client-side and server-side dependencies.
# For client-side
cd client
npm install

# For server-side
cd ../server
npm install
Configure Environment Variables

Create a .env file in the server directory and add your environment variables. Example:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the Application

Start the server and client applications.
# Start the server
cd server
npm start

# In a new terminal, start the client
cd ../client
npm start
Note: By default, the client will be accessible at http://localhost:3000, and the server at http://localhost:5000.

Socket.io Server

Due to pricing concerns, the Socket.io server is not deployed. For local development, the Socket.io functionality is included. Note that the relevant Socket.io code is commented out in the master branch. You can find the working Socket.io code in the local branch.
# To use Socket.io locally, switch to the local branch
git checkout local
Deployment
Currently, the Socket.io server is not deployed. For a live demo, you will need to deploy the Socket.io server separately or use local development as described above.


