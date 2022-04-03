import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { TaskStatus } from '../task-status/task-status.entity';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(@Inject(BoardsService) private boardsService: BoardsService) {}

  @Query(() => [Board])
  async fetchBoardsByProjectId(
    @Args('projectId', { type: () => String }) projectId: string,
  ) {
    return this.boardsService.getBoards(projectId);
  }

  @ResolveField('taskStatus', () => [TaskStatus])
  async fetchTaskStatus(@Parent() boardArg: Board) {
    return (await this.boardsService.getBoardById(boardArg.id, ['taskStatus']))
      .taskStatus;
  }
}
