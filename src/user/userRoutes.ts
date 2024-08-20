const express = require('express');
const userService = require('./userService');

const router = express.Router();

/**
 * Get 100 users sorted by score DESC.
 * @route GET /user
 * @returns {Array.<User>} 200 - An array of user info
 * @returns {Error} 500 - Unexpected error
 */
router.get('/user', async (_, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

/**
 * Create a new user.
 * @route POST /user
 * @Body {User.model} - a User entity
 * @returns {User} 200 - The created user
 * @returns {Error} 500 - Unexpected error
 */
router.post('/user', async (req, res, next) => {
  try {
    await userService.createUser(req.body);
    res.status(200).json({ message: 'User created successfully!' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
