# Classic Royal Printers Web Application

## Overview
This is a web application for Classic Royal Printers, featuring both frontend and backend components. The application allows users to view products, gallery, contact information, and includes authentication functionality.

## Project Structure
- **backend/**: Express.js server with MongoDB database
  - **uploads/**: Organized storage for uploaded files
    - **images/**: For image uploads
    - **documents/**: For document uploads
    - **videos/**: For video uploads
- **frontend/**: React.js application

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or accessible via connection string)

### Environment Variables

#### Backend (.env file in backend directory)
```
JWT_SECRET=your_secure_jwt_secret_here
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=yourapppassword
MONGODB_URI=mongodb://localhost:27017/classic_royal
```

#### Frontend (.env file in frontend directory)
```
REACT_APP_API_URL=http://localhost:5000
```

### Installation

1. **Start MongoDB**
   - Make sure MongoDB is running locally (e.g., run `mongod` in a terminal).

2. **Setup Backend**
   ```sh
   cd backend
   npm install
   node app.js
   ```
   - The backend API will be available at http://localhost:5000

3. **Setup Frontend**
   ```sh
   cd frontend
   npm install
   npm start
   ```
   - The React app will be available at http://localhost:3000

## Features
- User authentication (register/login)
- Product showcase
- Media gallery
- Contact form

## Recent Fixes and Improvements

### Security Enhancements
- ✅ Updated JWT secret with more secure value
- ✅ Added file upload validation (type and size limits)
- ✅ Implemented proper authentication middleware
- ✅ Added rate limiting and security headers

### Code Quality
- ✅ Removed all commented-out code blocks
- ✅ Fixed stray comments and formatting issues
- ✅ Standardized API URL handling across all components
- ✅ Added proper error handling for file uploads
- ✅ Added missing dependencies (nodemon as devDependency)

### Database and Models
- ✅ Added missing price field to Product model
- ✅ Fixed Media model and route alignment
- ✅ Improved error handling in all routes

### Deployment Readiness
- ✅ Created comprehensive deployment guide
- ✅ Added Vercel configuration
- ✅ Set up production environment variables
- ✅ Added proper .gitignore rules
- ✅ Removed duplicate files and configurations

### File Upload System
- ✅ Added file type validation
- ✅ Implemented 10MB file size limit
- ✅ Enhanced error handling for upload failures
- ✅ Automatic directory creation for uploads

### Frontend Improvements
- ✅ Production-ready API URL configuration
- ✅ Consistent error handling across components
- ✅ Proper loading states and user feedback
- ✅ Clean component structure

## Notes
- Do NOT use the old 'project' directory or static HTML files. All UI is now in the React app.
- Make sure both backend and frontend are running for full functionality.





edits:
product.js line 43, 72 (frontend-src-pages-product.js)
gallery.js line 59 (frontend-src-pages-gallery.js)

ctrl+c for ending server
