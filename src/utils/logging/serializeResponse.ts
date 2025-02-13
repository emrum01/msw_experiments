import { flattenHeadersObject, headersToObject } from 'headers-polyfill'
import type { SerializedResponse } from '../../setupWorker/glossary'

export async function serializeResponse(
  response: Response,
): Promise<SerializedResponse<string>> {
  const response2 = response.clone()
  return {
    status: response.status,
    statusText: response.statusText,
    headers: flattenHeadersObject(headersToObject(response.headers)),
    // Serialize the response body to a string
    // so it's easier to process further down the chain in "prepareResponse" (browser-only)
    // and "parseBody" (ambiguous).
    body: await response2.text(),
  }
}
