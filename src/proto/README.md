# src/proto
This folder contains all the statically generated protocol buffer modules. 
It contains the `.d.ts` files and `.js` which are generated with the `compile-proto` script in `package.json`


These protobuf modules can be simply used by importing them as a normal module:
```ts
// assuming that you have a User.js and a User.d.ts file generated
import { User, IUser } from './proto/User'
```
