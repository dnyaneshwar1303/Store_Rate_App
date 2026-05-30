# Store Rating App

## Tech Stack
- React.js
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Tailwind CSS

## Features
- Authentication & Authorization
- Role Based Access Control
- Admin Dashboard
- Store Management
- Rating System
- Search Stores
- Update Password

## Roles
- ADMIN
- USER
- STORE_OWNER

## Setup Backend

cd backend
npm install
npm start

## Setup Frontend

cd frontend
npm install
npm run dev

## Environment Variables

Create a `.env` file inside backend folder.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=STORE_RATING
JWT_SECRET=your_secret_key
PORT=4100



---

### 2. Database Schema

```md
## Database Setup

Run these SQL queries:

```sql
CREATE DATABASE STORE_RATING;
USE STORE_RATING;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  role ENUM('ADMIN','USER','STORE_OWNER') NOT NULL DEFAULT 'USER'
);

CREATE TABLE stores(
  store_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL,
  address VARCHAR(200) NOT NULL,
  owner_id INT NOT NULL,
  FOREIGN KEY(owner_id)
  REFERENCES users(id)
  ON DELETE CASCADE
);

CREATE TABLE ratings(
  rating_id INT AUTO_INCREMENT PRIMARY KEY,
  rating INT NOT NULL CHECK(rating>=1 AND rating<=5),
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  FOREIGN KEY(user_id)
  REFERENCES users(id)
  ON DELETE CASCADE,
  FOREIGN KEY(store_id)
  REFERENCES stores(store_id)
  ON DELETE CASCADE,
  UNIQUE(user_id,store_id)
);
