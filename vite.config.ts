import { defineConfig, UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
} as UserConfig)