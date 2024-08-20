import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

class UserService {
  constructor(private readonly userRepo = AppDataSource.getRepository(User)) {}

  /**
   * Get 100 users sorted by score DESC.
   * @function getUsers
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  async getUsers() {
    console.log('Calling getUsers()');
    const users = await this.userRepo.find({
      order: {
        score: 'DESC',
      },
      take: 100,
    });
    return { users: users };
  }
  /**
   * Create a new user.
   * @function createUser
   * @param {Object} user - The user to create.
   * @param {string} user.name - The name of the user.
   * @param {number} user.score - The score of the user.
   * @returns {Promise<User>} A promise that resolves to the created user.
   */
  async createUser(user: User) {
    console.log('Calling createUser()');
    return await this.userRepo.save(user);
  }
}

module.exports = new UserService();
