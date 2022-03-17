import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardsService } from '../boards/boards.service';
import { useMockRepositoryProvider } from '../share/test-support';
import { Task } from './task.entity';
import { TasksService } from './task.service';

const mockBoard = {
  id: 1,
  name: 'mock board',
  description: 'board description',
};

const generateMockTask = (mock = {}) => {
  return Object.assign(
    {
      title: 'mockTitle',
      description: 'mockDescription',
      deadline: new Date().toISOString(),
    },
    mock,
  );
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;

  const mockBoardId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        useMockRepositoryProvider(Task),
        {
          provide: BoardsService,
          useValue: {
            getBoardById: jest.fn().mockResolvedValue(mockBoard),
          },
        },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get(getRepositoryToken(Task));
  });

  describe('getTasks', () => {
    it('get all tasks', async () => {
      taskRepository.find.mockResolvedValue('mockTask');
      expect(taskRepository.find).not.toHaveBeenCalled();
      const result = await tasksService.getTasks(mockBoardId);
      expect(taskRepository.find).toHaveBeenCalled();
      expect(result).toEqual('mockTask');
    });
  });

  describe('getTaskById', () => {
    it('find success', async () => {
      const mockTask = {
        title: 'mockTitle',
        description: 'mockDescription',
        deadline: new Date(),
      };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(1, mockBoardId);
      expect(taskRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
    it('task is not found', async () => {
      const mockId = 1;
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(mockId, mockBoardId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('insert task', async () => {
      const mockTask = generateMockTask();
      taskRepository.save.mockResolvedValue(mockTask);
      expect(taskRepository.save).not.toHaveBeenCalled();
      const result = await tasksService.createTask(
        mockTask,
        mockBoardId,
        'test-project',
      );
      expect(taskRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        title: mockTask.title,
        description: mockTask.description,
        deadline: new Date(mockTask.deadline),
        // ステータスがセットされるか
        status: 'OPEN',
      });
    });
  });
  describe('updateTask', () => {
    it('update task', async () => {
      const mockStatus = 'DONE';
      tasksService.getTaskById = jest
        .fn()
        .mockResolvedValue(generateMockTask({ status: 'OPEN' }));
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      const result = await tasksService.updateTask(1, mockStatus, mockBoardId);
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(taskRepository.save).toHaveBeenCalled();
      expect(result.status).toEqual(mockStatus);
    });
  });

  describe('deleteTask', () => {
    it('delete task', async () => {
      const mockTaskId = 1;
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTask(mockTaskId, mockBoardId);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: mockTaskId,
        board: { id: mockBoardId },
      });
    });

    it('delete task failed', async () => {
      const mockTaskId = 1;
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      expect(
        tasksService.deleteTask(mockTaskId, mockBoardId),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
