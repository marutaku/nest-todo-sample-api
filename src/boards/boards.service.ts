import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { BoardDto } from './board.dto';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @Inject(ProjectsService) private projectService: ProjectsService,
  ) {}

  async getBoards(
    projectId: string,
    relations: string[] = [],
  ): Promise<Board[]> {
    return this.boardRepository.find({
      where: { project: { id: projectId } },
      relations,
    });
  }

  async getBoardById(
    boardId: number,
    relations: string[] = [],
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      relations,
    });
    if (!board) {
      throw new NotFoundException('board not found');
    }
    return board;
  }

  async createBoard(projectId: string, boardProps: BoardDto): Promise<Board> {
    const project = await this.projectService.findProjectById(projectId);
    const board = new Board();
    board.name = boardProps.name;
    board.description = boardProps.description;
    board.project = project;
    const result = await this.boardRepository.save(board);
    delete result.project;
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

  async deleteBoard(boardId: number): Promise<void> {
    const { affected } = await this.boardRepository.delete({
      id: boardId,
    });
    if (!affected) {
      throw new NotFoundException('board not found');
    }
  }
}
