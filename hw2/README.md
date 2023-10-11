# Web Programming HW#2

## Run the project

If you only want to run the project, you can follow the steps below.

### 0. Environment variables setting (week 1)

- In `/backend` directory, copy `.env.example` to `.env` or just create a file named `.env` and edit the configuration of your backend server
- Set port to 8000
  ```bash
  PORT=8000
  ```
- And copy your mongodb connection url in order to use remote database
  ```bash
  MONGO_URL=[your mongodb connection url]
  ```

### 1. Install dependencies

```bash
cd backend
yarn
```

### 2. Run the server

```bash
yarn dev
```

### 3. Open the frontend directory

```
cd ../frontend
yarn
yarn dev
```

### 4. Go to the localhost server shown on the terminal

- In `/frontend` directory, copy `.env.example` to `.env` or just create a file named `.env` and edit the configuration of your backend server

- Use your own api url if port:8000 is not available
  ```bash
  VITE_API_URL="http://localhost:8000/api"
  ```
