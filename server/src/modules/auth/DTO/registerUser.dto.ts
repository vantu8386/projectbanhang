import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsInt,
  MinLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';
import { IsGmailEmail } from 'src/decorators/email.decorators';

export class RegisterUser {
  @IsNotEmpty({ message: 'Tên của bạn không được trống' })
  // @IsString()
  @MinLength(5, { message: 'Tên của bạn quá ngắn' })
  @MaxLength(20)
  userName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone: number;

  // @IsEmail()
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

  @IsNotEmpty({ message: 'Nhập lại Password không được trống' })
  @Matches(/.*\d.*/, {
    message: 'Nhập lại Passwords Phải chứa ít nhất một chữ số',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'Nhập lại Passwords phải chứa ít nhất một chữ cái in hoa',
  })
  @MaxLength(255)
  @MinLength(6, {
    message: 'Nhập lại Passwords ngắn',
  })
  confirmPassword: string;
}
