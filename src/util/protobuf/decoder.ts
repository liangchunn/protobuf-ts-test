import * as protobuf from 'protobufjs'

export interface ProtobufObjectDecodable<T> {
  decode(reader: protobuf.Reader | Uint8Array, length?: number): T
}

/**
 * Decodes a buffer into the target protobuf object.
 * Throws an error if the decode fails.
 * @param raw
 * @param protobufObject
 */
export function decodeProtobufMessage<T>(
  buffer: Uint8Array,
  protobufObject: ProtobufObjectDecodable<T>
): T | never {
  return protobufObject.decode(buffer)
}
