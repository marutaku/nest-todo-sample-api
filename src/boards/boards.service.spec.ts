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
      title: 'mock board',
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
    it('getBoards', async () => {
      const mockBoard = generateMockBoard();
      boardRepository.find.mockResolvedValue([mockBoard]);
      const result = await boardsService.getBoards();
      expect(boardRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockBoard]);
    });
  });
});
