# TypeScript Node.js Starter

A structured and extensible **Node.js + Express + TypeScript backend starter** designed for building REST APIs with a clean project architecture, centralized error handling, logging, security middleware, environment-based configuration, and development tooling already configured.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript\&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express\&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## Overview

This repository provides a starting point for building maintainable Node.js backend applications with TypeScript.

Instead of starting with a single Express file, the project separates application responsibilities into dedicated layers for:

* Routes
* Controllers
* Services
* Middleware
* Configuration
* Constants
* Utilities

The starter also includes common backend concerns such as request logging, rate limiting, security headers, sessions, cookies, CORS, compression, CSRF protection, 404 handling, and centralized error handling.

---

## Features

* **Node.js + Express**
* **TypeScript with strict mode**
* Modular backend architecture
* Controller/service separation
* Environment-based configuration
* Development auto-reload with Nodemon
* TypeScript execution with `ts-node`
* `@/` path aliases
* Centralized error handling
* Custom 404 middleware
* HTTP request logging
* Winston application logging
* Rate limiting
* Helmet security headers
* CORS support
* Response compression
* Cookie parsing
* Express sessions
* CSRF protection
* Static file serving
* Graceful process-level error logging
* Production TypeScript build output

---

## Tech Stack

### Core

* **Node.js**
* **TypeScript**
* **Express**

### Security & HTTP Middleware

* **Helmet**
* **CORS**
* **CSRF**
* **Cookie Parser**
* **Express Session**
* **Compression**
* **Limiter**

### Development

* **Nodemon**
* **ts-node**
* **tsconfig-paths**
* **cross-env**
* **rimraf**

### Logging

* **Winston**

### Configuration

* **dotenv**

---

## Project Structure

```text
typescript-nodejs-starter/
├── src/
│   ├── config/
│   │   ├── express.config.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │
│   ├── controller/
│   │   └── auth/
│   │       └── index.ts
│   │
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   ├── notFountHandler.ts
│   │   ├── rateLimit.ts
│   │   ├── requestLogger.ts
│   │   └── sessionHandler.ts
│   │
│   ├── routes/
│   │   ├── auth.ts
│   │   └── index.ts
│   │
│   ├── services/
│   │   └── auth/
│   │       └── index.ts
│   │
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env.local
├── .gitignore
├── nodemon.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Architecture

The starter follows a simple layered architecture:

```text
HTTP Request
     │
     ▼
   Route
     │
     ▼
 Controller
     │
     ▼
  Service
     │
     ▼
Database / External Service
     │
     ▼
 Controller
     │
     ▼
HTTP Response
```

### Routes

Routes define the API endpoints and map requests to controllers.

```text
src/routes/
```

### Controllers

Controllers handle HTTP-specific logic such as:

* Reading request data
* Calling services
* Returning responses
* Forwarding errors

```text
src/controller/
```

### Services

Services contain application and business logic.

```text
src/services/
```

This separation makes the application easier to test, maintain, and extend.

---

## Request Pipeline

The Express application currently applies middleware in approximately the following order:

```text
Request
   │
   ▼
Request Logger
   │
   ▼
Body Parser
   │
   ▼
Static Files
   │
   ▼
Helmet
   │
   ▼
Compression
   │
   ▼
Cookie Parser
   │
   ▼
CORS
   │
   ▼
CSRF Protection
   │
   ▼
Session Handling
   │
   ▼
Rate Limiter
   │
   ▼
API Routes
   │
   ▼
404 Handler
   │
   ▼
Error Handler
```

All application routes are mounted under:

```text
/api
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 20+ recommended
* npm
* Git

Check your installed versions:

```bash
node --version
npm --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Naveedahmedtech/typescript-nodejs-starter.git
```

### 2. Enter the project directory

```bash
cd typescript-nodejs-starter
```

### 3. Install dependencies

```bash
npm install
```

---

## Environment Configuration

