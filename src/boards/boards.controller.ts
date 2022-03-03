import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }
}
