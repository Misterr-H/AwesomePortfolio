import { makeRouteHandler } from '@keystatic/next/route-handler'
import keystaticConfig from '../../../../keystatic.config'

// Lazily initialise so missing env vars don't crash the build —
// the error surfaces at request time instead.
let _handler
function handler() {
  if (!_handler) {
    _handler = makeRouteHandler({ config: keystaticConfig })
  }
  return _handler
}

export function GET(req) {
  return handler().GET(req)
}

export function POST(req) {
  return handler().POST(req)
}
