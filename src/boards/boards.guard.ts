import {
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

import { Project } from '../projects/project.entity';
import { Board } from './board.entity';

export class BoardsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const project: Project = request.project;
    const board: Board = request.board;
    if (board.project.id === project.id) {
      return true;
    }
    throw new NotFoundException('Board not found');
  }
}
