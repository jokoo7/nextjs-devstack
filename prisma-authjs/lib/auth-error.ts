import { CredentialsSignin } from 'next-auth';

export class InvalidCredentials extends CredentialsSignin {
  constructor(message: string = 'Email atau password salah') {
    super();
    this.code = message;
  }
}
