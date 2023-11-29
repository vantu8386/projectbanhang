import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.services';
import { CreateUserDTO } from './DTO/createUsers.dto';
import { Status } from './DTO/userStatus.dto';


@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }

  @Post()
  createUsers(@Body() body: CreateUserDTO) {
    return this.usersService.createUsers(body);
  }

  @Patch('/isBlocked/:id')
  isBlocked(@Param('id') id: string, @Body() body: Status) {
    return this.usersService.isBlocked(Number(id), body);
  }
}
