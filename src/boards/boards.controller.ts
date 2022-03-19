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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectGuard } from '../share/project.guard';
import { BoardDto } from './board.dto';
import { BoardsService } from './boards.service';

@Controller('/projects/:projectId/boards')
@UseGuards(ProjectGuard)
export class BoardsController {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}

  @Get()
  getBoards(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.boardsService.getBoards(projectId);
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) boardId: number) {
    return this.boardsService.getBoardById(boardId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() boardProps: BoardDto,
  ) {
    return this.boardsService.createBoard(projectId, boardProps);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('id', ParseIntPipe) boardId: number,
    @Body() boardProps: BoardDto,
  ) {
    return this.boardsService.updateBoard(boardId, boardProps);
  }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) boardId: number) {
    return this.boardsService.deleteBoard(boardId);
  }
}
