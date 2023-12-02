export interface IUserDto {
  id: number;
  username: string;
  email: string;
}

export interface ISignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface ISignInResponseDto {
  user: IUserDto;
  accessToken: string;
}
