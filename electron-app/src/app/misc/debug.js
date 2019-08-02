export const PRODUCTION =
  process.env.NODE_ENV === 'production'
export const DEBUG = process.env.NODE_ENV === 'development'

export function log (x) {
  console.log(x)
}
