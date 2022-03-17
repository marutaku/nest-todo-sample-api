import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestWithJwtInfo } from '../share/request';
import { BoardDto } from './board.dto';
import { BoardsService } from './boards.service';

@Controller('/projects/:projectId/boards')
export class BoardsController {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}

  @Get()
  getBoards(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Req() req: RequestWithJwtInfo,
  ) {
    return this.boardsService.getBoards(projectId, req.user.id);
  }

  @Get(':id')
  getBoardById(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseIntPipe) boardId: number,
    @Req() req: RequestWithJwtInfo,
  ) {
    return this.boardsService.getBoardById(projectId, boardId, req.user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() boardProps: BoardDto,
    @Req() req: RequestWithJwtInfo,
  ) {
    return this.boardsService.createBoard(projectId, boardProps, req.user.id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseIntPipe) boardId: number,
    @Body() boardProps: BoardDto,
    @Req() req: RequestWithJwtInfo,
  ) {
    return this.boardsService.updateBoard(
      projectId,
      boardId,
      boardProps,
      req.user.id,
    );
  }

  @Delete(':id')
  deleteBoard(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseIntPipe) boardId: number,
    @Req() req: RequestWithJwtInfo,
  ) {
    return this.boardsService.deleteBoard(projectId, boardId, req.user.id);
  }
}
