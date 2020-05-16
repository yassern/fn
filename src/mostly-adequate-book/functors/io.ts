import os from 'os'
import { pipe, reverse } from 'ramda'

export class IO {
  constructor(public unsafePerformIO) {}
  public map = (fn: Function) => new IO(pipe(this.unsafePerformIO, fn))
}

test('validate IO', () => {
  const ioOs: IO = new IO(() => os)
  let io: IO

  io = ioOs.map(os => os.platform())
  expect(io.unsafePerformIO()).toEqual('darwin')

  io = ioOs.map(os => os.platform()).map(reverse)
  expect(io.unsafePerformIO()).toEqual('niwrad')
})
