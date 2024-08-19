import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

class UserService {
  constructor(private readonly userRepo = AppDataSource.getRepository(User)) {}
  async getUsers() {
    console.log('getting users');
    const users = await this.userRepo.find({
      order: {
        score: 'DESC',
      },
    });
    console.log(users);
    return { users: users };
  }

  async createUser(user: User) {
    console.log('creating users');
    console.log(user);
    return await this.userRepo.save(user);
  }
}

module.exports = new UserService();
