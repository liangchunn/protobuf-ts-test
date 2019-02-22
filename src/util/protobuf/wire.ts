import * as request from 'request'
import { decodeProtobufMessage, ProtobufObjectDecodable } from './decoder'

/**
 * Sends a POST request to a specified URL and returns
 * either a Uint8Array buffer or a decoded protobuf object
 * @param url
 * @param buffer
 * @param protobufObject optional protobuf object to be decoded with
 */
export function sendProtobufWire(
  url: string,
  buffer: Uint8Array
): Promise<Uint8Array>
export function sendProtobufWire<T>(
  url: string,
  buffer: Uint8Array,
  protobufObject: ProtobufObjectDecodable<T>
): Promise<T>
export function sendProtobufWire<T>(
  url: string,
  buffer: Uint8Array,
  protobufObject?: ProtobufObjectDecodable<T>
): Promise<T | Uint8Array> {
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        headers: {
          'Content-Length': buffer.byteLength,
        },
        body: buffer,
        method: 'POST',
        encoding: null,
      },
      (err, resp, raw: Uint8Array) => {
        if (err) {
          return reject(err)
        }
        if (resp.statusCode >= 400) {
          return reject(new Error(`Status code was not OK: ${resp.statusCode}`))
        }
        if (!!protobufObject) {
          return resolve(decodeProtobufMessage(raw, protobufObject))
        } else {
          return resolve(raw)
        }
      }
    )
  })
}
