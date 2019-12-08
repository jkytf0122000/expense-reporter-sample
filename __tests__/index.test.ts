import { Authentication } from '../src/controllers/auth/index';
import { User } from '../src/models/user';

describe('authentication', () => {
  it('serialize', async () => {
    const done = (arg: any, user: User) => {
      expect(user.id).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(arg).toBeNull();
    }
    const user_sample = new User;
    user_sample.email = 'test@example.com';

    Authentication.serializeUser(user_sample, done);
  });

})