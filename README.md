# TravelWithAmrit

[![Live Demo](https://img.shields.io/badge/Live%20Demo-TravelWithAmrit-blue?style=for-the-badge&logo=render)](https://travelwithamrit.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-brightgreen?style=for-the-badge&logo=github)](https://github.com/Amrit3533/travelWithAmrit)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🚀 Overview

Welcome to **TravelWithAmrit**! This is a full-stack MERN (MongoDB, Express.js, React, Node.js) project designed to be a comprehensive platform for Browse and managing travel listings. Whether you're looking for breathtaking destinations or cozy accommodations, TravelWithAmrit aims to inspire and facilitate your next adventure.

This platform empowers users to discover new places, share their own travel spots, and interact with a community of explorers.

## ✨ Features

* **User Authentication:** Secure sign-up, login, and logout functionalities with `passport.js` for robust user management.
* **CRUD Operations for Listings:** Users can seamlessly create, read, update, and delete their own travel listings.
* **Interactive Search & Filter:** Easily find specific listings using intuitive search and filtering options.
* **Dynamic Mini-Map View:** Each listing's detail page features a mini-map powered by Mapbox, showing the location.
* **Review & Rating System:** Anyone can register, log in, and easily provide reviews and ratings for listings, enriching the community experience.
* **User-Centric Content Control:** Only the user who created a listing, review, or rating has the authority to delete it, ensuring content integrity (with admin override capability).
* **Image Uploads:** Listings can include images, which are securely stored using Cloudinary.
* **GST Calculator:** A unique feature that displays the final price of listings including GST and other applicable charges.
* **User-Friendly Interface:** Built with EJS, CSS, and Bootstrap for a responsive and engaging user experience.

## 🛠️ Technologies Used

**Frontend:**
* **EJS** (Embedded JavaScript)
* **CSS**
* **Bootstrap**

**Backend:**
* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose ODM)

**Key Libraries & Tools:**
* `@mapbox/mapbox-sdk`: For integrating Mapbox functionalities.
* `cloudinary`: Cloud-based image and video management.
* `connect-flash`: For displaying flash messages to users.
* `connect-mongo`: MongoDB session store for Express.
* `dotenv`: For managing environment variables securely.
* `ejs-mate`: For EJS layouts.
* `express-session`: For session management.
* `joi`: For schema validation.
* `method-override`: Enables the use of PUT and DELETE HTTP methods in forms.
* `multer`: Middleware for handling `multipart/form-data`, primarily for file uploads.
* `multer-storage-cloudinary`: Cloudinary storage engine for Multer.
* `nodemon`: Automatically restarts the Node.js application during development.
* `passport`, `passport-local`, `passport-local-mongoose`: Comprehensive authentication middleware.

## 🚀 Getting Started

You can experience TravelWithAmrit live by clicking on the deployed link, or you can set it up locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: Version `22.14.0` or higher.
* **MongoDB**: Installed locally or access to a MongoDB cloud service (e.g., MongoDB Atlas).

### Local Installation

Follow these steps to get a local copy of the project up and running:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Amrit3533/travelwith_amrit.git](https://github.com/Amrit3533/travelwith_amrit.git)
    cd travelwith_amrit
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and add the following environment variables. Replace the placeholder values with your actual credentials:

    ```env
    MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
    CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
    CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
    CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"
    MAPBOX_TOKEN="YOUR_MAPBOX_ACCESS_TOKEN"
    SESSION_SECRET="A_STRONG_RANDOM_SECRET_STRING"
    ```
    * You can get your MongoDB connection string from your local MongoDB instance or MongoDB Atlas.
    * Cloudinary credentials can be obtained from your Cloudinary dashboard.
    * Mapbox access token can be generated from your Mapbox account.
    * `SESSION_SECRET` should be a long, random string for session security.

4.  **Start the application:**
    You can start the server using one of the following commands:
    ```bash
    node app.js
    # or
    nodemon app.js
    # or simply (if nodemon is globally installed)
    nodemon
    ```
    The application will typically run on `http://localhost:3000` (or whatever port is configured).

## 💡 Usage

Once the application is running, here's a quick guide to get started:

1.  **Register & Login:** Sign up for a new account or log in with existing credentials.
2.  **Explore Listings:** Browse through the various travel listings available.
3.  **Create New Listing:** After logging in, navigate to the "Create New Listing" option (usually found in the top right, near login/register) to add your first travel spot with details and images.
4.  **Interact:** Feel free to leave reviews and ratings on any listing.

## 🔗 Live Demo

Experience TravelWithAmrit live on Render:
[https://travelwith-amrit.onrender.com](https://travelwithamrit.onrender.com)

## 🤝 Contributing

We welcome contributions! If you have suggestions for improvements or find any issues, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the **ISC License**. See the `LICENSE` file for more details.

## 📧 Contact

For any questions or inquiries, you can reach out to the author:

**Amrit Kumar**
GitHub: [Amrit3533](https://github.com/Amrit3533)

---

Enjoy your travels with Amrit!
