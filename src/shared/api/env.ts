// The only file that reads the API env vars (item #5, R9).
// Empty API URL = same address as the app (where MSW answers, item #6).
// ponytail: optional chaining only so node scripts can import the client.
export const API_URL: string = import.meta.env?.VITE_API_URL ?? ''
export const USE_MOCKS: boolean = import.meta.env?.VITE_USE_MOCKS === 'true'
