import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/utils/testUtils/setup.ts'],
    globals: true,
    pool: 'forks',
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        'src/types/**',
        'src/utils/testUtils/**'
      ]
    },
    deps: {
      interopDefault: true
    }
  },
})
