import { prop } from 'ramda'
import { Either, left } from '.'

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
