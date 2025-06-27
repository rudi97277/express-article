# Express + TypeScript + Docker

This is a backend project setup using Express.js, TypeScript, and MongoDB, all running inside Docker containers.

## Features

- Express.js with TypeScript
- MongoDB using Docker
- Docker Compose for development and deployment
- Seed script support (`npm run seed`) for initial data
- Clean codebase structure

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rudi97277/express-article.git
cd express-article
```

### 2. Create a .env File

Copy the example file and update the variables as needed:

```bash
cp .env.example .env
```

Edit .env and fill in your values:

```
HOST=0.0.0.0
PORT=3000
CORS_ORIGINS=http://localhost:3001,http://localhost:3002
MONGO_URI=mongodb://localhost:27017/myskill
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN_MINUTES=60
```

Note: If you're using Docker Compose, the MONGO_URI will automatically point to the internal MongoDB container (e.g., mongodb://mongo:27017/myskill) via service name.

# 3. Manual Local Installation

Install the dependencies:

```bash
npm install
```

Running in development mode :

```bash
npm run dev
```

Running in production mode:

```bash
npm run build && npm run start
```

If you follow the .env.example, the project should be started in :

```
http://localhost:3000
```

### 4. Build and Start with Docker Compose

```bash
docker-compose up -d --build
```

Once started, the app will be available at:

```
http://localhost:9999
```

and mongodb will be available at:

```
localhost:27999
```

### 5. Server Deployment

You can deploy this project on a remote server using either a manual Node.js setup or Docker Compose.

#### Option A: Manual Deployment

- Install Node.js, MongoDB, and NGINX.
- Clone the repository and configure your `.env` file.
- Run `npm install`, then `npm run build`.
- Start the app using PM2 (`pm2 start dist/index.js`).
- Use NGINX as a reverse proxy to forward requests to your app.
- (Optional) Secure the site with HTTPS using Certbot and Let's Encrypt.

#### Option B: Docker Deployment

- Install Docker and Docker Compose on your server.
- Clone the repository and configure `.env`.
- Run `docker-compose up -d --build` to build and start the app.
- The app will be available at `http://<your-server-ip>:9999`.
- (Optional) Use NGINX and Certbot on the host machine to expose your app via a domain with HTTPS.

### 6. Seeding the Database

To insert initial sample data (if any), run:

```bash
npm run seed
```

### 6. Testing

To run all the available test, run:

```bash
npm run test
```
