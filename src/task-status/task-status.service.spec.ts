import { Test, TestingModule } from '@nestjs/testing';
import { useMockRepositoryProvider } from '../share/test-support';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';

describe('TaskStatusService', () => {
  let service: TaskStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskStatusService, useMockRepositoryProvider(TaskStatus)],
    }).compile();

    service = module.get<TaskStatusService>(TaskStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
