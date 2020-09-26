// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