The application loads environment variables based on `NODE_ENV`.

The expected naming convention is:

```text
.env.local
.env.dev
.env.prod
```

For example:

```bash
NODE_ENV=local
```

loads:

```text
.env.local
```

The repository currently includes:

```env
PORT=8000
```

### Example `.env.local`

```env
PORT=8000
```

As the application grows, additional environment variables can be added here:

```env
PORT=8000
SESSION_SECRET=your-secret
DATABASE_URL=your-database-url
```

> Never commit production secrets, passwords, API keys, access tokens, or database credentials to Git.

---

## Running Locally

Run the project using the local environment:

```bash
npm run local
```

This starts the TypeScript application with Nodemon and reloads the server whenever source files change.

The default server port is:

```text
8000
```

So the application will normally be available at:

```text
http://localhost:8000
```

---

## Development Mode

Run:

```bash
npm run dev
```

This sets:

```text
NODE_ENV=dev
```

and attempts to load:

```text
.env.dev
```

Create `.env.dev` if you want a dedicated development configuration:

```env
PORT=8000
```

---

## Available Scripts

### Local Development

```bash
npm run local
```

Uses:

```text
NODE_ENV=local
```

with Nodemon and `ts-node`.

---

### Development

```bash
npm run dev
```

Uses:

```text
NODE_ENV=dev
```

---

### Build

```bash
npm run build
```

Removes the previous `dist` directory and compiles the TypeScript source.

Compiled files are written to:

```text
dist/
```

---

### Start

The project contains a production start script, but it should be reviewed before production deployment. See the **Production Notes** section below.

---

## API

The API is mounted under:

```text
/api
```

### Authentication Routes

Authentication-related routes are mounted at:

```text
/api/auth
```

### Register User

```http
POST /api/auth/register
```

The request body is forwarded to the registration service.

Example JSON payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

A successful controller response uses status:

```text
201 Created
```

### Important

The current registration service is an **example implementation only**.

It does not currently:

* Store users in a database
* Hash passwords
* Validate credentials
* Generate authentication tokens
* Persist data between requests
* Check whether users already exist

It should therefore be treated as starter/demo code and replaced with real authentication logic before production use.

---

## CSRF Protection

CSRF middleware is enabled globally using cookies.

Because of this, state-changing requests such as:

```http
POST
PUT
PATCH
DELETE
```

will require valid CSRF handling.

For a frontend application, a common next step is to create an endpoint such as:

```http
GET /api/csrf-token
```

that returns a CSRF token to the client.

The client can then include the token with protected requests.

---

## TypeScript Configuration

The project uses TypeScript strict mode:

```json
{
  "strict": true
}
```

Source files are located in:

```text
src/
```

Compiled JavaScript is generated in:

```text
dist/
```

The project targets:

```text
ES2020
```

and uses:

```text
NodeNext
```

module behavior.

---

## Path Aliases

Instead of deeply nested imports such as:

```ts
import logger from "../../../utils/logger";
```

the project supports:

```ts
import logger from "@/utils/logger";
```

The alias is configured as:

```json
{
  "baseUrl": "./src",
  "paths": {
    "@/*": ["*"]
  }
}
```

During development, `tsconfig-paths/register` is loaded through Nodemon to resolve these aliases.

---

## Error Handling

The project includes dedicated middleware for:

### 404 Errors

Unknown endpoints are forwarded to a custom not-found handler.

```text
src/middlewares/notFountHandler.ts
```

### Application Errors

Unhandled application errors are processed by:

```text
src/middlewares/errorHandler.ts
```

This keeps route and controller implementations cleaner and provides a central place for API error responses.

---

## Logging

Application logging is handled with **Winston**.

The server also listens for process-level errors including:

```text
uncaughtException
```

and:

```text
unhandledRejection
```

This provides a central mechanism for recording unexpected runtime failures.

---

## Security

Several security-related middleware packages are already integrated.

