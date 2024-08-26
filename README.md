
# Encrypted Letter API

This project provides an API for creating and retrieving encrypted letters using Node.js and MongoDB. The letters are encrypted using AES-256 encryption to ensure data security.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Create Letter](#create-letter)
  - [Get Letter](#get-letter)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Securely create and store letters.
- Retrieve and decrypt letters using a unique user identifier.
- Prevent multiple submissions of letters by the same user.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Crypto module (built-in Node.js module for encryption)
- dotenv (for environment variable management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/encrypted-letter-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd encrypted-letter-api
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set your environment variables (see below).

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your code).

## API Endpoints

### Create Letter

- **Endpoint**: `POST /api/v1/letters`
- **Description**: Create a new encrypted letter.
- **Request Body**:
  ```json
  {
    "letter": "your letter content goes here"
  }
  ```

- **Response**:
  - **Status 201**: Letter created successfully.
    ```json
    {
    "letter": {
        "name": "user_name_here",
        "letter": "encrypted_letter_here",
        "createdBy": "user_id_here",
        "iv": "initialization_vector_here",
        "_id": "mongoDB_id_here",
        "__v": 0
    }
}
    ```
  - **Status 403**: User has already created a letter.
    ```json
    {
      "msg": "You have already created a letter."
    }
    ```

### Get Letter

- **Endpoint**: `GET /api/v1/letters`
- **Description**: Retrieve and decrypt the letter for the authenticated user.
- **Response**:
  - **Status 200**: Letter retrieved successfully.
    ```json
    {
      "name": "user+name_here"
      "letter": "decrypted_letter_here"
    }
    ```
  - **Status 404**: Letter not found.
    ```json
    {
      "msg": "Letter not found."
    }
    ```

## Environment Variables

Create a `.env` file in the root of your project and include the following variables:

```
ENCRYPTION_KEY=your_32_byte_encryption_key_here
ENCRYPTION_METHOD=aes-256-cbc
MONGO_URI=your_mongodb_connection_string_here
PORT=3000
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
