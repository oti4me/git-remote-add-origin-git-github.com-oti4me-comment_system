import { type ReactNode, type PropsWithChildren } from 'react';
import { DatabaseContext } from '../../dataLayer/context/DatabaseContext';
import { vi } from 'vitest';
import type { Database } from '../../types';

type MockProviderProps = {
  route: string;
};

const mockDatabase = {
  destroyed: false,
  collections: {
    posts: {
      find: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue([{
          toJSON: () => ({
            id: '1',
            title: 'Test Post',
            content: 'Test Content',
            authorId: 'author1',
            likeCount: 0,
            commentCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }]),
        $: { subscribe: vi.fn() }
      }),
      insert: vi.fn(),
      update$: vi.fn(),
      findOne: vi.fn(),
      remove: vi.fn(),
    },
    comments: {
      find: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue([]),
        $: { subscribe: vi.fn() }
      }),
      insert: vi.fn(),
      update$: vi.fn(),
      findOne: vi.fn(),
      remove: vi.fn(),
    },
    users: {
      find: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue([{
          toJSON: () => ({
            id: 'author1',
            username: 'testuser',
            email: 'test@email.com',
            password: 'password',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }]),
        $: { subscribe: vi.fn() }
      }),
      insert: vi.fn(),
      update$: vi.fn(),
      findOne: vi.fn(),
      remove: vi.fn(),
    }
  }
} as unknown as Database;

export const getMockProvider = ({
  _route,
}: MockProviderProps): (({ children }: PropsWithChildren<unknown>) => ReactNode) => {
  return ({ children }: PropsWithChildren<unknown>): ReactNode => (
    <DatabaseContext.Provider
      value={{
        database: mockDatabase,
        safelyExecute: async (operation) => operation(mockDatabase),
        reinitializeDatabase: async () => Promise.resolve()
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
