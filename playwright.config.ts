import fs from 'node:fs'
import { defineConfig, devices } from '@playwright/test'

const desktop = { viewport: { width: 1440, height: 900 } }
const phone = { viewport: { width: 390, height: 844 } }

// Edge (D3): only where the msedge channel is installed; Chromium covers the same engine otherwise.
const edgePaths = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/microsoft-edge',
  '/Applications/Microsoft Edge.app',
]
const hasEdge = edgePaths.some((p) => fs.existsSync(p))

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://localhost:5173', trace: 'retain-on-failure' },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    env: { VITE_USE_MOCKS: 'true' },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], ...desktop } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'], ...desktop } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], ...desktop } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'], ...phone } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'], ...phone } },
    ...(hasEdge
      ? [
          {
            name: 'edge',
            use: { ...devices['Desktop Edge'], channel: 'msedge', ...desktop },
          },
        ]
      : []),
  ],
})
