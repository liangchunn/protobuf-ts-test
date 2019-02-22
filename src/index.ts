import 'source-map-support/register'
import { User, IUser } from './proto/User'
import { sendProtobufWire } from './util/protobuf/wire'
import { encodeProtobufMessage } from './util/protobuf/encoder'
import { decodeProtobufMessage } from './util/protobuf/decoder'

const payload: IUser = {
  name: 'hello',
  id: 234,
}

// encode the payload
const buffer = encodeProtobufMessage(payload, User)

// decode the encoded payload
console.log(decodeProtobufMessage(buffer, User))

// send the payload and return raw data
const responseBuffer = sendProtobufWire('http://test', buffer)

console.log(responseBuffer)
