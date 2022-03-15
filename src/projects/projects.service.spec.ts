import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { useMockRepositoryProvider } from '../share/test-support';
import { UsersService } from '../users/users.service';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

const mockUserService = {
  findUserById: jest.fn(),
};

const mockUser = {
  id: 'test',
  name: 'test',
};

const mockProject = {
  id: 'testId',
  name: 'test',
  description: 'test',
  users: [mockUser],
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let mockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, useMockRepositoryProvider(Project)],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return mockUserService;
        }
      })
      .compile();

    service = module.get<ProjectsService>(ProjectsService);
    mockRepository = module.get(getRepositoryToken(Project));
  });

  describe('findProjectById', () => {
    it('find project by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockProject);
      const result = await service.findProjectById(mockProject.id);
      expect(result).toEqual(mockProject);
      expect(mockRepository.findOne).toBeCalled();
    });
    it('raise NotFoundException if project not found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);
      expect(service.findProjectById(mockProject.id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createProject', () => {
    it('create project', async () => {
      mockUserService.findUserById.mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({ id: mockProject.id });
      const result = await service.createProject(
        {
          name: mockProject.name,
          description: mockProject.description,
        },
        mockUser.id,
      );
      expect(mockRepository.save).toBeCalled();
      expect(result).toEqual(mockProject);
    });
  });

  describe('fetchUsersInProject', () => {
    it('fetch joined users', async () => {
      mockRepository.findOne.mockResolvedValue(mockProject);
      const result = await service.fetchUsersInProject(mockProject.id);
      expect(mockRepository.findOne).toBeCalledWith(mockProject.id);
      expect(result).toEqual(mockProject.users);
    });
  });

  describe('updateProject', () => {
    it('update project', async () => {
      const updateProps = {
        name: 'updated name',
        description: 'updated description',
      };
      service.findProjectById = jest.fn().mockResolvedValue(mockProject);
      const result = await service.updateProject(mockProject.id, updateProps);
      expect(result).toEqual(Object.assign({}, mockProject, updateProps));
      expect(mockRepository.save).toBeCalled();
    });
  });

  describe('addUserInProject', () => {
    it('add user into project', async () => {
      const newUser = {
        id: 'new user',
      };
      mockUserService.findUserById.mockResolvedValue(newUser);
      service.findProjectById = jest.fn().mockResolvedValue(mockProject);
      const result = await service.addUserInProject(mockProject.id, newUser.id);
      expect(result.users.some((u) => u.id === newUser.id)).toBe(true);
    });

    it('raise BadRequestException if user already joined the project', async () => {
      mockUserService.findUserById.mockResolvedValue(mockUser);
      service.findProjectById = jest.fn().mockResolvedValue(mockProject);
      expect(
        service.addUserInProject(mockProject.id, mockUser.id),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
