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
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserClassDto } from './DTO/user.dto';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { Roles } from 'src/guard/roles/roles.decorator';
import { LoginDto } from './DTO/login.dto';

@ApiTags('Users')
@ApiBearerAuth() // Enable JWT "Authorize" button globally for this controller
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //! : Register new user
  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserClassDto })
  @SwaggerApiResponse({
    status: 201,
    description: 'User registered successfully.',
    schema: {
      example: {
        success: true,
        message: 'User registered successfully',
        data: {
          id: 1,
          name: 'Siddharth',
          email: 'sid@example.com',
          role: 'Author',
        },
      },
    },
  })
  async register(
    @Body() body: Partial<UserClassDto>,
  ): Promise<ApiResponse<UserClassDto>> {
    return this.userService.createUser(body);
  }

  //! : Login and return JWT token
  @Post('auth/login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({
    schema: {
      example: {
        email: 'sid@example.com',
        password: 'password123',
      },
    },
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    schema: {
      example: {
        success: true,
        message: 'Login successful',
        data: {
          token: 'jwt_token_here',
          user: {
            id: 1,
            name: 'Siddharth',
            email: 'sid@example.com',
            role: 'Author',
          },
        },
      },
    },
  })
  async login(
    @Body() body: LoginDto,
  ): Promise<ApiResponse<UserClassDto> | null> {
    return this.userService.loginUser(body);
  }

  //! : Logout
  @Post('auth/logout')
  @ApiOperation({ summary: 'Logout user' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User logged out successfully.',
    schema: {
      example: {
        success: true,
        message: 'Logout successful',
        data: null,
      },
    },
  })
  async logout(@Req() req: any): Promise<ApiResponse<null>> {
    return this.userService.logoutUser(req);
  }

  //! : Admin-only: list all users (with pagination)
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page (default: 10)',
  })
  @ApiQuery({
    name: 'pagination',
    required: false,
    type: String,
    example: 'true',
    description: 'Enable/disable pagination (default: true)',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users fetched successfully.',
    schema: {
      example: {
        success: true,
        message: 'Users fetched successfully',
        data: {
          users: [
            {
              id: 1,
              name: 'Siddharth',
              email: 'sid@example.com',
              role: 'User',
            },
            {
              id: 2,
              name: 'User2',
              email: 'user2@example.com',
              role: 'Author',
            },
          ],
          total: 2,
          page: 1,
          limit: 10,
        },
      },
    },
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token missing or invalid',
  })
  @SwaggerApiResponse({
    status: 403,
    description: 'Forbidden - User does not have Admin role',
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