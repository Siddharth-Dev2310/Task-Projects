import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserClassDto } from './DTO/user.dto';
import { User } from './Entites/user.entites';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { ApiError } from 'src/utils/ApiError.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<ApiResponse<UserClassDto>> {
    //! : collect data from The data...
    //? : check Given The data are empty or not add this validation
    //! : check the user already existing or not
    //? : if the user already existing Given the Error
    //! : create The User Object
    //? : find on the Db User Are Created Or Not If Can not create Given the Error
    //! : return The response

    try {
      if (!data) {
        throw new ApiError(400, 'All Filed Are Required');
      }

      if (
        [data.email, data.password, data.name, data.role].some(
          (filed) => !filed || filed.trim() === '',
        )
      ) {
        throw new ApiError(
          400,
          'All Fields Are Required and must not be empty',
        );
      }

      const existingUser = await this.userRepo.findOne({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ApiError(400, 'User Already Existing');
      }

      const user = await this.userRepo.create({
        ...data,
      });
      await user.hashPassword();
      user.refreshToken = await process.env.REFRESH_TOKEN_SECRET!;
      await this.userRepo.save(user);

      const createdUser = await this.userRepo.findOne({
        where: { id: user.id },
      });

      console.log('CreatedUser:', createdUser);

      if (!createdUser) {
        throw new ApiError(500, 'User creation failed');
      }

      return new ApiResponse(200, createdUser, 'User Successfully Created');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `User Creation Problem : ${error.message}`);
    }
  }

  async loginUser(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<UserClassDto> | null> {
    //! : Given The Data Form The User
    //* : if THe email and Password  Fields Are Empty So Given The Error
    //TODO : Find In the User Existing or Not
    //? : using The password can check on the db password are perfectly match or not
    //* : Can refresh The Access And Refresh Tokens
    //! : Pass The Response

    try {
      if (!data.email || !data.password) {
        throw new ApiError(400, 'Email And Password Are Required');
      }

      const user = await this.userRepo.findOne({
        where: { email: data.email },
      });

      // console.log("User Password:" ,user);

      if (!user) {
        throw new ApiError(400, "User Can't Existing");
      }

      const isPasswordCorrect = await user.isPasswordCorrect(data.password);

      // console.log("isPasswordCorrect", isPasswordCorrect);

      if (!isPasswordCorrect) {
        throw new ApiError(400, 'Incorrect Password!');
      }

      const accessToken = await user.generateAccessToken(user.role);
      const refreshToken = await user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await this.userRepo.save(user);

      const userDetails = await this.userRepo
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.name',
          'user.email',
          'user.role',
          'user.createdAt',
          'user.updatedAt',
        ])
        .where('user.id = :id', { id: user?.id })
        .getOne();

      if (!userDetails) {
        throw new ApiError(400, 'User not found after login');
      }

      const userDetailsDto: UserClassDto = {
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
        createdAt: userDetails.createdAt,
        updatedAt: userDetails.updatedAt,
        password: '',
        refreshToken,
        accessToken,
      };

      return new ApiResponse(
        200,
        userDetailsDto,
        'User Logged In Successfully',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `User Login : ${error.message}`);
    }
  }

  async logoutUser(req: any): Promise<ApiResponse<null>> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError(401, 'User not authenticated');
      }

      const user = await this.userRepo.findOne({ where: { id: userId } });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      user.refreshToken = '';
      await this.userRepo.save(user);
      return new ApiResponse(200, null, 'User logged out successfully');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Logout Error : ${error.message}`);
    }
  }

  async getAllUser(
    req: any,
    page: number = 1,
    limit: number = 1,
    pagination: string = 'true',
  ): Promise<ApiResponse<PaginatedResult<UserClassDto[]>>> {
    try {
      //! : Check The USer Are Admin Or Not?
      //! : Login The Admin?
      //? : Find The All User with the Query Find
      //* : Add The VAlidation for Array Are Empty Or Not?
      //TODO : add The pagination only The 10 User Can Pass In The One Page
      //? : if The can't Work The next Pagination Given The Error
      //! : return The Response

      console.log(req.user);

      if (!req.user || req.user.role !== 'Admin') {
        throw new ApiError(403, 'Only Admin Can Fetch All The User');
      }

      let data, total;

      if (pagination === 'false') {
        data = await this.userRepo.find();
        total = data.length;
      } else {
        [data, total] = await this.userRepo.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          order: { createdAt: 'DESC' },
        });
      }

      if (data.length === 0) {
        throw new ApiError(400, 'Data Not Found');
      }

      return new ApiResponse(
        200,
        {
          data,
          total,
          page: pagination === 'false' ? null : page,
          limit: pagination === 'false' ? null : limit,
          totalPages: pagination === 'false' ? null : Math.ceil(total / limit),
        },
        'Users fetched successfully',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Logout Error : ${error.message}`);
    }
  }
}
