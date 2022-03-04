import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardDto } from './board.dto';
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

  async createBoard(boardProps: BoardDto): Promise<Board> {
    const result = await this.boardRepository.save(boardProps);
    return result;
  }

  async updateBoard(
    boardId: number,
    boardProps: Partial<BoardDto>,
  ): Promise<Board> {
    const board = await this.getBoardById(boardId);
    board.name = boardProps.name || board.name;
    board.description = boardProps.description || board.description;
    return this.boardRepository.save(board);
  }
}
