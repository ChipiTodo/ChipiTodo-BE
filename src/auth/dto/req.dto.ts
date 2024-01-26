import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

class SignupReqDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(9, 20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      '비밀번호에는 영문, 숫자, 특수문자가 포함되어야 하며, 특수문자는 최소 한개 이상이어야 합니다.',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  nickname: string;
}

export { SignupReqDto };
