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

  async getBoards(projectId: string, userId: string): Promise<Board[]> {
    const project = await this.projectService.findProjectById(
      projectId,
      userId,
    );
    return this.boardRepository.find({ project: project });
  }

  async getBoardById(
    projectId: string,
    boardId: number,
    userId: string,
  ): Promise<Board> {
    const project = await this.projectService.findProjectById(
      projectId,
      userId,
    );
    const board = await this.boardRepository.findOne({
      id: boardId,
      project,
    });
    if (!board) {
      throw new NotFoundException('board not found');
    }
    return board;
  }

  async createBoard(
    projectId: string,
    boardProps: BoardDto,
    userId: string,
  ): Promise<Board> {
    const project = await this.projectService.findProjectById(
      projectId,
      userId,
    );
    const board = new Board();
    board.name = boardProps.name;
    board.description = boardProps.description;
    board.project = project;
    const result = await this.boardRepository.save(board);
    return result;
  }

  async updateBoard(
    projectId: string,
    boardId: number,
    boardProps: Partial<BoardDto>,
    userId: string,
  ): Promise<Board> {
    const board = await this.getBoardById(projectId, boardId, userId);
    board.name = boardProps.name || board.name;
    board.description = boardProps.description || board.description;
    return this.boardRepository.save(board);
  }

  async deleteBoard(
    projectId: string,
    boardId: number,
    userId: string,
  ): Promise<void> {
    const project = await this.projectService.findProjectById(
      projectId,
      userId,
    );
    const { affected } = await this.boardRepository.delete({
      id: boardId,
      project,
    });
    if (!affected) {
      throw new NotFoundException('board not found');
    }
  }
}
