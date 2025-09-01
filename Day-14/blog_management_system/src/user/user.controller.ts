import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserClassDto } from './DTO/user.dto';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { Roles } from 'src/guard/roles/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //! : Register new user
  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User registered successfully.',
  })
  async register(
    @Body() body: Partial<UserClassDto>,
  ): Promise<ApiResponse<UserClassDto>> {
    return this.userService.createUser(body);
  }

  //! : Login and return JWT token
  @Post('auth/login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User logged in successfully.',
  })
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<ApiResponse<UserClassDto> | null> {
    return this.userService.loginUser(body);
  }

  //! : Logout Admin , Author
  @Post('auth/logout')
  @ApiOperation({ summary: 'Logout user' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User logged out successfully.',
  })
  async logout(@Req() req: any): Promise<ApiResponse<null>> {
    return this.userService.logoutUser(req);
  }

  //! : Admin-only: list all users (with pagination)
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users fetched successfully.',
  })
  async getAllUsers(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('pagination') pagination: string = 'true',
  ): Promise<ApiResponse<any>> {
    return await this.userService.getAllUser(req, page, limit, pagination);
  }
}
