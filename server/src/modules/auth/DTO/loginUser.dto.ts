import {
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsGmailEmail } from 'src/decorators/email.decorators';

export class LoginUser {
  @IsNotEmpty({ message: 'Email không được trống' })
  @IsGmailEmail({ message: 'Email không hợp lệ' })
  email: string;

  
  @IsNotEmpty({ message: 'Password không được trống' })
  @Matches(/.*\d.*/, {
    message: 'Passwords phải chứa ít nhất một chữ số',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'Passwords phải chứa ít nhất một chữ cái in hoa',
  })
  @MaxLength(255)
  @MinLength(6, {
    message: 'Passwords ngắn',
  })
  passwords: string;
  
}
