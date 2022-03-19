import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const generateMockRepository = () => {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
};

export const useMockRepositoryProvider = (entity: EntityClassOrSchema) => {
  return {
    provide: getRepositoryToken(entity),
    useFactory: generateMockRepository,
  };
};
