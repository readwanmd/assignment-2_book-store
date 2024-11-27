# Book Store API - Express & TypeScript

This project contains an Express.js application built with TypeScript for managing book store. The application uses MongoDB as the database and Mongoose for schema definition and data operations, ZOD for data validation. It includes CRUD functionality for managing books and processing orders.

---

## Features

### Endpoints

#### **Products**

- **POST** `/api/products` - Add a new book to the store.
- **GET** `/api/products` - Retrieve all books in the store.
- **GET** `/api/products/:productId` - Retrieve details of a specific book.
- **UPDATE** `/api/products/:productId` - Update details of a specific book.
- **DELETE** `/api/products/:productId` - Remove a book from the store.

#### **Orders**

- **POST** `/api/orders` - Place an order for a book.
- **GET** `/api/orders/revenue` - Retrieve total revenue from orders.

---

## Data Models

### **Product Model (Book)**

| Field         | Type      | Description                                                                                        |
| ------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `title`       | `string`  | The title of the book                                                                              |
| `author`      | `string`  | The author of the book                                                                             |
| `price`       | `number`  | Price of the book                                                                                  |
| `category`    | `string`  | The genre or category of the book (`Fiction`, `Science`, `SelfDevelopment`, `Poetry`, `Religious`) |
| `description` | `string`  | A brief description of the book                                                                    |
| `quantity`    | `number`  | Quantity of the book available                                                                     |
| `inStock`     | `boolean` | Indicates if the book is in stock                                                                  |

### **Order Model**

| Field        | Type       | Description                                  |
| ------------ | ---------- | -------------------------------------------- |
| `email`      | `string`   | The email address of the customer            |
| `product`    | `ObjectId` | The ID of the book being ordered             |
| `quantity`   | `number`   | Quantity of the ordered book                 |
| `totalPrice` | `number`   | Total price calculated as `price * quantity` |

## Prerequisites

- **Node.js**
- **MongoDB** (Local or Cloud)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/readwanmd/assignment-2_book-store.git
cd assignment-2_book-store
```

### 2. Install Dependencies

```bash
yarn
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following keys:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore[or your mongo atlas URI]
```

### 4. Start the Application

#### Development Mode

```bash
yarn start:dev
```

#### Production Mode

```bash
yarn build
yarn start
```

---

## Usage

### API Testing

You can use tools like **Postman** to interact with the API.
