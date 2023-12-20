export interface ISignUpFormPayload {
  username: string;
  email: string;
  passwords: {
    password: string;
    repeatPassword: string;
  };
}