### Helmet

```text
helmet
```

Adds security-related HTTP headers.

### CORS

```text
cors
```

Controls cross-origin requests.

### CSRF

```text
csurf
```

Adds Cross-Site Request Forgery protection.

### Rate Limiting

The project includes custom rate-limit middleware to reduce excessive request traffic.

### Cookies & Sessions

```text
cookie-parser
express-session
```

provide cookie and session handling.

### Express Fingerprinting

Express's default:

```text
X-Powered-By
```

header is disabled.

---

## Compression

HTTP responses are compressed using:

```text
compression
```

which can reduce response sizes and improve transfer performance.

---

## Production Notes

Before deploying this starter in production, review the following.

### 1. Production start command

The current `start` command should be corrected so `cross-env` launches Node rather than Node trying to execute `cross-env`.

A typical command would be:

```json
{
  "start": "cross-env NODE_ENV=prod node ./dist/server.js"
}
```

---

### 2. Runtime path aliases

TypeScript's `paths` configuration helps the compiler and development tooling resolve:

```text
@/*
```

but TypeScript itself does not automatically rewrite those aliases in emitted JavaScript.

Before production deployment, configure a runtime alias strategy or rewrite aliases during the build process.

Possible approaches include:

* `tsc-alias`
* Node package imports
* A bundler
* Relative imports
* Another runtime alias solution

---

### 3. Authentication

Replace the example registration implementation with:

* Database persistence
* Request validation
* Password hashing
* Authentication tokens or secure sessions
* Duplicate account detection
* Authorization logic

---

### 4. Session configuration

Production session handling should include:

* A secure session secret
* Persistent session storage
* Appropriate cookie settings
* `secure` cookies over HTTPS
* Suitable `sameSite` configuration

The default in-memory session store should not be used for a production application.

---

### 5. CORS configuration

Avoid unrestricted CORS for a production API.

Configure trusted frontend origins explicitly.

Example:

```ts
cors({
  origin: "https://example.com",
  credentials: true,
});
```

---

### 6. Environment validation

Consider validating environment variables during application startup using a library such as:

```text
Zod
Joi
envalid
```

This prevents the application from starting with invalid or missing configuration.

---

## Recommended Next Steps

Useful additions for turning this starter into a production backend include:

* PostgreSQL or MongoDB integration
* Prisma, Drizzle, TypeORM, or Mongoose
* Request validation with Zod
* User authentication
* Password hashing with bcrypt or Argon2
* JWT or secure session authentication
* Role-based authorization
* Unit testing
* Integration testing
* ESLint
* Prettier
* API documentation with Swagger/OpenAPI
* Docker support
* GitHub Actions CI/CD
* Health-check endpoint
* Graceful server shutdown
* Structured environment validation

---

## Example Feature Structure

As the application grows, features can follow the existing route → controller → service pattern:

```text
src/
├── routes/
│   ├── auth.ts
│   ├── users.ts
│   └── products.ts
│
├── controller/
│   ├── auth/
│   ├── users/
│   └── products/
│
└── services/
    ├── auth/
    ├── users/
    └── products/
```

This keeps HTTP handling separate from business logic.

---

## Contributing

Contributions are welcome.

### 1. Fork the repository

### 2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

### 3. Commit your changes

```bash
git commit -m "feat: add my feature"
```

### 4. Push your branch

```bash
git push origin feature/my-feature
```

### 5. Open a Pull Request

---

## License

This project is licensed under the **ISC License**.

---

## Author

**Naveed Ahmed**

GitHub: [@Naveedahmedtech](https://github.com/Naveedahmedtech)

Repository:
[github.com/Naveedahmedtech/typescript-nodejs-starter](https://github.com/Naveedahmedtech/typescript-nodejs-starter)

---

## Support

If this starter helps you build your next Node.js API, consider giving the repository a ⭐.

Issues, suggestions, and contributions are welcome.
