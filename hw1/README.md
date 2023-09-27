# Web Programming HW#1


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

### 3. Run the server

```bash
yarn start
```

### 4. Open the frontend

Open `frontend/index.html` by clicking it in your file explorer.

Or if you're on ubuntu, you can run the following command to open it in your browser.

```bash
cd frontend
xdg-open index.html
```

If you're on macOS, you can run the following command to open it in your browser.

```bash
cd frontend
open index.html
```
