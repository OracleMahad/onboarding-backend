import * as bcrypt from 'bcrypt';

export class UtilsProvider {
  static generateHash(password: string): string {
    console.log('password ', password);
    return bcrypt.hashSync(password, 10);
  }

  static validateHash(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }
    return bcrypt.compare(password, hash);
  }
}
