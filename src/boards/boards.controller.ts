import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardDto } from './board.dto';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() boardProps: BoardDto) {
    return this.boardsService.createBoard(boardProps);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() boardProps: BoardDto,
  ) {
    return this.boardsService.updateBoard(id, boardProps);
  }
}
