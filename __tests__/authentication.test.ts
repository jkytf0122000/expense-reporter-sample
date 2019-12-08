import { Authentication } from '../src/controllers/auth/index';
import { User } from '../src/models/user';

describe('authentication', () => {
  it('serialize', () => {
    const done = (arg: any, user: User) => {
      expect(user.id).toBe('811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA');
      expect(user.email).toBe('test@example.com');
      expect(arg).toBeNull();
    }
    const user_sample = {
      id: '811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA',
      last_name: 'test',
      email: 'test@example.com',
    }

    Authentication.serializeUser(user_sample, done);
  });

  it('deserialize - positive', () => {
    const done = (arg: any, user: any) => {
      expect(arg).toBeNull();
      expect(user.id).toBe('811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA');
    }
    const user_sample = {
      id: '811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA',
      last_name: 'test',
      email: 'test@example.com',
    }

    Authentication.deserializeUser(user_sample, done);
  });
  it('deserialize - negative', () => {
    const done = (arg: any, user: any) => {
      expect(arg).toBeNull();
      expect(user).toBe(false);
    }
    const user_sample = {
      id: '',
      last_name: 'test',
      email: 'test@example.com',
    }

    Authentication.deserializeUser(user_sample, done);
  });

  it('verify - positive', () => {
    const done = (arg: any, user: any) => {
      expect(arg).toBeNull();
      expect(user.id).toBe('811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA');
      expect(user.email).toBe('test@example.com');
      expect(user.last_name).toBe('test');
    }

    Authentication.verify('test@example.com', 'password', done);
  })

  it('verify - negative', () => {
    const done = (arg: any, user: any) => {
      expect(arg).toBeNull();
      expect(user).toBe(false);
    }

    Authentication.verify('test@example.com', 'incorrect', done);
  })
})