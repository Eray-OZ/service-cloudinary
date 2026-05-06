# Cloudinary Gateway Service

A centralized, modular, and reusable image upload service built with **NestJS**, **Prisma**, and **Cloudinary**. This service acts as a gateway for multiple projects to manage their image uploads through a single, secure, and optimized point.

## Features

- **Project-Based Security**: Secured by unique API keys managed in a local SQLite database.
- **Hybrid Upload Methods**: Supports both `multipart/form-data` (files) and `Base64` string uploads.
- **Auto-Optimization**: Automatically generates optimized URLs using Cloudinary's `f_auto` (format) and `q_auto` (quality) parameters.
- **Transaction Logging**: All uploads are logged locally with metadata (URL, Public ID, size, format).
- **Swagger Documentation**: Interactive API documentation available at `/api`.
- **Dockerized**: Ready for containerized deployment with `Docker` and `Colima`.

## Tech Stack

- **Framework**: NestJS
- **Database**: SQLite (via Prisma ORM)
- **Storage**: Cloudinary
- **Documentation**: Swagger / OpenAPI
- **Runtime**: Node.js / Docker

## Getting Started

### 1. Prerequisites
- Node.js (v20+) or Docker/Colima
- A Cloudinary account (Cloud Name, API Key, API Secret)

### 2. Environment Variables
Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"

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

#### Using Docker (Recommended)
```bash
# Start with Colima or Docker Desktop
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

### Documentation
- [Architecture Overview](ARCHITECTURE.md)
- [API Reference (Swagger)](http://localhost:3000/api)

## License
MIT
