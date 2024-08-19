import { AppDataSource } from './data-source';

const express = require('express');
const app = express();
const userService = require('./user/userService');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  'Access-Control-Allow-Origin': '*',
};

app.use(cors(corsOptions));

async function main() {
  await AppDataSource.initialize()
    .then(() => console.log('created user table'))
    .catch((error) => console.log(error));

  app.get('/', async (_, res) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
  });

  app.post('/', async (req, res, next) => {
    try {
      await userService.createUser(req.body);
      res.status(200).json({ message: 'User created successfully!' });
    } catch (e) {
      next(e);
    }
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

main();
