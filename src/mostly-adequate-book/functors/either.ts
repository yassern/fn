import { prop } from 'ramda'

export class Either {
  constructor(public value) {}
  static of = (x: any) => new Right(x)
}

export class Left extends Either {
  public map = (fn: Function) => this
}

export class Right extends Either {
  public map = (fn: Function) => Either.of(fn(this.value))
}

export const left = x => new Left(x)

test('validate either', () => {
  let either: Either

  either = Either.of('rain').map(str => `b${str}`)
  expect(either.value).toEqual('brain')

  either = left('rain').map(
    str => `It's gonna ${str}, better bring your umbrella!`
  )
  expect(either.value).toEqual('rain')

  either = Either.of({ host: 'localhost', port: 80 }).map(prop('host'))
  expect(either.value).toEqual('localhost')

  either = left('rolls eyes...').map(prop('host'))
  expect(either.value).toEqual('rolls eyes...')
})
