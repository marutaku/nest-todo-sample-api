import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { BoardsService } from './boards.service';

@Injectable()
export class BoardsMiddleware implements NestMiddleware {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}
  async use(req: any, res: any, next: NextFunction) {
    const { boardId } = req.params;
    req.board = await this.boardsService.getBoardById(boardId, true);
    next();
  }
}
