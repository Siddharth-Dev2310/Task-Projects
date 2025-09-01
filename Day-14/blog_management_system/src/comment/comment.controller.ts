import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDto } from './DTO/comment.dto';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { Roles } from 'src/guard/roles/roles.decorator';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //! : Create Comment
  @Post(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('reader', 'author')
  @ApiOperation({ summary: 'Create a comment (reader/author)' })
  @SwaggerApiResponse({
    status: 201,
    description: 'Comment created successfully.',
  })
  async createComment(
    @Param('id') id: number,
    @Body() data: Partial<CommentDto>,
  ): Promise<ApiResponse<CommentDto>> {
    return await this.commentService.createComment(id, data);
  }

  //! : Delete Comment
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('author', 'admin')
  @ApiOperation({ summary: 'Soft delete a comment (author/admin)' })
  @SwaggerApiResponse({ status: 200, description: 'Comment soft deleted.' })
  async deleteComment(@Param('id') id: number): Promise<ApiResponse<{}>> {
    return this.commentService.deleteComment(id);
  }
}
