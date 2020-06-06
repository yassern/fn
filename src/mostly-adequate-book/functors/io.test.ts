import os from 'os'
import { reverse } from 'ramda'
import { IO } from '.'

test('validate IO', () => {
  const ioOs: IO = new IO(() => os)
  let io: IO

  io = ioOs.map(os => os.platform())
  expect(io.unsafePerformIO()).toEqual('darwin')

  io = ioOs.map(os => os.platform()).map(reverse)
  expect(io.unsafePerformIO()).toEqual('niwrad')
})
