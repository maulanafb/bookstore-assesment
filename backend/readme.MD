# Backend Project

This project is a backend for a web application. It is built using Express TypeScript, PostgreSQL, and Prisma.

## Features

Order, Cancel Order, show List Book & Orders
Authentication and authorization using JWT tokens.
Pagination and filtering for users, books, and orders.

## Setup

Install dependencies:

```bash
npm install
```

Configure environment variables:

Create a .env file by copying it from env.example
Set up your PostgreSQL database and update the .env file with the following:
#adjust it to your PostgresQL database configuration

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/testing?schema=public"
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run start
```

## Accessing the Backend

The backend server will run on localhost:8000. You can access the API endpoints from your frontend application or a tool like Postman or you can access the swagger in http://localhost:8000/api/v1/api-docs/.

## Contact Me

If you're interested in collaborating or just want to talk about web development, please reach out to me at [gagas112212@gmail.com](mailto:gagas112212@gmail.com) or through [LinkedIn](https://www.linkedin.com/in/maulana-fatih-b52390195/).

## Let's Connect

Let's connect on the following platforms:

- [LinkedIn](https://www.linkedin.com/in/maulana-fatih-b52390195/)
- [GitHub](https://github.com/maulanafb)

Feel free to get in touch if you have any questions or would like to collaborate in web development!
