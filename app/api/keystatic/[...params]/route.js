import { makeRouteHandler } from '@keystatic/next/route-handler'
import keystaticConfig from '../../../../keystatic.config'

let _handler
function getHandler() {
  if (!_handler) {
    _handler = makeRouteHandler({ config: keystaticConfig })
  }
  return _handler
}

export async function GET(req) {
  try {
    return await getHandler().GET(req)
  } catch (e) {
    console.error('[keystatic] GET error:', e.message)
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(req) {
  try {
    return await getHandler().POST(req)
  } catch (e) {
    console.error('[keystatic] POST error:', e.message)
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
