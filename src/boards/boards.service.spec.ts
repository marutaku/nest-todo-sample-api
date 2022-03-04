import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';

// TODO: DRYではないので，どこかで共通化したい
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const generateMockBoard = (customProperties = {}) =>
  Object.assign(
    {
      name: 'mock board',
      description: 'mock board description',
    },
    customProperties,
  );

describe('BoardsService', () => {
  let boardsService: BoardsService;
  let boardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        { provide: getRepositoryToken(Board), useFactory: mockRepository },
      ],
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
    boardRepository = module.get(getRepositoryToken(Board));
  });

  describe('BoardsService', () => {
    describe('getBoards', () => {
      it('get all task', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.find.mockResolvedValue([mockBoard]);
        const result = await boardsService.getBoards();
        expect(boardRepository.find).toHaveBeenCalled();
        expect(result).toEqual([mockBoard]);
      });
    });

    describe('getTaskById', () => {
      const mockId = 1;
      it('get task by id', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.findOne.mockResolvedValue(mockBoard);
        const result = await boardsService.getBoardById(mockId);
        expect(boardRepository.findOne).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });

      it('raise error if not found', async () => {
        boardRepository.findOne.mockResolvedValue(null);
        expect(boardsService.getBoardById(mockId)).rejects.toThrowError(
          NotFoundException,
        );
      });
    });

    describe('createBoard', () => {
      it('create board', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.save.mockResolvedValue(mockBoard);
        const result = await boardsService.createBoard(mockBoard);
        expect(boardRepository.save).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });
    });

    describe('updataTask', () => {
      it('update task', async () => {
        const mockBoard = generateMockBoard({ id: 1, name: 'updated' });
        boardsService.getBoardById = jest.fn().mockResolvedValue(mockBoard);
        boardRepository.save.mockResolvedValue(mockBoard);
        const result = await boardsService.updateBoard(1, mockBoard);
        expect(boardRepository.save).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });
    });
  });
});
