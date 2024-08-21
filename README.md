# How to run locally

Clone the repo & install dependencies

```
git clone https://github.com/pear25/catch-game-be.git
cd catch-game-be
npm install
```

1. Copy the `.env` file into the root project directory of the repository
2. Source the `.env` file onto your terminal

```
source .env
```

3. Run the server locally

```
npm run start
```

## Other details

1. Require the .env file to run the backend server.
2. Go to https://github.com/pear25/catch-game to view and run the frontend code of this application

## APIs

| Name       | Route      | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| getUsers   | GET /user  | Retrieves 100 users sorted desc by score    |
| createUser | POST /user | Creates a new user entity and saves into DB |

## User Entity

| Column Name | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| id          | uuid   | Generated unique identifier of the user |
| name        | string | Name of the user entered in the form    |
| score       | string | Score of the user from the game         |
