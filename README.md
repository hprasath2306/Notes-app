# Notes App

A fully functional notes application built using **Express.js**, **Vite**, **MongoDB**, and **Node.js**. Users can sign up, log in, and create as many notes as they like, with the ability to pin important notes for easy access.

## Features

- **User Authentication**: Secure login and signup functionality with hashed passwords.
- **Create Notes**: Users can create an unlimited number of notes.
- **Pin Notes**: Easily pin important notes to the top for better organization.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend**: Express.js (Node.js)
- **Frontend**: Vite (React)
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/hprasath2306/Notes-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Notes-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a \`.env\` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=<Your MongoDB Connection String>
     JWT_SECRET=<Your JWT Secret>
     ```
5. Run the server:
   ```bash
   npm run dev
   ```

6. The application should be running at `http://localhost:3000`.

## Future Enhancements

- **Note Categorization**: Organize notes into folders or categories.
- **Reminders**: Add the ability to set reminders for important notes.
- **Dark Mode**: A theme switcher for light and dark modes.

## Contributing

Feel free to fork the repository and submit a pull request with any improvements or new features.
