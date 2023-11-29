import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { RegisterUser } from "./DTO/registerUser.dto";
import { LoginUser } from "./DTO/loginUser.dto";
import { AuthGuard } from "src/guards/auth.guard";


@Controller("/api/v1/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    register(@Body() user: RegisterUser){
        if (user.passwords !== user.confirmPassword){
            throw new HttpException("Password không trùng khớp", HttpStatus.BAD_REQUEST)
          }
          return this.authService.register(user);
    }

    @Post('/login')
    // @UseGuards(AuthGuard)
    login(@Body() user: LoginUser){
        return this.authService.login(user);
    }
}