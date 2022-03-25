import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardsService } from '../boards/boards.service';
import { useMockRepositoryProvider } from '../share/test-support';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';

const mockBaord = {
  id: 1,
  name: 'test board',
};

const mockStatus = {
  id: 1,
  name: 'mock status',
  order: 1,
};

const generateMockStatus = (customProperties = {}) =>
  Object.assign({}, mockStatus, customProperties);

describe('TaskStatusService', () => {
  let service: TaskStatusService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStatusService,
        useMockRepositoryProvider(TaskStatus),
        {
          provide: BoardsService,
          useValue: {
            getBoardById: jest.fn().mockResolvedValue(mockBaord),
          },
        },
      ],
    }).compile();

    service = module.get<TaskStatusService>(TaskStatusService);
    repository = module.get(getRepositoryToken(TaskStatus));
  });

  describe('findTaskByboardId', () => {
    it('find status by id', async () => {
      repository.find.mockResolvedValue([mockStatus]);
      const result = await service.findTaskByboardId(mockBaord.id);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toEqual(mockStatus);
    });

    it("return empty array if baord doesn't have task status", async () => {
      repository.find.mockResolvedValue([]);
      const result = await service.findTaskByboardId(mockBaord.id);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
  });

  describe('findTaskStatusByBoardIdAndStatusId', () => {
    it('find status using boardId and statusId', async () => {
      repository.findOne.mockResolvedValue(mockStatus);
      const result = await service.findTaskStatusByBoardIdAndStatusId(
        mockBaord.id,
        mockStatus.id,
      );
      expect(result).toEqual(mockStatus);
    });

    it('raise NotFoundException if status not found', async () => {
      repository.findOne.mockResolvedValue(null);
      expect(
        service.findTaskStatusByBoardIdAndStatusId(mockBaord.id, mockStatus.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createTastStatus', () => {
    it('create task successfully', async () => {
      const taskProperty = {
        name: mockStatus.name,
        order: mockStatus.order,
      };
      const result = await service.createTastStatus(mockBaord.id, taskProperty);
      expect(result.name).toEqual(taskProperty.name);
      expect(result.order).toEqual(taskProperty.order);
      expect(result.board).toEqual(mockBaord);
    });
  });

  describe('updateTaskOrder', () => {
    const mockStatusList = [
      generateMockStatus({ id: 1, order: 1 }),
      generateMockStatus({ id: 2, order: 2 }),
      generateMockStatus({ id: 3, order: 3 }),
    ];
    beforeEach(() => {
      service.findTaskByboardId = jest.fn().mockResolvedValue(mockStatusList);
      service.findTaskStatusByBoardIdAndStatusId = jest
        .fn()
        .mockResolvedValue(generateMockStatus(mockStatusList[0]));
    });

    it('update task order', async () => {
      const newOrder = 3;
      const result = await service.updateTaskOrder(1, mockStatus.id, newOrder);
      expect(result.find((s) => s.id === mockStatusList[0].id).order).toEqual(
        newOrder,
      );
      expect(result.find((s) => s.id === mockStatusList[1].id).order).toEqual(
        1,
      );
      expect(result.find((s) => s.id === mockStatusList[2].id).order).toEqual(
        2,
      );
    });
    describe('invalid parameter', () => {
      it('return exception if user pass order which greater than statuses in board', async () => {
        const invalidOrder = 99;
        expect(
          service.updateTaskOrder(1, mockStatus.id, invalidOrder),
        ).rejects.toThrowError(BadRequestException);
      });
    });
  });
});
