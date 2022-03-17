import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsService } from '../projects/projects.service';
import { useMockRepositoryProvider } from '../share/test-support';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';

const mockProject = {
  id: 'test',
  name: 'mock-project',
  description: 'mock-project',
};
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
      providers: [BoardsService, useMockRepositoryProvider(Board)],
    })
      .useMocker((token) => {
        if (token === ProjectsService) {
          return {
            findProjectById: jest.fn().mockResolvedValue(mockProject),
          };
        }
      })
      .compile();

    boardsService = module.get<BoardsService>(BoardsService);
    boardRepository = module.get(getRepositoryToken(Board));
  });

  describe('BoardsService', () => {
    describe('getBoards', () => {
      it('get all board', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.find.mockResolvedValue([mockBoard]);
        const result = await boardsService.getBoards(mockProject.id);
        expect(boardRepository.find).toHaveBeenCalled();
        expect(result).toEqual([mockBoard]);
      });
    });

    describe('getBoardById', () => {
      const mockId = 1;
      it('get board by id', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.findOne.mockResolvedValue(mockBoard);
        const result = await boardsService.getBoardById(mockProject.id, mockId);
        expect(boardRepository.findOne).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });

      it('raise error if not found', async () => {
        boardRepository.findOne.mockResolvedValue(null);
        expect(
          boardsService.getBoardById(mockProject.id, mockId),
        ).rejects.toThrowError(NotFoundException);
      });
    });

    describe('createBoard', () => {
      it('create board', async () => {
        const mockBoard = generateMockBoard();
        boardRepository.save.mockResolvedValue(mockBoard);
        const result = await boardsService.createBoard(
          mockProject.id,
          mockBoard,
        );
        expect(boardRepository.save).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });
    });

    describe('updataBoard', () => {
      it('update board', async () => {
        const mockBoard = generateMockBoard({ id: 1, name: 'updated' });
        boardsService.getBoardById = jest.fn().mockResolvedValue(mockBoard);
        boardRepository.save.mockResolvedValue(mockBoard);
        const result = await boardsService.updateBoard(
          mockProject.id,
          1,
          mockBoard,
        );
        expect(boardRepository.save).toHaveBeenCalled();
        expect(result).toEqual(mockBoard);
      });
    });

    describe('deleteBoard', () => {
      it('delete board', async () => {
        boardRepository.delete.mockResolvedValue({ affected: 1 });
        await boardsService.deleteBoard(mockProject.id, 1);
        expect(boardRepository.delete).toHaveBeenCalled();
      });

      it('board not found', async () => {
        boardRepository.delete.mockResolvedValue({ affected: null });
        expect(
          boardsService.deleteBoard(mockProject.id, 1),
        ).rejects.toThrowError(NotFoundException);
      });
    });
  });
});
