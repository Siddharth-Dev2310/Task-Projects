import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guard/role/role.decorator';
import { Role } from 'src/guard/role/role.enum';
import { RoleGuard } from 'src/guard/role/role.guard';

@Controller('user-roles')
export class UserRolesController {
    @Get('admin-data')
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    getAdminData() {
        return { message: 'Admin data accessed' };
    }

    @Get('user-Data')
    getUserData(){
        return {message : "User Data accessed"}
    }
}
