import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body : {email : string, password : string}){
    return this.authService.signUp(body.email, body.password);
  }

  @Post('login')
  signIn(@Body() body : {email : string, password : string}){
    return this.authService.signIn(body.email, body.password)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req ){
    return req.user;
  }
}
