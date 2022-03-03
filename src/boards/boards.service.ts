import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardById(boardId): Promise<Board> {
    const board = await this.boardRepository.findOne(boardId);
    if (!board) {
      throw new NotFoundException('board not found');
    }
    return board;
  }
}
