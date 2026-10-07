// Provisional contract with the back-end (item #5, D3/D6). Adjust here only.

/** Error body: `{ code, message, fields? }`. */
export type ApiErrorBody = {
  code: string
  message: string
  fields?: Record<string, string>
}

/** Paginated list: `GET ...?page=1&pageSize=20`. */
export type Page<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/** Dates travel as ISO 8601 text, e.g. "2026-10-06T12:00:00Z". */
export type IsoDate = string
