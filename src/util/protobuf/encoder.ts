import * as protobuf from 'protobufjs'

interface ProtobufMessage {
  [k: string]: any
}
interface ProtobufObjectEncodable<T> {
  verify(message: ProtobufMessage): string | null
  encode(message: T, writer?: protobuf.Writer): protobuf.Writer
}

function verfiyMessage(
  protobufObject: ProtobufObjectEncodable<any>,
  message: ProtobufMessage
): void | never {
  const err = protobufObject.verify(message)
  if (err) {
    throw new Error(err)
  }
}

/**
 * Encode and verify a message with the target protobuf object
 * @param message
 * @param protobufObject
 */
export function encodeProtobufMessage<T>(
  message: T,
  protobufObject: ProtobufObjectEncodable<T>
): never | Uint8Array {
  verfiyMessage(protobufObject, message)
  return protobufObject.encode(message).finish()
}
