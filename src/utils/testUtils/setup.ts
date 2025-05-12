import { beforeAll, afterEach, afterAll, vi, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'fake-indexeddb/auto'
import { IDBFactory } from 'fake-indexeddb'
import { addRxPlugin } from 'rxdb'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'

// Mock the storage layer
vi.mock('rxdb/plugins/storage-dexie', () => ({
  getRxStorageDexie: () => ({
    name: 'dexie',
    createStorageInstance: vi.fn().mockResolvedValue({
      _writeToSocket: vi.fn(),
      _removeDocuments: vi.fn(),
      _getAllDocuments: vi.fn().mockResolvedValue([]),
    }),
  }),
}))

// Setup global test environment
beforeAll(() => {
  // Reset indexedDB for each test suite
  indexedDB = new IDBFactory()

  // Add required RxDB plugins
  addRxPlugin(RxDBUpdatePlugin)

  // Extend expect matchers
  expect.extend({
    toBeValidrxDBId(received: unknown) {
      const pass = typeof received === 'string' && received.length > 0
      return {
        message: () =>
          `expected ${received} ${pass ? 'not ' : ''}to be a valid RxDB ID`,
        pass,
      }
    },
  })
})

// Cleanup after each test
afterEach(async () => {
  // Clean up any mounted React components
  cleanup()

  // Clear all mocks
  vi.clearAllMocks()
  vi.resetModules()

  // Clean up IndexedDB
  const databases = await window.indexedDB.databases()
  await Promise.all(
    databases.map(({ name }) =>
      name ? new Promise(resolve => {
        const request = window.indexedDB.deleteDatabase(name)
        request.onsuccess = () => resolve(undefined)
        request.onerror = () => resolve(undefined)
      }) : Promise.resolve()
    )
  )
})

// Global test configuration
vi.mock('../../dataLayer/database', () => {
  const mockDb = {
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
          $: {
            subscribe: vi.fn().mockImplementation(callback => {
              // Return unsubscribe function immediately
              const unsubscribe = vi.fn();

              // Schedule the callback to run after a tick
              Promise.resolve().then(() => {
                callback([{
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
                }]);
              });

              return { unsubscribe }
            })
          }
        }),
        insert: vi.fn(),
        update: vi.fn(),
      },
      users: {
        find: vi.fn().mockReturnValue({
          exec: vi.fn().mockResolvedValue([
            {
              toJSON: () => ({
                id: 'author1',
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }
          ]),
          $: { subscribe: vi.fn() }
        }),
        insert: vi.fn(),
      },
      comments: {
        find: vi.fn().mockReturnValue({
          exec: vi.fn().mockResolvedValue([]),
          $: { subscribe: vi.fn() }
        }),
        insert: vi.fn(),
        update: vi.fn(),
      }
    }
  }

  return {
    createDatabase: vi.fn().mockResolvedValue(mockDb),
  }
})

// Mock console.error to keep test output clean
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
