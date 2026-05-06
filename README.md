# Cloudinary Gateway Service

A centralized, modular, and reusable image upload service built with **NestJS**, **Prisma**, and **Cloudinary**. This service acts as a gateway for multiple projects to manage their image uploads through a single, secure, and optimized point.

## Features

- **Project-Based Security**: Secured by unique API keys managed in a **PostgreSQL** database (optimized for **Neon.tech**).
- **Hybrid Upload Methods**: Supports both `multipart/form-data` (files) and `Base64` string uploads.
- **Auto-Optimization**: Automatically generates optimized URLs using Cloudinary's `f_auto` (format) and `q_auto` (quality) parameters.
- **Transaction Logging**: All uploads are logged in PostgreSQL with metadata (URL, Public ID, size, format).
- **Swagger Documentation**: Interactive API documentation available at `/api`.
- **Dockerized**: Ready for containerized deployment on platforms like **Render**, **Koyeb**, or **Railway**.

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL (via Prisma ORM)
- **Cloud Database**: Neon.tech
- **Storage**: Cloudinary
- **Documentation**: Swagger / OpenAPI
- **Runtime**: Node.js / Docker

## Getting Started

### 1. Prerequisites
- Node.js (v20+) or Docker
- A Cloudinary account
- A Neon.tech (PostgreSQL) database URL

### 2. Environment Variables
Create a `.env` file in the root directory:

```env
# Database (Neon/Postgres)
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Seeding
SEED_PROJECT_API_KEY="sk_your_custom_key"

# App
PORT=3000
```

### 3. Installation & Run

#### Using Docker (Recommended for Deployment)
```bash
docker-compose up -d --build
```

#### Manual Setup
```bash
npm install
npx prisma migrate dev
npm run start:dev
```

### 4. Database Seeding
To generate your initial project and API key:
```bash
npx prisma db seed
```

## API Usage

All requests must include the `x-api-key` header for authentication.

### Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/v1/upload` | Upload a single file (multipart) |
| `POST` | `/v1/upload/multiple` | Upload multiple files (multipart) |
| `POST` | `/v1/upload/base64` | Upload via base64 string |

## Documentation
- [Architecture Overview](ARCHITECTURE.md)
- [API Reference (Swagger)](http://localhost:3000/)

## License
MIT
