import { pipe } from 'ramda'

export class IO {
  constructor(public unsafePerformIO) {}
  public map = (fn: Function) => new IO(pipe(this.unsafePerformIO, fn))
}
