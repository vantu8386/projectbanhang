import { IsEmail } from 'class-validator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.services';
import { RegisterUser } from './DTO/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './DTO/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: RegisterUser): Promise<any> {
    const salt = 10;
    const hashPassword = await bcrypt.hash(newUser.passwords, salt);
    // console.log("hashPassword:", hashPassword)
    try {
      const user = await this.usersService.createUsers({
        userName: newUser.userName,
        phone: newUser.phone,
        email: newUser.email,
        passwords: hashPassword,
      });
      return {
        message: 'Tạo mới thành công',
        data: user,
      };
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: LoginUser): Promise<any> {
    try {
      const userCurrent = await this.usersService.getEmailUser(user.email);
      const comparePasswords = await bcrypt.compare(
        user.passwords,
        userCurrent.passwords,
      );
      if (!comparePasswords || !userCurrent) {
        throw new HttpException(
          'Sai email hoặc Password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userRole: any = userCurrent.isBlocked;

      if ( userRole === 1) {

        return {
          message: 'Tài khoản đã bị khóa'
        }
       
      }

      const payload = { sub: userCurrent.idUsers, email: userCurrent.email };
      const token = this.jwtService.sign(payload);
      return {
        message: 'Đăng nhập thành công',
        access_token: token,
        user: userCurrent,
      };
    } catch (error) {
      console.log('error:', error);
      throw new HttpException(
        'Email chưa được đăng kí hoặc Sai email hoặc Password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
