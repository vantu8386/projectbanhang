import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, Users } from './entity/users.emtity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/createUsers.dto';
import { Status } from './DTO/userStatus.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    try {
      const users = await this.userRepository.find({
        where: { role: UserRole.USER },
      });
      return users.reverse();
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getEmailUser(email: string): Promise<Users> {
    try {
      return await this.userRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }


  async getById(id: number): Promise<Users> {
    try {
      return await this.userRepository.findOne({ where: { idUsers: id } });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async isBlocked(id: number, status: Status): Promise<any> {

   try {
   await this.userRepository.update(id, status)

  return {
    message: status.isBlocked == true ? "Đã khóa tài khoản" : "Đã mở tài khoản",

  }
    
   } catch (error) {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
   }
   
  }

  async createUsers(user: CreateUserDTO): Promise<Users> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpException('Email da ton tai', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
